from django.contrib import admin
from django.urls import path, include
from todo_list.views import health_check

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('todo_list.urls')),
    path('health/', health_check, name='health_check'),
]
