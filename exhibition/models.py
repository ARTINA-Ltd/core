from django.db import models
from django.contrib.auth.models import User
from core.models import NFT


from datetime import datetime
# Create your models here.

class Exhibition():
    user=models.ForeignKey(User,on_delete = models.CASCADE)
    marketName=models.CharField(max_length=15,null=False,blank=False)
    image=models.ImageField( upload_to = "Exhibition" , verbose_name="Exhibition",null=True,blank=True)
    startdate = models.DateTimeField(verbose_name="تاریخ")
    enddate = models.DateTimeField(verbose_name="تاریخ")


class NFtEx():
    nft = models.ForeignKey(NFT)
    ex=models.ForeignKey(Exhibition)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    floor_price = models.CharField(max_length=15,null=False, blank=False)
    startdate = models.DateField(verbose_name='تاریخ')
    enddate = models.DateField(verbose_name='تاریخ')

    def has_expired(self):
        return datetime.now() > self.enddate
    
    def get_winner(self):
        if self.has_expired():
            offers = self.offer_set.all()
            winner = max(offers, key = (lambda x: x.price))
            return winner.user
        else:
            return {'error':'The auction has not expired yet.'}



class Offer(models.Model):
    user = models.ForeignKey(User)
    nft_ex = models.ForeignKey(NFtEx, on_delete=models.CASCADE)
    price = models.CharField(max_length=15, null=False, blank=False)
    status = models.CharField(max_length=5, choices=[('O','open'),('C','close')])

    # Make an offer would be handdled on serializer.