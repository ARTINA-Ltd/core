# Create your views here.
from ast import Pass
from cgi import print_form
from operator import ne
import pstats
from rest_framework import viewsets
from exhibition import models
from exhibition import serializers
import datetime
from django.contrib.auth.models import User


class ExhibitionViewSet(viewsets.ModelViewSet):
    queryset = models.Exhibition.objects.all()
    serializer_class = serializers.ExhibitionSerializer


class NFtExView(viewsets.ModelViewSet):
    queryset = models.NFtEx.objects.all()
    serializer_class = serializers.NFtExSerializer


# a,b,c,d  inputs
def create_exhibition():
    new = models.Exhibition.objects.create(user = User.objects.get(id=3),marketName='Ape',image = '' ,start_date = datetime.datetime(2022,10,10) , end_date = datetime.datetime(2022,5,5))
    new.save()

# run function below to create new exhibitions

# create_exhibition()


# pass the nft and exhibition id to this function
def register_artwork_for_exhibition():
    new = models.NFtEx.objects.create(nft = models.NFT.objects.get(id=1), ex = models.Exhibition.objects.get(id=1), date = datetime.datetime.now, is_nft_viewed_by_exhibitor = False, is_nft_accepted_by_exhibitor = False)
    new.save()
#run func below to add a nft to an exhibition

# register_artwork_for_exhibition()    


#pass the artwork id to change is_accepted IF EXHIBITOR CONFIRM THE REQUEST
def check_register_artwork_by_exhibitor():
    new = models.NFtEx.objects.get(id=1)
    new.is_nft_accepted_by_exhibitor = True
    new.save()
 
#run func below when exhibitor accept the NFT request

# check_register_artwork_by_exhibitor()
