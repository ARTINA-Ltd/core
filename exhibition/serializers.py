from rest_framework import serializers
from exhibition import models
from core.serializers import NFTSerializer


class ExhibitionSerializer(serializers.ModelSerializer):
    
    nfts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Exhibition
        fields = ['user', 'marketName', 'image', 'start_date', 'end_date', 'nfts']


class NFtExSerializer(serializers.ModelSerializer):
    nft = serializers.SlugRelatedField(read_only=True, slug_field='name')
    ex = serializers.SlugRelatedField(read_only=True, slug_field='marketName')
    class Meta:
        model = models.NFtEx
        fields = ['nft','ex','date', 'commission','is_nft_viewed_by_exhibitor']