from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime
import pytz
# Create your models here.


class NFT(models.Model):
    name=models.CharField(max_length=15,null=False,blank=False)
    owner=models.ForeignKey(User,null=False,blank=False, on_delete=models.CASCADE)
    creator=models.CharField(max_length=15,null=False,blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    lastPrice=models.IntegerField(verbose_name='آخرین قیمت',null=False,blank=False)
    image=models.ImageField( upload_to = "NFTS",null=True,blank=True)
    start_date = models.DateTimeField(verbose_name='تاریخ شروع مزایده', null=False, default=timezone.now())
    end_date = models.DateTimeField(verbose_name='تاریخ پایان مزایده', null=False, default=timezone.now())

    def has_expired(self):
        return datetime.now(tz=pytz.timezone('Asia/Tehran')) > self.end_date
    def has_started(self):
        return datetime.now(tz=pytz.timezone('Asia/Tehran')) > self.start_date
    
    def get_winner(self):
        if self.has_expired():
            orders = self.order_set.all()
            winner = max(orders, key = (lambda x: x.fee))
            return winner.bidder
        else:
            return {'error':'The auction is in progress yet.'}
    
    
    def __str__(self):
        return f'{self.name} by {self.creator} owened by {self.owner.username}'


class Transaction(models.Model):
    nft = models.ForeignKey(NFT,on_delete=models.CASCADE)
    lastPrice=models.CharField(max_length=15,null=False,blank=False)
    startdate = models.DateTimeField(verbose_name="تاریخ")
    enddate = models.DateTimeField(verbose_name="تاریخ")
    seller = models.CharField(max_length=15, null=False, blank=False)
    buyer = models.CharField(max_length=15, null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)


class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(verbose_name="wallet address", max_length=100)


class Order(models.Model):
    nft=models.ManyToManyField(NFT)
    bidder=models.ForeignKey(User,null=False,blank=False, on_delete=models.CASCADE)
    fee=models.IntegerField(verbose_name="قیمت ",null=False,blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    status = models.CharField(max_length=5, choices=[('O','open'),('C','close')])
