# Create your views here.
from rest_framework import viewsets

from exhibition.models import *
from .serializer import *
import datetime


class ExhibitionList(viewsets.ModelViewSet):
    queryset = Exhibition.objects.all()
    serializer_class = ExhibitionSerializer


# a,b,c,d  inputs
def createEx():
    new = Exhibition.objects.create(user = User.objects.get(id=1),marketName='Ape',image = '' ,startdate = datetime.datetime(2022,10,10) , enddate = datetime.datetime(2022,5,5))
    new.save()

# run function below to create new exhibitions

# createEx()