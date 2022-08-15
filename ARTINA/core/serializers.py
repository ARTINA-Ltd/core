from rest_framework import serializers
from core.models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['nft','bidder','fee','status','date']
        read_only_fields = ['date']
        

        