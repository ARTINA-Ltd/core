from rest_framework import serializers
from .models import Game, GameSession, UserGameProfile

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class GameSessionSerializer(serializers.ModelSerializer):
    opponent_username = serializers.SerializerMethodField()
    opponent_profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = GameSession
        fields = ['id', 'user', 'game', 'choice', 'result', 'user_turn', 'is_active', 'opponent_username', 'opponent_profile_picture']

    def get_opponent_username(self, obj):
        # Determine the opponent based on whether the user is user1 or user2 in the game
        if obj.game.user1 == obj.user:
            return obj.game.user2.username if obj.game.user2 else None
        return obj.game.user1.username if obj.game.user1 else None

    def get_opponent_profile_picture(self, obj):
        # Fetch the profile picture of the opponent
        if obj.game.user1 == obj.user:
            opponent_profile = obj.game.user2.game_profile if obj.game.user2 else None
        else:
            opponent_profile = obj.game.user1.game_profile if obj.game.user1 else None
        return opponent_profile.profile_picture if opponent_profile else None

class UserGameProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGameProfile
        fields = '__all__'
