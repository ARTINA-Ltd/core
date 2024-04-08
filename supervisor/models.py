from django.db import models
from Account.models import Profile
from Account.models import TicketUser
from django.contrib.auth.models import User

class SupervisorTicket(models.Model):
    supervisor = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket = models.ForeignKey(TicketUser, on_delete=models.CASCADE)
    response_message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class RejectionMessage(models.Model):
    message = models.TextField(blank=True, null=True)

class DocumentApproval(models.Model):
    supervisor = models.ForeignKey(User, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    shaba_number_approved = models.BooleanField(default=False)
    national_card_picture_approved = models.BooleanField(default=False)
    national_code_approved = models.BooleanField(default=False)
    response_message = models.TextField(blank=True, null=True)
    seen = models.BooleanField(default=False)
