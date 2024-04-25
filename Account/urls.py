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
router.register(r'phone-verification', views.PhoneVerificationViewSet, basename="phone_verification")
router.register(r'send-verification-code', views.SendVerificationCodeViewSet, basename="send-verification-code")
router.register(r'email-verification-code', views.EmailMixin, basename="email-verification-code")


router.register(r'user-balance', views.UserBalanceViewSet, basename='user-balance')
router.register(r'user-turnover', views.UserTurnoverViewSet, basename='user-turnover')
router.register(r'user-PasswordReset', views.PasswordResetByPhoneViewSet, basename='PasswordRese')
router.register(r'userpicture', views.UserPictureViewSet, basename='Userpicture')
router.register(r'payment', views.PaymentGateViewSet, basename='payment')
router.register(r'NotifyUserViewSet', views.NotifyUserViewSet, basename='NotifyUserViewSet')
router.register(r'wallet', views.WalletViewSet, basename='wallet')
router.register(r'Transaction', views.TransactionViewSet, basename='Transaction')
router.register(r'CryptoViewSet', views.CryptoViewSet, basename='CryptoViewSet')
# router.register(r'TransactionNFT', views.TransactionNFTViewSet, basename='TransactionNFT')


urlpatterns = [
    path('', include(router.urls)),
]


