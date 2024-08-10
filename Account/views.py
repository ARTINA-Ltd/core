from .models import *
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework.response import Response
from . import serializers
from rest_framework import status as drf_status
import logging
from django.core.exceptions import ObjectDoesNotExist
from .permissions import UserRolePermission
import random
import requests
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import PasswordResetView
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import UserBalanceSerializer , NotifyUserSerializer,UserInfoSerializer,withdrawal_listSerializer
from django.utils import timezone
import random
from django.core.exceptions import PermissionDenied
import uuid
from django.shortcuts import redirect                  
from datetime import datetime, timedelta
from django.db.models import Q , Sum
from decimal import Decimal, getcontext
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.http import JsonResponse
from rest_framework import status

#web3 exchange
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Wallet, Transaction, Withdrawal_list
from web3 import Web3, eth
import os
import time
import json
from django.conf import settings


class NotifyUserViewSet(viewsets.ModelViewSet):
    queryset = NotifyUser.objects.all()
    serializer_class = NotifyUserSerializer
    
    def create(self, request):
        serializer = NotifyUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        user = self.request.user
        return NotifyUser.objects.filter(user=user)
        
    @action(detail=False, methods=['get'])
    def notifList(self, request):
        user=self.request.user
        queryset = self.get_queryset().order_by('-id')[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    @action(detail=False, methods=['post'])

    def seenMsg(self,request):
        user=self.request.user
        notif_id = request.data.get('notif_id')
        notif=NotifyUser.objects.filter(id=notif_id).first()
        if notif.user != self.request.user:
            return Response({'error': 'You do not have permission to perform this action.'}, status=403)

        notif.message_seen = True
        notif.save()
        serializer = self.get_serializer(notif)
        return Response(serializer.data)


loggerReg = logging.getLogger('file_register')

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer

    def create(self, request, *args, **kwargs):
        # Check if the username, phone_number, or email already exists in the database
        username = request.data.get('username')
        phone_number = request.data.get('phone_number')
        email = request.data.get('email')
        is_foreigner = request.data.get('is_foreigner')
        loggerReg.info(f"Register attempt for username: {username}, email: {email}, phone_number: {phone_number}")  # Log the registration attempt

        if User.objects.filter(username=username).exists():
            loggerReg.warning(f"Username {username} already exists")  # Log if the username already exists
            return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            loggerReg.warning(f"Email {email} is already registered")  # Log if the email already exists
            return Response({'error': 'This email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user if the username, phone_number, and email are all unique
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        loggerReg.info(f"User registered successfully: {username}, email: {email}, phone_number: {phone_number}")  # Log successful registration
        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
   
    @action(detail=False, methods=['post'])
    def check_username (request,username):
        username = request.data.get('username')
        if User.objects.filter(username=username).exists():
            loggerReg.warning(f"Username {username} already exists")  # Log if the username already exists
            return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def check_email (request,email):
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            loggerReg.warning(f"Email {email} is already registered")  # Log if the email already exists
            return Response({'error': 'This email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)

loggerLog = logging.getLogger('file_login')

class LoginViewSet(viewsets.ViewSet):

    serializer_class = serializers.LoginSerializer

    def create(self, request):
        # logger.setLevel(logging.DEBUG)
        username = request.data.get('username')
        password = request.data.get('password')
        
        loggerLog.info(f"Login attempt for username: {username}")  # Log the login attempt
        
        user = authenticate(username=username, password=password)
        
        if user is None:
            loggerLog.warning(f"Invalid credentials for username: {username}")  # Log invalid credentials
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        profile = Profile.objects.get(user=user)
        loggerLog.info(f"Successful login for username: {username}")  # Log successful login
        
        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': str(profile.role),
            'nationaloty': str(profile.is_foreigner)
        }
        return Response(response_data, status=status.HTTP_200_OK)




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
            'email': profile.email,
            'email_verified':profile.email_verified,
            'role': str(profile.role),
            'shaba_number':profile.shaba_number,
            'card_number':profile.card_number,
            'postal_code':profile.postal_code,
            'bio':profile.bio,
            'user_verified':profile.user_verified,
            'is_foreigner':profile.is_foreigner
        }
        return Response(data)

class ArtistRateViewSet(viewsets.ModelViewSet):
    queryset = ArtistReviewRating.objects.all()
    serializer_class = serializers.ArtistRatingSerializer

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
        if profile.user != request.user:
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

# {"subject" :"jdfskhj" , "text":"skjdfkzs","email":"me@artina.org"}

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
        
        if is_authenticated:
            if not email:
                if hasattr(user, 'profile') and user.profile.email:
                    email = user.profile.email
                else:
                    email = "support@artina.org"

        if not subject:
            return Response({'error': 'subject is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not text:
            return Response({'error': 'text is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not is_authenticated:
            if not email:
                return Response({'error': 'email is required.'}, status=status.HTTP_400_BAD_REQUEST)
            user = None

        # Check if the user is exempt from the ticket limit
        exempt_users = [44]  # Example: List of user IDs exempt from the ticket limit
        if user.id in exempt_users:
            ticket_count = TicketUser.objects.filter(user=user).count()
        else:
            # Apply the regular ticket limit
            ticket_count = TicketUser.objects.filter(user=user).count()
            if ticket_count >= 5:
                raise PermissionDenied("You have reached the maximum number of tickets.")

        unique_id = random.randint(100000, 999999)
        TicketUser.objects.create(user=user, email=email, subject=subject, text=text, ticket_id=unique_id)

        return Response({'success': 'Ticket created successfully.','token':unique_id}, status=status.HTTP_201_CREATED)

class UserPictureViewSet(viewsets.ViewSet):
    serializer_class = UserInfoSerializer
    def retrieve(self, request, pk=None):
        queryset = Profile.objects.filter(user_id=pk)
        profile = get_object_or_404(Profile.objects.filter(user_id=pk), pk=pk)
        serializer = serializers.UserInfoSerializer(profile)
        print(profile)
        return Response(serializer.data)


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

            return Response({'status': 'success'})
        else:
            # Handle error response
            return Response({'status': 'failed'})

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer
    # permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        #request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)
    
    
    @action(detail=False, methods=['get'])
    def turnover_in_month(self, request):
        user = self.request.user
        turnovers = Transaction.objects.filter(user=user)
        
        # Calculate turnover for the last month
        today = datetime.now().date()


        data = {
            'all_turnovers': serializers.TransactionSerializer(turnovers, many=True).data,
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

    @action(detail=False, methods=['get'])
    def get_balance(self, request):
        user = self.request.user
        user_wallet = Wallet.objects.filter(user=user).first()
        print(f"user_wallet is: {user_wallet}")
        if not user_wallet:
            balance = {
            'matic_balance': 0,
            'eth_balance':0,
            'wallet_address' : ""
            # Add other balance fields as needed
            }
            return Response(balance, status=status.HTTP_200_OK)

        balance = polygon_w3.eth.getBalance(user_wallet.address)
        print(f"Balance: {balance}")
        user_wallet.balance=balance
        user_wallet.save
        balance = {
            'matic_balance': user_wallet.MATIC_balance,
            'wallet_address' : user_wallet.address,
            'eth_balance':user_wallet.ETH_balance

            # Add other balance fields as needed
        }

        return Response(balance, status=status.HTTP_200_OK)

class UserBalanceViewSet(viewsets.ModelViewSet):
    queryset = UserBalance.objects.all()
    serializer_class = UserBalanceSerializer
    permission_classes = [UserRolePermission]
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
            'eth_unavailable_balance' : user_balance.eth_untradable_balance,
            'matic_balance': user_balance.  matic_balance,
            'matic_unavailable_balance' : user_balance. matic_untradable_balance,
        }

        return Response(balance, status=status.HTTP_200_OK)
def check_balance(amount, user_id):
    user = User.objects.filter(id=user_id).first()
    balance = UserBalance.objects.filter(user=user).first()
    if not user or not balance:
        return JsonResponse({'error': 'User or balance not found.'}, status=status.HTTP_404_NOT_FOUND)
    if amount > balance.rial_available_balance:
        return JsonResponse({'error': 'You do not have enough money.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'message': 'You can use your balance.'}, status=status.HTTP_200_OK)

def updating_balance(user_id, currency, amount, side):
    # Fetch the user and user balance
    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    user_balance = UserBalance.objects.filter(user=user).first()
    if not user_balance:
        return JsonResponse({'error': 'User balance not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Mapping currency to the respective balance fields
    balance_fields = {
        'rial': 'rial_available_balance',
        'MATICTMN': 'matic_balance',
        'ETHTMN': 'eth_balance'
    }

    # Check if the currency is valid
    if currency not in balance_fields:
        return JsonResponse({'error': 'Invalid currency.'}, status=status.HTTP_400_BAD_REQUEST)

    # Get the appropriate balance field
    balance_field = balance_fields[currency]

    # Handle withdrawal
    if side == 'withdrawal':
        if getattr(user_balance, balance_field) < amount:
            return JsonResponse({'error': 'Insufficient balance.'}, status=status.HTTP_400_BAD_REQUEST)
        setattr(user_balance, balance_field, getattr(user_balance, balance_field) - amount)
    
    # Handle deposit
    elif side == 'deposit':
        setattr(user_balance, balance_field, getattr(user_balance, balance_field) + amount)
    
    else:
        return JsonResponse({'error': 'Invalid side. Use "deposit" or "withdrawal".'}, status=status.HTTP_400_BAD_REQUEST)

    # Save the updated balance
    user_balance.save()
    return JsonResponse({'success': 'Balance updated successfully.'}, status=status.HTTP_200_OK)




class WithdrawalViewSet(viewsets.ModelViewSet):
    queryset = Withdrawal_list.objects.all()
    serializer_class = Withdrawal_listSerializer

    
    @action(detail=False, methods=['post'])
    def create_request(self, request):
        user = self.request.user
        amount = request.data.get('amount')

        # Ensure the user has enough balance
        user_balance = UserBalance.objects.get(user=user)
        if int(amount) > user_balance.rial_available_balance:
            return Response({"detail": "Insufficient balance."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user has already made two withdrawal requests today
        today = now().date()
        requests_today = Withdrawal_list.objects.filter(user=user, created_at__date=today).count()
        if requests_today >= 2:
            return Response({"detail": "You can only make two withdrawal requests per day."}, status=status.HTTP_400_BAD_REQUEST)

        # Transfer the amount to untradable balance
        user_balance.rial_available_balance -= int(amount)
        user_balance.rial_untradable_balance += int(amount)
        user_balance.save()

        # Create the withdrawal request
        withdrawal = Withdrawal_list.objects.create(
            user=user,
            shaba_number=user_profile.shaba_number,
            amount=int(amount)
        )

        serializer = self.get_serializer(withdrawal)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def update_request(self, request, pk=None):
        withdrawal = self.get_object()
        if withdrawal.is_paid:
            return Response({"detail": "This withdrawal has already been processed."}, status=status.HTTP_400_BAD_REQUEST)

        # Process the withdrawal
        withdrawal.is_paid = True
        withdrawal.reference_number = request.data.get('reference_number')
        withdrawal.save()

        # Decrease the user's untradable balance
        user_balance = UserBalance.objects.get(user=withdrawal.user)
        user_balance.rial_untradable_balance -= withdrawal.amount
        user_balance.save()

        serializer = self.get_serializer(withdrawal)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def list_requests(self, request, *args, **kwargs):
    
        queryset = self.get_queryset()

        # Optional filters (e.g., by user, date, or status)
        user_id = request.query_params.get('user')
        if user_id:
            queryset = queryset.filter(user__id=user_id)

        date_from = request.query_params.get('date_from')
        if date_from:
            queryset = queryset.filter(created_at__gte=date_from)

        date_to = request.query_params.get('date_to')
        if date_to:
            queryset = queryset.filter(created_at__lte=date_to)

        is_paid = request.query_params.get('is_paid')
        if is_paid is not None:
            queryset = queryset.filter(is_paid=is_paid.lower() in ['true', '1'])

        # Paginate the result if needed
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # Serialize and return the data
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CryptoViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'])
    def BuyCrypto(self, request):
        user = self.request.user
        symbol = request.data.get('symbol')
        amount = float(request.data.get('amount'))  # Ensure amount is a float
        price = float(request.data.get('price'))  # Ensure price is a float

        # Calculate the total cost of the purchase
        total = amount * price

        # Check if the user has enough TMN balance to cover the purchase
        user_balance_check = check_balance(amount=total, user_id=user.id)
        if user_balance_check.status_code != status.HTTP_200_OK:
            return Response({'error': 'Purchase failed'}, status=status.HTTP_400_BAD_REQUEST)
         
        artina_balance_response = self.check_tmn_balance(total=total)
        if artina_balance_response['status'] != status.HTTP_200_OK:
            return Response({'error': 'Insufficient TMN balance to complete the purchase'}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed with creating the transaction
        transactionCurrency = TransactionCurrency.objects.filter(name=symbol).first()
        transactionINS = Transaction.objects.create(user=user, transaction_currency=transactionCurrency, amount=amount, side="BUY", status='Pending')

        # Make the API call to perform the purchase
        url = 'https://api.wallex.ir/v1/account/otc/orders'
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '9275|kkgikDJHhg66lr8aU8tX62bXexkJ5619Tn7RtZFf',
        }
        data = {
            'symbol': symbol,
            'side': "BUY",
            'amount': amount,
            'price': price,
        }
        response = requests.post(url, headers=headers, json=data)
        datam = response.json()

        if response.status_code == 201:
            transactionINS.status = 'completed'
            transactionINS.save()

            # Update the user's balance
            balance_update = self.updating_balance(user_id=user.id, currency=symbol, amount=amount, side="deposit")
            if balance_update.status_code != status.HTTP_200_OK:
                return Response({'error': 'Failed to update balance'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Purchase successful'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Purchase failed', 'details': datam}, status=status.HTTP_400_BAD_REQUEST)

    def check_tmn_balance(self, user, total):
        url = 'https://api.wallex.ir/v1/account/balances'
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '9275|kkgikDJHhg66lr8aU8tX62bXexkJ5619Tn7RtZFf',  # Replace with your actual API key
        }
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
            tmn_balance = float(data['result']['balances']['TMN']['value'])

            if total <= tmn_balance:
                return {'status': status.HTTP_200_OK, 'message': 'Sufficient balance'}
            else:
                return {'status': status.HTTP_400_BAD_REQUEST, 'message': 'Insufficient balance'}
        else:
            return {'status': response.status_code, 'message': 'Failed to retrieve account balances'}
            


    @action(detail=False, methods=['post'])
    def get_br(self,request):
        user = self.request.user
        id=user.id
        print(id)
        price=request.data.get("price")
        if not user:
            return JsonResponse({"error": "user is required"}, status=400)
        
        try:
            # Call the get_winner function
            result = self.BackBuyCrypto(id=id, symbol="ETHTMN",amount=0.001,price=price)

            # Check if result is a Response object (in case of errors within get_winner)
            if isinstance(result, Response):
                return result
            return JsonResponse(result, status=200)
        except Exception as e:
            # Catch and handle unexpected errors
            error_message = f"An unexpected error occurred: {str(e)}"
            print(error_message)  # Log error to console for debugging
            return JsonResponse({"error": error_message}, status=500)
            


    @action(detail=False, methods=['post'])
    def SellCrypto(self, request):
        user = self.request.user
        symbol = request.data.get('symbol') 
        amount = float(request.data.get('amount'))  # Ensure amount is a float
        price = float(request.data.get('price'))  # Ensure price is a float

        # Calculate the total value of the sale
        total = amount * price
        
        # Map for balance fields
        balance_fields = {
            'MATICTMN': 'matic_balance',
            'ETHTMN': 'eth_balance',
            'rial': 'rial_available_balance'
        }

        # Check if the symbol is valid
        if symbol not in balance_fields:
            return Response({'error': 'Invalid symbol.'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the appropriate balance field
        balance_field = balance_fields[symbol]
        user_balance = UserBalance.objects.get(user=user)

        # Use `getattr` to dynamically access the balance field
        current_balance = getattr(user_balance, balance_field)
        
        # Check if the user has sufficient balance
        if current_balance < amount:
            return Response({'error': 'Insufficient balance to complete the sale'}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed with creating the transaction
        transactionCurrency = TransactionCurrency.objects.filter(name=symbol).first()
        transactionINS = Transaction.objects.create(user=user, transaction_currency=transactionCurrency, amount=amount, side="SELL", status='Pending')

        # Make the API call to perform the sale
        url = 'https://api.wallex.ir/v1/account/otc/orders'
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '9275|kkgikDJHhg66lr8aU8tX62bXexkJ5619Tn7RtZFf',  
        }
        data = {
            'symbol': symbol, 
            'side': "SELL",
            'amount': amount,
            'price': price,
        }
        response = requests.post(url, headers=headers, json=data)
        datam = response.json()

        if response.status_code == 201:
            transactionINS.status = 'completed'
            transactionINS.save()

            # Update the user's balance
            setattr(user_balance, balance_field, current_balance - amount)
            user_balance.save()

            # Add the equivalent amount in rial to the user's rial balance minus a fee
            fee = 10000
            rial_amount = total - fee
            user_balance.rial_available_balance += rial_amount
            user_balance.save()

            # Optionally, send a notification via SMS
            try:
                phone_number = user.profile.phone_number
                response = requests.post(
                    "https://api.kavenegar.com/v1/4B2B714533707372774D45784D46535A43413648743058714E52345243614E53674947356C6B326B7737673D/verify/lookup.json",
                    data={
                        "receptor": phone_number,
                        "token1": user.profile.first_name,
                        "token2": rial_amount,
                        "template": "AccountChargeVerification"
                    }
                )
            except Profile.DoesNotExist:
                pass

            # Update ARTINA_Ballance
            artina = ARTINA_Ballance.objects.first()
            artina.artina_rial += fee
            artina.save()

            return Response({'message': 'Sale successful'}, status=status.HTTP_201_CREATED)
        else:
            transactionINS.status = 'failed'
            transactionINS.save()
            return Response({'error': 'Sale failed', 'info': datam}, status=status.HTTP_400_BAD_REQUEST)


    
    @action(detail=False, methods=['get'])
    def CryptoPrice_ETH(self, request, pk=None):
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '9275|kkgikDJHhg66lr8aU8tX62bXexkJ5619Tn7RtZFf',  # Replace 'your_api_key' with your actual API key
        }
    
        # Get ETH price
        url = 'https://api.wallex.ir/v1/account/otc/price'
        params = {
            'symbol': 'ETHTMN',
            'side': 'BUY',
        }
        response_BUY = requests.get(url, headers=headers, params=params)
    
        # Get MATIC price
        params = {
            'symbol': 'ETHTMN',
            'side': 'SELL',
        }
        response_SELL = requests.get(url, headers=headers, params=params)
    
        # Check if both requests were successful
        if response_BUY.status_code == 200 and response_SELL.status_code == 200:
            # Parse JSON responses
            buy_data = response_BUY.json()
            sell_data = response_SELL.json()
        
            # Extract prices
            buy_price = buy_data['result']['price']
            sell_price = sell_data['result']['price']
        
            # Create response data
            data = {
                "ETH_buy_price": buy_price,
                "ETH_sell_price": sell_price
            }
        
            return Response(data, status=200)
        else:
            # Handle errors
            error_message = {
                'error': 'Failed to retrieve price',
                'ETH_buy_response': response_BUY.text,
                'ETH_sell_response': response_SELL.text
            }
            status_code = response_BUY.status_code if response_BUY.status_code != 200 else response_SELL.status_code
            return Response(error_message, status=status_code)
    @action(detail=False, methods=['get'])
    def CryptoPrice_MATIC(self, request, pk=None):
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '9275|kkgikDJHhg66lr8aU8tX62bXexkJ5619Tn7RtZFf',  # Replace 'your_api_key' with your actual API key
        }
    
        # Get ETH price
        url = 'https://api.wallex.ir/v1/account/otc/price'
        params = {
            'symbol': 'MATICTMN',
            'side': 'BUY',
        }
        response_BUY = requests.get(url, headers=headers, params=params)
    
        # Get MATIC price
        params = {
            'symbol': 'MATICTMN',
            'side': 'SELL',
        }
        response_SELL = requests.get(url, headers=headers, params=params)
    
        # Check if both requests were successful
        if response_BUY.status_code == 200 and response_SELL.status_code == 200:
            # Parse JSON responses
            buy_data = response_BUY.json()
            sell_data = response_SELL.json()
        
            # Extract prices
            buy_price = buy_data['result']['price']
            sell_price = sell_data['result']['price']
        
            # Create response data
            data = {
                "MATIC_buy_price": buy_price,
                "MATIC_sell_price": sell_price
            }
        
            return Response(data, status=200)
        else:
            # Handle errors
            error_message = {
                'error': 'Failed to retrieve price',
                'MATIC_buy_response': response_BUY.text,
                'MATIC_sell_response': response_SELL.text
            }
            status_code = response_BUY.status_code if response_BUY.status_code != 200 else response_SELL.status_code
            return Response(error_message, status=status_code)


    @action(detail=False, methods=['get'])
    def CryptoPrice2(self, request, pk=None):
        url = 'https://api.wallex.ir/v1/account/otc/price'
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '9275|kkgikDJHhg66lr8aU8tX62bXexkJ5619Tn7RtZFf',  # Replace 'your_api_key' with your actual API key
        }
        params = {
            'symbol': 'ETHTMN',  # Assuming the symbol is passed as the primary key
            'side': 'BUY',
        }
        response = requests.get(url, headers=headers, params=params)
        

        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()
            return Response(data, status=response.status_code)
        else:
            return Response({'error': 'Failed to retrieve price','response':response}, status=response.status_code)
            

    @action(detail=False, methods=['post'])
    def CryptoWithdrawal(self, request):
        url = 'https://api.wallex.ir/v1/account/crypto-withdrawal'
        headers = {
        'Content-Type': 'application/json',
        'X-API-Key': '8777|XedUHicmAa4ghJXbKnpgt8LoxPbxyg9ebxo10nkU',  # Replace 'your_api_key' with your actual API key
        }
        data = {
            'coin': request.data.get('coin'),
            'network': request.data.get('network'),
            'value': request.data.get('value'),
            'wallet_address': request.data.get('wallet_address'),
        }

        try:
            response = requests.post(url, headers=headers, json=data)
            response.raise_for_status()  # This will raise an HTTPError if the HTTP request returned an unsuccessful status code

            if response.status_code == 200:
                return Response({'message': 'Withdrawal successful'}, status=response.status_code)
            else:
                return Response({'error': 'Withdrawal failed', 'details': response.json()}, status=response.status_code)

        except requests.exceptions.HTTPError as http_err:
            return Response({'error': 'HTTP error occurred', 'details': str(http_err)}, status=response.status_code)
        except Exception as err:
            return Response({'error': 'An error occurred', 'details': str(err)}, status=500)
        
    @action(detail=False, methods=['get'])

    def AccountBalance(self, request):
        url = 'https://api.wallex.ir/v1/account/balances'
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '9275|kkgikDJHhg66lr8aU8tX62bXexkJ5619Tn7RtZFf',  # Replace 'your_api_key' with your actual API key
        }
        response = requests.get(url, headers=headers)
        
        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()
            return Response(data, status=response.status_code)
        else:
            return Response({'error': 'Failed to retrieve account balances','response':response}, status=response.status_code)
    
    @action(detail=False, methods=['get'])

    def Market(self, request):
        url = 'https://api.wallex.ir/v1/markets'
        headers = {
            'Content-Type': 'application/json',
        }
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            return Response(data, status=response.status_code)
        else:
            return Response({'error': 'Failed to retrieve Market'}, status=response.status_code)


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








class PaymentGateViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        user = self.request.user
        amount_str = request.data.get("amount")  
        email= user.profile.email
        try:
            amount = int(amount_str)
        except ValueError:
            return Response({"error": "Invalid amount. Please provide a valid integer."}, status=status.HTTP_400_BAD_REQUEST)
        if amount < 1000:
            return Response({"error": "Amount must be at least 1000."}, status=status.HTTP_400_BAD_REQUEST)

        response = self.send_payment_request(amount)
        if response.status_code == 200:
            payment_info = response.json()
            print(payment_info)

            # Assuming payment_info structure is similar to what you provided
            if 'data' in payment_info:
                authority = payment_info['data'].get('authority')
                payment = Payment.objects.create(user=user, amount=amount, authority=authority)
                redirect_url = self.get_redirect_url(payment)
                return Response({'url': redirect_url}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid payment response from server."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(response.json(), status=response.status_code)

    @action(detail=False, methods=['get'])
    def verify(self, request):
        authority = request.GET.get('Authority')
        try:
            payment = Payment.objects.get(authority=authority)
        except Payment.DoesNotExist:
            failure_url = f'http://artina.org/payment_status/?status=failed&authority={authority}'
            return redirect(failure_url)
    
        failure_url = f'https://artina.org/payment_status/?status=failed&authority={authority}'
        success_url = f'https://artina.org/payment_status/?status=success&authority={authority}'
        user = payment.user
        response = self.verify_payment(payment.amount, payment.authority)

        if response.status_code == 200:
            verification_info = response.json()
            print(verification_info)
    
            if isinstance(verification_info, dict) and 'data' in verification_info:
                # Assuming 'data' could be a list or a dictionary
                if isinstance(verification_info['data'], list):
                    # Handle list case (if data is empty or multiple entries)
                    if not verification_info['data']:
                        return redirect(failure_url)
                    else:
                        data = verification_info['data'][0]  # Assuming you want the first item
                else:
                    data = verification_info['data']  # Handle dictionary case directly

                verification_status = data.get('code')

                if verification_status == 100:
                    payment.is_paid = True
                    payment.save()
                    payment.amount= payment.amount//10
                    transaction_currency = TransactionCurrency.objects.get(name="rial")
                    user_balance = UserBalance.objects.get(user=user)
    
                    if user_balance:
                        user_balance.rial_available_balance += payment.amount
                        user_balance.save()
                    else:
                        user_balance = UserBalance.objects.create(rial_available_balance=payment.amount, user=user)
                        
    
                    Transaction.objects.create(user=user, side='deposit', transaction_currency=transaction_currency,
                                               amount=payment.amount, status='completed')
    
                    profile = Profile.objects.get(user=user)
                    # Send SMS via Kavenegar API
                    response = requests.post(
                        f"https://api.kavenegar.com/v1/"
                        f"4B2B714533707372774D45784D46535A43413648743058714E52345243614E53674947356C6B326B7737673D"
                        f"/verify/lookup.json",
                        data={
                            "receptor": profile.phone_number,
                            "token": user.username,
                            "token2": payment.amount,
                            "template": "AccountChargeVerification"
                        }
                    )
                    return redirect(success_url)
                else:
                    return redirect(failure_url)
            else:
                return redirect(failure_url)
        else:
            return redirect(failure_url)


    def send_payment_request(self, amount):
        user = self.request.user
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





# Connect to the Polygon network
polygon_w3 = Web3(Web3.HTTPProvider("https://polygon.rpc.thirdweb.com"))

# Address of the WETH (Wrapped ETH) token on the Polygon network
WETH_CONTRACT_ADDRESS = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'

def get_balance(user):
    user_wallet = Wallet.objects.filter(user=user).first()
    
    if not user_wallet:
        return Response({"error": "Wallet not found for the user."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        # Get MATIC balance on Polygon
        matic_balance_wei = polygon_w3.eth.get_balance(user_wallet.address)
        matic_balance_matic = polygon_w3.fromWei(matic_balance_wei, 'ether')

        # Get WETH (Wrapped ETH) balance on Polygon
        weth_contract = polygon_w3.eth.contract(address=WETH_CONTRACT_ADDRESS, abi=[
            {
                'constant': True,
                'inputs': [{'name': '_owner', 'type': 'address'}],
                'name': 'balanceOf',
                'outputs': [{'name': 'balance', 'type': 'uint256'}],
                'type': 'function'
            }
        ])
        weth_balance_wei = weth_contract.functions.balanceOf(user_wallet.address).call()
        weth_balance_eth = polygon_w3.fromWei(weth_balance_wei, 'ether')

        return Response({
            "matic_balance": matic_balance_matic,
            "eth_balance": weth_balance_eth
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





#w3 = Web3(Web3.HTTPProvider("https://polygon.rpc.thirdweb.com"))
#test net w3 = Web3(Web3.HTTPProvider("https://mumbai.rpc.thirdweb.com"))
#def get_balance(user):
#    user_wallet = Wallet.objects.filter(user=user).first()
#    print(f"user_wallet is: {user_wallet}")
#    if not user_wallet:
#            balance = {
#            'matic_balance': 0,
#            'eth_balance':0,
#            'wallet_address' : "" }
#            return Response(balance, status=status.HTTP_200_OK)
#    else :
 #       balance = w3.eth.getBalance(user_wallet.address)
 #       print(f"Balance: {balance}")
        # user_wallet.balance=balance
        # user_wallet.save
        # balance = {
        #         'matic_balance': user_wallet.MATIC_balance,
        #         'wallet_address' : user_wallet.address,
        #         'eth_balance':user_wallet.ETH_balance

            # Add other balance fields as needed
            # }

#        return Response(balance, status=status.HTTP_200_OK)



class WalletViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def create_wallet(self, request):
        user = request.user

        # Check if the user already has a wallet
        if Wallet.objects.filter(user=user).exists():
            return Response({'message': 'Wallet already exists for this user.'}, status=status.HTTP_400_BAD_REQUEST)

        private_key = Web3.toHex(os.urandom(32))  # Generate a random private key
        account = polygon_w3.eth.account.privateKeyToAccount(private_key)

        wallet = Wallet.objects.create(user=user, address=account.address, private_key=private_key)
        
        return Response({'message': 'Wallet created successfully.', 'address': wallet.address}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def get_wallet_user(self, request):

        try:

            print(f"self is :>>>>>>>>>>>{self}")
            user = self.request.user        
            print(f"user is >>>>>>>>>>>>>>>>>>{user}")
                    
                    
        except KeyError as e:
            return Response(
                {"error": f"Missing required field: {e}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if Wallet.objects.filter(user=user).exists():
            userWallet=Wallet.objects.filter(user=user).first()
            author_address= userWallet.address
            return Response({'message': 'user has a wallet.', 'address': author_address}, status=status.HTTP_200_OK)

        else :
            private_key = Web3.toHex(os.urandom(32))  # Generate a random private key
            account = polygon_w3.eth.account.privateKeyToAccount(private_key)
            wallet = Wallet.objects.create(user=user, address=account.address, private_key=private_key)
            author_address=account.address
            return Response({'message': 'user wallet has created.', 'address': author_address}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def get_br(self,request):
        user = self.request.user
        if not user:
            return JsonResponse({"error": "user is required"}, status=400)
        
        try:
            # Call the get_winner function
            result = get_balance(user)
            # Check if result is a Response object (in case of errors within get_winner)
            if isinstance(result, Response):
                return result
            return JsonResponse(result, status=200)
        except Exception as e:
            # Catch and handle unexpected errors
            error_message = f"An unexpected error occurred: {str(e)}"
            print(error_message)  # Log error to console for debugging
            return JsonResponse({"error": error_message}, status=500)
            

# Initialize Web3 connection
def connect_with_retry():
    max_retries = 3
    retry_delay = 5  # seconds
    print("trying")
    retries = 0
    while retries < max_retries:
        try:
            w3 = Web3(Web3.HTTPProvider("https://mumbai.rpc.thirdweb.com"))
            if w3.isConnected():
                return w3
        except Exception as e:
            print(f"Error connecting: {e}")
        
        retries += 1
        time.sleep(retry_delay)
    
    raise Exception("Failed to connect to the Matic network.")

class EmailMixin(viewsets.ViewSet):
    queryset = PhoneVerification.objects.all()
    @action(detail=False, methods=['post'])
    def send_email(self,subject,recipient_email,message):
        # Email configuration
        smtp_server = 'mailservice9.irandns.com'
        smtp_port = 587 
        smtp_username = 'info@artina.org'
        smtp_password = '123qweasdZXC'
        sender_email = 'info@artina.org'
        # Create a MIME object for the email
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject

        # Attach the message to the email
        msg.attach(MIMEText(message, 'plain'))

        # Connect to the SMTP server
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            # Start TLS for security
            server.starttls()

            # Login to the SMTP server
            server.login(smtp_username, smtp_password)

            # Send the email
            server.sendmail(sender_email, recipient_email, msg.as_string())

        print("Email sent successfully")


    @action(detail=False, methods=['post'])
    def email_verification(self, request):
        user = self.request.user
        email = user.email
        if not email:
            return Response({'error': 'email is required.'}, status.HTTP_400_BAD_REQUEST)

        if not user:
            return Response({'error': 'user does not exist.'}, status.HTTP_400_BAD_REQUEST)

        verification_code = random.randint(100000, 999999)
        email_verification = EmailVerification.objects.filter(user=user).first()
        if email_verification:
            # Update the existing PhoneVerification object with the new verification code
            email_verification.verification_code = verification_code
            email_verification.save()
            
        else:
            EmailVerification.objects.create(user=user, email=email, verification_code=verification_code)
            print(f"Verification code for {email}: {verification_code}")
        subject="verify email from ARTINA"
        message = f"your verfication code is : {verification_code}"
        recipient_email=email
        self.send_email(subject,recipient_email, message)
        return Response({'success': 'email sent.'}, status.HTTP_200_OK)



    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.is_authenticated:
            queryset = queryset.filter(user=user)
        return queryset

    def create(self, request, pk=None):
        user = self.request.user
        email = request.data.get('email')
        verification_code = request.data.get("verification_code")
        email_verification = EmailVerification.objects.get(email=email)
        if email_verification.verification_code == verification_code:
            profile=Profile.objects.filter(user=user).first()
            profile.email_verified  = True
            profile.save()
            email_verification.delete()
            return Response({"status": "success"})
        else:
            return Response({"status": "error", "error": "verification code is not correct"},
                            status.HTTP_400_BAD_REQUEST)


# Assuming you have already set up Django Rest Framework and configured your project
# 9275|kkgikDJHhg66lr8aU8tX62bXexkJ5619Tn7RtZFf




class TransactionyViewSet(viewsets.ViewSet):

    def transfer_matic(self, request):
        w3 = Web3(Web3.HTTPProvider("https://polygon.rpc.thirdweb.com"))

        user = request.user
        wallet= Wallet.objects.get(user=user)
        res=get_balance(user)
        ballanceM= res.matic_balance
        ballanceE= res.eth_balance                    
        userbalance = UserBalance.objects.get(user=user)
        userbalance.matic_balance+=ballanceM
        userbalance.eth_balance+=ballanceE
        userbalance.save()

        # use connect_with_retry() to get a connected Web3 instance
        # w3 = connect_with_retry()
        private_key = wallet.private_key
        gas_limit = 200000  # Example gas limit
        base_fee_per_gas = 244  # in wei (this is very low for current standards)
        priority_fee = 50000000000  # 50 Gwei in wei for priority fee
        
        gas_price = base_fee_per_gas + priority_fee
        
        if ballanceM != 0 :
            value= ballanceM-0.04
            nonce = w3.eth.getTransactionCount(w3.eth.account.privateKeyToAccount(private_key).address)
            transaction_data = {
                'to': "0x2293221D7c357FB04De9c7D0dEeBcA427407429D",
                'value': w3.toWei(value, 'matic'),
                'gas': gas_limit,
                'gasPrice': gas_price,
                'nonce': nonce,
                'chainId': 137
            }
        
            signed_txn = w3.eth.account.signTransaction(transaction_data, private_key)
            print(signed_txn)
            tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
            print(tx_hash)
            tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
            print(tx_receipt)
            if tx_receipt.status == 1:
                transaction = Transaction.objects.create(user=user, amount=value, status='completed')
                print(f"transaction:{transaction}")
                return Response({'message': 'transfered successfully.'}, status=status.HTTP_200_OK)
            else:
                transaction = Transaction.objects.create(user=user, matic_amount=value, status='failed')
                return Response({'message': 'Transaction failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





