from django.db import models
from django.contrib.auth.models import User

class CheatCode(models.Model):
    cheat_code = models.CharField(max_length=100)  # Changeable cheat code
    created_at = models.DateTimeField(auto_now_add=True)

class Game(models.Model):
    user1 = models.ForeignKey(User, related_name='user1_games', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='user2_games', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

class GameSession(models.Model):
    game = models.ForeignKey(Game, related_name='sessions', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='sessions', on_delete=models.CASCADE)
    choice = models.CharField(max_length=10, blank=True, null=True)  # 'rock', 'paper', 'scissors'
    result = models.CharField(max_length=10, blank=True, null=True)  # 'win', 'lose', 'draw'
    points = models.IntegerField(default=0)
    is_user_turn = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class UserGameProfile(models.Model):
    user = models.OneToOneField(User, related_name='Gameprofile', on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    hearts = models.IntegerField(default=3)
    last_played = models.DateTimeField(auto_now_add=True)
