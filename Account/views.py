from Account import serializers
from .models import ArtistReviewRating, Profile, UserTicket, PhoneVerification
from rest_framework import viewsets, permissions, generics
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


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




# class PhoneVerificationViewSet(viewsets.ModelViewSet):
#     queryset = PhoneVerification.objects.all()
#     serializer_class = serializers.PhoneVerificationSerializer
#
#     def get_queryset(self):
#         queryset = super().get_queryset()
#         user = self.request.user
#         if user.is_authenticated:
#             queryset = queryset.filter(user=user)
#         return queryset
#
#     @action(detail=True, methods=['post'])
#     def verify_phone(self, request, pk=None):
#         verification_code = request.data.get("verification_code")
#         phone_verification = self.get_object()
#
#         if phone_verification.verification_code == verification_code:
#             phone_verification.verified = True
#             phone_verification.save()
#             return Response({"status": "success"})
#         else:
#             return Response({"status": "error", "error": "verification code is not correct"},
#                             status.HTTP_400_BAD_REQUEST)


# class SendVerificationCode(APIView):
#     permission_classes = [AllowAny]
#
#     def post(self, request, format=None):
#         phone_number = request.data.get('phone_number')
#         if not phone_number:
#             return Response({'error': 'phone_number is required.'}, status.HTTP_400_BAD_REQUEST)
#
#         # Generate a random 6-digit verification code
#         verification_code = str(random.randint(100000, 999999))
#
#         # Save the verification code to the database
#         phone_verification = PhoneVerification.objects.create(phone_number=phone_number, verification_code=verification_code)
#
#         # Send the verification code to the user's phone number
#         # Replace the following line with your own code to send the SMS message
#         print(f"Verification code for {phone_number}: {verification_code}")
#
#         return Response({'status': 'success'})





        
# class PhoneVerificationViewSet(viewsets.ModelViewSet):
#     queryset = PhoneVerification.objects.all()
#     serializer_class = serializers.PhoneVerificationSerializer
#
#     def get_queryset(self):
#         queryset = super().get_queryset()
#         user = self.request.user
#         if user.is_authenticated:
#             queryset = queryset.filter(user=user)
#         return queryset
#
#     def verify_phone(self, request, pk=None):
#         verification_code = request.data.get("verification_code")
#         phone_verification = self.get_object()
#
#         if phone_verification.verification_code == verification_code:
#             phone_verification.verified = True
#             phone_verification.save()
#             return Response({"status": "success"})
#         else:
#             return Response({"status": "error", "message": "Invalid verification code"})
