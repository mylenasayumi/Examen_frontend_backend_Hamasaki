from django.contrib import admin
from django.urls import path, include
from todo_list.views import health_check, trigger_error 

def trigger_error(request):
    division_by_zero = 1 / 0

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('todo_list.urls')),
    path('health/', health_check, name='health_check'),
    path('error/', trigger_error, name='trigger_error'),
    path('sentry-debug/', trigger_error),
]
