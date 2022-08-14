# Create your views here.
from rest_framework import viewsets

from core.models import Transaction
from core.serializer import TransactionSerializer
from .models import *


class TransactionList(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


# a, b, c, d
def sell():
    transaction = Transaction.objects.create(nft=NFT.objects.get(name='Ape'), seller='ali', buyer='reza', date='12M')

    floor_price = NFT.lastPrice
    startdate = NFT.startdate
    enddate = NFT.enddate

    transaction_detail = [floor_price, startdate, enddate]

    transaction.save()

    # transaction Method with error Handling TODO

    return transaction_detail


# a, b, c, d
def buy():
    transaction = Transaction.objects.create(nft=NFT.objects.get(name='Bape'), seller='mohammad', buyer='ali', date='3D')

    transaction.save()



sell()

