# Create your views here.
from rest_framework import viewsets
from exhibition import models
from exhibition import serializers
class ExhibitionViewSet(viewsets.ModelViewSet):
    queryset = models.Exhibition.objects.all()
    serializer_class = serializers.ExhibitionSerializer
    