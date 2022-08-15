from rest_framework import serializers
from core import models
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['nft','bidder','fee','status','date']
        read_only_fields = ['date']
class NFtExSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NFtEx
        fields = ['nft','ex','floor_price','start_date','end_date']