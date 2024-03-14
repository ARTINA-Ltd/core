from rest_framework import serializers
from .models import DocumentApproval, SupervisorTicket
from Account.models import Profile
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        

class DocumentApprovalSerializer(serializers.ModelSerializer):
    user_profile = ProfileSerializer()
    class Meta:
        model = DocumentApproval
        fields = '__all__'

class SupervisorTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupervisorTicket
        fields = '__all__'
