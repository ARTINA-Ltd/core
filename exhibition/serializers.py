from dataclasses import field
from operator import mod
from rest_framework import serializers
from exhibition import models
from django.contrib.auth.models import User
from .models import ExReviewRating


class ExhibitionSerializer(serializers.ModelSerializer):
    nftexs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Exhibition
        fields = ['user', 'marketName', 'image', 'start_date', 'end_date', 'nftexs']


class NFtExSerializer(serializers.ModelSerializer):
    state = serializers.CharField(read_only=True)

    class Meta:
        model = models.NFtEx
        fields = ['nfts', 'ex', 'date', 'commission', 'state']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = ['nftex', 'seller', 'buyer', 'date']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ExRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExReviewRating
        fields = '__all__'