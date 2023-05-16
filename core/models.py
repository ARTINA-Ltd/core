from pyexpat import model
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core import validators
from datetime import datetime
import pytz
from django.db.models import Avg


class NFT(models.Model):
    token_id = models.IntegerField(default=0, null=False, blank=False)
    name = models.CharField(max_length=15, null=False, blank=False)
    owner = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    creator = models.CharField(max_length=15, null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    last_price = models.IntegerField(verbose_name='آخرین قیمت', null=False, blank=False)
    image_url = models.TextField(default='data:image', null=False, blank=False)
    start_date = models.DateTimeField(verbose_name='تاریخ شروع مزایده', null=True, blank=True)
    end_date = models.DateTimeField(verbose_name='تاریخ پایان مزایده', null=True, blank=True)
    is_for_sale = models.BooleanField(default=False)
    description = models.TextField(max_length=200, null=True, blank=True)
    external_link = models.URLField(null=True, blank=True)
    author_address=models.CharField(null=True,max_length=45,default="0x2293221D7c357FB04De9c7D0dEeBcA427407429D")
    # image = models.ImageField(upload_to="./static/NFTS", null=True, blank=True)
    in_exhibition = models.BooleanField(default=False)
    def has_expired(self):
        return datetime.now(tz=pytz.timezone('Asia/Tehran')) > self.end_date

    def has_started(self):
        return datetime.now(tz=pytz.timezone('Asia/Tehran')) > self.start_date

    def get_winner_offer(self):
        if self.has_expired():
            orders = self.order_set.all()
            winner = max(orders, key=(lambda x: x.fee))
            return winner
        else:
            return {'error': 'The auction is still in progress.'}

    def get_exhibitions(self):
        try:
            return list(map(lambda x: x.ex, self.nftexs.filter(state='accepted').all()))
        except:
            return None
    
    def is_in_exhibition(self):
        exhibitions = self.get_exhibitions()
        if exhibitions:
            for exhibition in exhibitions:
                if not exhibition.has_expired():
                    return True
            return False
        else:
            return False

    def __str__(self):
        return f'{self.name} by {self.creator} owned by {self.owner.username}'


class NFTReviewRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nft = models.ForeignKey(NFT, on_delete=models.CASCADE, related_name='nft')
    rating = models.IntegerField(default=5, validators=[validators.MaxValueValidator(5), validators.MinValueValidator(0)])
    review = models.TextField(blank=True)

    def total_cal(self):
        avg = models.NFTReviewRating.objects.aggregate(Avg('rating'))
        return avg 

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

    def __str__(self):
        return f'{self.bidder.username} bid {self.fee} on {self.nft.name}'



class MyImage(models.Model):
    image = models.ImageField(upload_to='static/images/')