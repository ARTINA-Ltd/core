from pathlib import Path
import os
from dotenv import load_dotenv
from django.middleware.security import SecurityMiddleware

BASE_DIR = Path(__file__).resolve().parent.parent
env_loaded = load_dotenv()

SECRET_KEY = 'jwb9-)x##t=b#g9(cu)qz9#$-v9!r)olg0pl2p9-t4s!6syp#*'
COMPANY_WALLET_ADDRESS = os.getenv('COMPANY_WALLET_ADDRESS')
COMPANY_WALLET_PRIVATE_KEY = os.getenv('COMPANY_WALLET_PRIVATE_KEY')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')
SECRET_T_KEY = os.getenv('SECRET_T_KEY')
X_API_KEY = os.getenv('X_API_KEY')
DEBUG = False
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'Account',
    'exhibition',
    'core',
    'supervisor',    
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'Account.middleware.FailedLoginMiddleware',
]

JAZZMIN_SETTINGS = {
    "title": "Artina Admin",
    "site_title": "Artina Admin",
    "site_header": "Artina",
    "site_logo": "my_project/img/logo.png",
    "site_logo_url": "/admin/",
    "related_modal_active": True,
}
JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": True,
    "footer_small_text": True,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-dark",
    "accent": "accent-primary",
    "order_with_respect_to": ["myapp", "otherapp"],
    "custom_links": {
        "myapp": [{"name": "Make Payment", "url": "make_payment"}],
    },
    "related_modal_active": False,
}

CORS_ALLOWED_ORIGINS = [
    'https://api.artina.org',
    'https://www.artina.org',
    'https://artina.org',
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',  
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CSRF_TRUSTED_ORIGINS = [
    'https://api.artina.org'
]

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True
X_FRAME_OPTIONS = 'DENY'

CSP_FRAME_ANCESTORS = ("'none'",)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_THROTTLE_RATES': {
        'anon': '5/minute',
        'user': '45/minute',
    }
}

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=59),
    'REFRESH_TOKEN_LIFETIME': timedelta(minutes=179),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
}

ROOT_URLCONF = 'ARTINA.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ARTINA.wsgi.application'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file_login': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'login_api.log',
            'formatter': 'verbose',
        },
        'file_register': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'register_api.log',
            'formatter': 'verbose',
            'delay': True,
        },
        'file_transferInside': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'transferInside.log',
            'formatter': 'verbose',
        },
        'file_payment': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'payment.log',
            'formatter': 'verbose',
        },
        'file_nft': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'nft.log',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': [],
            'level': 'DEBUG',
            'propagate': False,
        },
        'Account.login': {
            'handlers': ['file_login'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'Account.register': {
            'handlers': ['file_register'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'core.transferInside': {
            'handlers': ['file_transferInside'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'Account.payment': {
            'handlers': ['file_payment'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'core.nft': {
            'handlers': ['file_nft'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'artina',
        'USER': 'administrator',
        'PASSWORD': 'drmNi80!prhLiPVPt@Ly',
        'HOST': 'localhost',
        'PORT': '',
        'TEST': {
            'NAME': 'mytestdatabase',
        }, }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Tehran'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
