from rest_framework import serializers

from .models import *


class ExhibitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibition
        fields = ['user', 'marketName', 'startdate', 'enddate', 'image']