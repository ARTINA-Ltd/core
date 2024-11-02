from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DocumentApproval, SupervisorTicket 
from .serializers import DocumentApprovalSerializer, SupervisorTicketSerializer 
from django.contrib.auth.models import User
from Account.models import NotifyUser
from .utils import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import PermissionDenied
from rest_framework.throttling import UserRateThrottle
import logging
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import PermissionDenied, ObjectDoesNotExist
from rest_framework.throttling import UserRateThrottle
import logging
# Logger configuration for document approval actions
approval_logger = logging.getLogger('document_approval')

class DocumentApprovalViewSet(viewsets.ModelViewSet):
    queryset = DocumentApproval.objects.all()
    serializer_class = DocumentApprovalSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    throttle_classes = [UserRateThrottle]  # Rate limiting to prevent abuse

    def get_queryset(self):
        """Ensure only the supervisor can access their unseen approvals."""
        user = self.request.user

        # Check if the user has the supervisor role
        role = getattr(getattr(user, 'profile', None), 'role', None)
        if not role or getattr(role, 'name', None) != 'supervisor':
            approval_logger.warning(f"Unauthorized access attempt by user {getattr(user, 'username', 'Unknown user')}.")
            raise PermissionDenied("You do not have permission to view approvals.")

        return DocumentApproval.objects.filter(supervisor=user)

    @action(detail=False, methods=['get'])
    def unseen_approvals(self, request):
        """Return unseen approvals for the supervisor."""
        supervisor = request.user

        # Ensure the user has the correct role
        role = getattr(getattr(supervisor, 'profile', None), 'role', None)
        if not role or getattr(role, 'name', None) != 'supervisor':
            approval_logger.warning(f"Unseen approvals access denied for user {getattr(supervisor, 'username', 'Unknown user')}")
            raise PermissionDenied("Only supervisors can access unseen approvals.")

        unseen_approvals = DocumentApproval.objects.filter(supervisor=supervisor, seen=False)
        serializer = self.get_serializer(unseen_approvals, many=True)
        approval_logger.info(f"Unseen approvals retrieved for supervisor {getattr(supervisor, 'username', 'Unknown user')}")
        return Response(serializer.data)


    @action(detail=True, methods=['put'])
    def approve(self, request, pk=None):
        """Approve a document."""
        approval = self.get_object()
        supervisor = request.user

        # Ensure the user has the correct role
        role = getattr(getattr(supervisor, 'profile', None), 'role', None)
        if not role or getattr(role, 'name', None) != 'supervisor':
            approval_logger.warning(f"Unseen approvals access denied for user {getattr(supervisor, 'username', 'Unknown user')}")
            raise PermissionDenied("Only supervisors can access unseen approvals.")

        # Validate and approve fields
        approval.national_code_approved = request.data.get('national_code_approved', False)
        approval.seen = True
        approval.save()
        approval_logger.info(f"Document approved by supervisor {supervisor.username} (ID: {approval.id})")
        return Response({'status': 'Approved'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def reject(self, request, pk=None):
        """Reject a document with a rejection message."""
        approval = self.get_object()
        supervisor = request.user

        # Ensure the user has the correct role
        role = getattr(getattr(supervisor, 'profile', None), 'role', None)
        if not role or getattr(role, 'name', None) != 'supervisor':
            approval_logger.warning(f"Unseen approvals access denied for user {getattr(supervisor, 'username', 'Unknown user')}")
            raise PermissionDenied("Only supervisors can access unseen approvals.")

        # Validate input
        rejection_message = request.data.get('rejection_message', None)
        if not rejection_message:
            return Response({'error': 'Rejection message is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Save the rejection message and mark the document as seen
        approval.response_message = rejection_message
        approval.seen = True
        approval.save()

        approval_logger.info(f"Document rejected by supervisor {supervisor.username} (ID: {approval.id}) with message: {rejection_message}")
        return Response({'status': 'Rejected'}, status=status.HTTP_200_OK)


# Logger for supervisor ticket actions
ticket_logger = logging.getLogger('supervisor_ticket')

class SupervisorTicketViewSet(viewsets.ModelViewSet):
    queryset = SupervisorTicket.objects.all()
    serializer_class = SupervisorTicketSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    throttle_classes = [UserRateThrottle]  # Rate limiting to prevent abuse

    def get_queryset(self):
        """Ensure supervisors can only access their own tickets."""
        user = self.request.user

        # Check if the user has the supervisor role
        # Check if the user has the supervisor role
        role = getattr(getattr(user, 'profile', None), 'role', None)
        if not role or getattr(role, 'name', None) != 'supervisor':
            approval_logger.warning(f"Unauthorized access attempt by user {getattr(user, 'username', 'Unknown user')}.")
            raise PermissionDenied("You do not have permission to view approvals.")

        return SupervisorTicket.objects.filter(supervisor=user)

    @action(detail=False, methods=['post'])
    def notify_response(self, request):
        """Notify an exhibition owner about a ticket response."""
        supervisor = self.request.user

        if not (hasattr(supervisor, 'profile') and
            hasattr(supervisor.profile, 'role') and
            getattr(supervisor.profile.role, 'name', None) == 'supervisor'):
            ticket_logger.warning(f"Notification creation attempt by non-supervisor user {supervisor.username}")
            raise PermissionDenied("Only supervisors can notify users.")

        # Validate input
        exhibition_owner = request.data.get("username")
        text = request.data.get('text', '').strip()

        if not exhibition_owner or not text:
            return Response({'error': 'Both username and text are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=exhibition_owner)
            NotifyUser.objects.create(user=user, text=text)
            ticket_logger.info(f"Notification sent to {user.username} by supervisor {supervisor.username}.")
            return Response({'message': 'Notification created successfully'}, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            ticket_logger.error(f"User with username {exhibition_owner} does not exist.")
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def unresponded_tickets(self, request):
        """Return unresponded tickets for the supervisor."""
    def get_queryset(self):
        """Ensure supervisors can only access their own tickets."""
        user = self.request.user

        # Check if the user has the supervisor role
        role = getattr(getattr(user, 'profile', None), 'role', None)
        if not role or getattr(role, 'name', None) != 'supervisor':
            approval_logger.warning(f"Unauthorized access attempt by user {getattr(user, 'username', 'Unknown user')}.")
            raise PermissionDenied("You do not have permission to view approvals.")

        unresponded_tickets = SupervisorTicket.objects.filter(response_message="", supervisor=supervisor)
        serializer = self.get_serializer(unresponded_tickets, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def metaverse_tickets(self, request):
        """Return metaverse-related tickets for the supervisor."""
        supervisor = request.user

        if not (hasattr(supervisor, 'profile') and
            hasattr(supervisor.profile, 'role') and
            getattr(supervisor.profile.role, 'name', None) == 'supervisor'):
            ticket_logger.warning(f"Notification creation attempt by non-supervisor user {supervisor.username}")
            raise PermissionDenied("Only supervisors can notify users.")

        metaverse_tickets = SupervisorTicket.objects.filter(response_message="", ticket__subject="metaverse", supervisor=supervisor)
        serializer = self.get_serializer(metaverse_tickets, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def respond(self, request, pk=None):
        """Respond to a ticket assigned to the supervisor."""
        supervisor = self.request.user

        # Ensure the user has the supervisor role
        if not (hasattr(supervisor, 'profile') and
            hasattr(supervisor.profile, 'role') and
            getattr(supervisor.profile.role, 'name', None) == 'supervisor'):
            ticket_logger.warning(f"Notification creation attempt by non-supervisor user {supervisor.username}")
            raise PermissionDenied("Only supervisors can notify users.")

        try:
            # Get the ticket
            ticketS = SupervisorTicket.objects.get(pk=pk)

            # Check if the ticket is assigned to the requesting supervisor
            if ticketS.supervisor != supervisor:
                ticket_logger.warning(f"Unauthorized respond attempt by {supervisor.username} for ticket {pk}")
                return Response({'error': 'You are not authorized to respond to this ticket.'}, status=status.HTTP_403_FORBIDDEN)

            # Validate response message
            response_message = request.data.get('response_message', '').strip()
            if not response_message:
                return Response({'error': 'Response message is required.'}, status=status.HTTP_400_BAD_REQUEST)

            # Send email to the user
            subject = "Response to your ticket"
            recipient_email = ticketS.ticket.email
            send_email(subject, recipient_email, response_message)

            # Update ticket response
            ticketS.response_message = response_message
            ticketS.save()

            ticket_logger.info(f"Ticket {pk} responded by supervisor {supervisor.username}.")
            return Response({'status': 'Response sent'}, status=status.HTTP_200_OK)
        except SupervisorTicket.DoesNotExist:
            ticket_logger.error(f"Ticket {pk} not found for supervisor {supervisor.username}.")
            return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)

