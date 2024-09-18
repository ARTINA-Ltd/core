from distutils.log import error
from django.contrib.auth.models import User
from datetime import timedelta
import random
from Account.models import Profile
from exhibition import serializers
from .models import Exhibition
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Exhibition, Application , Category , Ticket 
from .serializers import ExhibitionSerializer, ApplicationSerializer , CategorySerializer ,TicketSerializer
from core.serializers import NFTSerializer
from core.models import NFT 
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action
from django.shortcuts import redirect                  
from Account.views import updating_balance,check_balance
from rest_framework import status as drf_status
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Exhibition, Ticket
from .serializers import ExhibitionSerializer
import os
import requests
from django.conf import settings
from django.utils import timezone
from django.db.models import Q

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
        return Exhibition.objects.filter(user=user, start_date__lte=now, end_date__gte=now)

class ExhibitorClosedExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        return Exhibition.objects.filter(exhibitor=user, end_date__lt=now)

class ArtistOpenExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        return Exhibition.objects.filter(applications__nft__owner=user, start_date__lte=now, end_date__gte=now)

class ArtistClosedExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        return Exhibition.objects.filter(applications_nft__owner=user, end_date__lt=now)

class OpenForArtistRegistrationExhibitionsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ExhibitionSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        now = timezone.now()
        return Exhibition.objects.filter(start_date__lte=now, end_date__gte=now, application_deadline__gte=now)
        # .exclude(nfts__owner=user)



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


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
        # if len(nft_objs) > 5:
        #     return Response(
        #         {'error': 'You must select exactly 5 NFTs for your application.'},
        #         status=status.HTTP_400_BAD_REQUEST
        #     )

        try:
            # Create a new application object and associate the selected NFTs with it
            application = serializer.save(artist=self.request.user)
            application.nft.set(nft_objs)

            # Set in_exhibition to True for all NFTs in this application
            for nft in nft_objs:
                nft.in_exhibition = True
                nft.save()
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
            exhibition= application.exhibition
        except Application.DoesNotExist:
            return Response({'error': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

        action = request.data.get('action', None)
        if action not in ['accept', 'ignored']:
            return Response({'error': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)
        nfts = application.nft.all()

        if action == 'accept':
            application.status = 'accepted'
            for nft in nfts:
                nft.is_for_sale = True
                nft.start_date= exhibition.start_date
                nft.end_date= exhibition.end_date                
                nft.save()            
        elif action == 'ignored':
            application.status = 'ignored'
            for nft in nfts:
                nft.in_exhibition = False              
                nft.save()
        application.save()
        serialized_data = ApplicationSerializer(application).data
        return Response(serialized_data, status=status.HTTP_200_OK)



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
        
    @action(detail=False, methods=['post'])
    def has_ticket(self, request):
        exhibition_id = request.data.get('exhibition_id')
        exhibition = get_object_or_404(Exhibition, pk=exhibition_id)
        has_ticket = exhibition.has_ticket
        if has_ticket==True : 
            return Response({'has_ticket': 'True'})
        else :
            return Response({'has_ticket': 'False'})


class OpenExhibitionListView(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Exhibition.objects.all()
    serializer_class = serializers.ExhibitionSerializer
    def get(self, request):
        open_exhibitions = Exhibition.objects.filter(status='open')
        serialized_data = ExhibitionSerializer(open_exhibitions, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)



class NFTsByExhibitionViewSet(viewsets.ModelViewSet):
    queryset = Exhibition.objects.all()
    serializer_class = ExhibitionSerializer
    @action(detail=True, methods=['get'])

    def get_nfts(self, request, pk=None):
        try:
            exhibition = self.get_object()
            applications = Application.objects.filter(exhibition=exhibition,status='accepted')
            nfts = NFT.objects.filter(applications__in=applications)
            serializer = NFTSerializer(nfts, many=True)
            return Response(serializer.data)
        except Exhibition.DoesNotExist:
            return Response({"error": "Exhibition not found"}, status=404)

    # # Define allowed actions for the viewset
    # def get_permissions(self):
    #     if self.action == 'get_nfts':
    #         permission_classes = []
    #     else:
    #         permission_classes = [IsAuthenticated]  # Add appropriate permissions here
    #     return [permission() for permission in permission_classes]



class TicketViewSet(viewsets.ViewSet):
    queryset = Ticket.objects.all()
    serializer_class = serializers.TicketSerializer
    def create(self, request):
        user=self.request.user
        exhibition_id=request.data.get("exhibition_id")
        exhibition = Exhibition.objects.get(id=exhibition_id)
        price=request.data.get("price")
        expiration_date = timezone.now() + timedelta(days=10)
        random_number = random.randint(1000, 9999)
        ticket_id = int(str(random_number)+"00"+str(exhibition_id))
        ticket = Ticket.objects.create(
        ticket_id=ticket_id,
        exhibition=exhibition,
        user=user,
        price=price,
        expiration_date=expiration_date
        )
        return Response(status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def get_user_tickets(self, request):
        user = self.request.user
        tickets = Ticket.objects.filter(user=user)
       
        # Prepare the data to include exhibition name, price, and ticket info
        ticket_data = []
        for ticket in tickets:
            ticket_info = {
                'ticket_id': ticket.ticket_id,
                'exhibition_id': ticket.exhibition.id,
                'exhibition_name': ticket.exhibition.marketName,
                'exhibition_price': ticket.exhibition.price,
                'expiration_date': ticket.exhibition.end_date,
            }
            ticket_data.append(ticket_info)
       
        return Response(ticket_data)
    #adding price of ticket to the data it pass
   
    @action(detail=False, methods=['post']) 
    def check_user_ticket(self,request):
        user = self.request.user
        exhibition_id=request.data.get("exhibition_id")
        exhibition = Exhibition.objects.filter(id=exhibition_id).first()
        ticket=None
        ticket = Ticket.objects.filter(user=user,exhibition=exhibition).first()
        if ticket==None : 
                    return Response({"user_has_ticket":"False"})
        else : 
                    return Response({"user_has_ticket":"True"})

    @action(detail=False, methods=['post'])
    def buy_ticket(self, request, *args, **kwargs):
        user = self.request.user
        exhibition_id = request.data.get("exhibition_id")  
        exhibition=None
        exhibition= Exhibition.objects.filter(id=exhibition_id).first()
        amount=exhibition.price
        if amount is None or amount == 0 :
            return Response({"error": "this exhibition need no ticket."}, status=status.HTTP_400_BAD_REQUEST)

        user_ticket=None
        user_ticket = Ticket.objects.filter(user=user,exhibition=exhibition).first()
        if user_ticket :
            return Response({"error": "you have the ticket."}, status=status.HTTP_400_BAD_REQUEST)

        else :

            profile=Profile.objects.get(user=user)
            res=check_balance(amount=exhibition.price, user_id=user.id)
            if res.status_code==400 :
                    return Response({"error": "insufficient balance."},status=status.HTTP_400_BAD_REQUEST)
         
            updating_balance(user_id=user.id, currency='rial', amount=exhibition.price, side="withdrawal")
            ticket=Ticket.objects.create(user=user, exhibition=exhibition)
            # Send the SMS via Kavenegar API
            response = requests.post(
                        f"https://api.kavenegar.com/v1/"
                        f"4B2B714533707372774D45784D46535A43413648743058714E52345243614E53674947356C6B326B7737673D"
                        f"/verify/lookup.json",
                        data={
                        "receptor": profile.phone_number,
                        "token": user.username,
                        "token2": ticket.id,
                        "token3": exhibition.marketName,
                        "template": "TicketVerification"
                        }
                        )
            print(response)
            return Response({'message': 'You bought the ticket.'}, status=status.HTTP_200_OK)




    @action(detail=False, methods=['post'])
    def get_exhibition_tickets(self, request):
        exhibition_id = request.data.get('exhibition_id')
        exhibition = Exhibition.objects.filter(id=exhibition_id).first()
        tickets = Ticket.objects.filter(exhibition=exhibition)
        serializer = serializers.TicketSerializer(tickets, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def calculate_exhibition_revenue(self, request):
        exhibition_id = request.data.get('exhibition_id')
        exhibition=Exhibition.objects.get(id=exhibition_id)
        tickets = exhibition.tickets.all() 
        total = 0
        for ticket in tickets: 
            total += ticket.price * 0.8
        return Response({'revenue': total})

    @action(detail=False, methods=['get'])
    def calculate_user_revenue(self, request):
        user_id = self.request.user
        exhibitions = Exhibition.objects.filter(user_id=user_id)
        total = 0
        for exhibition in exhibitions:
            tickets = exhibition.tickets.all()
            for ticket in tickets:
                total += ticket.price * 0.8  
        return Response({'revenue': total})









class ExTicketViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ExhibitionSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def get_queryset(self):
    #     user = self.request.user
    #     now = timezone.now()
    #     queryset = Exhibition.objects.filter(start_date__lte=now, end_date__gte=now)
    #     ticket_exhibitions = Ticket.objects.filter(user=user).values_list('exhibition_id', flat=True)
    #     for exhibition in queryset:
    #         exhibition.has_ticket = exhibition.tickets.exists()
    #         exhibition.user_has_ticket = exhibition.id in ticket_exhibitions
    #     return queryset
    def get_queryset(self):
        now = timezone.now()

        queryset = Exhibition.objects.filter(start_date__lte=now, end_date__gte=now)
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        user = self.request.user
        ticket_exhibitions = Ticket.objects.filter(user=user).values_list('exhibition_id', flat=True)
        for exhibition_data in data:
            exhibition_data['user_has_ticket'] = exhibition_data['has_ticket'] and exhibition_data['id'] in ticket_exhibitions
            exhibition_data['has_ticket']=exhibition_data['has_ticket'] or exhibition_data['id'] in ticket_exhibitions 
        return Response(data)





class UserPastExhibitionsViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def get_user_past_exhibitions(self, request):
        user = self.request.user 
        current_datetime = timezone.now()
        user_exhibitions = Exhibition.objects.filter(user=user, end_date__lt=current_datetime)
        serialized_exhibitions = ExhibitionSerializer(user_exhibitions, many=True) 
        return Response(serialized_exhibitions.data)



class AcceptedExhibitionsViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def get_accepted_exhibitions(self, request):
        user = self.request.user  # Assuming the user is authenticated
        accepted_applications = Application.objects.filter(artist=user, status='accepted')
        accepted_exhibitions = Exhibition.objects.filter(applications__in=accepted_applications)
        serialized_exhibitions = ExhibitionSerializer(accepted_exhibitions, many=True)
        return Response(serialized_exhibitions.data)




class ProcessExhibitionDeadlineViewSet(viewsets.ViewSet):
    def create(self, request, *args, **kwargs):
        # Get exhibitions with application deadlines that have passed
        current_datetime = timezone.now()
        expired_exhibitions = Exhibition.objects.filter(
            Q(application_deadline__lte=current_datetime)
        )
        
        # Define the base path for exhibition images
        folder_base_path = os.path.join(settings.MEDIA_ROOT, 'exhibition_images')
        
        for exhibition in expired_exhibitions:
            folder_name = str(exhibition.id)
            folder_path = os.path.join(folder_base_path, folder_name)
            os.makedirs(folder_path, exist_ok=True)
            
            for application in exhibition.applications.all():
                for nft in application.nft.all():
                    # Download the image from the URL
                    image_url = nft.image_url
                    response = requests.get(image_url)
                    if response.status_code == 200:
                        image_data = response.content
                        # Save the image to the exhibition folder
                        image_filename = os.path.basename(image_url)
                        new_image_path = os.path.join(folder_path, image_filename)
                        with open(new_image_path, 'wb') as f:
                            f.write(image_data)
        
        return Response({'message': 'Exhibition deadlines processed successfully.'}, status=status.HTTP_200_OK)


    @action(detail=False, methods=['post'])
    def checkExhibitionDeadline(self,request):
        user=self.request.user
        id=request.data.get("id")
        current_datetime = timezone.now()
        expired_exhibition=None
        expired_exhibition = Exhibition.objects.filter(Q(application_deadline__lte=current_datetime)
        ,id=id).first()
        if expired_exhibition!=None :
            return Response({'message': 'you will get your virtual exhibition today! .'}, status=status.HTTP_200_OK)
        else :
            return Response({'message': 'your exhibition deadline is not expired.'}, status=status.HTTP_400_BAD_REQUEST)



