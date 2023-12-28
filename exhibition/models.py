from django.db import models
from django.contrib.auth.models import User
from core.models import NFT
from django.utils import timezone
from django.core import validators
from datetime import datetime
from datetime import timedelta
import pytz
from django.db.models import Avg
from django.core.validators import FileExtensionValidator


class Category (models.Model):
    name = models.CharField(max_length=25, verbose_name="دسته بندی", null=False, blank=False, default="سایر")

    def __str__(self):
        return self.name


class Exhibition(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    marketName = models.CharField(max_length=35, null=False, blank=False)
    image = models.TextField(verbose_name="Exhibition",
                              null=True, blank=True)
    start_date = models.DateTimeField(verbose_name="تاریخ شروع", default=timezone.now)
    end_date = models.DateTimeField(verbose_name="تاریخ پایان")
    description = models.TextField(null=True, blank=True)
    has_ticket = models.BooleanField(null=True, default=False)
    contract = models.TextField(verbose_name="contract",
                              null=True, blank=True)
    category = models.ForeignKey(Category, default=1, on_delete=models.CASCADE)
    application_deadline = models.DateTimeField(default=timezone.now)
    commision= models.IntegerField(verbose_name="درصد سود",default=10,blank=True)
    price = models.IntegerField(null=True, blank=True, default=20000, validators=[validators.MinValueValidator(5000)])

    



class Ticket(models.Model):
    ticket_id = models.IntegerField(verbose_name="ticket_id", default=1000)
    exhibition = models.ForeignKey(Exhibition, on_delete=models.CASCADE, related_name='tickets')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expiration_date = models.DateTimeField(verbose_name="تاریخ پایان", default=timezone.now)


class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('ignored', 'Ignored'),
    ]

    artist = models.ForeignKey(User, on_delete=models.CASCADE)
    exhibition = models.ForeignKey(Exhibition, on_delete=models.CASCADE, related_name='applications')
    nft = models.ManyToManyField(NFT, related_name='applications')
    contract_accepted = models.BooleanField(default=False)
    description = models.TextField(default="my application is complete",blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.artist.username}'s application for {self.exhibition.marketName}"
        
    def get_owner(self):
        return self.nft.first().owner

    def __str__(self):
        return f'{self.nft.name} in {self.exhibition.marketName}'

