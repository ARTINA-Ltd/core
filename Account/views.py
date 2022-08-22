# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
class ArtistExhibitionView(viewsets.ViewSet):

    def list(self, request, *args, **kwargs):
        id = kwargs['id']
        try:
            artist = User.objects.get(id=id)
            return Response(f'hi {artist.username} {artist.nft_set.all()[0].exhibitions.all()}',status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error':'User Does not exists.'},status.HTTP_400_BAD_REQUEST)