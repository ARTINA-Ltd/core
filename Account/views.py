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


class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer

    def create(self, request, *args, **kwargs):
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
            'cell_number': profile.cell_number,
            'address': profile.address,
            'national_card_picture': str(profile.national_card_picture.url),
            'profile_picture': str(profile.profile_picture.url),
            'email': user.email,
            'role': str(profile.role),
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

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class TicketViewSet(viewsets.ModelViewSet):
    queryset = UserTicket.objects.all()
    serializer_class = serializers.TicketSerializer

    def create(self, request, *args, **kwargs):
        serializer = serializers.TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PhoneVerificationViewSet(viewsets.ViewSet):
    queryset = PhoneVerification.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.is_authenticated:
            queryset = queryset.filter(user=user)
        return queryset

    def create(self, request, pk=None):
        phone_number = request.data.get('phone_number')
        verification_code = request.data.get("verification_code")
        phone_verification = PhoneVerification.objects.get(phone_number=phone_number)
        if phone_verification.verification_code == verification_code:
            phone_verification.verified = True
            phone_verification.save()
            return Response({"status": "success"})
        else:
            return Response({"status": "error", "error": "verification code is not correct"},
                            status.HTTP_400_BAD_REQUEST)


class SendVerificationCodeViewSet(viewsets.ViewSet):
    # permission_classes = [AllowAny]

    def create(self, request, format=None):
        phone_number = request.data.get('phone_number')
        username = request.data.get('username')
        user = User.objects.get(username=username)

        if not phone_number:
            return Response({'error': 'phone_number is required.'}, status.HTTP_400_BAD_REQUEST)

        verification_code = random.randint(100000, 999999)

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
            PhoneVerification.objects.create(user=user, phone_number=phone_number, verification_code=verification_code,
                                             verified=False)
            print(f"Verification code for {phone_number}: {verification_code}")

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




class UserBalanceViewSet(viewsets.ModelViewSet):
    queryset = UserBalance.objects.all()
    serializer_class = serializers.UserBalanceSerializer
    # permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        # request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)