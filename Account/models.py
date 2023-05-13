from django.db import models
from django.contrib.auth.models import User
from exhibition.serializers import ExhibitionSerializer
from core.serializers import NFTSerializer
from django.core import validators
from django.db.models import Avg
from kavenegar import KavenegarAPI
import random
import requests
import time


class Permission(models.Model):
    name = models.CharField(max_length=10, verbose_name="نوع دسترسی", null=True, blank=False, default="basic")

    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=10, verbose_name="نقش", null=True, blank=False, default="user_zero")
    permissions = models.ManyToManyField(Permission)

    def __str__(self):
        return self.name

    def get_permission(self, permission):
        return self.permissions.filter(name=permission).exists()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=15, null=True, blank=False)
    last_name = models.CharField(max_length=25, null=True, blank=False)
    national_code = models.CharField(max_length=10, verbose_name="کدملی", null=True, blank=False,
                                     validators=[validators.RegexValidator(regex='^[0-9]{10}$',
                                                                           message='کد ملی باید 10 رقمی باشد',
                                                                           code='invalid_national_code')])
    birthdate = models.CharField(max_length=10, verbose_name="تاریخ تولد", null=True, blank=False)
    phone_number = models.CharField(max_length=11, verbose_name="شماره تلفن", null=True, blank=False,
                                    validators=[validators.RegexValidator(regex='^[0-9]{11}$',
                                                                          message='شماره تلفن باید 11 رقمی باشد',
                                                                          code='invalid_phone_number')])
    phone_number_verified = models.BooleanField(default=False)
    cell_number = models.CharField(max_length=11, verbose_name="شماره تلفن ثابت", null=True, blank=False)
    address = models.TextField(max_length=200, verbose_name="آدرس", null=True, blank=False)
    national_card_picture = models.TextField(verbose_name="عکس کارت ملی",null=True,blank=False,default="default.png")
    profile_picture = models.TextField(verbose_name="عکس پروفایل",
                                        null=True, blank=False, default="default.png",)
    # email = models.EmailField(max_length=50, verbose_name="ایمیل", null=True, blank=False)
    email_verified = models.BooleanField(default=False)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, default=1)
    
    # def __str__(self):
    #     return self.user.username + " " + self.first_name + " " + self.last_name + " " + self.national_code + " "\
    #            + self.email + " "


class ArtistReviewRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artist')
    rating = models.IntegerField(default=5, validators=[validators.MaxValueValidator(5),
                                                        validators.MinValueValidator(0)])

    def total_cal(self):
        avg = ArtistReviewRating.objects.aggregate(Avg('rating'))
        return avg

    def __str__(self):
        return f'{self.artist.username} Get Rank : ( {self.rating} )  from {self.user.username}'
# TODO : Functions needed for default Django User model


def get_artist_applications(self):
    nfts = self.nft_set.all()
    applications = []
    for nft in nfts:
        applications += nft.nftexs.filter(state='pending').all()
    return set(applications)
# TODO: check for future delete, handled in front-end


def is_artist(self):
    try:
        profile = self.profile
        if profile.role.name == 'artist':
            return True
    except:
        return False


User.add_to_class('is_artist', is_artist)
User.add_to_class('get_artist_applications', get_artist_applications)


class UserTicket(models.Model):
    ticket_id = models.IntegerField(verbose_name="ticket_id", default=1000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=70, verbose_name="موضوع", null=True, blank=False)
    date = models.DateTimeField(auto_now=True)
    text = models.TextField(max_length=200, verbose_name="متن", null=True, blank=False)


class PhoneVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    verification_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

class TransactionType(models.Model):
    name = models.CharField(max_length=10, null=True, blank=False, default="deposit")
  
class TransactionCurrency(models.Model):
    name = models.CharField(max_length=10, null=True, blank=False, default="eth")
    

class UserBalance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rial_available_balance = models.IntegerField(default=0,verbose_name="mojudi")
    rial_untradable_balance = models.IntegerField(default=0,verbose_name="unavailable mojudi")
    eth_balance = models.IntegerField(default=0,verbose_name="mojudi etherium")
    

class UserTurnover(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transaction_type = models.ForeignKey(TransactionType, default="deposit",on_delete=models.CASCADE)
    transaction_currency=models.ForeignKey(TransactionCurrency, default="rial",on_delete=models.CASCADE)
    transaction_value=models.IntegerField(default=0,verbose_name="volume")
