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
from .serializers import UserBalanceSerializer , NotifyUserSerializer,UserInfoSerializer,Withdrawal_listSerializer
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
from django.conf import settings
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
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError
    
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from rest_framework.exceptions import NotFound

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from rest_framework.decorators import action
import random
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from django.core.exceptions import ObjectDoesNotExist
import logging
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django.core.exceptions import ObjectDoesNotExist
import requests
import random
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils.timezone import now, timedelta
from django.shortcuts import get_object_or_404
from web3 import Web3
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

polygon_w3 = Web3(Web3.HTTPProvider("https://polygon.rpc.thirdweb.com"))

# Address of the WETH (Wrapped ETH) token on the Polygon network
WETH_CONTRACT_ADDRESS = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'


def verify_recaptcha(recaptcha_response):
    secret_key = "6LfAJGoqAAAAAMtjBTUIz2DrZJ7uvhaWjI6bE0hA"
    verify_url = 'https://www.google.com/recaptcha/api/siteverify'

    payload = {
        'secret': secret_key,
        'response': recaptcha_response
    }

    response = requests.post(verify_url, data=payload)  # This is from the requests module
    result = response.json()

    if result['success']:
        # For v3, you need to check the score
        score = result.get('score', 0)
        # You can adjust this threshold as needed
        if score > 0.5:
            return True

    return False

def get_balance(user):
    user_wallet = Wallet.objects.filter(user=user).first()
    
    if not user_wallet:
        return Response({"error": "Wallet not found for the user."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        # Get POL balance on Polygon
        pol_balance_wei = polygon_w3.eth.get_balance(user_wallet.address)
        pol_balance_pol = polygon_w3.fromWei(pol_balance_wei, 'ether')

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
            "pol_balance": pol_balance_pol,
            "eth_balance": weth_balance_eth
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


accounting_logger = logging.getLogger('accounting')

class NotifyUserViewSet(viewsets.ModelViewSet):
    queryset = NotifyUser.objects.all()
    serializer_class = NotifyUserSerializer
    
    def create(self, request):
        serializer = NotifyUserSerializer(data=request.data)
        user=self.request.get
        if not hasattr(user, 'profile') or user.profile.role.name != 'supervisor':
            accounting_logger.warning(f"access denied for user {user.username}")
            raise PermissionDenied("Only authenticated users able to do this action.")

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


register_logger = logging.getLogger('Account.register')

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer

    def create(self, request, *args, **kwargs):
        # Check if the username, phone_number, or email already exists in the database
        recaptcha_response = request.data.get('recaptcha_token')
        if not verify_recaptcha(recaptcha_response):
            return Response({'error': 'Invalid reCAPTCHA. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

        username = request.data.get('username')
        phone_number = request.data.get('phone_number')
        email = request.data.get('email')
        referral_code = request.data.get('referral_code', None)
        register_logger.info(f"Register attempt for username: {username}, email: {email}, phone_number: {phone_number}")  # Log the registration attempt

        if User.objects.filter(username=username).exists():
            register_logger.warning(f"Username {username} already exists")  # Log if the username already exists
            return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            register_logger.warning(f"Email {email} is already registered")  # Log if the email already exists
            return Response({'error': 'This email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)

        # If a referral code was provided, find the referring affiliate and credit them
        if referral_code:
            try:
                referrer_affiliate = Affiliate.objects.get(referral_code=referral_code)
                referrer_affiliate.credit_balance += 3  # Award 10 credits 
                referrer_affiliate.save()
            except Affiliate.DoesNotExist:
                return Response({"error": "Invalid referral code"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user if the username, phone_number, and email are all unique
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        register_logger.info(f"User registered successfully: {username}, email: {email}, phone_number: {phone_number}")  # Log successful registration
        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
   
    
    @action(detail=False, methods=['post'])
    def check_username(self, request):
        username = request.data.get('username')
        if username is None:
            return Response({'error': 'Username is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            register_logger.warning(f"Username {username} already exists")  # Log if the username already exists
            return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'message': 'Username is available.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def check_email(self, request):
        email = request.data.get('email')
        if email is None:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            register_logger.warning(f"Email {email} is already registered")  # Log if the email already exists
            return Response({'error': 'This email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'message': 'Email is available.'}, status=status.HTTP_200_OK)


login_logger = logging.getLogger('Account.login')

class LoginViewSet(viewsets.ViewSet):

    serializer_class = serializers.LoginSerializer

    def create(self, request):
        recaptcha_response = request.data.get('recaptcha_token')
        if not verify_recaptcha(recaptcha_response):
            return Response({'error': 'Invalid reCAPTCHA. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

        username = request.data.get('username')
        password = request.data.get('password')
        
        login_logger.info(f"Login attempt for username: {username}")  # Log the login attempt
        
        user = authenticate(username=username, password=password)
        
        if user is None:
            login_logger.warning(f"Invalid credentials for username: {username}")  # Log invalid credentials
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Get user's profile
        profile = Profile.objects.get(user=user)

        # Extract IP address
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip_address = x_forwarded_for.split(',')[0]
        else:
            ip_address = request.META.get('REMOTE_ADDR')
        
        # Log successful login with IP address
        login_logger.info(f"Successful login for username: {username}, IP: {ip_address}")

        # Get current date and time
        current_time = timezone.now()

        # Send SMS with login details (implement your SMS sending logic here)
        sms_message = f"ورود موفق شما در {current_time.strftime('%Y-%m-%d %H:%M:%S')}, IP: {ip_address}"
        # send_sms(user.phone_number, sms_message)  # Uncomment and implement this function
        NotifyUser.objects.create(user=user,text=sms_message)
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': str(profile.role.name),
            'nationaloty': str(profile.is_foreigner)
        }
        return Response(response_data, status=status.HTTP_200_OK)




class LogoutViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def logout(self, request):
        try:
            refresh_token = request.data.get('refresh')

            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()  # This will now work if blacklisting is enabled

            return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)

        except (TokenError, InvalidToken) as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class UserInfoViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]  # Apply rate limiting

    def list(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
        except ObjectDoesNotExist:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Minimal data exposure
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
            'is_foreigner':profile.is_foreigner,
            'auth_upload':profile.national_card_picture_upload
        }

        return Response(data, status=status.HTTP_200_OK)


class AffiliateDetailView(viewsets.ModelViewSet):
    queryset = Affiliate.objects.all()
    serializer_class = serializers.AffiliateSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]  # Rate limiting

    def get_object(self):
        # Ensure user has an affiliate profile
        try:
            return self.request.user.affiliate
        except Affiliate.DoesNotExist:
            raise NotFound("Affiliate profile not found.")

    @action(detail=False, methods=['get'])
    def get_code(self, request):
        user = request.user
        try:
            affiliate = Affiliate.objects.get(user=user)
            # Only expose minimal data
            data = {
                'referral_code': affiliate.referral_code,
                'credit_balance': round(affiliate.credit_balance, 2)
            }
            return Response(data, status=status.HTTP_200_OK)
        except Affiliate.DoesNotExist:
            return Response({'error': 'Affiliate profile not found.'}, status=status.HTTP_404_NOT_FOUND)



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

    # def destroy(self, request, pk=None):
    #     profile = self.get_object()
    #     if profile.user != request.user:
    #         return Response({'error': 'You do not have permission to delete this profile.'}, status=403)
    #     profile.delete()
    #     return Response(status=204)


# Logger configuration for ticket creation
ticket_logger = logging.getLogger('support.tickets')


class TicketViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]  # Allow anonymous users with restrictions
    throttle_classes = [AnonRateThrottle, UserRateThrottle]  # Rate limit to prevent spam

    def create(self, request):
        user = request.user
        is_authenticated = user.is_authenticated
        recaptcha_response = request.data.get('recaptcha_token')
        if not verify_recaptcha(recaptcha_response):
            return Response({'error': 'Invalid reCAPTCHA. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. CAPTCHA Validation for Unauthenticated Users
        if not is_authenticated:
            captcha_token = request.data.get('captcha_token')
            if not verify_recaptcha(captcha_token):
                return Response({'error': 'Invalid CAPTCHA.'}, status=status.HTTP_400_BAD_REQUEST)

        # 2. Extract and Validate Inputs
        email = request.data.get('email') or (getattr(user.profile, 'email', None) if is_authenticated else None)
        name = request.data.get('name', '').strip()
        last_name = request.data.get('last_name', '').strip()
        subject = request.data.get('subject', '').strip()
        phone_number = request.data.get('phone_number', '').strip()
        image_url = request.data.get('image_url', '').strip()
        text = request.data.get('text', '').strip()

        if not subject:
            return Response({'error': 'Subject is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not text:
            return Response({'error': 'Text is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not is_authenticated and not email:
            return Response({'error': 'Email is required for unauthenticated users.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 3. Create the Ticket
            unique_id = random.randint(100000, 999999)
            TicketUser.objects.create(
                user=user, name=name, last_name=last_name,
                phone_number=phone_number, email=email,
                image_url=image_url, subject=subject, text=text, 
                ticket_id=unique_id
            )
            ticket_logger.info(f"Ticket created successfully. Ticket ID: {unique_id}")

            # 4. Return Minimal Success Response
            return Response(
                {'success': 'Ticket created successfully.', 'ticket_id': unique_id},
                status=status.HTTP_201_CREATED
            )

        except ValidationError as e:
            ticket_logger.error(f"Validation error: {str(e)}")
            return Response({'error': 'Invalid data provided.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            ticket_logger.error(f"Unexpected error: {str(e)}")
            return Response({'error': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Logger for tracking profile access
profile_logger = logging.getLogger('user.profile_access')

class UserPictureViewSet(viewsets.ViewSet):
    """ViewSet for retrieving user profile pictures securely."""
    serializer_class = serializers.UserInfoSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
    throttle_classes = [UserRateThrottle]  # Rate limit to prevent scraping

    def retrieve(self, request, pk=None):
        user = request.user

        # Ensure users can only access their own profile
        if str(user.id) != pk:
            profile_logger.warning(f"Unauthorized access attempt by user {user.username}.")
            raise PermissionDenied("You do not have permission to view this profile.")

        # Retrieve the profile
        profile = get_object_or_404(Profile, user_id=pk)
        serializer = self.serializer_class(profile)

        profile_logger.info(f"Profile retrieved for user {user.username}.")

        # Return the profile picture data only
        return Response(
            {'profile_picture': serializer.data.get('profile_picture')},
            status=status.HTTP_200_OK
        )


# Logger configuration for phone verification
verification_logger = logging.getLogger('phone_verification')

class PhoneVerificationViewSet(viewsets.ViewSet):
    queryset = PhoneVerification.objects.all()
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can verify
    throttle_classes = [UserRateThrottle]  # Prevent abuse

    def get_queryset(self):
        """Filter queryset by authenticated user."""
        return super().get_queryset().filter(user=self.request.user)

    def create(self, request, pk=None):
        user = request.user
        phone_number = request.data.get('phone_number')
        verification_code = request.data.get('verification_code')

        # Validate input
        if not phone_number or not verification_code:
            return Response({'error': 'Phone number and verification code are required.'}, status=400)

        try:
            # Retrieve the phone verification object
            phone_verification = PhoneVerification.objects.get(user=user, phone_number=phone_number)

            # Check if the verification code matches
            if phone_verification.verification_code == verification_code:
                profile = Profile.objects.filter(user=user).first()
                profile.phone_number_verified = True
                profile.save()

                phone_verification.delete()
                verification_logger.info(f"Phone number {phone_number} verified successfully for user {user.username}.")

                return Response({'status': 'success'})

            else:
                verification_logger.warning(f"Invalid verification code attempt for {phone_number}.")
                return Response({'status': 'error', 'error': 'Invalid verification code.'}, status=400)

        except ObjectDoesNotExist:
            verification_logger.error(f"No verification entry found for phone number {phone_number}.")
            return Response({'error': 'Phone verification not found.'}, status=404)


# Logger configuration for sending verification codes
sms_logger = logging.getLogger('sms_verification')



class SendVerificationCodeViewSet(viewsets.ViewSet):
    throttle_classes = [AnonRateThrottle, UserRateThrottle]  # Rate limiting to prevent abuse

    def create(self, request, format=None):
        phone_number = request.data.get('phone_number')

        if not phone_number:
            return Response({'error': 'Phone number is required.'}, status=400)

       

        try:
            user = User.objects.filter(profile__phone_number=phone_number).first()
        except ObjectDoesNotExist:
            sms_logger.error(f"User not found for phone number {phone_number}.")
            return Response({'error': 'User does not exist.'}, status=404)
        one_minute_ago = timezone.now() - timedelta(minutes=2)
        recent_upload = PhoneVerification.objects.filter(user=user, created_at__gte=one_minute_ago).exists()

        if recent_upload:
            raise ValidationError("You can only get sms each 2 minute.")
        recent_sms_count = PhoneVerification.objects.filter(user=user).count()
        
        if recent_sms_count > 3:
            raise ValueError("User has exceeded the limit of 3 SMS verifications.")        
        
        # Generate a new verification code
        verification_code = random.randint(100000, 999999)

        # Check if a PhoneVerification object already exists
        phone_verification, created = PhoneVerification.objects.get_or_create(
            user=user, phone_number=phone_number,
            defaults={'verification_code': verification_code}
        )

        if not created:
            # If the object already exists, update the code
            phone_verification.verification_code = verification_code
            phone_verification.save()

        # Log the sending of the verification code (for monitoring)
        sms_logger.info(f"Verification code sent to {phone_number}.")

        # Send the SMS using Kavenegar API
        response = requests.post(
            f"https://api.kavenegar.com/v1/YOUR_API_KEY/verify/lookup.json",
            data={
                "receptor": phone_number,
                "token": verification_code,
                "template": "SMSVerify"
            }
        )

        if response.status_code == 200:
            return Response({'status': 'success'})
        else:
            sms_logger.error(f"Failed to send SMS to {phone_number}. Response: {response.status_code}")
            return Response({'status': 'failed'}, status=response.status_code)



# Logger configuration for transactions
transaction_logger = logging.getLogger('transactions')

# Define the WETH contract address and ABI for balance checks
WETH_CONTRACT_ADDRESS = "0x...your_WETH_contract_address..."

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users access the API
    throttle_classes = [UserRateThrottle]  # Apply rate limiting to prevent abuse

    def create(self, request, *args, **kwargs):
        """Create a new transaction linked to the authenticated user."""
        request.data['user'] = request.user.id  # Link the transaction to the logged-in user
        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def turnover_in_month(self, request):
        """Calculate and return user's monthly transaction turnover."""
        user = request.user
        today = now().date()
        one_month_ago = today - timedelta(days=30)

        # Filter user's transactions from the last month
        turnovers = Transaction.objects.filter(user=user, date__gte=one_month_ago)
        serializer = self.get_serializer(turnovers, many=True)

        transaction_logger.info(f"Turnover calculated for {user.username}.")

        return Response({'all_turnovers': serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_last_ten(self, request):
        # """Return the last ten transactions of the authenticated user."""
        user = request.user
        queryset = self.get_queryset().filter(user=user).order_by('-id')[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_balance(self, request):
        """Retrieve the authenticated user's wallet balance."""
        user = request.user
        user_wallet = get_object_or_404(Wallet, user=user)

        try:
            # Connect to Polygon network
            polygon_w3 = Web3(Web3.HTTPProvider("https://polygon.rpc.thirdweb.com"))

            # Get POL balance in the wallet
            pol_balance_wei = polygon_w3.eth.get_balance(user_wallet.address)
            pol_balance_pol = polygon_w3.fromWei(pol_balance_wei, 'ether')

            # Get WETH (Wrapped ETH) balance
            weth_contract = polygon_w3.eth.contract(
                address=WETH_CONTRACT_ADDRESS,
                abi=[{
                    'constant': True,
                    'inputs': [{'name': '_owner', 'type': 'address'}],
                    'name': 'balanceOf',
                    'outputs': [{'name': 'balance', 'type': 'uint256'}],
                    'type': 'function'
                }]
            )
            weth_balance_wei = weth_contract.functions.balanceOf(user_wallet.address).call()
            weth_balance_eth = polygon_w3.fromWei(weth_balance_wei, 'ether')

            # Prepare the response data
            balance = {
                'pol_balance': pol_balance_pol,
                'wallet_address': user_wallet.address,
                'eth_balance': weth_balance_eth,
            }

            transaction_logger.info(f"Balance retrieved for {user.username}.")
            return Response(balance, status=status.HTTP_200_OK)

        except Exception as e:
            transaction_logger.error(f"Error retrieving balance for {user.username}: {str(e)}")
            return Response({'error': 'Failed to retrieve balance.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def list(self, request, *args, **kwargs):
        """Limit the list to the user's last 10 transactions."""
        queryset = self.filter_queryset(self.get_queryset()).filter(user=request.user)
        queryset = queryset.order_by('-id')[:10]  # Limit to the last 10 transactions
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#we did it till this line

from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from decimal import Decimal

class UserBalanceViewSet(viewsets.ModelViewSet):
    queryset = UserBalance.objects.all()
    serializer_class = UserBalanceSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    throttle_classes = [UserRateThrottle]  # Rate limiting to prevent abuse

    @action(detail=False, methods=['get'])
    def get_balance(self, request):
        """Retrieve the authenticated user's balance."""
        user = request.user
        user_balance = get_object_or_404(UserBalance, user=user)

        # Expose only the necessary balance fields
        balance = {
            'rial_available_balance': user_balance.rial_available_balance,
            'rial_unavailable_balance': user_balance.rial_untradable_balance,
            'eth_balance': user_balance.eth_balance,
            'eth_unavailable_balance': user_balance.eth_untradable_balance,
            'pol_balance': user_balance.pol_balance,
            'pol_unavailable_balance': user_balance.pol_untradable_balance,
        }

        return Response(balance, status=status.HTTP_200_OK)

# Helper function to check if the user has sufficient balance for a transaction
def check_balance(amount, user_id):
    """Check if the user has enough available balance for the specified amount."""
    user = get_object_or_404(User, id=user_id)
    user_balance = get_object_or_404(UserBalance, user=user)

    # Validate input
    if amount <= 0:
        return JsonResponse({'error': 'Invalid amount.'}, status=status.HTTP_400_BAD_REQUEST)

    if amount > user_balance.rial_available_balance:
        return JsonResponse({'error': 'Insufficient balance.'}, status=status.HTTP_400_BAD_REQUEST)
    
    return JsonResponse({'message': 'You can use your balance.'}, status=status.HTTP_200_OK)

# Function to update the user's balance based on the transaction type (deposit or withdrawal)
def updating_balance(user_id, currency, amount, side):
    """Update the user's balance based on a transaction (deposit or withdrawal)."""
    user = get_object_or_404(User, id=user_id)
    user_balance = get_object_or_404(UserBalance, user=user)

    # Validate input
    if amount <= 0:
        return JsonResponse({'error': 'Invalid amount.'}, status=status.HTTP_400_BAD_REQUEST)

    balance_fields = {
        'rial': 'rial_available_balance',
        'POLTMN': 'pol_balance',
        'ETHTMN': 'eth_balance'
    }

    # Check if the provided currency is valid
    if currency not in balance_fields:
        return JsonResponse({'error': 'Invalid currency.'}, status=status.HTTP_400_BAD_REQUEST)

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

from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import action
from decimal import Decimal
from django.shortcuts import get_object_or_404




class WithdrawalViewSet(viewsets.ModelViewSet):
    queryset = Withdrawal_list.objects.all()
    serializer_class = Withdrawal_listSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    throttle_classes = [UserRateThrottle]  # Rate limit to prevent abuse

    @action(detail=False, methods=['post'])
    def create_request(self, request):
        """Create a new withdrawal request."""
        user = request.user
        amount = request.data.get('amount')
        if not hasattr(user, 'profile') or user.profile.role.name != 'user_one':
            accounting_logger.warning(f"access denied for user {user.username}")
            raise PermissionDenied("Only authenticated users able to do this action.")

        # Validate amount input
        if not amount or Decimal(amount) <= 0:
            return Response({"detail": "Invalid amount."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the user has enough balance
        user_balance = get_object_or_404(UserBalance, user=user)
        if Decimal(amount) > user_balance.rial_available_balance:
            return Response({"detail": "Insufficient balance."}, status=status.HTTP_400_BAD_REQUEST)

        # Limit the number of withdrawal requests to two per day
        today = timezone.now().date()
        requests_today = Withdrawal_list.objects.filter(user=user, created_at__date=today).count()
        if requests_today >= 2:
            return Response({"detail": "You can only make two withdrawal requests per day."}, status=status.HTTP_400_BAD_REQUEST)

        # Transfer the amount to untradable balance
        user_balance.rial_available_balance -= Decimal(amount)
        user_balance.rial_untradable_balance += Decimal(amount)
        user_balance.save()

        # Create the withdrawal request
        withdrawal = Withdrawal_list.objects.create(
            user=user,
            shaba_number=user.profile.shaba_number,
            amount=Decimal(amount)
        )

        serializer = self.get_serializer(withdrawal)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def update_request(self, request, pk=None):
        """Update an existing withdrawal request."""
        withdrawal = self.get_object()

        # Ensure the withdrawal has not already been processed
        if withdrawal.is_paid:
            return Response({"detail": "This withdrawal has already been processed."}, status=status.HTTP_400_BAD_REQUEST)

        # Process the withdrawal
        withdrawal.is_paid = True
        withdrawal.reference_number = request.data.get('reference_number')

        # Validate reference number
        if not withdrawal.reference_number:
            return Response({"detail": "Reference number is required."}, status=status.HTTP_400_BAD_REQUEST)

        withdrawal.save()

        # Update the user's untradable balance
        user_balance = get_object_or_404(UserBalance, user=withdrawal.user)
        user_balance.rial_untradable_balance -= withdrawal.amount
        user_balance.save()

        serializer = self.get_serializer(withdrawal)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def list_requests(self, request, *args, **kwargs):
        """List withdrawal requests with optional filters."""
        queryset = self.get_queryset()

        # Optional filtering by user, date, and payment status
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

        # Paginate results
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # Serialize and return the data
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


import logging

from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
import requests
import logging

# Logger configuration for crypto transactions
logger = logging.getLogger('cryptoTransaction')

class CryptoViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can buy crypto
    throttle_classes = [UserRateThrottle]  # Apply rate limiting to prevent abuse

    @action(detail=False, methods=['post'])
    def BuyCrypto(self, request):
        """Process a crypto purchase for the authenticated user."""
        logger.info("BuyCrypto called")
        user = request.user
        symbol = request.data.get('symbol')
        amount = request.data.get('amount')
        price = request.data.get('price')
        if not hasattr(user, 'profile') or user.profile.role.name != 'user_one':
            logger.warning(f"access denied for user {user.username}")
            raise PermissionDenied("Only authenticated users able to do this action.")

        # Input validation
        try:
            amount = float(amount)
            price = float(price)
        except (TypeError, ValueError):
            logger.warning(f"Invalid input for amount or price. User: {user.username}")
            return Response({'error': 'Invalid amount or price.'}, status=status.HTTP_400_BAD_REQUEST)

        # Mapping balance fields
        balance_fields = {
            'POLTMN': 'pol_balance',
            'ETHTMN': 'eth_balance',
            'rial': 'rial_available_balance'
        }

        # Ensure user balance exists
        user_balance = UserBalance.objects.filter(user=user).first()
        if not user_balance:
            logger.error(f"User balance not found for {user.username}")
            return Response({'error': 'User balance not found.'}, status=status.HTTP_404_NOT_FOUND)

        balance_field = balance_fields['rial']
        current_balance = getattr(user_balance, balance_field)

        # Calculate the total cost of the purchase
        total = amount * price
        logger.debug(f"Total cost calculated: {total}")

        # Check if the user has enough balance
        if current_balance < total:
            logger.warning(f"Purchase failed: Insufficient balance for user {user.username}")
            return Response({'error': 'Insufficient balance'}, status=status.HTTP_400_BAD_REQUEST)

        # Check TMN balance
        artina_balance_response = self.check_tmn_balance(total=total)
        if artina_balance_response['status'] != status.HTTP_200_OK:
            logger.warning(f"Purchase failed: Insufficient TMN balance for user {user.username}")
            return Response({'error': 'Insufficient TMN balance to complete the purchase'}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed with creating the transaction
        transactionCurrency = TransactionCurrency.objects.filter(name=symbol).first()
        transactionINS = Transaction.objects.create(
            user=user, transaction_currency=transactionCurrency, 
            amount=amount, side="BUY", status='Pending'
        )

        # Make the API call to perform the purchase
        url = 'https://api.wallex.ir/v1/account/otc/orders'
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '10553|4Y4jacZCBRcidJ1zmXtUQFfDARiGtXxko4IXc7xw',  # Use a valid API key
        }
        data = {
            'symbol': symbol,
            'side': "BUY",
            'amount': amount,
            'price': price,
        }
        logger.debug(f"Sending POST request to {url} with data: {data}")
        response = requests.post(url, headers=headers, json=data)
        datam = response.json()

        if response.status_code == 201:
            transactionINS.status = 'completed'
            transactionINS.save()
            logger.info(f"Purchase completed successfully for {user.username}")

            # Update the user's balance
            setattr(user_balance, balance_field, current_balance - total)
            user_balance.save()

            fee = 10000  # Transaction fee (can be dynamic)

            # Send notification SMS via Kavenegar API
            try:
                phone_number = user.profile.phone_number
                response = requests.post(
                    "https://api.kavenegar.com/v1/YOUR_API_KEY/verify/lookup.json",
                    data={
                        "receptor": phone_number,
                        "token1": user.profile.first_name,
                        "token2": total,
                        "template": "AccountChargeVerification"
                    }
                )
                logger.info(f"SMS notification sent to {phone_number}")
            except Profile.DoesNotExist:
                logger.warning(f"Profile not found for user {user.username}, SMS not sent")

            # Update ARTINA balance
            artina = ARTINA_Ballance.objects.first()
            artina.artina_rial += fee
            artina.save()

            # Update the user's crypto balance
            balance_update = updating_balance(user_id=user.id, currency=symbol, amount=amount, side="deposit")
            if balance_update.status_code != status.HTTP_200_OK:
                logger.error(f"Failed to update balance after purchase for {user.username}")
                return Response({'error': 'Failed to update balance'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Purchase successful'}, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Purchase failed for {user.username}: {datam}")
            return Response({'error': 'Purchase failed', 'details': datam}, status=status.HTTP_400_BAD_REQUEST)

    def check_tmn_balance(self, total):
        """Check if ARTINA's TMN balance is sufficient to complete the transaction."""
        logger.info("Checking TMN balance")
        url = 'https://api.wallex.ir/v1/account/balances'
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': 'YOUR_API_KEY',  # Replace with your actual API key
        }
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
            tmn_balance = float(data['result']['balances']['TMN']['value'])
            logger.debug(f"TMN balance: {tmn_balance}")

            if total <= tmn_balance:
                logger.info("Sufficient TMN balance")
                return {'status': status.HTTP_200_OK, 'message': 'Sufficient balance'}
            else:
                logger.warning("Insufficient TMN balance")
                return {'status': status.HTTP_400_BAD_REQUEST, 'message': 'Insufficient balance'}
        else:
            logger.error(f"Failed to retrieve TMN balances, status code: {response.status_code}")
            return {'status': response.status_code, 'message': 'Failed to retrieve account balances'}



    @action(detail=False, methods=['post'])
    def SellCrypto(self, request):
        logger.info("SellCrypto called")
        user = self.request.user
        symbol = request.data.get('symbol') 
        amount = float(request.data.get('amount'))  # Ensure amount is a float
        price = float(request.data.get('price'))  # Ensure price is a float
        if not hasattr(user, 'profile') or user.profile.role.name != 'user_one':
            logger.warning(f"access denied for user {user.username}")
            raise PermissionDenied("Only authenticated users able to do this action.")

        # Calculate the total value of the sale
        total = amount * price
        logger.debug(f"Total sale value: {total}")
        
        # Map for balance fields
        balance_fields = {
            'POLTMN': 'pol_balance',
            'ETHTMN': 'eth_balance',
            'rial': 'rial_available_balance'
        }

        # Check if the symbol is valid
        if symbol not in balance_fields:
            logger.warning("SellCrypto: Invalid symbol")
            return Response({'error': 'Invalid symbol.'}, status=status.HTTP_400_BAD_REQUEST)

        balance_field = balance_fields[symbol]
        user_balance = UserBalance.objects.get(user=user)
        current_balance = getattr(user_balance, balance_field)
        logger.debug(f"Current balance for {symbol}: {current_balance}")
        
        if current_balance < amount:
            logger.warning("SellCrypto: Insufficient balance")
            return Response({'error': 'Insufficient balance to complete the sale'}, status=status.HTTP_400_BAD_REQUEST)

        transactionCurrency = TransactionCurrency.objects.filter(name=symbol).first()
        transactionINS = Transaction.objects.create(user=user, transaction_currency=transactionCurrency, amount=amount, side="SELL", status='Pending')

        url = 'https://api.wallex.ir/v1/account/otc/orders'
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': settings.X_API_Key,  
        }
        data = {
            'symbol': symbol, 
            'side': "SELL",
            'amount': amount,
            'price': price,
        }
        logger.debug(f"Sending POST request to {url} with data: {data}")
        response = requests.post(url, headers=headers, json=data)
        datam = response.json()

        if response.status_code == 201:
            transactionINS.status = 'completed'
            transactionINS.save()
            logger.info("Sale completed successfully")

            setattr(user_balance, balance_field, current_balance - amount)
            user_balance.save()

            fee = 10000
            rial_amount = total - fee
            user_balance.rial_available_balance += rial_amount
            user_balance.save()

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
                logger.warning("Profile not found for SMS notification")

            artina = ARTINA_Ballance.objects.first()
            artina.artina_rial += fee
            artina.save()

            return Response({'message': 'Sale successful'}, status=status.HTTP_201_CREATED)
        else:
            transactionINS.status = 'failed'
            transactionINS.save()
            logger.error(f"Sale failed: {datam}")
            return Response({'error': 'Sale failed', 'info': datam}, status=status.HTTP_400_BAD_REQUEST)

    
    @action(detail=False, methods=['get'])
    def CryptoPrice_ETH(self, request, pk=None):
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '10553|4Y4jacZCBRcidJ1zmXtUQFfDARiGtXxko4IXc7xw',  # Replace 'your_api_key' with your actual API key
        }
    
        # Get ETH price
        url = 'https://api.wallex.ir/v1/account/otc/price'
        params = {
            'symbol': 'ETHTMN',
            'side': 'BUY',
        }
        response_BUY = requests.get(url, headers=headers, params=params)
    
        # Get POL price
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
    def CryptoPrice_POL(self, request, pk=None):
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '10553|4Y4jacZCBRcidJ1zmXtUQFfDARiGtXxko4IXc7xw',  # Replace 'your_api_key' with your actual API key
        }
    
        # Get ETH price
        url = 'https://api.wallex.ir/v1/account/otc/price'
        params = {
            'symbol': 'POLTMN',
            'side': 'BUY',
        }
        response_BUY = requests.get(url, headers=headers, params=params)
    
        # Get POL price
        params = {
            'symbol': 'POLTMN',
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
                "POL_buy_price": buy_price,
                "POL_sell_price": sell_price
            }
        
            return Response(data, status=200)
        else:
            # Handle errors
            error_message = {
                'error': 'Failed to retrieve price',
                'POL_buy_response': response_BUY.text,
                'POL_sell_response': response_SELL.text
            }
            status_code = response_BUY.status_code if response_BUY.status_code != 200 else response_SELL.status_code
            return Response(error_message, status=status_code)


    @action(detail=False, methods=['get'])
    def CryptoPrice2(self, request, pk=None):
        url = 'https://api.wallex.ir/v1/account/otc/price'
        headers = {
            'Content-Type': 'application/json',
            'X-API-Key': '10553|4Y4jacZCBRcidJ1zmXtUQFfDARiGtXxko4IXc7xw',  # Replace 'your_api_key' with your actual API key
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
        'X-API-Key': '10553|4Y4jacZCBRcidJ1zmXtUQFfDARiGtXxko4IXc7xw',  # Replace 'your_api_key' with your actual API key
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
            'X-API-Key': '10553|4Y4jacZCBRcidJ1zmXtUQFfDARiGtXxko4IXc7xw',  # Replace 'your_api_key' with your actual API key
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

from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
import logging

# Logger for password reset operations
password_reset_logger = logging.getLogger('password_reset')

class PasswordResetByPhoneViewSet(viewsets.ViewSet):
    throttle_classes = [AnonRateThrottle, UserRateThrottle]  # Rate limiting to prevent abuse

    def create(self, request):
        """Handle password reset by phone."""
        phone_number = request.data.get('phone_number')
        token = request.data.get('token')
        password = request.data.get('password')
        recaptcha_response = request.data.get('recaptcha_token')
        if not verify_recaptcha(recaptcha_response):
            return Response({'error': 'Invalid reCAPTCHA. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

        # Input validation
        if not phone_number or not token or not password:
            password_reset_logger.warning(f"Missing required fields for phone number: {phone_number}")
            return Response({'error': 'Phone number, token, and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Find user by phone number
            user = User.objects.get(profile__phone_number=phone_number)
        except ObjectDoesNotExist:
            password_reset_logger.error(f"User with phone number {phone_number} does not exist.")
            return Response({'error': 'User with this phone number does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Verify the phone verification token
            phone_verification = PhoneVerification.objects.get(phone_number=phone_number)
            if phone_verification.verification_code == token:
                phone_verification.delete()  # Invalidate the token after successful verification

                # Set the new password
                user.set_password(password)
                user.save()

                password_reset_logger.info(f"Password reset successful for user {user.username}.")
                return Response({'success': 'Password reset successful.'}, status=status.HTTP_200_OK)
            else:
                password_reset_logger.warning(f"Invalid verification code for phone number {phone_number}")
                return Response({'error': 'Invalid verification code.'}, status=status.HTTP_400_BAD_REQUEST)

        except PhoneVerification.DoesNotExist:
            password_reset_logger.error(f"No phone verification found for phone number {phone_number}")
            return Response({'error': 'Verification code not found.'}, status=status.HTTP_404_NOT_FOUND)



# Get the logger for payment-related activities
payment_logger = logging.getLogger('Account.payment')

from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.shortcuts import redirect
import requests
import logging

# Logger for payment operations
payment_logger = logging.getLogger('payment')

class PaymentGateViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can perform payments
    throttle_classes = [UserRateThrottle]  # Apply rate limiting to prevent abuse

    def create(self, request, *args, **kwargs):
        """Create a payment request."""
        user = self.request.user
        amount_str = request.data.get("amount")
        email = user.profile.email
        payment_logger.debug(f"Payment creation initiated by user {user.username} with email {email} for amount {amount_str}.")

        # Input validation
        try:
            amount = int(amount_str)
        except (ValueError, TypeError):
            payment_logger.warning(f"Invalid amount provided by user {user.username}: {amount_str}")
            return Response({"error": "Invalid amount. Please provide a valid integer."}, status=status.HTTP_400_BAD_REQUEST)

        if amount < 1000:
            payment_logger.warning(f"Amount too low for user {user.username}: {amount}. Minimum required is 1000.")
            return Response({"error": "Amount must be at least 1000."}, status=status.HTTP_400_BAD_REQUEST)

        # Send payment request
        response = self.send_payment_request(amount)
        if response.status_code == 200:
            payment_info = response.json()
            payment_logger.info(f"Payment request successful for user {user.username}. Payment info: {payment_info}")

            if 'data' in payment_info and 'authority' in payment_info['data']:
                authority = payment_info['data'].get('authority')
                payment = Payment.objects.create(user=user, amount=amount, authority=authority)
                redirect_url = self.get_redirect_url(payment)
                payment_logger.debug(f"Payment created for user {user.username} with authority {authority}. Redirecting to {redirect_url}.")
                return Response({'url': redirect_url}, status=status.HTTP_200_OK)
            else:
                payment_logger.error(f"Invalid payment response for user {user.username}. Payment info: {payment_info}")
                return Response({"error": "Invalid payment response from server."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            payment_logger.error(f"Payment request failed for user {user.username}. Response: {response.json()}")
            return Response(response.json(), status=response.status_code)

    @action(detail=False, methods=['get'])
    def verify(self, request):
        """Verify the payment after the payment gateway redirects back."""
        authority = request.GET.get('Authority')
        payment_logger.debug(f"Verification initiated with authority {authority}.")

        try:
            payment = Payment.objects.get(authority=authority)
        except Payment.DoesNotExist:
            payment_logger.warning(f"Payment with authority {authority} not found.")
            failure_url = f'http://artina.org/payment_status/?status=failed&authority={authority}'
            return redirect(failure_url)

        user = payment.user
        response = self.verify_payment(payment.amount, payment.authority)

        if response.status_code == 200:
            verification_info = response.json()
            payment_logger.info(f"Verification successful for payment with authority {authority}. Verification info: {verification_info}")

            # Handle verification response
            if isinstance(verification_info, dict) and 'data' in verification_info:
                data = verification_info['data'] if isinstance(verification_info['data'], dict) else verification_info['data'][0]
                verification_status = data.get('code')

                if verification_status in [100, 101]:  # Successful payment statuses
                    payment.is_paid = True
                    payment.save()

                    # Update user's balance
                    payment.amount = payment.amount // 10  # Example logic: dividing amount
                    transaction_currency = TransactionCurrency.objects.get(name="rial")
                    user_balance, _ = UserBalance.objects.get_or_create(user=user)
                    user_balance.rial_available_balance += payment.amount
                    user_balance.save()

                    # Create a transaction record
                    Transaction.objects.create(
                        user=user, side='deposit', transaction_currency=transaction_currency,
                        amount=payment.amount, status='completed'
                    )

                    payment_logger.debug(f"Payment with authority {authority} marked as paid. User balance updated.")

                    # Send SMS notification via Kavenegar API
                    profile = Profile.objects.get(user=user)
                    self.send_sms_notification(profile, payment.amount)

                    return redirect(f'https://artina.org/payment_status/?status=success&authority={authority}')
                else:
                    payment_logger.warning(f"Verification failed for payment with authority {authority}. Status code: {verification_status}")
                    return redirect(f'https://artina.org/payment_status/?status=failed&authority={authority}')
            else:
                payment_logger.error(f"Invalid verification response structure for authority {authority}.")
                return redirect(f'https://artina.org/payment_status/?status=failed&authority={authority}')
        else:
            payment_logger.error(f"Verification request failed for authority {authority}. Response: {response.json()}")
            return redirect(f'https://artina.org/payment_status/?status=failed&authority={authority}')

    def send_payment_request(self, amount):
        """Send the payment request to the payment gateway."""
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
            'metadata': {'mobile': user.profile.phone_number, 'email': user.profile.email}
        }
        payment_logger.debug(f"Sending payment request for user {user.username} with amount {amount}.")
        response = requests.post(url, headers=headers, json=data)
        return response

    def verify_payment(self, amount, authority):
        """Verify the payment with the payment gateway."""
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
        payment_logger.debug(f"Verifying payment with authority {authority} for amount {amount}.")
        response = requests.post(url, headers=headers, json=data)
        return response

    def get_redirect_url(self, payment):
        """Generate the redirect URL for the payment gateway."""
        url = f'https://www.zarinpal.com/pg/StartPay/{payment.authority}'
        payment_logger.debug(f"Generated redirect URL for payment: {url}")
        return url

    def send_sms_notification(self, profile, amount):
        """Send an SMS notification to the user upon successful payment."""
        try:
            requests.post(
                f"https://api.kavenegar.com/v1/YOUR_API_KEY/verify/lookup.json",
                data={
                    "receptor": profile.phone_number,
                    "token": profile.user.username,
                    "token2": amount,
                    "template": "AccountChargeVerification"
                }
            )
            payment_logger.info(f"SMS notification sent to {profile.phone_number}")
        except Exception as e:
            payment_logger.error(f"Failed to send SMS notification for {profile.user.username}: {str(e)}")


#done till here



class WalletViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def create_wallet(self, request):
        user = request.user
        if not hasattr(user, 'profile') or user.profile.role.name != 'user_one':
            accounting_logger.warning(f"access denied for user {user.username}")
            raise PermissionDenied("Only authenticated users able to do this action.")

        # Check if the user already has a wallet
        if Wallet.objects.filter(user=user).exists():
            return Response({'message': 'Wallet already exists for this user.'}, status=status.HTTP_400_BAD_REQUEST)

        private_key = Web3.toHex(os.urandom(32))  # Generate a random private key
        account = polygon_w3.eth.account.privateKeyToAccount(private_key)

        wallet = Wallet(user=user, address=account.address)
        wallet.set_private_key(private_key)  # Encrypt and store the private key
        wallet.save()        
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
            wallet = Wallet(user=user, address=account.address)
            wallet.set_private_key(private_key)  # Encrypt and store the private key
            wallet.save()
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
    
    raise Exception("Failed to connect to the POL network.")

import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings  # For environment variables

class EmailMixin(viewsets.ViewSet):
    queryset = PhoneVerification.objects.all()
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can send emails
    throttle_classes = [UserRateThrottle]  # Apply rate limiting to prevent abuse

    def send_email(self, subject, recipient_email, message):
        """Reusable method to send emails with proper security."""
        # Email configuration using environment variables
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
        msg.attach(MIMEText(message, 'html'))

        try:
            # Connect to the SMTP server
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()  # Start TLS for security
                server.login(smtp_username, smtp_password)  # Login to the SMTP server
                server.sendmail(sender_email, recipient_email, msg.as_string())  # Send the email
            print("Email sent successfully")
        except smtplib.SMTPException as e:
            print(f"Failed to send email: {str(e)}")
            return False
        return True

    @action(detail=False, methods=['post'])
    def email_verification(self, request):
        """Handle email verification by sending a code to the user's email."""
        user = self.request.user
        email = user.email

        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a random verification code
        verification_code = random.randint(100000, 999999)
        email_verification, created = EmailVerification.objects.update_or_create(
            user=user,
            defaults={'email': email, 'verification_code': verification_code}
        )

        subject = "Verify Your Email from ARTINA"
        message = '''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {{font-family: Arial, sans-serif;}}
                .verification-code {{font-size: 24px; font-weight: bold; color: #2C3E50;}}
                .cta-button {{background-color: #2980b9; color: #ffffff; padding: 12px; text-decoration: none;}}
            </style>
        </head>
        <body>
            <p>Your verification code is:</p>
            <div class="verification-code">{verification_code}</div>
            <p>If you did not request this, please ignore this email.</p>
        </body>
        </html>
        '''.format(verification_code=verification_code)

        # Send the email
        email_sent = self.send_email(subject, email, message)
        if not email_sent:
            return Response({'error': 'Failed to send email.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'success': 'Verification email sent.'}, status=status.HTTP_200_OK)

    def create(self, request):
        """Verify the email using the code sent to the user."""
        user = self.request.user
        email = request.data.get('email')
        verification_code = request.data.get('verification_code')

        if not email or not verification_code:
            return Response({'error': 'Email and verification code are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            email_verification = EmailVerification.objects.get(email=email)
            if email_verification.verification_code == verification_code:
                # Mark email as verified
                profile = Profile.objects.filter(user=user).first()
                profile.email_verified = True
                profile.save()
                email_verification.delete()
                return Response({'status': 'success'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid verification code.'}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': 'Verification code not found.'}, status=status.HTTP_404_NOT_FOUND)


# Assuming you have already set up Django Rest Framework and configured your project
# 9275|kkgikDJHhg66lr8aU8tX62bXexkJ5619Tn7RtZFf




class TransactionyViewSet(viewsets.ViewSet):

    def transfer_pol(self, request):
        w3 = Web3(Web3.HTTPProvider("https://polygon.rpc.thirdweb.com"))

        user = request.user
        wallet= Wallet.objects.get(user=user)
        res=get_balance(user)
        ballanceM= res.pol_balance
        ballanceE= res.eth_balance                    
        userbalance = UserBalance.objects.get(user=user)
        userbalance.pol_balance+=ballanceM
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
                'value': w3.toWei(value, 'pol'),
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
                transaction = Transaction.objects.create(user=user, pol_amount=value, status='failed')
                return Response({'message': 'Transaction failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





