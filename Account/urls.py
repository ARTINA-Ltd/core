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


urlpatterns = [
    path('', include(router.urls)),
]
