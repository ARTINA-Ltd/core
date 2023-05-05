from django.urls import path, include
from Account import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'register', views.RegisterViewSet)
# router.register(r'artists', views.ArtistViewSet)
router.register(r'rate', views.ArtistRateViewSet)
router.register(r'profile', views.ProfileViewSet)
router.register(r'user-info', views.UserInfoViewSet, basename='user_info')
router.register(r'login', views.LoginViewSet, basename='login')
router.register(r'ticket', views.TicketViewSet, basename="ticket")
# router.register(r'phone-verification', views.PhoneVerificationViewSet, basename="phone_verification")

urlpatterns = [
    # path('api/send_verification_code/', views.SendVerificationCode.as_view()),
    path('', include(router.urls)),
    # path('api/phone_verification/<int:pk>/verify_phone/', views.PhoneVerificationViewSet.as_view({'post': 'verify_phone'})),
]


