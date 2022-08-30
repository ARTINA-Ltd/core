from rest_framework import viewsets
from core.models import NFT
from exhibition import models
from exhibition import serializers
import datetime
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import action
from django.http import JsonResponse
import exhibition

class ExhibitionViewSet(viewsets.ModelViewSet):
    queryset = models.Exhibition.objects.all()
    serializer_class = serializers.ExhibitionSerializer


class NFtExView(viewsets.ModelViewSet):
    queryset = models.NFtEx.objects.all()
    serializer_class = serializers.NFtExSerializer



class ExhibitorViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_serializer_class(self):
        if self.action =='get_exhibitions':
            return serializers.ExhibitionSerializer
        else:
            return super().get_serializer_class()

    @action(detail=True, methods=['get'], name='Get Exhibitions')
    def get_exhibitions(self, request, pk=None):
        exhibitor = User.objects.get(id=pk)
        exhibition = exhibitor.exhibition_set.all()
        exhibitions = serializers.ExhibitionSerializer(exhibition, many = True)
        return Response(exhibitions.data)



# Pass the artwork id to change is_accepted IF EXHIBITOR CONFIRM THE REQUEST
# def check_register_artwork_by_exhibitor(pk):
#     new = models.NFtEx.objects.get(id=pk)
#     new.is_nft_accepted_by_exhibitor = True
#     new.save()



# Pass the artwork id to check IF EXHIBITOR HAS SEEN THE REQUEST OR NOT
# def check_request_seen_by_exhibitor(pk):
#     new = models.NFtEx.objects.get(id=pk)
#     new.is_nft_viewed_by_exhibitor = True
#     new.save()


# Run func below when exhibitor SEEN the NFT request
# check_request_seen_by_exhibitor()








class TransactionList(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer


# a, b, c, d
def sell():
    transaction = models.Transaction.objects.create(nft=NFT.objects.get(name='Ape'), seller='ali', buyer='reza', date='12M')

    floor_price = NFT.lastPrice
    startdate = NFT.startdate
    enddate = NFT.enddate

    transaction_detail = [floor_price, startdate, enddate]

    transaction.save()

    # transaction Method with error Handling TODO

    return transaction_detail


# a, b, c, d
def buy():
    transaction = models.Transaction.objects.create(nft=NFT.objects.get(name='Bape'), seller='mohammad', buyer='ali', date='3D')

    transaction.save()


# first add your NFT models
# sell()
# buy()
