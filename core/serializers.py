from rest_framework import serializers
from core import models


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['nft', 'bidder', 'fee', 'status', 'date']
        read_only_fields = ['date']


class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NFT
        fields = ['token_id','name', 'is_for_sale','owner', 'creator', 'last_price', 'image_url' ,'description','external_link','author_address']


class NFTRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NFTReviewRating
        fields = '__all__'



class MyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MyImage
        fields = ('id', 'image')
