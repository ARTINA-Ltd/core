from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from core import models
from core import serializers


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


class NFTViewSet(viewsets.ModelViewSet):
    queryset = models.NFT.objects.all()
    serializer_class = serializers.NFTSerializer