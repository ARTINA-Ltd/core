from django.db import models
from django.contrib.auth.models import User

class CheatCode(models.Model):
    cheat_code = models.CharField(max_length=100)  # Changeable cheat code
    created_at = models.DateTimeField(auto_now_add=True)

class Game (models.Model):
    user1_choice = models.CharField(max_length=10, blank=True, null=True)
    user2_choice = models.CharField(max_length=10, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class GameSession (models.Model):
    RESULT=(
        ('win','win'),
        ('lose','lose'),
        ('draw','draw')
    )
    user = models.ForeignKey(User, related_name='user1_games', on_delete=models.CASCADE) 
    game = models.ForeignKey(Game, related_name='sessions', on_delete=models.CASCADE)
    user1_choice = models.CharField(max_length=10, blank=True, null=True)  # 'rock', 'paper', 'scissors'
    user2_choice = models.CharField(max_length=10, blank=True, null=True)
    result = models.CharField(max_length=10, blank=True, null=True)  # 'win', 'lose', 'draw'
    points = models.IntegerField(default=0)
    user_turn = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class UserGameProfile(models.Model):
    user = models.OneToOneField(User, related_name='Gameprofile', on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    hearts = models.IntegerField(default=3)
    last_played = models.DateTimeField(auto_now_add=True)


class GamePayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    authority = models.CharField(max_length=100)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.amount}'
        
