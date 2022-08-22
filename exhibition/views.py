# Create your views here.
from rest_framework import viewsets
from exhibition import models
from exhibition import serializers
import datetime


class ExhibitionViewSet(viewsets.ModelViewSet):
    queryset = models.Exhibition.objects.all()
    serializer_class = serializers.ExhibitionSerializer


class NFtExView(viewsets.ModelViewSet):
    queryset = models.NFtEx.objects.all()
    serializer_class = serializers.NFtExSerializer


# a,b,c,d  inputs
def createEx():
    new = Exhibition.objects.create(user = User.objects.get(id=1),marketName='Ape',image = '' ,startdate = datetime.datetime(2022,10,10) , enddate = datetime.datetime(2022,5,5))
    new.save()

# run function below to create new exhibitions

# createEx()
