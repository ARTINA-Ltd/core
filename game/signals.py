from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import UserGameProfile, Avatar
import random

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:  # This checks if the User instance was just created
        avatars = Avatar.objects.all()  # Get all avatars
        selected_avatar = random.choice(avatars) if avatars.exists() else None  # Select a random avatar
        
        UserGameProfile.objects.create(
            user=instance,
            hearts=3,
            points=0,
            profile_picture=selected_avatar.picture if selected_avatar else "http://api.artina.org/static/images/default_C7876ge.webp"
        )
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.UserGameProfile.save()
