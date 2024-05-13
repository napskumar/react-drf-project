from rest_framework import serializers 
from .models import *
  
class taskSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = taskPost 
        fields = ['id','title','description','status']