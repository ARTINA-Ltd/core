from rest_framework import serializers
from exhibition import models

class ExhibitionSerializer(serializers.ModelSerializer):
    
    nfts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = models.Exhibition
        fields = ['user','marketName','image','startdate','enddate','nfts']

class NFtExSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NFtEx
        fields = ['nft','ex']