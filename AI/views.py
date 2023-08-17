from django.shortcuts import render
import requests
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .models import GeneratedImage , WaitList
from .serializers import GeneratedImageSerializer
import json
from rest_framework.decorators import action

class GeneratedImageViewSet(viewsets.ModelViewSet):
    queryset = GeneratedImage.objects.all()
    serializer_class = GeneratedImageSerializer

    def create(self, request):
        # Get input text and image size from request data
        user = self.request.user
        text = request.data.get('text')
        width = request.data.get('width', '512')
        height = request.data.get('height', '512')
        addedtext= "with no human in it"
        line=addedtext+text
        # Call the image generator API
        api_url = "https://stablediffusionapi.com/api/v3/text2img"
        api_key = 'yiI8NLs7JSCy210kcWlJAkR4LHqI5tDZsPkrrQEP6odRUyb6Ej08oJUyC7jX'
        params = {
            'key': api_key,
            'prompt': line,
            'width': width,
            'height': height,
            'samples': '1',
            'num_inference_steps': '20',
            'guidance_scale': 7.5,
            'multi_lingual': "yes",
            'safety_checker': 'yes',
            'enhance_prompt': 'yes',
        }
        headers = {
            'Content-Type': 'application/json'
        }
        response = requests.post(api_url, headers=headers, json=params)

        # Check for errors in the API response
        if response.status_code != 200:
            return Response({'error': 'Image generation failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Save the generated image to the database
        image_url = response.json()['output'][0]
        generated_image = GeneratedImage(user=user, text=text, image_url=image_url)
        generated_image.save()

        # Serialize the generated image and return it in the response
        serializer = GeneratedImageSerializer(generated_image)
        return Response(serializer.data, status=status.HTTP_201_CREATED)




class WaitListViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def get_email(self, request):
        email = request.data.get('email')
        
        # Check if the email already exists
        if WaitList.objects.filter(email=email).exists():
            return Response(status=status.HTTP_409_CONFLICT)
        
        if email:
            WaitList.objects.create(email=email)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
