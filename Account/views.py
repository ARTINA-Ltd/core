from .models import *
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework.response import Response
from . import serializers
import random
import requests
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import PasswordResetView
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import Payment
from .models import UserBalance, TransactionType, TransactionCurrency, TicketUser
from .serializers import UserBalanceSerializer
from django.utils import timezone


class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer

    def create(self, request, *args, **kwargs):
        # Check if the username, phone_number, or email already exists in the database
        username = request.data.get('username')
        phone_number = request.data.get('phone_number')
        email = request.data.get('email')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'This email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user if the username, phone_number, and email are all unique
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class LoginViewSet(viewsets.ViewSet):

    serializer_class = serializers.LoginSerializer

    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(response_data, status=status.HTTP_200_OK)

class SubdomainMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host()
        subdomain = host.split('.')[0] if '.' in host else None
        request.subdomain = subdomain
        response = self.get_response(request)
        return response



class UserInfoViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)

        data = {
            'id': user.id,
            'username': user.username,
            'first_name': profile.first_name,
            'last_name': profile.last_name,
            'national_code': profile.national_code,
            'birthdate': profile.birthdate,
            'phone_number': profile.phone_number,
            'phone_number_verified':profile.phone_number_verified,
            'cell_number': profile.cell_number,
            'address': profile.address,
            'national_card_picture': profile.national_card_picture,
            'profile_picture': profile.profile_picture,
            'email': user.email,
            'role': str(profile.role),
            'shaba_number':profile.shaba_number,
            'postal_code':profile.postal_code
        }
        return Response(data)

class ArtistRateViewSet(viewsets.ModelViewSet):
    queryset = ArtistReviewRating.objects.all()
    serializer_class = serializers.ArtistRatingSerializer

    # permission_classes = [IsAuthenticated]
    def create(self, request, *args, **kwargs):
        serializer = serializers.ArtistRatingSerializer
        serializer = serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors)
        data = serializer.validated_data
        print("test " + str(data))
        rate_obj = ArtistReviewRating.objects.filter(user=data["user"], artist=data["artist"]).first()
        if rate_obj is None:
            return super().create(request, *args, **kwargs)
        else:
            rate_obj.review = data["review"]
            rate_obj.rating = data["rating"]
            rate_obj.save()
            return Response(serializers.ArtistRatingSerializer(rate_obj).data)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    # permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = self.get_queryset().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data.copy()
        data['user'] = request.user.id

        phone_number = data.get('phone_number')

        if Profile.objects.filter(phone_number=phone_number).exists():
            return Response({'error': 'This phone number is already registered.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

    def retrieve(self, request, pk=None):
        profile = self.get_object()
        if profile.user != reeth_unavailable_balancequest.user:
            return Response({'error': 'You do not have permission to access this profile.'}, status=403)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def update(self, request, pk=None):
        profile = self.get_object()
        if profile.user != request.user:
            return Response({'error': 'You do not have permission to update this profile.'}, status=403)
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        profile = self.get_object()
        if profile.user != request.user:
            return Response({'error': 'You do not have permission to delete this profile.'}, status=403)
        profile.delete()
        return Response(status=204)

import random

import uuid


class TicketViewSet(viewsets.ViewSet):

    def create(self, request):
        user = request.user
        is_authenticated = user.is_authenticated
        email = request.data.get('email')
        name = request.data.get('name')
        last_name = request.data.get('last_name')
        subject = request.data.get('subject')
        phone_number = request.data.get('phone_number')
        image_url = request.data.get('image_url')
        text = request.data.get('text')

        if not subject:
            return Response({'error': 'subject is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not text:
            return Response({'error': 'text is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not is_authenticated:
            if not email:
                return Response({'error': 'email is required.'}, status=status.HTTP_400_BAD_REQUEST)
            user = None

        ticket_count = TicketUser.objects.filter(user=user).count()
        if ticket_count >= 5:
            raise PermissionDenied("You have reached the maximum number of tickets.")
        unique_id = random.randint(100000, 999999)
        TicketUser.objects.create(user=user, email=email, subject=subject, text=text, ticket_id=unique_id)

        return Response({'success': 'Ticket created successfully.','token':unique_id}, status=status.HTTP_201_CREATED)



class PhoneVerificationViewSet(viewsets.ViewSet):
    queryset = PhoneVerification.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.is_authenticated:
            queryset = queryset.filter(user=user)
        return queryset

    def create(self, request, pk=None):
        user = self.request.user
        phone_number = request.data.get('phone_number')
        verification_code = request.data.get("verification_code")
        phone_verification = PhoneVerification.objects.get(phone_number=phone_number)
        if phone_verification.verification_code == verification_code:
            profile=Profile.objects.filter(user=user).first()
            profile.phone_number_verified  = True
            profile.save()
            phone_verification.delete()
            return Response({"status": "success"})
        else:
            return Response({"status": "error", "error": "verification code is not correct"},
                            status.HTTP_400_BAD_REQUEST)


class SendVerificationCodeViewSet(viewsets.ViewSet):
    # permission_classes = [AllowAny]

    def create(self, request, format=None):
        phone_number = request.data.get('phone_number')
        user = User.objects.get(profile__phone_number=phone_number)
        if not phone_number:
            return Response({'error': 'phone_number is required.'}, status.HTTP_400_BAD_REQUEST)

        if not user:
            return Response({'error': 'user does not exist.'}, status.HTTP_400_BAD_REQUEST)

        verification_code = random.randint(100000, 999999)
        phone_verification = PhoneVerification.objects.filter(user=user).first()
        if phone_verification:
            # Update the existing PhoneVerification object with the new verification code
            phone_verification.verification_code = verification_code
            phone_verification.save()
            
        else:
            PhoneVerification.objects.create(user=user, phone_number=phone_number, verification_code=verification_code)
            print(f"Verification code for {phone_number}: {verification_code}")

        # Send the SMS via Kavenegar API
        # The URL IS like : https://api.kavenegar.com/v1/{API-KEY}/verify/lookup.json
        response = requests.post(
            f"https://api.kavenegar.com/v1/"
            f"4B2B714533707372774D45784D46535A43413648743058714E52345243614E53674947356C6B326B7737673D"
            f"/verify/lookup.json",
            data={
                "receptor": phone_number,
                "token": verification_code,
                "template": "SMSVerify"
            }
        )

        if response.status_code == 200:
            # Create a new PhoneVerification object to store the code

            return Response({'status': 'success'})
        else:
            # Handle error response
            return Response({'status': 'failed'})
from datetime import datetime, timedelta
from django.db.models import Q , Sum
class UserTurnoverViewSet(viewsets.ModelViewSet):
    queryset = UserTurnover.objects.all()
    serializer_class = serializers.UserTurnoverSerializer
    # permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        #request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)
    
    
    @action(detail=False, methods=['get'])
    def turnover_in_month(self, request):
        user = self.request.user
        turnovers = UserTurnover.objects.filter(user=user)
        
        # Calculate turnover for the last month
        today = datetime.now().date()
        last_month = today - timedelta(days=30)
        last_month_turnover = turnovers.filter(
            Q(date__gte=last_month) & Q(date__lte=today)
        ).aggregate(Sum('transaction_value'))['transaction_value__sum'] or 0

        data = {
            'last_month_turnover': last_month_turnover,
            'all_turnovers': serializers.UserTurnoverSerializer(turnovers, many=True).data,
        }

        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_last_ten(self, request):
        queryset = self.get_queryset().order_by('-id')[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = self.get_last_ten(queryset)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UserBalanceViewSet(viewsets.ModelViewSet):
    queryset = UserBalance.objects.all()
    serializer_class = UserBalanceSerializer
    # permission_classes = [IsAuthenticated]
    @action(detail=False, methods=['get'])
    def get_balance(self, request):
        user = self.request.user
        user_balance = UserBalance.objects.filter(user=user).first()
        if not user_balance:
            return Response({'error': 'User balance not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        balance = {
            'rial_available_balance': user_balance.rial_available_balance,
            'rial_unavailable_balance': user_balance.rial_untradable_balance,
            'eth_balance': user_balance.eth_balance,
            'eth_unavailable_balance' : user_balance.eth_unavailable_balance
            
            # Add other balance fields as needed
        }

        return Response(balance, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def updating_balance(self, request):
        user = self.request.user
        currency = request.data.get('currency').lower()
        amount = request.data.get('amount')
        name=request.data.get('transaction_type')
        if not currency or not amount:
            return Response({'error': 'Both currency and amount are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            amount = int(amount)
        except ValueError:
            return Response({'error': 'Invalid amount value.'}, status=status.HTTP_400_BAD_REQUEST)

        transaction_type = TransactionType.objects.get(name=name)
        transaction_currency = TransactionCurrency.objects.get(name=currency)

        if currency == 'rial':
            user_balance_field = 'rial_available_balance'
        elif currency == 'eth':
            user_balance_field = 'eth_balance'
        else:
            return Response({'error': 'Invalid currency.'}, status=status.HTTP_400_BAD_REQUEST)
        user_balance=None
        user_balance = UserBalance.objects.filter(user=user).first()
        if name=="deposit":
            if user_balance :
                n=user_balance.rial_available_balance 
                n=n+ amount
                user_balance.rial_available_balance =n
                user_balance.save()
            else :
                user_balance = UserBalance.objects.create(rial_available_balance=amount,user=user)
        elif name=="withraw" :
            if user_balance :
                n=user_balance.rial_available_balance 
                n=n- amount
                user_balance.rial_available_balance =n
                user_balance.save()
            else :
                return Response({'error': 'you have no money to withdraw.'}, status=status.HTTP_400_BAD_REQUEST)


        UserTurnover.objects.create(user=user, transaction_type=transaction_type, 
                                    transaction_currency=transaction_currency, transaction_value=amount)

        return Response({'success': 'Balance changed successfully.'}, status=status.HTTP_200_OK)



class PasswordResetByPhoneViewSet(viewsets.ViewSet):
    def create(self, request):
        phone_number = request.data.get('phone_number')
        token = request.data.get('token')
        password = request.data.get('password')

        try:
            user = User.objects.get(profile__phone_number=phone_number)
        except ObjectDoesNotExist:
            return Response({'error': 'User with this phone number does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        phone_verification = PhoneVerification.objects.get(phone_number=phone_number)
        if phone_verification.verification_code == token:
            phone_verification.delete()
        # Set the new password and log the user in
            user.set_password(password)
            user.save()
            return Response({'success': 'Password reset successful.'}, status=status.HTTP_200_OK)

        else:

            return Response({"status": "error", "error": "verification code is not correct"},
                    status.HTTP_400_BAD_REQUEST)




                    
from .serializers import UserInfoSerializer

class UserPictureViewSet(viewsets.ViewSet):
    serializer_class = UserInfoSerializer
    def retrieve(self, request, pk=None):
        queryset = Profile.objects.filter(user_id=pk)
        profile = get_object_or_404(Profile.objects.filter(user_id=pk), pk=pk)
        serializer = serializers.UserInfoSerializer(profile)
        print(profile)
        return Response(serializer.data)







class PaymentGateViewSet(viewsets.ViewSet):
    def create(self, request, *args, **kwargs):
        user = self.request.user
        amount = request.data.get("amount")  
        email= user.profile.email
        response = self.send_payment_request(amount)
        if response.status_code == 200:
            payment_info = response.json()
            print(payment_info)
            # data=payment_info[1].get('data')
            authority = payment_info['data']['authority']
            payment = Payment.objects.create(user=user, amount=amount, authority=authority)
            redirect_url = self.get_redirect_url(payment)
            return Response({'url': redirect_url}, status=status.HTTP_200_OK)
        else:
            return Response(response.json(), status=response.status_code)

    @action(detail=False, methods=['get'])
    def verify(self, request):
        authority = request.GET.get('Authority')
        payment = Payment.objects.get(authority=authority)

        response = self.verify_payment(payment.amount, payment.authority)
        if response.status_code == 200:
            verification_info = response.json()
            status = verification_info['data']['code']
            if status == 100:
                payment.is_paid = True
                payment.save()
                return Response({'status': 'success'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'failure'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(response.json(), status=response.status_code)

    def send_payment_request(self, amount):
        user=self.request.user
        mobile=user.profile.phone_number
        email=user.profile.email
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
        response = requests.post(url, headers=headers, json=data)
        return response

    def get_redirect_url(self, payment):
        return f'https://www.zarinpal.com/pg/StartPay/{payment.authority}'