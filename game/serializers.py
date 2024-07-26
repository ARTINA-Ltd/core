from rest_framework import serializers
from .models import Game, GameSession, UserProfile, TransactionCurrency, GameChoice
from django.contrib.auth.models import User

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['points', 'hearts']

class TransactionCurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionCurrency
        fields = '__all__'

