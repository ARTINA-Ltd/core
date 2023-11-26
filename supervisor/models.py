from django.db import models
from account.models import Profile
from account.models import Ticket
from django.contrib.auth.models import User

class SupervisorTicket(models.Model):
    supervisor = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    response_message = models.TextField()

    def __str__(self):
        return f"{self.supervisor.user.username} - {self.ticket.title}"

class DocumentApproval(models.Model):
    supervisor = models.ForeignKey(User, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    shaba_number_approved = models.BooleanField(default=False)
    national_card_picture_approved = models.BooleanField(default=False)
    national_code_approved = models.BooleanField(default=False)
    rejection_message = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.supervisor.user.username} - {self.user_profile.user.username}"
