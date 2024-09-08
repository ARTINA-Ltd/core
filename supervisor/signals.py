from itertools import cycle
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Count
from .models import User, DocumentApproval, Profile

# Function to determine the next supervisor to assign a task
def get_next_supervisor():
    # Fetch all supervisors, and annotate them with the count of DocumentApproval they have
    supervisors = User.objects.filter(role='supervisor').annotate(approval_count=Count('documentapproval')).order_by('approval_count')
    
    # Create a round-robin cycle of supervisors to evenly distribute tasks
    supervisor_cycle = cycle(supervisors)
    
    # Return the next supervisor from the cycle
    return next(supervisor_cycle)

# Signal receiver that triggers after a Profile instance is saved
@receiver(post_save, sender=Profile)
def supervisor_tasks_updater(sender, instance, **kwargs):
    # Check if the user's national card picture has been uploaded
    if instance.national_card_picture_upload:
        try:
            # Get the next supervisor to assign the DocumentApproval to
            supervisor = get_next_supervisor()
            
            # Check if a DocumentApproval already exists for this profile and supervisor
            if not DocumentApproval.objects.filter(supervisor=supervisor, user_profile=instance).exists():
                # Create a new DocumentApproval entry if it doesn't already exist
                document = DocumentApproval.objects.create(
                    supervisor=supervisor,
                    user_profile=instance
                )
            else : 
                document=DocumentApproval.objects.get(supervisor=supervisor, user_profile=instance)
                document.seen=False

                # Optionally, log or perform additional actions with the created document
        except User.DoesNotExist:
            pass
    else:
        pass