from core import models
from .models import NFT , Order , MyImage
from core import serializers
from eth_account import Account
from thirdweb.types.nft import NFTMetadataInput 
import json
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
from .models import NFT
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os
class OrderViewSet(viewsets.ViewSet):
    # queryset = Order.objects.all()
    # serializer_class = serializers.OrderSerializer
    
    def create(self, request, *args, **kwargs):
        fee = request.data.get('fee')
        token_id = request.data.get('token_id')
        status = request.data.get('status')
        bidder=self.request.user
        nft = models.NFT.objects.get(token_id=token_id)
        if nft.has_expired():
            return Response(400)
        else:
            if nft.has_started():
                Order.objects.create(nft=nft,bidder=bidder,fee=fee,status=status)
                return Response(201)
            else:
                return Response(400)


class NFTRateViewSet(viewsets.ModelViewSet):
    queryset = models.NFTReviewRating.objects.all()
    serializer_class = serializers.NFTRateSerializer

    def create(self, request, *args, **kwargs):
        serializer = serializers.NFTRateSerializer
        serializer = serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors)
        data = serializer.validated_data
        print("test " + str(data))
        rate_obj = models.NFTReviewRating.objects.filter(user = data["user"] , nft = data["nft"]).first()
        if rate_obj is None:
            return super().create(request, *args, **kwargs)
        else:
            rate_obj.review = data["review"]
            rate_obj.rating = data["rating"]
            rate_obj.save()
            return Response(serializers.NFTRateSerializer(rate_obj).data) 

class NftViewSet(viewsets.ModelViewSet):
    queryset = NFT.objects.all()
    serializer_class = serializers.NFTSerializer


    def list(self, *args):
        queryset = models.NFT.objects.filter(id=id)
        serializer_class = serializers.NFTSerializer


    @action(detail=False, methods=['get'])
    def top_5_expensive(self, request):
        top_5_expensive = self.get_queryset().order_by('-last_price')[:5]
        serializer = self.get_serializer(top_5_expensive, many=True)
        return Response(serializer.data)


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

        return Response({"message": "NFT is now for sale."}, status=status.HTTP_200_OK)






PRIVATE_KEY = "045be0b52044ba0f842dea76a18ef921009a629e7c8ad114a51023c6acf50520"

# # Optionally, instantiate a new signer to pass into the SDK
signer = Account.from_key(PRIVATE_KEY)

# # Finally, you can create a new instance of the SDK to use
sdk = ThirdwebSDK("mumbai",signer)

contract = sdk.get_nft_collection("0x2A18FECb3579238CdA960B5977f46E500Fb6e735")









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
            author_address = request.data.get('author_address')
            nft_name = request.data.get('nft_name')
            description_nft = request.data.get('description_nft')
            image_nft = request.data.get('image_nft')
            creator = request.data.get('creator')
            external_link = request.data.get('external_link')
            last_price = request.data.get('last_price')

        except KeyError as e:
            return Response(
                {"error": f"Missing required field: {e}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create the NFT metadata
        prop={}
        nft_metadata = {
            'name': nft_name,
            'description': description_nft,
            'image': image_nft,
            'properties': prop

        }
        print(nft_metadata)
        tx=None
        # Mint the NFT to the specified address
        try:
            tx = contract.mint_to(author_address, NFTMetadataInput.from_json(nft_metadata))
            print("done")
            token_id = tx.id
            print(token_id)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        nft=NFT.objects.create(author_address=author_address,name=nft_name,
                description=description_nft,image_url=image_nft,creator=creator,external_link=external_link,
                last_price=last_price,token_id=token_id,owner=user)
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


from rest_framework.response import Response



class UserCollectionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.NFTSerializer

    def get_queryset(self):
        user = self.request.user
        return NFT.objects.filter(owner=user)

class NftDetailViewSet(viewsets.ViewSet):
    serializer_class = serializers.NFTSerializer

    def create(self, request, *args, **kwargs):
        token_id = request.data.get('token_id')
        nft = NFT.objects.get(token_id=token_id)
        serializer = self.get_serializer(nft)
        return Response(serializer.data)

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.serializer_class(*args, **kwargs)
        return serializer_class


 



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

        return Response({"message": "NFT is now for sale."}, status=status.HTTP_200_OK)




class WinnerviewSet(viewsets.ViewSet):
    queryset = NFT.objects.all()
    # serializer_class = serializers.NFTSerializer

    # @action(detail=True, methods=["get"])
    def create(self, request):
        nft_id = request.data.get('token_id')
        nft = NFT.objects.get(token_id=nft_id)
        if nft.end_date < timezone.now():
            return Response({"error": "NFT has expired."}, status=status.HTTP_400_BAD_REQUEST)
        
        highest_bid = None
        orders = Order.objects.filter(nft=nft)
        for bid in orders:
            if (highest_bid is None or bid.current_price > highest_bid.current_price):
                highest_bid = bid

        if highest_bid is None:
            return Response({"error": "No bids found for this NFT."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"winner": highest_bid.user, "price": highest_bid.fee}, status=status.HTTP_200_OK)
    
import requests

def get_nakamigos_listings():
    url = "https://api.opensea.io/v2/listings/collection/nakamigos/all"

    headers = {
        "accept": "application/json",
        "X-API-KEY": "c0356ec8d3a24ac587ec9b0eb5e371a5"
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    return response.json()




import requests
from rest_framework import viewsets
from rest_framework.response import Response

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