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
from .models import Exhibition, Application , Category , Ticket , Ex_Payment
from .serializers import ExhibitionSerializer, ApplicationSerializer , CategorySerializer ,TicketSerializer
from core.serializers import NFTSerializer
from core.models import NFT 
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action
from django.shortcuts import redirect                  


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
        return Exhibition.objects.filter(applicatons_nft__owner=user, end_date__lt=now)

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
            applications = Application.objects.filter(exhibition=exhibition)
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

from rest_framework import status as drf_status


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
    def get_user_tickets(self,request):
        user = self.request.user
        tickets = Ticket.objects.filter(user=user)
        serializer = serializers.TicketSerializer(tickets, many=True)
        return Response(serializer.data)
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
        email= user.profile.email
        if amount is None or amount == 0 :
            return Response({"error": "this exhibition need no ticket."})

        user_ticket=None
        user_ticket = Ticket.objects.filter(user=user,exhibition=exhibition).first()
        if user_ticket :
            return Response({"error": "you have the ticket."})

        else :
            response = self.send_payment_request(amount)
            if response.status_code == 200:
                payment_info = response.json()
                print(f">>>>>{payment_info}")
                authority = payment_info['data']['authority']
                payment = Ex_Payment.objects.create(user=user, amount=amount, authority=authority,exhibition=exhibition)
                redirect_url = self.get_redirect_url(payment)

                return Response({'url': redirect_url}, status=status.HTTP_200_OK)
            else:
                return Response(response.json(), status=response.status_code)

    @action(detail=False, methods=['get'])

    def verify(self, request):    
        authority = request.GET.get('Authority')
        print("<<<<<verify>>>>>>")
        payment = Ex_Payment.objects.get(authority=authority)
        failure_url = f'http://artina.org/payment_status/?status=failed&authority={authority}'
        user = self.request.user
        exhibition = None  # Define exhibition here
        response = self.verify_payment(payment.amount, payment.authority)

        # Redirect to your React front-end with payment status
        success_url = f'http://artina.org/payment_status/?status=success&authority={authority}'
        profile=Profile.objects.get(user=user)
        if response.status_code == 200:
            verification_info = response.json()
            verification_status = verification_info['data']['code'] 
            if verification_status == 100:
                payment.is_paid = True
                payment.save()

                # Fetch the exhibition associated with the payment
                exhibition = Exhibition.objects.get(id=payment.exhibition_id)

                ticket=Ticket.objects.create(user=user, exhibition=exhibition)
                # Send the SMS via Kavenegar API
                # The URL IS like : https://api.kavenegar.com/v1/{API-KEY}/verify/lookup.json
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
                return redirect(success_url)
            else:
                return redirect(failure_url)
        else:
            return redirect(failure_url)
    

    def send_payment_request(self, amount):
        user=self.request.user
        mobile=user.profile.phone_number
        email=user.profile.email
        print("send payment")
        url = 'https://api.zarinpal.com/pg/v4/payment/request.json'
        headers = {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
        data = {
            'merchant_id': '21ab62e9-e04b-4da5-b8d1-1bd7fca78e41',
            'amount': amount,
            'callback_url': 'http://api.artina.org/api/account/payment/verify/',
            'description': 'Transaction description.', 
            'metadata': {'mobile': "09387731214", 'email': "zehi.sh@gmail.com"}
        }
        response = requests.post(url, headers=headers, json=data)
        return response

    def verify_payment(self, amount, authority):
        url = 'https://api.zarinpal.com/pg/v4/payment/verify.json'
        headers = {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
        data = {
            'merchant_id': '21ab62e9-e04b-4da5-b8d1-1bd7fca78e41',
            'amount': amount,
            'authority': authority
        }
        print("verifyP>>>>>")

        response = requests.post(url, headers=headers, json=data)
        return response

    def get_redirect_url(self, payment):
        return f'https://www.zarinpal.com/pg/StartPay/{payment.authority}'





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







from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from .models import Exhibition, Ticket
from .serializers import ExhibitionSerializer


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




import os
import requests
from django.conf import settings
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import Q
from .models import Exhibition, Application, NFT
# from .serializers import MyImageSerializer  # Import your image serializer

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



