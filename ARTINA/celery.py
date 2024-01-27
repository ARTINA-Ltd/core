# celery.py

from celery import Celery
from celery.schedules import crontab

app = Celery('ARTINA')

# Configuration
app.conf.beat_schedule = {
    'check_nft_end_times': {
        'task': 'core.tasks.check_nft_end_time',
        'schedule': crontab(minute='*/5'),  # Adjust the schedule as needed
    },
}

# Load configuration from Django settings
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all registered Django app configs
app.autodiscover_tasks()
