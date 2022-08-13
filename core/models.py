from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class NFT():
    name = models.CharField(max_length=15, null=False, blank=False)
    owner = models.ForeignKey(User, null=False, blank=False)
    creator = models.CharField(max_length=15, null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    lastPrice = models.CharField(max_length=15, null=False, blank=False)


class Transaction():
    nft = models.ForeignKey(NFT)
    seller = models.CharField(max_length=15, null=False, blank=False)
    buyer = models.CharField(max_length=15, null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)


class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(verbose_name="wallet address", max_length=100)


class Order():
    nft = models.ManyToManyField(NFT)
    bidder = models.ForeignKey(User, null=False, blank=False)
    fee = models.IntegerField(verbose_name="قیمت", null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
