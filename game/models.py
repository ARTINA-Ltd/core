from django.db import models
from django.contrib.auth.models import User

class CheatCode(models.Model):
    cheat_code = models.CharField(max_length=100)  # Changeable cheat code
    created_at = models.DateTimeField(auto_now_add=True)


class Game(models.Model):
    user1 = models.ForeignKey(User, related_name='user1_games', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='user2_games', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Game {self.id} between {self.user1} and {self.user2}"


class GameSession(models.Model):
    CHOICES = (
        ('rock', 'Rock'),
        ('paper', 'Paper'),
        ('scissors', 'Scissors'),
    )
    
    RESULT = (
        ('win', 'Win'),
        ('lose', 'Lose'),
        ('draw', 'Draw'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, related_name='sessions', on_delete=models.CASCADE)
    choice = models.CharField(max_length=10, choices=CHOICES, blank=True, null=True)
    result = models.CharField(max_length=10, choices=RESULT, blank=True, null=True)
    user_turn = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Session of {self.user} in Game {self.game.id}"

class Avatar(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    
    picture = models.TextField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    
    def __str__(self):
        return f"{self.gender} - {self.picture}"


class UserGameProfile(models.Model):
    user = models.OneToOneField(User, related_name='game_profile', on_delete=models.CASCADE)
    profile_picture = models.TextField(
        verbose_name="Profile Picture",
        null=True,
        blank=False,
        default="http://api.artina.org/static/images/default_C7876ge.webp",
    )
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
