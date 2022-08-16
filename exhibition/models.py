import datetime
from django.db import models
from django.contrib.auth.models import User
from core.models import NFT
# Create your models here.

class Exhibition(models.Model):
    user=models.ForeignKey(User,on_delete = models.CASCADE)
    marketName=models.CharField(max_length=15,null=False,blank=False)
    image=models.ImageField( upload_to = "Exhibition" , verbose_name="Exhibition",null=True,blank=True)
    startdate = models.DateTimeField(verbose_name="تاریخ")
    enddate = models.DateTimeField(verbose_name="تاریخ")
    # has_expired = models.BooleanField(default=False)

    # def check_time(self):
    #     return datetime.now() > self.enddate

    # def has_expired_time(self):
    #     if self.check_time():
    #         self.has_expired = True

class NFtEx(models.Model):
    nft = models.ForeignKey(NFT, on_delete=models.CASCADE)
    ex=models.ForeignKey(Exhibition, on_delete=models.CASCADE)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
