from django.db import models
from django.contrib.auth.models import User


from datetime import datetime
# Create your models here.

class Exhibition(models.Model):
    user=models.ForeignKey(User,on_delete = models.CASCADE)
    marketName=models.CharField(max_length=15,null=False,blank=False)
    image=models.ImageField( upload_to = "Exhibition" , verbose_name="Exhibition",null=True,blank=True)
    startdate = models.DateTimeField(verbose_name="تاریخ")
    enddate = models.DateTimeField(verbose_name="تاریخ")

    def __str__(self):
        return f'{self.marketName} by {self.user.username}' 
