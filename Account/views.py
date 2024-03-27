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
from .serializers import UserBalanceSerializer , NotifyUserSerializer,UserInfoSerializer
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

#web3 exchange
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Wallet, Transaction
from web3 import Web3, eth
import os
import time
import json
from django.conf import settings


class NotifyUserViewSet(viewsets.ModelViewSet):
    queryset = NotifyUser.objects.all()
    serializer_class = NotifyUserSerializer
    
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


logger = logging.getLogger('file_register')

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer

    def create(self, request, *args, **kwargs):
        # Check if the username, phone_number, or email already exists in the database
        username = request.data.get('username')
        phone_number = request.data.get('phone_number')
        email = request.data.get('email')

        logger.info(f"Register attempt for username: {username}, email: {email}, phone_number: {phone_number}")  # Log the registration attempt

        if User.objects.filter(username=username).exists():
            logger.warning(f"Username {username} already exists")  # Log if the username already exists
            return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            logger.warning(f"Email {email} is already registered")  # Log if the email already exists
            return Response({'error': 'This email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user if the username, phone_number, and email are all unique
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        logger.info(f"User registered successfully: {username}, email: {email}, phone_number: {phone_number}")  # Log successful registration
        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



logger = logging.getLogger('file_login')

class LoginViewSet(viewsets.ViewSet):

    serializer_class = serializers.LoginSerializer

    def create(self, request):
        # logger.setLevel(logging.DEBUG)
        username = request.data.get('username')
        password = request.data.get('password')
        
        logger.info(f"Login attempt for username: {username}")  # Log the login attempt
        
        user = authenticate(username=username, password=password)

        if user is None:
            logger.warning(f"Invalid credentials for username: {username}")  # Log invalid credentials
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        logger.info(f"Successful login for username: {username}")  # Log successful login
        
        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
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
            'postal_code':profile.postal_code,
            'bio':profile.bio,
            'user_verified':profile.user_verified
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
            'eth_unavailable_balance' : user_balance.eth_unavailable_balance,
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







class PaymentGateViewSet(viewsets.ViewSet):
    def create(self, request, *args, **kwargs):
        user = self.request.user
        amount_str = request.data.get("amount")  
        email= user.profile.email
        try:
            amount = int(amount_str)
        except ValueError:
            return Response({"error": "Invalid amount. Please provide a valid integer."}, status=status.HTTP_400_BAD_REQUEST)
        if amount<1000:
            return Response({"error": "Invalid amount. Please provide a valid integer."}, status=status.HTTP_400_BAD_REQUEST)

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
        failure_url = f'http://artina.org/payment_status/?status=failed&authority={authority}'
        user=self.request.user
        response = self.verify_payment(payment.amount, payment.authority)
        if response.status_code == 200:
            verification_info = response.json()
            verification_status = verification_info['data']['code'] 
                # Redirect to your React front-end with payment status
            success_url = f'http://artina.org/payment_status/?status=success&authority={authority}'

            if verification_status == 100:
                payment.is_paid = True
                payment.save()                
                transaction_type = TransactionType.objects.get(name="deposit")
                transaction_currency = TransactionCurrency.objects.get(name="rial")
                user_balance=None
                user_balance = UserBalance.objects.filter(user=user).first()
                if user_balance :
                    n=user_balance.rial_available_balance 
                    n=n+ payment.amount
                    user_balance.rial_available_balance =n
                    user_balance.save()

                else :
                    user_balance = UserBalance.objects.create(rial_available_balance=payment.amount,user=user)
                    profile=Profile.objects.get(user=user)
                    UserTurnover.objects.create(user=user, transaction_type=transaction_type, 
                                    transaction_currency=transaction_currency, transaction_value=payment.amount)
                    # Send the SMS via Kavenegar API
                    # The URL IS like : https://api.kavenegar.com/v1/{API-KEY}/verify/lookup.json
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






w3 = Web3(Web3.HTTPProvider("https://polygon.rpc.thirdweb.com"))
# w3 = Web3(Web3.HTTPProvider("https://mumbai.rpc.thirdweb.com"))

class WalletViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def create_wallet(self, request):
        user = request.user

        # Check if the user already has a wallet
        if Wallet.objects.filter(user=user).exists():
            return Response({'message': 'Wallet already exists for this user.'}, status=status.HTTP_400_BAD_REQUEST)

        private_key = Web3.toHex(os.urandom(32))  # Generate a random private key
        account = w3.eth.account.privateKeyToAccount(private_key)

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
            account = w3.eth.account.privateKeyToAccount(private_key)
            wallet = Wallet.objects.create(user=user, address=account.address, private_key=private_key)
            author_address=account.address
            return Response({'message': 'user wallet has created.', 'address': author_address}, status=status.HTTP_201_CREATED)

        

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
    def send_email(subject,recipient_email,message):
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
        email = request.data.get('email')
        user = self.request.user
        user = User.objects.get(profile__email=email)
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
        self.send_email(subject,email, message)
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




class TransactionViewSet(viewsets.ViewSet):
    def create(self, request):
        user = request.user
        matic_amount = request.data.get('matic_amount')
        matic_price = 27216
        matic_amount = Decimal(str(matic_amount))
        # matic_amount = float(request.data.get('matic_amount'))
        print(f"maticamount:{matic_amount}")
        needed_balance = matic_amount * matic_price

        balance = UserBalance.objects.filter(user=user).first()
        userbalance = balance.rial_available_balance
        print(userbalance)
        # Check if user has sufficient balance
        if userbalance < needed_balance:
            return Response({'message': 'Insufficient balance.'}, status=status.HTTP_400_BAD_REQUEST)
        balance.rial_available_balance=balance.rial_available_balance - needed_balance
        balance.save()

        # use connect_with_retry() to get a connected Web3 instance
        # w3 = connect_with_retry()
        user_wallet=Wallet.objects.filter(user=user).first()
        recipient_address = user_wallet.address
        print(f"ad:{recipient_address}")
        private_key = "045be0b52044ba0f842dea76a18ef921009a629e7c8ad114a51023c6acf50520"
        gas_price = w3.toWei('5', 'gwei')  # Example gas price
        gas_limit = 21000  # Example gas limit
        
        nonce = w3.eth.getTransactionCount(w3.eth.account.privateKeyToAccount(private_key).address)
        transaction_data = {
            'to': recipient_address,
            'value': w3.toWei(matic_amount, 'matic'),
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
            transaction = Transaction.objects.create(user=user, matic_amount=matic_amount, status='completed')
            print(f"transaction:{transaction}")
            user_wallet.balance = matic_amount+ user_wallet.balance
            user_wallet.save()
            print(f"user_wallet is: {user_wallet}")
            print(f"the real balance is:{user_wallet.balance}")
            return Response({'message': 'Purchase successful.'}, status=status.HTTP_200_OK)
        else:
            transaction = Transaction.objects.create(user=user, matic_amount=matic_amount, status='failed')
            return Response({'message': 'Transaction failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @action(detail=False, methods=['get'])
    def get_balance(self, request):
        user = self.request.user
        user_wallet = Wallet.objects.filter(user=user).first()
        print(f"user_wallet is: {user_wallet}")
        if not user_wallet:
            balance = {
            'matic_balance': 0,
            'wallet_address' : ""
            # Add other balance fields as needed
            }
            return Response(balance, status=status.HTTP_200_OK)

        balance = w3.eth.getBalance(user_wallet.address)
        print(f"Balance: {balance}")
        user_wallet.balance=balance
        user_wallet.save
        balance = {
            'matic_balance': user_wallet.balance,
            'wallet_address' : user_wallet.address
            # Add other balance fields as needed
        }

        # balance = {
        #     'matic_balance': user_wallet.balance,
        #     'wallet_address' : user_wallet.address
        #     # Add other balance fields as needed
        # }

        return Response(balance, status=status.HTTP_200_OK)




def transfer_nft(private_key, sender_address, recipient_address, token_id,nft_contract_address):
    nonce = w3.eth.getTransactionCount(w3.eth.account.privateKeyToAccount(private_key).address)
    #contract
    # nft_contract_address = "0xB0Df35D093752d7fAf6bc3D4304CEFcCABe7a86a"
    abi_filename = os.path.join(settings.BASE_DIR, "Account", "ABI.json")
   
    # Read ABI from JSON file

    with open(abi_filename, "r") as abi_file:
        nft_contract_abi = json.load(abi_file)

    nft_contract = w3.eth.contract(address=nft_contract_address, abi=nft_contract_abi)
    
    tx_hash = nft_contract.functions.safeTransferFrom(sender_address, recipient_address, token_id).buildTransaction({
        'chainId': 137,  # Chain ID for Polygon (Matic) mainnet
        'gas': 2000000,  # gas value
        'gasPrice': w3.toWei('5', 'gwei'),  # gas price
        'nonce': nonce,
    })
    signed_txn = w3.eth.account.signTransaction(tx_hash, private_key)
    print(f"signed_txn is : {signed_txn}")
    tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    print(f"tx_hash is : {tx_hash}")
    return tx_hash


from core.models import NFT

def transferNFT(token_id,sender,recipient):
   
    #sender
    sender_address = sender.wallet.address
    sender_private_key = sender.wallet.private_key
        
    #recipient
    recipient_address=recipient.wallet.address
        
    tx_hash = transfer_nft(sender_private_key, sender_address, recipient_address, token_id)
    print(f"Transaction hash: {tx_hash.hex()}")
    nft=NFT.objects.filter(token_id=token_id).first()
    nft.owner=recipient
    nft.save()
    response_data = {
        "message": f"Transaction initiated. Transaction hash: {tx_hash.hex()}"
    }
        
    return Response(response_data, status=status.HTTP_200_OK)


            

