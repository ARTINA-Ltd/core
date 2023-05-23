from rest_framework import serializers
from exhibition import models
from django.contrib.auth.models import User


class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ExhibitionSerializer(serializers.ModelSerializer):
    nftexs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user = UsernameSerializer()

    class Meta:
        model = models.Exhibition
        fields = ['exhibition_id', 'user.username', 'marketName', 'image', 'start_date', 'end_date', 'description', 'ticket', 'contract', 'category', 'nftexs']


# class NFtExSerializer(serializers.ModelSerializer):
#     state = serializers.CharField(read_only=True)
#     feedback = serializers.CharField(read_only=True)

#     class Meta:
#         model = models.NFtEx
#         fields = ['id', 'nfts', 'exhibition', 'date', 'commission', 'state', 'feedback']


# class NFtExStateChangerSerializer(serializers.ModelSerializer):
#     nfts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
#     exhibition = serializers.PrimaryKeyRelatedField(read_only=True)
#     date = serializers.DateTimeField(read_only=True)
#     commission = serializers.IntegerField(read_only=True)
#     feedback = serializers.CharField(required=True)

#     class Meta:
#         model = models.NFtEx
#         fields = ['nfts', 'exhibition', 'date', 'commission', 'state', 'feedback']


# class TransactionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Transaction
#         fields = ['nftex', 'seller', 'buyer', 'date']





class NumberSerializer(serializers.Serializer):
    numbers = serializers.ListField(
        child=serializers.IntegerField(min_value=0, max_value=9),
        min_length=5,
        max_length=5
    )



from rest_framework import serializers
from .models import NFT, Exhibition, Application
# CustomUser

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
    artist = serializers.HiddenField(default=serializers.CurrentUserDefault())
    contract_accepted = serializers.BooleanField(required=True)

    class Meta:
        model = Application
        fields = ['id', 'artist', 'exhibition', 'nft', 'contract_accepted']

    def validate_nft(self, value):
        if value.in_exhibition:
            raise serializers.ValidationError("This NFT is currently part of an exhibition and cannot be used in another application.")
        return value

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'email', 'first_name', 'last_name', 'balance']
