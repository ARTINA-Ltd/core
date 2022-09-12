from django.contrib.auth.models import User

from exhibition import models
from exhibition import serializers

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class ExhibitionViewSet(viewsets.ModelViewSet):
    queryset = models.Exhibition.objects.all()
    serializer_class = serializers.ExhibitionSerializer


class NFtExView(viewsets.ModelViewSet):
    queryset = models.NFtEx.objects.all()
    serializer_class = serializers.NFtExSerializer

    def get_serializer_class(self):
        if self.action == 'changing_state':
            return serializers.NFtExStateChangerSerializer
        else:
            return super().get_serializer_class()
        
    @action(detail=True, name='Change State', methods=['post'])        
    def changing_state(self, request, pk=None):
        serializer = self.get_serializer_class()
        serializer = serializer(data = request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        nftex = models.NFtEx.objects.get(id=pk)
        nftex.state = serializer.validated_data['state']
        nftex.feedback = serializer.validated_data['feedback']
        nftex.save()
        return Response(serializers.NFtExSerializer(nftex).data)  

    
class ExhibitorViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_serializer_class(self):
        if self.action == 'get_exhibitions':
            return serializers.ExhibitionSerializer
        else:
            return super().get_serializer_class()

    @action(detail=True, methods=['get'], name='Get Exhibitions')
    def get_exhibitions(self, request, pk=None):
        exhibitor = User.objects.get(id=pk)
        exhibition = exhibitor.exhibition_set.all()
        exhibitions = serializers.ExhibitionSerializer(exhibition, many=True)
        return Response(exhibitions.data)

    @action(detail=True, methods=['get'], name='Get Pending State')
    def get_pending_state(self, request, pk=None):
        nftexs = []
        exhibitor = User.objects.get(id=pk)
        exhibitions = exhibitor.exhibition_set.all()
        for exhibition in exhibitions:
            nftex = exhibition.nftexs.filter(state='pending').all()
            nftexs += serializers.NFtExSerializer(nftex, many=True).data
        return Response(nftexs)


class TransactionList(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer

class ExRateViewSet(viewsets.ModelViewSet):
    queryset = models.ExReviewRating.objects.all()
    serializer_class = serializers.ExRateSerializer
    