from rest_framework import serializers
from .models import GeneratedImage,WaitList

class GeneratedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedImage
        fields = ('id', 'user', 'text', 'image_url')


class WaitListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitList
        fields = ('email')



