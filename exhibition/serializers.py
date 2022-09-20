from rest_framework import serializers
from exhibition import models
from django.contrib.auth.models import User
from .models import ExReviewRating


class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'      
class ExhibitionSerializer(serializers.ModelSerializer):
    nftexs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user = UsernameSerializer()
    class Meta:
        model = models.Exhibition
        fields = ['user', 'marketName', 'image', 'ticket', 'contract', 'start_date', 'end_date', 'nftexs']


class NFtExSerializer(serializers.ModelSerializer):
    state = serializers.CharField(read_only=True)
    feedback = serializers.CharField(read_only=True)

    class Meta:
        model = models.NFtEx
        fields = ['id','nfts', 'ex', 'date', 'commission', 'state', 'feedback']


class NFtExStateChangerSerializer(serializers.ModelSerializer):
    nfts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    ex = serializers.PrimaryKeyRelatedField(read_only=True)
    date = serializers.DateTimeField(read_only=True)
    commission = serializers.IntegerField(read_only=True)
    feedback = serializers.CharField(required=True)

    class Meta:
        model = models.NFtEx
        fields = ['nfts', 'ex', 'date', 'commission', 'state', 'feedback']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = ['nftex', 'seller', 'buyer', 'date']





class ExRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExReviewRating
        fields = '__all__'
