from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab
import pytz

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ARTINA.settings')

# Create a Celery instance and configure it using the settings from Django.
app = Celery('ARTINA')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps.
app.autodiscover_tasks()

# Set the timezone explicitly for Celery using UTC.
app.conf.timezone = 'UTC'

# Define the Tehran timezone using pytz.
tehran_tz = pytz.timezone('Asia/Tehran')

# Add a periodic task to run every 2 minutes.
app.conf.beat_schedule = {
    'your-scheduled-task': {
        'task': 'core.tasks.check_nft_end_time',
        'schedule': crontab(minute='*/2'),
    },
}
