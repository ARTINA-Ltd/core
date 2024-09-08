from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import UserBalance,Profile, NotifyUser,Role
from supervisor.models import DocumentApproval
from .models import Affiliate
import uuid

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
            NotifyUser.objects.create(user=instance.user,text="احراز شما با موفقیت انجام شد.")
    else :
            profile = instance.user_profile
            profile.national_card_picture_upload=False
            profile.save()




@receiver(post_save, sender=User)
def create_affiliate(sender, instance, created, **kwargs):
    if created:
        affiliate = Affiliate.objects.create(user=instance)
        affiliate.referral_code = str(uuid.uuid4())[:8]  # Shorten UUID to 8 characters
        affiliate.save()
