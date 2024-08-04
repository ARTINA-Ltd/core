from core import models
from Account import models
from core.models import NFT , Order , MyImage , NFTRating , Category , CollectionNFT
# from Account.views import transferNFT
from core import serializers
from eth_account import Account
from thirdweb.types.nft import NFTMetadataInput 
from Account.views import get_balance,CryptoViewSet

from .models import PDF
from .serializers import PDFSerializer
import json
import requests
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import NFT
from web3 import Web3
from thirdweb import ThirdwebSDK
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from io import BytesIO
from rest_framework.parsers import MultiPartParser, FormParser, BaseParser
from rest_framework.exceptions import ParseError
import base64
from django.http import Http404
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os
from Account.models import Msg, ARTINA_Ballance,Wallet , NotifyUser,UserBalance,TransactionCurrency,Profile,Transaction
from http import HTTPStatus
from django.db.models import Count, Q
from .serializers import CategorySerializer, CollectionNFTSerializer, NFTRatingSerializer, OwnerWithLikesSerializer
from django_filters import rest_framework as filters
import time
from decimal import Decimal 

# Initialize Web3
w3 = Web3(Web3.HTTPProvider("https://polygon.rpc.thirdweb.com"))
def transfer_nft(sender_private_key, sender_address, recipient_address, token_id):
    try:
        nonce = w3.eth.getTransactionCount(sender_address)
        
        # Contract details
        nft_contract_address = "0xB0Df35D093752d7fAf6bc3D4304CEFcCABe7a86a"
        abi_filename = os.path.join(settings.BASE_DIR, "Account", "ABI.json")

        # Read ABI from JSON file
        with open(abi_filename, "r") as abi_file:
            nft_contract_abi = json.load(abi_file)

        nft_contract = w3.eth.contract(address=nft_contract_address, abi=nft_contract_abi)
        
        # Use a higher priority fee
        base_fee_per_gas = 244  # in wei (this is very low for current standards)
        priority_fee = 50000000000  # 50 Gwei in wei for priority fee
        
        gas_price = base_fee_per_gas + priority_fee
        
        # Build the transaction
        tx = nft_contract.functions.safeTransferFrom(sender_address, recipient_address, token_id).buildTransaction({
            'chainId': 137,  # Chain ID for Polygon (Matic) mainnet
            'gas': 200000,  # Set a reasonable gas limit
            'gasPrice': gas_price,  # Set the gas price
            'nonce': nonce,
            'from': sender_address,  # The sender's address
        })

        # Sign the transaction with the sender's private key
        signed_txn = w3.eth.account.signTransaction(tx, sender_private_key)
        print(f"Signed transaction by sender: {signed_txn}")

        # Send the transaction
        tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        print(f"Transaction hash: {tx_hash.hex()}")
        
        return tx_hash
    except Exception as e:
        print(f"Error in transfer_nft: {e}")
        return None



def transferNFT(token_id, sender, recipient):
    try:
        # Sender
        wallet1 = get_object_or_404(Wallet, user=sender)
        sender_address = wallet1.address
        sender_private_key = wallet1.private_key
        print(f"Sender private key: {sender_private_key}")

        # Recipient
        wallet2 = Wallet.objects.filter(user=recipient).first()
        if not wallet2:
            private_key = Web3.toHex(os.urandom(32))  # Generate a random private key
            account = w3.eth.account.privateKeyToAccount(private_key)
            wallet2 = Wallet.objects.create(user=recipient, address=account.address, private_key=private_key)
        recipient_address = wallet2.address
        print(f"Recipient address: {recipient_address}")

        

        # Initiate NFT transfer
        tx_hash = transfer_nft(sender_private_key, sender_address, recipient_address, token_id)
        if not tx_hash:
            return JsonResponse({"message": "Transaction failed."}, status=status.HTTP_400_BAD_REQUEST)

        # Wait for transaction receipt
        tx_receipt = None
        for _ in range(10):  # Poll for the receipt up to 10 times
            try:
                tx_receipt = w3.eth.getTransactionReceipt(tx_hash)
                if tx_receipt is not None:
                    break
            except Exception as e:
                print(f"Error getting transaction receipt: {e}")
            time.sleep(3)  # Wait for 3 seconds before polling again

        if tx_receipt is None or tx_receipt['status'] == 0:
            return JsonResponse({"message": "Transaction failed or did not get mined in time."}, status=status.HTTP_400_BAD_REQUEST)

        # Update NFT ownership
        nft = get_object_or_404(NFT, token_id=token_id)
        nft.owner = recipient
        nft.save()

        return JsonResponse({"message": f"Transaction successful. Transaction hash: {tx_hash.hex()}"}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error in transferNFT: {e}")
        return JsonResponse({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
def order_Report(token_id):
    try:
        nft = get_object_or_404(NFT, token_id=token_id)
        orders = Order.objects.filter(nft=nft)
        for bid in orders:
            if bid.report == 0:
                bid.status = 1
                bid.report = 2
                bid.save()
                balance= UserBalance.objects.get(user=bid.bidder)
                balance.eth_balance+= bid.eth
                balance.eth_untradable_balance -= bid.eth
                balance.save()
                NotifyUser.objects.create(user=bid.bidder, text="Your money reverted to your balance")
                NotifyUser.objects.create(user=bid.bidder, text="You lost the bid")
        print("Change report status done")
    except Exception as e:
        print(f"Error in order_Report: {e}")

def get_winner(token_id):
    try:
        nft = get_object_or_404(NFT, token_id=token_id)
        sender = nft.owner
        if nft.end_date >= timezone.now():
            return Response({"error": "NFT has not expired."}, status=status.HTTP_400_BAD_REQUEST)

        highest_bid = None
        orders = Order.objects.filter(nft=nft, status=0)
        for bid in orders:
            if highest_bid is None or bid.eth > highest_bid.eth:
                highest_bid = bid

        nft.is_for_sale = False
        nft.in_exhibition = False
        nft.save()

        if highest_bid is None:
            return Response({"error": "No bids found for this NFT."}, status=status.HTTP_400_BAD_REQUEST)

        highest_bid.report = 1
        highest_bid.status = 1
        highest_bid.save()
        recipient = highest_bid.bidder
        balance= UserBalance.objects.get(user=highest_bid.bidder)
        balance.eth_untradable_balance-= highest_bid.eth
        balance.save()

        #artina
        artina=ARTINA_Ballance.objects.first()
        
        value=(1.5*highest_bid.eth)/100
        artina.artina_commision=value
        artina.artina_commision_count += 1
        artina.save
        #owner

        balanceowner= UserBalance.objects.get(user=nft.owner)
        total= highest_bid.eth - value
        balanceowner.eth_balance += total
        balanceowner.save()
        NotifyUser.objects.create(user=bid.bidder, text="You sold your nft and your balance updated")
        order_Report(token_id)
        result = transferNFT(token_id, sender, recipient)
        print(f"Result: {result}")

        recipient_data = {
            "id": recipient.id,
            "username": recipient.username,
            "email": recipient.email,
        }

        return Response({"winner": recipient_data, "price": highest_bid.eth}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error in get_winner: {e}")
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def transfer_matic(to_address, amount):
    COMPANY_WALLET_ADDRESS = '0x2293221D7c357FB04De9c7D0dEeBcA427407429D'
    COMPANY_WALLET_PRIVATE_KEY = "045be0b52044ba0f842dea76a18ef921009a629e7c8ad114a51023c6acf50520"
    
    base_fee_per_gas = 244  # in wei (this is very low for current standards)
    priority_fee = 50000000000  # 50 Gwei in wei for priority fee
        
    gas_price = base_fee_per_gas + priority_fee
    nonce = w3.eth.getTransactionCount(COMPANY_WALLET_ADDRESS)
    tx = {
        'nonce': nonce,
        'to': to_address,
        'value': w3.toWei(amount, 'ether'),
        'gas': 20000000,
        'gasPrice': gas_price
    }

    signed_tx = w3.eth.account.signTransaction(tx, COMPANY_WALLET_PRIVATE_KEY)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    w3.eth.waitForTransactionReceipt(tx_hash)

    return tx_hash

class OrderViewSet(viewsets.ViewSet):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer
    
    def create(self, request, *args, **kwargs):
        fee = request.data.get('fee')
        token_id = request.data.get('token_id')
        eth = request.data.get('eth_fee')
        status = 0
        bidder=self.request.user
        user_balance=None
        user_balance = UserBalance.objects.filter(user=bidder).first()
        user_eth=user_balance.eth_balance
        fee=float(fee)
        nft = NFT.objects.get(token_id=token_id)
        eth=float(eth) 
        user_eth=float(user_eth)    
        if (nft.owner==bidder):
            return Response({'error': 'you are the owner, you can not bid'},status=HTTPStatus.BAD_REQUEST)
           

        if Order.objects.filter(nft=nft,bidder=bidder, status=0).first() :
            return Response({'error': 'you had already order on this NFT'},status=HTTPStatus.BAD_REQUEST)

        if Order.objects.filter(nft=nft,eth=eth, status=0).first() :
            return Response({'error': 'you have to bid more. this already exists.'},status=HTTPStatus.BAD_REQUEST)
            
        if user_eth< eth  :
                return Response({'error': 'insufficient ballance','usereth':user_eth},status=HTTPStatus.BAD_REQUEST)
            
        user_balance.eth_balance -= eth
        user_balance.eth_untradable_balance += eth  
        user_balance.save()  
        Order.objects.create(nft=nft,bidder=bidder,fee=fee,status=status,eth=eth)
           
        return Response(status=HTTPStatus.OK)
          
    
    @action(detail=False, methods=['post'])
    def disable_order(self,request):
        bidder=self.request.user
        token_id = request.data.get('token_id')
        status = 1
        nft = NFT.objects.get(token_id=token_id)
        order=Order.objects.filter(nft=nft,bidder=bidder, status=0).first()
        order.status=1
        order.save()
        return Response({'error': 'your order has been deleted'},status=HTTPStatus.OK)

    @action(detail=False, methods=['post'])
    def gettingorders(self, request):
        token_id = request.data.get('token_id')
        if not token_id:
            return Response({'error': 'Token ID not provided in header'}, status=HTTPStatus.BAD_REQUEST)
        
        nft = NFT.objects.filter(token_id=token_id).first()
        if not nft:
            return Response({'error': 'NFT with given token ID does not exist'}, status=HTTPStatus.NOT_FOUND)
        
        orders = Order.objects.filter(nft=nft,status=0)
        serializer = serializers.OrderSerializer(orders, many=True)
        return Response(serializer.data, status=HTTPStatus.OK)

    @action(detail=False, methods=['get'])
    def get_user_order(self,request):
        user = self.request.user
        orders=Order.objects.filter(bidder=user, status=0)
        serializer = serializers.OrderSerializer(orders, many=True)
        return Response(serializer.data, status=HTTPStatus.OK)


class NFTFilter(filters.FilterSet):
    search = filters.CharFilter(method='perform_search', label='Search')

    class Meta:
        model = NFT
        fields = {
            'name': ['exact', 'icontains'],
            'creator': ['exact', 'icontains'],
            'category__name': ['exact'],
            'is_for_sale': ['exact'],
            'start_date': ['exact', 'gte', 'lte'],
            'end_date': ['exact', 'gte', 'lte'],
            'last_price': ['exact', 'gte', 'lte'],
        }

    def perform_search(self, queryset, name, value):
        return queryset.filter(
            models.Q(name__icontains=value) |
            models.Q(creator__icontains=value) |
            models.Q(description__icontains=value)
        )
        
class NftViewSet(viewsets.ModelViewSet):
    queryset = NFT.objects.all()
    serializer_class = serializers.NFTSerializer
    ordering_fields = '__all__'
    
    @action(detail=False, methods=['post'])
    def get_winner(self, request):
        token_id = request.data.get('token_id')
        if not token_id:
            return JsonResponse({"error": "token_id is required"}, status=400)
        
        try:
            # Call the get_winner function
            result = get_winner(token_id)
            # Check if result is a Response object (in case of errors within get_winner)
            if isinstance(result, Response):
                return result
            return JsonResponse(result, status=200)
        except Exception as e:
            # Catch and handle unexpected errors
            error_message = f"An unexpected error occurred: {str(e)}"
            print(error_message)  # Log error to console for debugging
            return JsonResponse({"error": error_message}, status=500)


    
    def list(self, *args):
        queryset = NFT.objects.filter(id=id)
        serializer_class = serializers.NFTSerializer


    @action(detail=False, methods=['get'])
    def top_5_expensive(self, request):
        top_5_expensive = self.get_queryset().order_by('-last_price')[:5]
        serializer = self.get_serializer(top_5_expensive, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def get_nft_image_urls(self,request):
        user=self.request.user
        nfts = NFT.objects.filter(owner=user)
        data = {}
        for nft in nfts:
            data[str(nft.token_id)] = nft.image_url
        return JsonResponse(data)


    
    @action(detail=False, methods=["put"])
    def sell(self, request, pk=None):
        user = self.request.user
        nft_id = request.data.get('token_id')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        floor_price = request.data.get('floor_price')

        try:
            nft = NFT.objects.get(token_id=nft_id)
        except NFT.DoesNotExist:
            return Response({"error": "NFT not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check user's MATIC balance
        user_wallet = Wallet.objects.filter(user=user).first()
        if not user_wallet:
            return Response({"error": "User wallet not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            balance_response = get_balance(user)
            if balance_response.status_code != 200:
                return balance_response
            user_balance = Decimal(balance_response.data["matic_balance"])
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Check if the user has sold any NFTs before
        has_sold_before = NFT.objects.filter(owner=user, is_for_sale=False).exists()

        # Ensure the user has at least 0.03 MATIC or it's their first sale and they will receive 0.1 MATIC
        if user_balance < Decimal('0.03'):
            if not has_sold_before:
                # Transfer 0.1 MATIC from company wallet to user wallet
                try:
                    transfer_matic(user_wallet.address, 0.1)
                except Exception as e:
                    return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                # Notify user about the reward
                return Response({"message": "You have received 0.1 MATIC as a reward for selling your first NFT."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "You do not have enough balance to cover the gas fee to sell this NFT."}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed with marking the NFT as for sale
        nft.is_for_sale = True
        nft.start_date = start_date
        nft.end_date = end_date
        nft.last_price = floor_price
        nft.save()

        return Response({"message": "NFT is now for sale."}, status=status.HTTP_200_OK)
     



    @action(detail=False, methods=['put'])
    def toggle_visibility(self, request, pk=None):
        nft_id = request.data.get('token_id')
        nft=NFT.objects.filter(token_id=nft_id).first()
        if nft.owner != self.request.user:
            return Response({'error': 'You do not have permission to perform this action.'}, status=403)

        nft.is_visible = not nft.is_visible
        nft.save()
        serializer = self.get_serializer(nft)
        return Response(serializer.data)
      
    @action(detail=False, methods=['put'])
    def cancel_sell(self, request, pk=None):
        nft_id = request.data.get('token_id')
        nft=NFT.objects.filter(token_id=nft_id).first()
        if nft.owner != self.request.user:
            return Response({'error': 'You do not have permission to perform this action.'}, status=403)

        nft.is_for_sale = False
        nft.save()
        orders=Order.objects.filter(nft=nft, status=0)
        for order in orders:
            order.status=1
            order.save()
            user_balance=None
            user_balance = UserBalance.objects.get(user=order.bidder)
            NotifyUser.objects.create(user=order.bidder,text="sell was cancelled and your balance updated")
            user_balance.eth_balance += order.eth    
            user_balance.eth_untradable_balance-=order.eth
            user_balance.save()

        serializer = self.get_serializer(nft)
        return Response(serializer.data)

    
    @action(detail=False, methods=['put'])
    def view_NFT(self, request, pk=None):
        nft_id = request.data.get('token_id')
        nft=NFT.objects.filter(token_id=nft_id).first()
        nft.view_count =  nft.view_count +1
        nft.save()
        serializer = self.get_serializer(nft)
        return Response(serializer.data)   


    @action(detail=False, methods=['put'])
    def share_NFT(self, request, pk=None):
        nft_id = request.data.get('token_id')
        nft=NFT.objects.filter(token_id=nft_id).first()
        nft.share_count =  nft.share_count +1
        nft.save()
        serializer = self.get_serializer(nft)
        return Response(serializer.data)
   
    @action(detail=False, methods=['get'])
    def get_all(self, request):
        nfts = NFT.objects.filter(in_exhibition=False, is_visible=True)
        serializer = serializers.NFTSerializer(nfts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def transferToUserWallet(self, request):
        user = self.request.user
        wallet=Wallet.objects.get(user=user)
        sender_private_key= wallet.private_key
        sender_address= wallet.address
        
        token_id = request.data.get('token_id')
        recipient_address = request.data.get('address')
        nft=NFT.objects.get(token_id=token_id)
        if nft.owner != self.request.user:
            return Response({'error': 'You do not have permission to perform this action.'}, status=403)
        tx_hash = transfer_nft(sender_private_key, sender_address, recipient_address, token_id)
        nft.delete()
        response_data = {
        "message": f"Transaction initiated. Transaction hash: {tx_hash.hex()}"
    }
        
        return Response(response_data, status=status.HTTP_200_OK)
        
        
class NFTRatingViewSet(viewsets.ModelViewSet):
    queryset = NFTRating.objects.all()
    serializer_class = serializers.NFTRatingSerializer

    @action(detail=False, methods=['post'])
    def like(self, request):
        nft_id = request.data.get("token_id")
        nft=NFT.objects.filter(token_id=nft_id).first()
        user = self.request.user
        if NFTRating.objects.filter(nft=nft, user=user).exists():
            return Response({'status': 'you have already liked this NFT'}, status=status.HTTP_400_BAD_REQUEST)
        nft_rating=NFTRating.objects.create(nft=nft,user=user,like=True)
        nft_rating.save()
        return Response({'status': 'NFT liked'})

    @action(detail=False, methods=['get'])
    def most_liked(self, request):
        most_liked_nfts = NFT.objects.annotate(like_count=Count('nft__like', filter=Q(nft__like=True))).order_by('-like_count')[:5]
        
        # Serialize the NFTs and add the like count to each one
        serialized_nfts = []
        for nft in most_liked_nfts:
            serialized_nft = serializers.NFTSerializer(nft).data
            serialized_nft['like_count'] = nft.like_count
            serialized_nfts.append(serialized_nft)
        
        return Response(serialized_nfts, status=status.HTTP_200_OK)

    @action(detail=False , methods=['get'])
    def user_likes(self, request, pk=None):
        user = self.request.user
        liked_nfts = NFT.objects.filter(nft__user=user, nft__like=True)
        serializer = serializers.NFTSerializer(liked_nfts, many=True)
        return Response(serializer.data)

    @action(detail=False , methods=['post'])
    def user_has_liked(self, request, pk=None):
        user = self.request.user
        nft_id = request.data.get("token_id")
        liked_nfts=None
        liked_nfts = NFT.objects.filter(token_id=nft_id,nft__user=user, nft__like=True).first()
        if liked_nfts==None:
            result=False
            return Response({'user_has_liked':result})
        else :
            result=True
            return Response({'user_has_liked':result})



    @action(detail=False, methods=['get'])
    def top_owners_with_likes(self, request):
        owners_with_likes = User.objects.annotate(likes_count=Count('nft__nftrating__id')).order_by('-likes_count')
        serializer = OwnerWithLikesSerializer(owners_with_likes, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)    

from thirdweb.types import SDKOptions

PRIVATE_KEY = "045be0b52044ba0f842dea76a18ef921009a629e7c8ad114a51023c6acf50520"
secret_key="dd0cZsTqYO9v8PJdRO8uuikrKvi6SpZKYbNdIqvn-d2-Df1QXTb9PUXUOJfO4OcJg9EUP3zQbx3jLJR1raQY9w"
# # Optionally, instantiate a new signer to pass into the SDK
signer = Account.from_key(PRIVATE_KEY)
sdk = ThirdwebSDK.from_private_key(PRIVATE_KEY, "polygon", SDKOptions(secret_key))
print(f"sdk is :{sdk}")
# # Finally, you can create a new instance of the SDK to use
# sdk = ThirdwebSDK("mumbai",signer)
# sdk = ThirdwebSDK("mumbai", options=SDKOptions(secret_key="rEql_yRermO9c4z64ThyVUbo41NE4V2kJXyFuNNYRMX7vST7GHWC2G_tasal5a9MXH90AZ-ymHBN9vJFltO5mw"))
contract = sdk.get_nft_collection("0xB0Df35D093752d7fAf6bc3D4304CEFcCABe7a86a")


from hexbytes import HexBytes




# 1
class NFTViewSet(viewsets.ViewSet):
    # serializer_class = serializers.NFTSerializer
    # queryset = NFT.objects.all()
    
    def create(self, request, *args, **kwargs):
        """
        Creates a new NFT with the given metadata and mints it to the specified address.
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0NTI4MjQ4LCJpYXQiOjE2ODQ1Mjc5NDgsImp0aSI6IjRjNWUyYTMxNzY4ODRmYjhiYjI5MTM2OTFiNTc5NTI1IiwidXNlcl9pZCI6M30.4-BlFYxmwCWU2rwa6BKZRYl7OiW3qdc9E0E261Dvo3I
        Required request data:
        - author_address: The address to mint the NFT to
        - nft_name: The name of the NFT
        - description_nft: The description of the NFT
        - image_nft: The URL of the image for the NFT
        - creator: The name of the creator of the NFT
        - external_link: The external link for the NFT
        - last_price: The last price of the NFT

        Returns:
        - A Response containing the created NFT and a status code.
        """

        try:
            user=self.request.user
            has_internal_wallet = request.data.get('has_internal_wallet')
            author_address = request.data.get('author_address')
            nft_name = request.data.get('nft_name')
            description_nft = request.data.get('description_nft')
            image_nft = request.data.get('image_nft')
            creator = request.data.get('creator')
            external_link = request.data.get('external_link')
            last_price = request.data.get('last_price')
            category_id= request.data.get('category')
            has_physical= request.data.get('has_physical')
            data = request.data.get('data', {})
            collection_id=request.data.get('collection')


        except KeyError as e:
            return Response(
                {"error": f"Missing required field: {e}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        category=Category.objects.filter(id=category_id).first()
        collection=CollectionNFT.objects.filter(id=collection_id).first()
        user_balance=None
        user_balance = UserBalance.objects.filter(user=user).first()
        print(user_balance)
        n=user_balance.rial_available_balance
        print(n)
        if n < 10000 :
            return Response(
                {"error": f"your money is not enough"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            n=n-10000
            user_balance.rial_available_balance=n
            user_balance.save()
        # Create the NFT metadata
        # 'collection':collection.name
            prop={
                'owner':user.username,
                'creator': creator ,
            }
            nft_metadata = {
            'name': nft_name,
            'description': description_nft,
            'image': image_nft,
            'properties': prop,
            'data': data,
            'price':last_price,


        }
            if has_internal_wallet == True :
                if Wallet.objects.filter(user=user).exists():
                    userWallet=Wallet.objects.filter(user=user).first()
                    author_address= userWallet.address
                else :
                    private_key = Web3.toHex(os.urandom(32))  # Generate a random private key
                    account = w3.eth.account.privateKeyToAccount(private_key)
                    wallet = Wallet.objects.create(user=user, address=account.address, private_key=private_key)
                    author_address=account.address


            print(nft_metadata)
            tx=None
        # Mint the NFT to the specified address
            try:
                print("start")
                tx = contract.mint_to(author_address, NFTMetadataInput.from_json(nft_metadata))
                print(f"tx is :{tx}")
                print("done")
                with open('output.txt', 'w') as file:
                    file.write(f"Transaction ID: {tx.id}\n")
                #has_internal_wallet= has_internal_wallet
                #checking if he has any inside wallet so we can use other wise it should be implemented 
                token_id = tx.id
                block_number = tx.receipt.blockNumber
                binary_transaction_hash = tx.receipt.transactionHash
                transaction_index = tx.receipt.transactionIndex
                transaction_hash = HexBytes(binary_transaction_hash).hex()
                binary_block_hash = tx.receipt.blockHash
                block_hash=HexBytes(binary_block_hash).hex()
                print(token_id)
            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            nft=NFT.objects.create(author_address=author_address,name=nft_name,blockNumber=block_number,
                transactionHash=transaction_hash, blockHash=block_hash,transactionIndex=transaction_index,
                description=description_nft,image_url=image_nft,creator=creator,external_link=external_link,
                last_price=last_price,token_id=token_id,owner=user,has_physical=has_physical,category=category,traits=data,collection=collection)
            transactionCurrency=TransactionCurrency.objects.filter(name="rial").first()
            Transaction.objects.create(user=user, side='withdrawal', 
                                    transaction_currency=transactionCurrency, amount=10000,status='completed')

            return Response(
              nft.token_id,
                status=status.HTTP_201_CREATED,
            )            
      








class MyImageViewSet(viewsets.ModelViewSet):
    queryset = MyImage.objects.all()
    serializer_class = serializers.MyImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        image_url = ''
        if 'image' in request.data:
            image_url = request.build_absolute_uri(serializer.data['image'])
        return Response({'id': serializer.data['id'], 'image': image_url}, status=status.HTTP_201_CREATED, headers=headers)



class PDFViewSet(viewsets.ModelViewSet):
    queryset = PDF.objects.all()
    serializer_class = PDFSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            pdf = serializer.save()
            return Response({'url': pdf.url}, status=HTTPStatus.CREATED)
        else:
            return Response(serializer.errors, status=HTTPStatus.BAD_REQUEST)


class UserCollectionViewSet(viewsets.ViewSet):
    serializer_class = serializers.NFTSerializer
    queryset = NFT.objects.all()

    def get_queryset(self):

        user = self.request.user
        return NFT.objects.filter(owner=user)

    def list(self, request, *args, **kwargs):
        collection_id = request.query_params.get('collection_id')
        if collection_id:
            queryset = self.queryset.filter(collection_id=collection_id)
        else:
            queryset = self.queryset
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_collection_nft(self, request):
        collection_id = request.data.get('collection_id')
        if collection_id:
            collection=CollectionNFT.objects.get(id=collection_id)
            queryset = NFT.objects.filter(collection=collection)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else :
            return Response(
                {"error": "your money is not enough"},
                status=status.HTTP_400_BAD_REQUEST,
            )
class UserNFTViewSet(viewsets.ViewSet):
    serializer_class = serializers.NFTSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def list(self, request, username=None):
        queryset = NFT.objects.filter(owner__username=username,in_exhibition=False)
        serializer = serializers.NFTSerializer(queryset, many=True)
        return Response(serializer.data)


class NftDetailViewSet(viewsets.ViewSet):
    serializer_class = serializers.NFTSerializer

    def create(self, request, *args, **kwargs):
        token_id = request.data.get('token_id')
        nft = NFT.objects.get(token_id=token_id)
        serializer = self.get_serializer(nft)
        ratings = NFTRating.objects.filter(nft=nft, like=True)
        count = ratings.count()
        
        # Check if the request is from an authenticated user
        if request.user.is_authenticated:
            user_liked = NFTRating.objects.filter(user=request.user, nft=nft, like=True).exists()
            data = {"nft": serializer.data, "count": count, "user_liked": user_liked}
        else:
            data = {"nft": serializer.data, "count": count}
        
        return Response(data, status=status.HTTP_200_OK)

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.serializer_class(*args, **kwargs)
        return serializer_class




class UsersWithNFTsViewSet(viewsets.ViewSet):

    def list(self, request):
        users_with_nfts = User.objects.filter(nft__isnull=False).distinct()
        user_data = []
        for user in users_with_nfts:
            nft_count = NFT.objects.filter(owner=user).count()
            profile = Profile.objects.get(user=user)
            user_data.append({
                'id': user.id,
                'username': user.username,
                'profile_picture': profile.profile_picture if profile.profile_picture else None,
                'nft_count': nft_count,
                'bio': profile.bio,
                'user_verified':profile.user_verified,

            })
        return Response(user_data)


def order_Report(token_id):
    
    nft = NFT.objects.get(token_id=token_id)
    orders = Order.objects.filter(nft=nft)
    for bid in orders:
        if (bid.report==0):
            n_bid = bid
            n_bid.status=1
            n_bid.report=2
            n_bid.save()
            NotifyUser.objects.create(user=n_bid.bidder,text=Msg(1).text)    
    print("change report status done")

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CollectionViewSet(viewsets.ModelViewSet):
    queryset = CollectionNFT.objects.all()
    serializer_class = CollectionNFTSerializer

    def get_queryset(self):
        user = self.request.user
        return CollectionNFT.objects.filter(user=user)
    
    
    def create(self, request, *args, **kwargs):
        user = self.request.user
        name = request.data.get('name')
        address = request.data.get ('address')
        CollectionNFT.objects.create(user=user,name=name,address=address)
        user_balance=None
        user_balance = UserBalance.objects.filter(user=user).first()
        n=user_balance.rial_available_balance
        if n < 10000 :
            return Response(
                {"error": "your money is not enough"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            n=n-10000
            user_balance.rial_available_balance=n
            user_balance.save()        
        transactionCurrency=TransactionCurrency.objects.filter(name="rial").first()
        Transaction.objects.create(user=user, side='withdrawal', 
                            transaction_currency=transactionCurrency, amount=10000,status='completed')


        return Response(status=status.HTTP_201_CREATED)  
   



def get_nakamigos_listings():
    url = "https://api.opensea.io/v2/listings/collection/nakamigos/all"

    headers = {
        "accept": "application/json",
        "X-API-KEY": "c0356ec8d3a24ac587ec9b0eb5e371a5"
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    return response.json()




class NakamigosListingsViewSet(viewsets.ViewSet):
    def list(self, request):
        url = "https://api.opensea.io/v2/listings/collection/nakamigos/all"

        headers = {
            "accept": "application/json",
            "X-API-KEY": "c0356ec8d3a24ac587ec9b0eb5e371a5"
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        data = response.json()

        return Response(data)


