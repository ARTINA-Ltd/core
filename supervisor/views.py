from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DocumentApproval, SupervisorTicket , RejectionMessage
from .serializers import DocumentApprovalSerializer, SupervisorTicketSerializer , RejectionMessageSerializer
from Account.views import EmailMixin  

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
            approval.rejection_message = rejection_message
            approval.seen = True
            approval.save()
            return Response({'status': 'Rejected'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Rejection message is required'}, status=status.HTTP_400_BAD_REQUEST)

class SupervisorTicketViewSet(viewsets.ModelViewSet):
    queryset = SupervisorTicket.objects.all()
    serializer_class = SupervisorTicketSerializer

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

    @action(detail=True, methods=['put'])
    def respond(self, request, pk=None):
        ticket = self.get_object()
        response_message = request.data.get('response_message', None)
        if response_message:
            # Mail response to the user
            subject = "Response to your ticket"
            recipient_email = ticket.ticket.user.email  # Assuming user's email is stored in ticket
            message = response_message  # Use response message as email message
            EmailMixin.send_email(subject, recipient_email, message)  # Use the send_email method from EmailMixin
            # Update ticket response
            ticket.response_message = response_message
            ticket.save()
            return Response({'status': 'Response sent'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Response message is required'}, status=status.HTTP_400_BAD_REQUEST)            
        



class RejectionMessageViewSet(viewsets.ModelViewSet):
    queryset = RejectionMessage.objects.all()
    serializer_class = RejectionMessageSerializer
