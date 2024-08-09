from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import UserBalance

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:  # This checks if the User instance was just created

        UserBalance.objects.create(
            user=instance,
            rial_available_balance=0
        )

