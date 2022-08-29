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
        fields = '__all__'