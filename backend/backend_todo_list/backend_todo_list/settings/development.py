from .base import *


# Clé secrète pour le développement. NE PAS UTILISER EN PRODUCTION.
SECRET_KEY = 'django-insecure-km5vw6y(hh)m*@!7b6mdl3@xxsd1a5r*+a1*@7(+)#q5b37eph'

# Activer le mode débogage pour le développement
DEBUG = True

# En développement, on peut autoriser toutes les origines
ALLOWED_HOSTS = []

# Database for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}