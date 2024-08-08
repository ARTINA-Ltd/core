from rest_framework import serializers
from .models import Game, GameSession, UserGameProfile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class UserGameProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserGameProfile
        fields = ['username', 'points', 'hearts', 'last_played']


