from pyexpat import model
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core import validators
from datetime import datetime
import pytz
from django.db.models import Avg
from django.conf import settings


class NFT(models.Model):
    token_id = models.IntegerField(default=0, null=False, blank=False)
    name = models.CharField(max_length=100, null=False, blank=False)
    owner = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    creator = models.CharField(max_length=100, null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    last_price = models.FloatField(verbose_name='آخرین قیمت', null=False, blank=False)
    image_url = models.TextField(default='data:image', null=False, blank=False)
    start_date = models.DateTimeField(verbose_name='تاریخ شروع مزایده', null=True, blank=True)
    end_date = models.DateTimeField(verbose_name='تاریخ پایان مزایده', null=True, blank=True)
    is_for_sale = models.BooleanField(default=False)
    description = models.TextField(max_length=200, null=True, blank=True)
    external_link = models.URLField(null=True, blank=True)
    author_address=models.CharField(null=True,max_length=45,default="0x2293221D7c357FB04De9c7D0dEeBcA427407429D")
    in_exhibition = models.BooleanField(default=False)
    is_visible=models.BooleanField(default=True)
    has_physical= models.BooleanField(default=False)
    view_count = models.IntegerField(default=0)
    share_count = models.IntegerField(default=0)


    def __str__(self):
        return f'{self.name} by {self.creator} owned by {self.owner.username}'


class NFTRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nft = models.ForeignKey(NFT, on_delete=models.CASCADE, related_name='nft')
    like =  models.BooleanField(default=False)
    review = models.TextField(blank=True)


    def __str__(self):
        return f'{self.nft.name} Get Rank : ( {self.rating} )  from {self.user.username}'


class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(verbose_name="wallet address", max_length=100)

    def __str__(self):
        return f'{self.user.username}\'s wallet'


class Order(models.Model):
    nft = models.ForeignKey(NFT, null=False, blank=False, on_delete=models.CASCADE)
    bidder = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    fee = models.IntegerField(verbose_name="قیمت", null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    status = models.IntegerField(choices=[(0, 'open'), (1, 'close')])
    report = models.IntegerField(choices=[(0, 'unsuccessful'), (1, 'successful'),(2,'pending')],default=2)

    def __str__(self):
        return f'{self.bidder.username} bid {self.fee} on {self.nft.name}'



class MyImage(models.Model):
    image = models.ImageField(upload_to='static/images/')



class PDF(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='static/pdfs/')
    url = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title