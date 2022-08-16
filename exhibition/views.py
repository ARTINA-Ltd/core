# Create your views here.
from rest_framework import viewsets

from .models import *
from .serializer import *


class ExhibitionList(viewsets.ModelViewSet):
    queryset = Exhibition.objects.all()
    serializer_class = ExhibitionSerializer

