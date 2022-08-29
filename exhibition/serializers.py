from rest_framework import serializers
from exhibition import models


class ExhibitionSerializer(serializers.ModelSerializer):
    
    nftexs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Exhibition
        fields = ['user', 'marketName', 'image', 'start_date', 'end_date', 'nftexs']


class NFtExSerializer(serializers.ModelSerializer):
    is_nft_accepted_by_exhibitor = serializers.BooleanField(read_only=True)
    is_nft_viewed_by_exhibitor = serializers.BooleanField(read_only=True)
    class Meta:
        model = models.NFtEx
        fields = ['nfts', 'ex', 'date', 'commission', 'is_nft_viewed_by_exhibitor', 'is_nft_accepted_by_exhibitor']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = ['nftex', 'seller', 'buyer', 'date']