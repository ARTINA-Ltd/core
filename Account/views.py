# from matplotlib.pyplot import get
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import action
from Account import serializers
from exhibition.serializers import ExhibitionSerializer
from exhibition.serializers import NFtExSerializer
from .models import ArtistReviewRating, Profile
from rest_framework.permissions import IsAuthenticated
from core.serializers import NFTSerializer
from core.models import *


class ArtistViewSet(viewsets.ModelViewSet):
    # TODO: filter the artists only when roles added.
    

    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_serializer_class(self):
        if self.action =='request_exhibition':
            return NFtExSerializer
        else:
            return super().get_serializer_class()

    @action(detail=False, methods=['get'], name='Get Applications', permission_classes=[IsAuthenticated])
    def get_applications(self, request):
        artist = request.user
        if not artist.is_artist():
            return Response({'error':'you are not an artist.'}, status.HTTP_403_FORBIDDEN)
        serializer = NFtExSerializer(artist.get_artist_applications(), many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    
    @action(detail=False, methods=['get'], name='Get Exhibitions', permission_classes=[IsAuthenticated])
    def get_exhibitions(self, request):
        artist = request.user
        if not artist.is_artist():
            return Response({'error':'you are not an artist.'}, status.HTTP_403_FORBIDDEN)
        return Response(artist.get_artist_exhibitions(),status.HTTP_200_OK)


    @action(detail=False, methods=['post'],name='Requst to exhibition')
    def request_exhibition(self, request):
        artist = request.user
        if not artist.is_artist():
            return Response({'error':'you are not an artist.'}, status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer_class()
        serializer = serializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            nfts = data['nfts']
            exhibition = data['ex']
            for nft in nfts:
                if nft.owner != artist:
                    return Response({'error':'you can not submit nfts that do not belong to you','nft':str(nft)},status.HTTP_403_FORBIDDEN)
                elif nft.is_in_exhibition():
                    return Response({'error': 'None of the nfts should be exhibited in another exhibition right now.', 'nft':str(nft)},status.HTTP_400_BAD_REQUEST)
            if not exhibition.can_apply():
                return Response({'error':'you can not apply for a expired exhibition, or 2 days before exhibition starts'}, status.HTTP_400_BAD_REQUEST)
            # Check for artists limitation
            if len(exhibition.get_artists()) >= 15:
                return Response({'error':'This exhibition has arrived to its 15 artist limitation'})
            if exhibition.has_artist_pending_request(artist):
                return Response({'error':'you already have submited an application for this exhibition which is pending yet.'}, status.HTTP_400_BAD_REQUEST)
            application = serializer.save()
            return Response(self.get_serializer_class()(application).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['get'], name='Get Nfts')
    def get_nfts(self, request, pk=None):
        try:
            artist = User.objects.get(id=pk)
            nfts = NFT.objects.filter(owner = artist).all()
        except  User.DoesNotExist:
            return Response({'error':'Artist does not exist'}, status.HTTP_404_NOT_FOUND)  
        return Response(NFTSerializer(nfts, many = True).data)

class ArtistRateViewSet(viewsets.ModelViewSet):
    queryset = ArtistReviewRating.objects.all()
    serializer_class = serializers.ArtistRatingSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.profileSerializer
    
    