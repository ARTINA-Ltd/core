from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from core import models
from core import serializers
from eth_account import Account
from thirdweb.types.nft import NFTMetadataInput 
from io import BytesIO
import json
from web3 import Web3
from thirdweb import ThirdwebSDK

class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data
        nft = models.NFT.objects.get(pk=data['nft'])
        if nft.has_expired():
            return Response({'error': 'The auction for this NFT has expired.'}, status.HTTP_400_BAD_REQUEST)
        else:
            if nft.has_started():
                return super().create(request)
            else:
                return Response({'error': 'Auction has not started yet.'}, status.HTTP_400_BAD_REQUEST)


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

class NFTViewSet(viewsets.ModelViewSet):
    def list(self, *args):
       queryset = models.NFT.objects.filter(id=id)
    
    serializer_class = serializers.NFTSerializer






PRIVATE_KEY = "045be0b52044ba0f842dea76a18ef921009a629e7c8ad114a51023c6acf50520"

# # Optionally, instantiate a new signer to pass into the SDK
signer = Account.from_key(PRIVATE_KEY)

# # Finally, you can create a new instance of the SDK to use
sdk = ThirdwebSDK("mumbai",signer)

contract = sdk.get_nft_collection("0x2A18FECb3579238CdA960B5977f46E500Fb6e735")







from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from .models import NFT
from io import BytesIO



from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.parsers import BaseParser
from rest_framework.exceptions import ParseError
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from .models import NFT
from io import BytesIO
import base64















# 4
# class Base64ImageParser(BaseParser):
#     """
#     Parser for base64-encoded image data in request data
#     """
#     media_type = 'image/*'

#     def parse(self, stream, media_type=None, parser_context=None):
#         try:
#             # Get base64-encoded image data from request data
#             base64_image_data = parser_context['request'].data.get('base64_image', None)
#             if base64_image_data is None:
#                 raise ParseError("Missing 'base64_image' field.")

#             # Decode base64 data to bytes
#             image_data = base64.b64decode(base64_image_data)

#             # Return bytes data as file-like object
#             return BytesIO(image_data)

#         except Exception as e:
#             raise ParseError(f"Error parsing base64 image data: {e}")


# 3
# class NFTViewSet(viewsets.ModelViewSet):
#     serializer_class = serializers.NFTSerializer
#     queryset = NFT.objects.all()
#     # parser_classes = [Base64ImageParser]

#     def create(self, request, *args, **kwargs):
#         """
#         Creates a new NFT with the given metadata and mints it to the specified address
#         Returns:
#         - A Response containing the created NFT and a status code.
#         """

#         try:
#             author_address = request.data["author_address"]
#             nft_name = request.data["name"]
#             description_nft = request.data["description"]
#             image_nft = request.data["base64_image"]
#             creator = request.data["creator"]
#             external_link = request.data["external_link"]
#             last_price = request.data["last_price"]
#         except KeyError as e:
#             return Response(
#                 {"error": f"Missing required field: {e}"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         # Decode base64-encoded image data to bytes
#         image_data = base64.b64decode(image_nft)

#         # Create the NFT metadata
#         nft_metadata = {
#             'name': nft_name,
#             'description': description_nft,
#             'image': image_data,
#             'properties': creator,
#             'external_link': external_link,
#             'last_price': last_price
#         }

#         # Mint the NFT to the specified address
#         try:
#             tx = contract.mint_to(author_address, NFTMetadataInput.from_json(nft_metadata))
#             print("done")
#             token_id = tx.id
#             print(token_id)
#         except Exception as e:
#             return Response(
#                 {"error": str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

#         # Store the NFT metadata in the database
#         nft_metadata['token_id'] = token_id
#         serializer = serializers.NFTSerializer(data=nft_metadata)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 serializer.data,
#                 status=status.HTTP_201_CREATED,
#             )
#         else:
#             return Response(
#                 serializer.errors,
#                 status=status.HTTP_400_BAD_REQUEST,
#             )



# 1
class NFTViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.NFTSerializer
    queryset = NFT.objects.all()

    def create(self, request, *args, **kwargs):
        """
        Creates a new NFT with the given metadata and mints it to the specified address.

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
            author_address = request.data["author_address"]
            nft_name = request.data["name"]
            description_nft = request.data["description"]
            image_nft = request.data["base64_image"]
            # image_nft = request.FILES['base64_image'].file

            creator = request.data["creator"]
            external_link = request.data["external_link"]
            last_price = request.data["last_price"]
        except KeyError as e:
            return Response(
                {"error": f"Missing required field: {e}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create the NFT metadata
        nft_metadata = {
            'name': nft_name,
            'description': description_nft,
            'image': image_nft,
            'properties': creator,
            'external_link': external_link,
            'last_price': last_price
        }

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

        # Store the NFT metadata in the database
        nft_metadata['token_id'] = token_id
        serializer = serializers.NFTSerializer(data=nft_metadata)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )



# 2
# class NFTViewSet(viewsets.ModelViewSet):
#     serializer_class = serializers.NFTSerializer
#     queryset = NFT.objects.all()
#     parser_classes = (MultiPartParser, FormParser)

#     def create(self, request, *args, **kwargs):
#         """
#         Creates a new NFT with the given metadata and mints it to the specified address
#         Returns:
#         - A Response containing the created NFT and a status code.
#         """

#         try:
#             author_address = request.data["author_address"]
#             nft_name = request.data["name"]
#             description_nft = request.data["description"]
#             image_file = request.FILES['image']

#             creator = request.data["creator"]
#             external_link = request.data["external_link"]
#             last_price = request.data["last_price"]
#         except KeyError as e:
#             return Response(
#                 {"error": f"Missing required field: {e}"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         # Read the image data from the uploaded file
#         image_data = image_file.read()

#         # Create a SimpleUploadedFile object to use with the NFTMetadataInput class
#         image_file = SimpleUploadedFile(image_file.name, image_data, content_type=image_file.content_type)

#         # Create the NFT metadata with the image file
#         nft_metadata = {
#             'name': nft_name,
#             'description': description_nft,
#             'image': image_file,
#             'properties': creator,
#             'external_link': external_link,
#             'last_price': last_price
#         }

#         # Mint the NFT to the specified address
#         try:
#             tx = contract.mint_to(author_address, NFTMetadataInput.from_json(nft_metadata))
#             print("done")
#             token_id = tx.id
#             print(token_id)
#         except Exception as e:
#             return Response(
#                 {"error": str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

#         # Store the NFT metadata in the database
#         nft_metadata['token_id'] = token_id
#         serializer = serializers.NFTSerializer(data=nft_metadata)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 serializer.data,
#                 status=status.HTTP_201_CREATED,
#             )
#         else:
#             return Response(
#                 serializer.errors,
#                 status=status.HTTP_400_BAD_REQUEST,
#             )





