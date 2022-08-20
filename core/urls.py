from django.urls import path, include
from core import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import TransactionList

router = DefaultRouter()
router.register(r'', TransactionList, basename='transactions')
router.register(r'orders',views.OrderViewSet)

urlpatterns = [
    path('', include(router.urls))
]