from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import UserBalance,Profile, Role
from supervisor.models import DocumentApproval

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:  # This checks if the User instance was just created

        UserBalance.objects.create(
            user=instance,
            rial_available_balance=0
        )


@receiver(post_save, sender=DocumentApproval)
def update_user_role(sender, instance, **kwargs):
    if instance.national_code_approved:
        try:
            user_one_role = Role.objects.get(name="user_one")
        except Role.DoesNotExist:
            user_one_role = None

        if user_one_role:
            profile = instance.user_profile
            profile.role = user_one_role
            profile.save()
            
