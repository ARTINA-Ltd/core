from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentApprovalViewSet, SupervisorTicketViewSet,RejectionMessageViewSet

router = DefaultRouter()
router.register(r'document-approvals', DocumentApprovalViewSet, basename='document-approval')
router.register(r'supervisor-tickets', SupervisorTicketViewSet, basename='supervisor-ticket')
router.register(r'rejection-messages', RejectionMessageViewSet, basename='Rejection-Message')

urlpatterns = [
    path('', include(router.urls)),
]
