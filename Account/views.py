from Account import serializers
from .models import ArtistReviewRating, Profile
from rest_framework import viewsets,permissions, generics
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

# @api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
# def user_info(request):
#     user = request.user
#     data = {
#         'username': user.username,
#         'email': user.email,
#         # Add any other user information you want to pass to the response
#     }
#     return Response(data)





# # API view that returns the user associated with a given JWT token
# class UserAPIView(generics.RetrieveAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#   #  authentication_classes = [JSONWebTokenAuthentication]
#     serializer_class = serializers.UserSerializer

#     def retrieve(self, request, *args, **kwargs):
#         return Response({
#             'username': request.user.username        })










# class ArtistViewSet(viewsets.ModelViewSet):
#     # TODO: filter the artists only when roles added.
#
#     role = models.Role.objects.get(name='artist')
#     queryset = User.objects.prefetch_related('profile').filter(profile__role=role)
#     serializer_class = serializers.UserSerializer
#     http_method_names = ['get', 'delete']
#
#     def get_permissions(self):
#         if self.request.method == 'DELETE':
#             self.permission_classes = [IsAuthenticated, ]
#         else:
#             self.permission_classes = []
#         return super().get_permissions()
#
#     def destroy(self, request, *args, **kwargs):
#         if request.user != self.get_object():
#             return Response({'error': 'you have not permission to delete this user'}, status.HTTP_403_FORBIDDEN)
#         return super().destroy(request, *args, **kwargs)
#
#     def get_serializer_class(self):
#         if self.action == 'request_exhibition':
#             return NFtExSerializer
#         else:
#             return super().get_serializer_class()
#
#     @action(detail=False, methods=['get'], name='Get Applications', permission_classes=[IsAuthenticated])
#     def get_applications(self, request):
#         artist = request.user
#         if not artist.is_artist():
#             return Response({'error': 'you are not an artist.'}, status.HTTP_403_FORBIDDEN)
#         serializer = NFtExSerializer(artist.get_artist_applications(), many=True)
#         return Response(serializer.data, status.HTTP_200_OK)
#
#     @action(detail=False, methods=['get'], name='Get Exhibitions', permission_classes=[IsAuthenticated])
#     def get_exhibitions(self, request):
#         artist = request.user
#         if not artist.is_artist():
#             return Response({'error': 'you are not an artist.'}, status.HTTP_403_FORBIDDEN)
#         return Response(artist.get_artist_exhibitions(), status.HTTP_200_OK)
#
#     @action(detail=False, methods=['post'], name='Request to exhibition')
#     def request_exhibition(self, request):
#         artist = request.user
#         if not artist.is_artist():
#             return Response({'error': 'you are not an artist.'}, status.HTTP_403_FORBIDDEN)
#         serializer = self.get_serializer_class()
#         serializer = serializer(data=request.data)
#         if serializer.is_valid():
#             data = serializer.validated_data
#             nfts = data['nfts']
#             exhibition = data['ex']
#             for nft in nfts:
#                 if nft.owner != artist:
#                     return Response({'error':
#                                      'you can not submit nfts that do not belong to you',
#                                      'nft': str(nft)}, status.HTTP_403_FORBIDDEN)
#                 elif nft.is_in_exhibition():
#                     return Response({'error':
#                                      'None of the nfts should be exhibited in another exhibition right now.',
#                                      'nft': str(nft)}, status.HTTP_400_BAD_REQUEST)
#
#             if not exhibition.can_apply():
#                 return Response({'error':
#                                  'you can not apply for a expired exhibition, or 2 days before exhibition starts'},
#                                 status.HTTP_400_BAD_REQUEST)
#
#             # Check for artists limitation
#             if len(exhibition.get_artists()) >= 15:
#                 return Response({'error': 'This exhibition has arrived to its 15 artist limitation'})
#
#             if exhibition.has_artist_pending_request(artist):
#                 return Response({'error':
#                                  'you already have submitted an application for this exhibition which is pending yet.'},
#                                 status.HTTP_400_BAD_REQUEST)
#
#             application = serializer.save()
#             return Response(self.get_serializer_class()(application).data, status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
#
#     @action(detail=True, methods=['get'], name='Get Nfts')
#     def get_nfts(self, request, pk=None):
#         try:
#             artist = User.objects.get(id=pk)
#             nfts = NFT.objects.filter(owner=artist).all()
#         except User.DoesNotExist:
#             return Response({'error': 'Artist does not exist'}, status.HTTP_404_NOT_FOUND)
#         return Response(NFTSerializer(nfts, many=True).data)


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
