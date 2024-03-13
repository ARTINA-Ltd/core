from rest_framework import serializers
from .models import DocumentApproval, SupervisorTicket

class DocumentApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentApproval
        fields = '__all__'

class SupervisorTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupervisorTicket
        fields = '__all__'
