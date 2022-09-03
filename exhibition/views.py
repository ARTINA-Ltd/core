from rest_framework import viewsets
from core.models import NFT
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
    new = models.Exhibition.objects.create(user=User.objects.get(id=3), marketName='Ape', image='',
                                           start_date=datetime.datetime(2022, 10, 10),
                                           end_date=datetime.datetime(2022, 5, 5))
    new.save()

# run function below to create new exhibitions

# create_exhibition()


# pass the nft and exhibition id to this function
def register_artwork_for_exhibition():

    mydata = NFT.objects.get(id=2)

    print(mydata.get_nft_exhibition_status())

    if mydata.get_nft_exhibition_status() is None:
        new = models.NFtEx.objects.create(nft=models.NFT.objects.get(id=2), ex=models.Exhibition.objects.get(id=1),
                                          commission=4, date=datetime.datetime.now,
                                          is_nft_viewed_by_exhibitor=False, is_nft_accepted_by_exhibitor=False)
        new.save()
    else:
        print("error")


# Run func below to add a nft to an exhibition
# register_artwork_for_exhibition()    


# Pass the artwork id to change is_accepted IF EXHIBITOR CONFIRM THE REQUEST
def check_register_artwork_by_exhibitor():
    new = models.NFtEx.objects.get(id=15)
    new.is_nft_accepted_by_exhibitor = True
    new.save()


# Run func below when exhibitor ACCEPT the NFT request
check_register_artwork_by_exhibitor()


# Pass the artwork id to check IF EXHIBITOR HAS SEEN THE REQUEST OR NOT
def check_request_seen_by_exhibitor():
    new = models.NFtEx.objects.get(id=2)
    new.is_nft_viewed_by_exhibitor = True
    new.save()


# Run func below when exhibitor SEEN the NFT request
# check_request_seen_by_exhibitor()
