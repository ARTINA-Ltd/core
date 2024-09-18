from celery import shared_task
from django.utils import timezone
from .models import Exhibition, Application

@shared_task
def check_pending_applications():
    # Get current time
    now = timezone.now()
    # Get exhibitions that are starting now or have started and not checked yet
    exhibitions = Exhibition.objects.filter(start_date__lte=now)

    for exhibition in exhibitions:
        # Check for pending applications
        pending_applications = exhibition.applications.filter(status='pending')

        if pending_applications.exists():
            # Handle pending applications
            for application in pending_applications:
                # You can log, send notifications, or change status here
                print(f"Pending application found for exhibition: {exhibition.marketName} by artist: {application.artist.username}")
                # Optionally, you can change the status of the application
                application.status = 'ignored'
                application.save()
