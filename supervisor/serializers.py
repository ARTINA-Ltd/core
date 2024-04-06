from rest_framework import serializers
from .models import DocumentApproval, SupervisorTicket , RejectionMessage
from Account.models import Profile , TicketUser

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        
class TicketUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketUser
        fields = '__all__'
        
class DocumentApprovalSerializer(serializers.ModelSerializer):
    user_profile = ProfileSerializer()
    class Meta:
        model = DocumentApproval
        fields = '__all__'

class SupervisorTicketSerializer(serializers.ModelSerializer):
    ticket= TicketUserSerializer()
    class Meta:
        model = SupervisorTicket
        fields = '__all__'

class RejectionMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RejectionMessage
        fields = '__all__'
