from rest_framework import serializers
from .models import Category, Task

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
    
    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Le nom de la catégorie ne peut pas être vide.")
        return value

class TaskSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Task
        fields = ['id', 'description', 'is_completed', 'created_at', 'category', 'category_name']
        read_only_fields = ['created_at']
    
    def validate_description(self, value):
        if not value.strip():
            raise serializers.ValidationError("La description ne peut pas être vide.")
        return value
    
    def validate_category(self, value):
        if not value:
            raise serializers.ValidationError("Une catégorie doit être sélectionnée.")
        return value