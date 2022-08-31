from array import array
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

    @action(detail=True, name='Changing State to accepted')        
    def changing_state_accepted(self, request, pk=None):
        nftex = models.NFtEx.objects.get(id=pk)
        nftex.state = "accepted"
        nftex.save()
        return Response(serializers.NFtExSerializer(nftex).data)
        
    @action(detail=True, name='Changing State to rejected')        
    def changing_state_rejected(self, request, pk=None):
        nftex = models.NFtEx.objects.get(id=pk)
        nftex.state = "rejected"
        nftex.save()
        return Response(serializers.NFtExSerializer(nftex).data)  

    

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


    @action(detail=True, methods=['get'], name='Get Pending State')
    def get_pending_state(self, request, pk=None):
        nftexs = []
        exhibitor = User.objects.get(id=pk)
        exhibitions = exhibitor.exhibition_set.all()
        for exhibition in exhibitions:
            nftex = exhibition.nftexs.filter(state = 'pending').all()
            nftexs += serializers.NFtExSerializer(nftex,many = True).data
        return Response(nftexs)


    

        

class TransactionList(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer




