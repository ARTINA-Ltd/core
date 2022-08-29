# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import action
from Account import serializers
from exhibition.serializers import ExhibitionSerializer
from exhibition.serializers import NFtExSerializer


class ArtistViewSet(viewsets.ModelViewSet):
    # TODO:: filter the artists only when roles added.
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_serializer_class(self):
        if self.action =='request_exhibition':
            return NFtExSerializer
        else:
            return super().get_serializer_class()

    def get_exhibition_from_artist(self,artist, is_accepted):
        nfts = artist.nft_set.all()
        exhibitions = []
        for nft in nfts:
            if nft.exhibition.first() != None:
                exhibitions.append(nft.exhibition.first())
        exhibitions = list(set(exhibitions))
        exhibitions = list(filter(lambda x: x.is_nft_accepted_by_exhibitor == is_accepted, exhibitions))
        return exhibitions


    @action(detail=True, methods=['get'], name='Get Applications')
    def get_applications(self, request, pk=None):
        try:
            artist = User.objects.get(id=pk)
            exhibitions = self.get_exhibition_from_artist(artist, False)
            
            return Response(NFtExSerializer(exhibitions, many=True).data, status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error':'User does not exist.'}, status.HTTP_400_BAD_REQUEST)

    
    @action(detail=True, methods=['get'], name='Get Exhibitions')
    def get_exhibitions(self, request, pk=None):
        try:
            artist = User.objects.get(id=pk)
            exhibitions = self.get_exhibition_from_artist(artist, True)
            exhibitions = list(map(lambda x:x.ex, exhibitions))
            exhibitions = list(set(exhibitions))
            data = []
            for exhibition in exhibitions:
                profit = 0
                user_nfts = list(filter(lambda x: x.nft.owner == artist, exhibition.nfts.all()))
                for nft_ex in user_nfts:
                    if nft_ex.nft.has_expired():
                        profit += nft_ex.nft.get_winner_offer().fee * nft_ex.commission
                else:
                    price = 'wait till exhibition ends.'
                exhibition_serialized = ExhibitionSerializer(exhibition).data
                exhibition_serialized['profit'] = profit
                data.append(exhibition_serialized)
            return Response(data, status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error':'User does not exist.'}, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'],name='Requst to exhibition')
    def request_exhibition(self, request, pk=None):
        artist = User.objects.get(id=pk)
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
            application = serializer.save()
            return Response(self.get_serializer_class()(application).data, status.HTTP_200_OK)

        else:
            return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)

    
    