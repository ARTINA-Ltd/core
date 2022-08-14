from django.urls import path, include

from rest_framework.routers import DefaultRouter

from core.views import TransactionList

router = DefaultRouter()
router.register(r'', TransactionList, basename='transactions')

urlpatterns = [
    path('', include(router.urls))
]