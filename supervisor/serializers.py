from rest_framework import serializers
from .models import SupervisorTicket, DocumentApproval

class SupervisorTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupervisorTicket
        fields = '__all__'

class DocumentApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentApproval
        fields = '__all__'
