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


# class MintNFTViewSet(viewsets.ModelViewSet):
#     # @action(methods=["POST"], detail=False)
#     def create(self, request, *args, **kwargs):
#         """
#         Creates a new NFT with the given metadata and mints it to the specified address.

#         Required request data:
#         - author_address: The address to mint the NFT to
#         - nft_name: The name of the NFT
#         - metadata: The metadata for the NFT

#         Returns:
#         - A Response containing the transaction hash and a status code.
#         """


#         try:
#             author_address = request.data["author_address"]
#             nft_name = request.data["nft_name"]
#             description_nft = request.data["description_nft"]
#             image_nft = request.data["image_nft"]
#             creator = request.data["creator"]
#             external_link = request.data["external_link"]
#             last_price = request.data["last_price"]

#         except KeyError as e:
#             raise BadRequest(f"Missing required field: {e}") from e

#         try:
#             nft_metadata = {
#             'name': nft_name,
#             'description': description_nft,
#             'image': image_nft,
#             'properties':creator
#         }
#             tx = contract.mint_to(author_address,NFTMetadataInput.from_json(nft_metadata))
#             serialized_data = nftserializer.serialize(nft_metadata)
#             serializer_class = serializers.NFTSerializer

#             receipt = tx.receipt
#             token_id = tx.id
#         except Exception as e:
#             return Response(
#                 {"error": str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

#         return Response(
#             {"tx_hash": tx.hex()},
#             status=status.HTTP_200_OK,
#         )




from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from .models import NFT

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
            # image_nft = request.data["base64_image"]
            image_nft = request.FILES['base64_image'].file

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





