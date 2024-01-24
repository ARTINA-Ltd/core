from core import models
from Account import models
from core.models import NFT , Order , MyImage , NFTRating , Category , Collection
from Account.views import transferNFT
from core import serializers
from eth_account import Account
from thirdweb.types.nft import NFTMetadataInput 
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
from Account.models import Wallet , UserBalance, UserTurnover,TransactionType,TransactionCurrency,Profile
from http import HTTPStatus
from django.db.models import Count, Q
from .serializers import NFTRatingSerializer, OwnerWithLikesSerializer
from .tasks import check_nft_end_time
from django_filters import rest_framework as filters



class OrderViewSet(viewsets.ViewSet):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer
    
    def create(self, request, *args, **kwargs):
        fee = request.data.get('fee')
        token_id = request.data.get('token_id')
        status = 0
        bidder=self.request.user
        user_balance=None
        user_balance = UserBalance.objects.filter(user=bidder).first()
        n=user_balance.rial_available_balance
        fee=int(fee)
        nft = NFT.objects.get(token_id=token_id)
        if (nft.owner==bidder):
            return Response({'error': 'iyou are the owner, you can not bid'},status=HTTPStatus.BAD_REQUEST)
           
        if n< fee :
            return Response({'error': 'insufficient ballance'},status=HTTPStatus.BAD_REQUEST)
        
        if Order.objects.filter(nft=nft,bidder=bidder).first() :
            return Response({'error': 'you had already order on this NFT'},status=HTTPStatus.BAD_REQUEST)


        else:

            Order.objects.create(nft=nft,bidder=bidder,fee=fee,status=status)
            return Response(status=HTTPStatus.OK)
    
    @action(detail=False, methods=['post'])
    def disable_order(self,request):
        bidder=self.request.user
        token_id = request.data.get('token_id')
        status = 1
        nft = NFT.objects.get(token_id=token_id)
        order=Order.objects.filter(nft=nft,bidder=bidder).first()
        order.status=status
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
    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter)
    filterset_class = NFTFilter
    serializer_class = serializers.NFTSerializer


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
        nft_id = request.data.get('token_id')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        floor_price = request.data.get('floor_price')
        try:
            nft = NFT.objects.get(token_id=nft_id)
        except Http404:
            return Response({"error": "NFT not found."}, status=status.HTTP_404_NOT_FOUND)

        nft.is_for_sale = True
        nft.start_date = start_date
        nft.end_date = end_date
        nft.last_price = floor_price
        nft.save()
        print("ok by database")
        print(check_nft_end_time.apply_async(args=[nft.id], eta=end_date))
        print(">>>>>>>>>>>check and sync task")
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
w3 = Web3(Web3.HTTPProvider("https://polygon.rpc.thirdweb.com"))

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
        collection=Collection.objects.filter(id=collection_id).first()
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
            prop={
                'owner':user.username,
                'creator': creator 
            }
            nft_metadata = {
            'name': nft_name,
            'description': description_nft,
            'image': image_nft,
            'properties': prop,
            'data': data,


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
                last_price=last_price,token_id=token_id,owner=user,has_physical=has_physical,category=category,data=data,collection=collection)
            transactiontype=TransactionType.objects.filter(name="withraw").first()
            transactionCurrency=TransactionCurrency.objects.filter(name="rial").first()
            UserTurnover.objects.create(user=user, transaction_type=transactiontype, 
                                    transaction_currency=transactionCurrency, transaction_value=10000)

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


from django.conf import settings
from .models import PDF
from .serializers import PDFSerializer

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

    def get_queryset(self):

        user = self.request.user
        return NFT.objects.filter(owner=user)
        


class UserNFTViewSet(viewsets.ViewSet):
    serializer_class = serializers.NFTSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def list(self, request, username=None):
        queryset = NFT.objects.filter(owner__username=username)
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

#not in use
class sellViewSet(viewsets.ViewSet):
    queryset = NFT.objects.all()
    serializer_class = serializers.NFTSerializer

    # @action(detail=True, methods=["put"])
    def update(self, request, pk=None):
        nft_id = request.data.get('token_id')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        floor_price = request.data.get('floor_price')
        try:
            nft = NFT.objects.get(token_id=nft_id)
        except Http404:
            return Response({"error": "NFT not found."}, status=status.HTTP_404_NOT_FOUND)

        nft.is_for_sale = True
        nft.start_date = start_date
        nft.end_date = end_date
        nft.last_price = floor_price
        nft.save()
        print("applied changes")
        return Response({"message": "NFT is now for sale."}, status=status.HTTP_200_OK)



# class WinnerviewSet(viewsets.ViewSet):
#     queryset = NFT.objects.all()
#     # serializer_class = serializers.NFTSerializer

    # @action(detail=True, methods=["get"])


def order_Report(token_id):
    
    nft = NFT.objects.get(token_id=token_id)
    orders = Order.objects.filter(nft=nft)
    for bid in orders:
        if (bid.report==0):
            n_bid = bid
            n_bid.status=1
            n_bid.report=2
            n_bid.save()    
    print("change report status done")


def get_winnger(token_id):
    nft = NFT.objects.get(token_id=token_id)
    sender=nft.owner
    if nft.end_date < timezone.now():
        return Response({"error": "NFT has not expired."}, status=status.HTTP_400_BAD_REQUEST)
        
    highest_bid = None
    orders = Order.objects.filter(nft=nft)
    for bid in orders:
        if (highest_bid is None or bid.fee > highest_bid.fee):
            highest_bid = bid

    if highest_bid is None:
        return Response({"error": "No bids found for this NFT."}, status=status.HTTP_400_BAD_REQUEST)
    highest_bid.report=1
    highest_bid.status=1
    highest_bid.save()
    recipient=highest_bid.user
    print(f"recipient>>>>>{recipient}")

    order_Report(token_id)
    nft_id=token_id
    result=transferNFT(nft_id,sender,recipient)
    print(f"result>>>>>{result}")
    return Response({"winner": highest_bid.user, "price": highest_bid.fee,'result':recipient}, status=status.HTTP_200_OK)
    



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


# contractmain = sdk.get_marketplace("0x80Acf8E21519B0808CC9a59218c415a237ef7C65")
# from datetime import datetime, timedelta

# class listingViewSet(viewsets.ViewSet):

#     def create(self,request):
#         user=self.request.user
#         token_id=request.data.get('token_id')
#         pricePerToken = request.data.get('pricePerToken')
#         author_address = request.data.get('author_address')
#         NATIVE_TOKEN_ADDRESS = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"  # MATIC token on Mumbai Testnet

#         listing = {
#           "assetContractAddress": "0x2A18FECb3579238CdA960B5977f46E500Fb6e735",
#           "tokenId": token_id,
#           "quantity": 1,
#           "currencyContractAddress": NATIVE_TOKEN_ADDRESS,
#           "pricePerToken": pricePerToken,
#           "startTimestamp": datetime.now().date(),
#           "endTimestamp": datetime.now() + timedelta(minutes=5),
#           "isReservedListing": False
#         }
#         tx =contractmain.create_listing(listing)
#         receipt = tx.receipt # the transaction receipt
#         id = tx.id # the id of the newly created listing
#         return Response(
#             {"message": "Listing created successfully",
#             "listing_id":nft.token_id},
#             status=status.HTTP_201_CREATED,
#             ) 




#     # def authWallet():.createListing
#     #     payload = sdk.auth.login('artina.org')


# from django.http import JsonResponse
# # from ThirdwebSDK import LocalWallet
# # from thirdweb import ThirdwebSDK

# class WalletViewSet(viewsets.ViewSet):


#     def authenticate_wallet(request):
#         domain = 'artina.org'

#         # Generate a login payload for the connected wallet
#         sdk = ThirdWebSDK()
#         payload = sdk.auth.login(domain)

#         # Generate an authentication token for the logged in wallet
#         token = sdk.auth.generate_auth_token(domain, payload)

#         # Authenticate the token and get the address of the authenticating wallet
#         address = sdk.auth.authenticate(domain, token)

#         # Return the authenticated address as a JSON response
#         return JsonResponse({'address': address})

# # # comment wallet part
# # #part im working on
# # from thirdweb import ThirdwebSDK 
# # # from sdk_options import SDKOptions
# # sdk1 = ThirdwebSDK("mumbai", options=SDKOptions(secret_key="03c191bc52cf51d0e011063336339e37"))
# # contractthree = sdk.get_contract("0x3c580A3227adc9EfF961910AA4F667234999Dc3F")
# # class LocalWalletViewSet(viewsets.ViewSet):
   
# #     @action(detail=False, methods=['get'])
# #     def createWallet(self,request):
        
# #         data = contractthree.call("createAccount", _admin, _data)
# #         # wallet = LocalWallet()
# #         # generate a random wallet
# #         # user_wallet= wallet.generate()
# #         print(data)


# # part i worked on and need changes

# #         # connect the wallet to the application
# #         await wallet.connect()

# # # at any point, you can save the wallet to persistent storage
# # await wallet.save(config)
# # # and load it back up
# # await wallet.load(config)

# # # you can also export the wallet out of the application
# # exported_wallet = await wallet.export(config)
# # # and import it back in
# # await wallet.import_(exported_wallet, config)

# # # You can then use this wallet to perform transactions via the SDK
# # sdk = await ThirdwebSDK.from_wallet(wallet, "goerli")
