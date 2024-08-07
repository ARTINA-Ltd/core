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

class UserGameProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGameProfile
        fields = '__all__'


