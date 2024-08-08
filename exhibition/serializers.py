from rest_framework import serializers
from exhibition.models import *
from django.contrib.auth.models import User
from core.models import NFT 


# class UserSerializer(serializers.ModelSerializer):
#     # profile = Account.serializers.ProfileSerializer()

#     class Meta:
#         model = models.User
#         fields = ['id','username']



class NumberSerializer(serializers.Serializer):
    numbers = serializers.ListField(
        child=serializers.IntegerField(min_value=0, max_value=9),
        min_length=5,
        max_length=5
    )






class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'


class NFTSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = NFT
        fields = '__all__'

class ExhibitionSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Exhibition
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    exhibition = serializers.PrimaryKeyRelatedField(queryset=Exhibition.objects.all())
    contract_accepted = serializers.BooleanField(required=True)
    nft = serializers.SlugRelatedField(  # Changed line
        slug_field='token_id',  # Changed line
        queryset=NFT.objects.all(),
        many=True
    )

    class Meta:
        model = Application
        fields = ['id', 'artist', 'exhibition', 'description', 'nft', 'contract_accepted']
        
