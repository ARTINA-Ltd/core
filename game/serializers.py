from rest_framework import serializers
from .models import Game, GameSession, UserGameProfile
from django.contrib.auth.models import User

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
    user=UserSerializer
    class Meta:
        model = UserGameProfile
        fields = ['user.username','points','hearts']


