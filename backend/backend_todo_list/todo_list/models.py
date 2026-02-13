from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"

class Task(models.Model):
    description = models.TextField(blank=False)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tasks')
    
    def __str__(self):
        return self.description[:50]
    
    class Meta:
        ordering = ['-created_at']