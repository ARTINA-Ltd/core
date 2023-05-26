from distutils.log import error
from django.contrib.auth.models import User

from exhibition import models
from exhibition import serializers

from rest_framework import viewsets
# from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import NFT, Exhibition, Application
from .serializers import NFTSerializer, ExhibitionSerializer, ApplicationSerializer
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action


class UserExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer

    def get_queryset(self):
        user = self.request.user
        return Exhibition.objects.filter(user=user)


class ExhibitorOpenExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        return Exhibition.objects.filter(exhibitor=user, start_date__lte=now, end_date__gte=now)

class ExhibitorClosedExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        return Exhibition.objects.filter(exhibitor=user, end_date__lt=now)

class ArtistOpenExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        return Exhibition.objects.filter(nfts__owner=user, start_date__lte=now, end_date__gte=now)

class ArtistClosedExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        return Exhibition.objects.filter(nfts__owner=user, end_date__lt=now)

class OpenForArtistRegistrationExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        return Exhibition.objects.filter(start_date__lte=now, end_date__gte=now, application_deadline__gte=now)
        # .exclude(nfts__owner=user)



class IsExhibitorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.exhibition.exhibitor == request.user

class ExhibitionViewSet(viewsets.ModelViewSet):
    queryset = Exhibition.objects.all()
    serializer_class = serializers.ExhibitionSerializer
    # permission_classes = [IsExhibitorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ApplicationSerializer
    # permission_classes = [permissions.IsAuthenticated, IsExhibitorOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Application.objects.all()
        else:
            return Application.objects.filter(exhibition__user=user)

    def create(self, request):
        # Validate request data using the updated serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Extract relevant fields from validated data
        exhibition = serializer.validated_data['exhibition']
        contract_accepted = serializer.validated_data['contract_accepted']
        nft_objs = serializer.validated_data['nft']

        # Check if the user has accepted the exhibition contract
        if not contract_accepted:
            return Response(
                {'error': 'You must accept the exhibition contract before submitting your application.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if the user has selected exactly 5 NFTs for their application
        if len(nft_objs) > 5:
            return Response(
                {'error': 'You must select exactly 5 NFTs for your application.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Create a new application object and associate the selected NFTs with it
            application = serializer.save(artist=self.request.user)
            application.nft.set(nft_objs)

            # Serialize the new application object and return it in the response
            serializer = ApplicationSerializer(instance=application)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except NFT.DoesNotExist:
            # Return error response if any of the provided NFT IDs do not exist
            return Response(
                {'error': 'One or more selected NFTs do not exist.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, pk=None):
        application = get_object_or_404(Application.objects.filter(exhibition__user=request.user,status="pending"), pk=pk)
        serializer = self.get_serializer(application)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])

    def exhibitor_applications(self, request):
        exhibitor_id = request.user.id
  
        applications = Application.objects.filter(exhibition__user__id=exhibitor_id, status="pending")
        serialized_data = self.get_serializer(applications, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        if 'exhibitor_id' in request.query_params:
            return self.exhibitor_applications(request)
        return super().list(request, *args, **kwargs)
    
    def update(self, request, pk=None):
        try:
            application = Application.objects.get(id=pk, exhibition__user=request.user)
        except Application.DoesNotExist:
            return Response({'error': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

        action = request.data.get('action', None)
        if action not in ['accept', 'ignored']:
            return Response({'error': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

        if action == 'accept':
            application.status = 'accepted'
        elif action == 'ignored':
            application.status = 'ignored'

        application.save()
        serialized_data = ApplicationSerializer(application).data
        return Response(serialized_data, status=status.HTTP_200_OK)




# class ExhibitorApplicationsViewSet(viewsets.ViewSet):
#     # permission_classes = [IsAuthenticated]

#     def update(self, request, pk=None):
#         try:
#             application = Application.objects.get(id=pk, exhibition__user=request.user)
#         except Application.DoesNotExist:
#             return Response({'error': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

#         action = request.data.get('action', None)
#         if action not in ['accept', 'ignored']:
#             return Response({'error': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

#         if action == 'accept':
#             application.status = 'accepted'
#         elif action == 'ignored':
#             application.status = 'ignored'

#         application.save()
#         serialized_data = ApplicationSerializer(application).data
#         return Response(serialized_data, status=status.HTTP_200_OK)


class ExhibitionInfoView(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Exhibition.objects.all()
    serializer_class = serializers.ExhibitionSerializer
    def get(self, request, exhibition_id):
        try:
            exhibition = Exhibition.objects.get(id=exhibition_id)
        except Exhibition.DoesNotExist:
            return Response({'error': 'Exhibition not found.'}, status=status.HTTP_404_NOT_FOUND)

        serialized_data = ExhibitionSerializer(exhibition).data
        response_data = {
            'title': serialized_data['title'],
            'description': serialized_data['description'],
        }
        return Response(response_data, status=status.HTTP_200_OK)



class OpenExhibitionListView(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        open_exhibitions = Exhibition.objects.filter(status='open')
        serialized_data = ExhibitionSerializer(open_exhibitions, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)



class NFTByExhibitionViewSet(viewsets.ViewSet):
    def list(self, request, exhibition_id):
        try:
            exhibition = Exhibition.objects.get(id=exhibition_id)
        except Exhibition.DoesNotExist:
            return Response({'error': 'Exhibition not found'}, status=404)

        applications = Application.objects.filter(exhibition=exhibition, status:"accepted")
        nfts = NFT.objects.filter(applications__in=applications).distinct()

        serializer = NFTSerializer(nfts, many=True)
        return Response(serializer.data)
