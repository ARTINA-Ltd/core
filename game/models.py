from django.db import models
from django.contrib.auth.models import User

class CheatCode(models.Model):
    cheat_code = models.CharField(max_length=100)  # Changeable cheat code
    created_at = models.DateTimeField(auto_now_add=True)

class Game (models.Model):
    user1 = models.ForeignKey(User, related_name='user1_games', on_delete=models.CASCADE) 
    user2 = models.ForeignKey(User, related_name='user2_games',on_delete=models.SET_NULL, blank=True, null=True)
    points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active=models.BooleanField(default=True)


class GameSession (models.Model):
    RESULT=(
        ('win','win'),
        ('lose','lose'),
        ('draw','draw')
    )
    user = models.ForeignKey(User,related_name='user_games', on_delete=models.CASCADE) 
    game = models.ForeignKey(Game, related_name='sessions', on_delete=models.CASCADE)
    choice = models.CharField(max_length=10, blank=True, null=True)  # 'rock', 'paper', 'scissors'
    result = models.CharField(max_length=10, blank=True, null=True)  # 'win', 'lose', 'draw'
    user_turn = models.BooleanField(default=False)

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
        
