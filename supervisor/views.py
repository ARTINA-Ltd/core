from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DocumentApproval, SupervisorTicket , RejectionMessage
from .serializers import DocumentApprovalSerializer, SupervisorTicketSerializer , RejectionMessageSerializer
from Account.views import EmailMixin  
from django.contrib.auth.models import User
from Account.models import NotifyUser

class DocumentApprovalViewSet(viewsets.ModelViewSet):
    queryset = DocumentApproval.objects.all()
    serializer_class = DocumentApprovalSerializer

    @action(detail=False, methods=['get'])
    def unseen_approvals(self, request):
        supervisor = request.user
        unseen_approvals = DocumentApproval.objects.filter(supervisor=supervisor, seen=False)
        serializer = self.get_serializer(unseen_approvals, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['put'])
    def approve(self, request, pk=None):
        approval = self.get_object()
        # Check if national_code_approved or other fields need to be approved
        approval.national_code_approved = request.data.get('national_code_approved', False)
        # Check other fields for approval
        approval.seen = True
        approval.save()
        return Response({'status': 'Approved'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def reject(self, request, pk=None):
        approval = self.get_object()
        rejection_message = request.data.get('rejection_message', None)
        if rejection_message:
            approval.response_message = rejection_message
            approval.save()

            print(rejection_message)
            approval.seen = True
            approval.save()
            return Response({'status': 'Rejected'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Rejection message is required'}, status=status.HTTP_400_BAD_REQUEST)

class SupervisorTicketViewSet(viewsets.ModelViewSet):
    queryset = SupervisorTicket.objects.all()
    serializer_class = SupervisorTicketSerializer

    @action(detail=False, methods=['post'])
    def notify_response(self, request):
        exhibition_owner = request.data.get("username") 
        text = request.data.get('text', '') 
        user= User.objects.get(username=exhibition_owner)
        NotifyUser.objects.create(user=user,text=text)
        return Response({'message': 'Notification created successfully'}, status=201)


    @action(detail=False, methods=['get'])
    def unresponded_tickets(self, request):
        unresponded_tickets = SupervisorTicket.objects.filter(response_message="")
        serializer = self.get_serializer(unresponded_tickets, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def metaverse_tickets(self, request):
        metaverse_tickets = SupervisorTicket.objects.filter(response_message="", ticket__subject="metaverse")
        serializer = self.get_serializer(metaverse_tickets, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def respond(self, request, pk=None):
        # Get supervisor ID from request user (assuming it's authenticated)
        supervisor_id = self.request.user.id

        # Get the ticket
        ticketS = SupervisorTicket.objects.get(pk=pk)

        # Check if the ticket is assigned to the requesting supervisor
        if ticketS.supervisor.id != supervisor_id:
            return Response({'error': 'You are not authorized to respond to this ticket.'}, status=status.HTTP_403_FORBIDDEN)

        # Extract response_message from request data
        response_message = request.data.get('response_message', None)

        # Check if response_message exists
        if not response_message:
            return Response({'error': 'Response message is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Mail response to the user
        subject = "Response to your ticket"
        recipient_email = ticketS.ticket.email
        message = response_message
        EmailMixin.send_email(subject, recipient_email, message)

        # Update ticket response
        ticketS.response_message = response_message
        ticketS.save()

        return Response({'status': 'Response sent'}, status=status.HTTP_200_OK)

class RejectionMessageViewSet(viewsets.ModelViewSet):
    queryset = RejectionMessage.objects.all()
    serializer_class = RejectionMessageSerializer
