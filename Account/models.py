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
    user_verified = models.BooleanField(default=False)
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
    
    shaba_number = models.CharField(max_length=24, verbose_name="shaba_number", null=True, blank=True)
    card_number = models.CharField(max_length=16, verbose_name="card_number", null=True, blank=True)    
    address = models.TextField(max_length=200, verbose_name="آدرس", null=True, blank=False)
    national_card_picture = models.TextField(verbose_name="عکس کارت ملی",null=True,blank=False,default="")
    profile_picture = models.TextField(verbose_name="عکس پروفایل",
                                        null=True, blank=False, default="http://api.artina.org/static/images/default_C7876ge.webp",)
    email = models.EmailField(max_length=50, verbose_name="ایمیل", null=True, blank=False)
    email_verified = models.BooleanField(default=False)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, default=1)
    postal_code =models.CharField(max_length=10, verbose_name="postal_code", null=True, blank=True) 
    bio = models.TextField(max_length=500, verbose_name="biography", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_foreigner = models.BooleanField(default=False)
  
    def __str__(self):
        return f"{self.user.username} - {self.first_name} {self.last_name}"



class ArtistReviewRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artist')
    rating = models.IntegerField(default=5, validators=[validators.MaxValueValidator(5),
                                                        validators.MinValueValidator(0)])

    def total_cal(self):
        avg = ArtistReviewRating.objects.aggregate(Avg('rating'))
        return avg


class TicketUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    email = models.EmailField(max_length=50,null=True,blank=False)
    name = models.CharField(max_length=255,null=True,blank=False)
    last_name = models.CharField(max_length=255,null=True,blank=False)
    phone_number = models.CharField(max_length=255,null=True,blank=True)
    image_url = models.CharField(max_length=255,null=True,blank=True)
    subject = models.CharField(max_length=255,null=True,blank=False)
    text = models.TextField(max_length=200,null=True,blank=False)
    ticket_id = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # def __str__(self):
    #     return f"{self.user.username} - {self.subject}"

class Msg(models.Model):
    name = models.CharField(max_length=25,null=True,blank=False)
    text = models.TextField(max_length=200,null=True,blank=False)
    def __str__(self):
        return f"{self.name}"

class NotifyUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=200,null=True,blank=False)
    message_seen = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.user.username} - {self.text}"

class PhoneVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    verification_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.username}"



class EmailVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.CharField(max_length=20)
    verification_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.username}"


 
class TransactionCurrency(models.Model):
    name = models.CharField(max_length=10, null=True, blank=False, default="rial")
    def __str__(self):
        return f"{self.name}"


class UserBalance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rial_available_balance = models.IntegerField(default=0,verbose_name="mojudi")
    rial_untradable_balance = models.IntegerField(default=0,verbose_name="unavailable mojudi")
    matic_balance = models.FloatField(default=0)
    matic_untradable_balance = models.FloatField(default=0)
    eth_balance = models.FloatField(default=0)
    eth_untradable_balance = models.FloatField(default=0)
    def __str__(self):
        return f"{self.user.username}"


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    authority = models.CharField(max_length=100)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.amount}'

class withdrawal_list(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shaba_number = models.CharField(max_length=24, verbose_name="shaba_number", null=True, blank=True)
    amount = models.PositiveIntegerField()
    reference_number= models.PositiveIntegerField()
    origin= models.CharField(max_length=24, verbose_name="shaba_number", null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=42, unique=True)  # Ethereum/Matic address
    private_key= models.CharField(max_length=200, unique=True, default=0)
    MATIC_balance = models.DecimalField(max_digits=20, decimal_places=6, default=0)  # Matic balance
    ETH_balance= models.DecimalField(max_digits=20, decimal_places=6, default=0)
    def __str__(self):
        return f"{self.user.username}"

   
class Transaction(models.Model):
    STATUS_CHOICES = (
        ('pending', 'pending'),
        ('completed', 'completed'),
        ('failed', 'failed'),
    )
    SIDE_CHOICES = (
        ('SELL','SELL'),
        ('BUY','BUY'),
        ('withdrawal','withdrawal'),
        ('deposit','deposit')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transaction_currency=models.ForeignKey(TransactionCurrency,default=0,on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    side = models.CharField(max_length=10, choices=SIDE_CHOICES, default='BUY')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.matic_amount} Matic ({self.status})"


class ARTINA_Ballance(models.Model):
    artina_eth=  models.FloatField(default=0)
    artina_rial=  models.FloatField(default=0)
    artina_matic= models.FloatField(default=0)
    artina_unavailable_rial= models.FloatField(default=0)
    artina_sell_ticket=models.FloatField(default=0)
    artina_sell_ticket_count=models.IntegerField(default=0)
    artina_3d_exhivbition=models.FloatField(default=0)
    artina_3d_exhivbition_count=models.IntegerField(default=0)
    artina_commision=models.FloatField(default=0)
    artina_commision_count=models.IntegerField(default=0)
    artina_mint=models.FloatField(default=0)
    artina_mint_count=models.IntegerField(default=0)
    def __str__(self):
        return f"eth : {self.artina_eth} - matic: {self.artina_matic} - rial: ({self.artina_rial})"
    



