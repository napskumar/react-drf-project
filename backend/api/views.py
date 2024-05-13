from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,status
from .serializer import taskSerializer
from .models import taskPost

class taskCreate(generics.ListAPIView):
    queryset = taskPost.objects.all()
    serializer_class = taskSerializer
  
    '''def get(self, request): 
        detail = [ {"title": detail.title,"description": detail.description,"status": detail.status}  
        for detail in taskPost.objects.all()] 
        return Response(detail) '''

    def post(self, request):   
        serializer = taskSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return  Response(serializer.data) 
        
    def delete(self,request,*args,**kwargs):
        taskPost.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class taskDelete(generics.RetrieveDestroyAPIView):
    queryset = taskPost.objects.all()
    serializer_class = taskSerializer
    lookup_field = 'pk'
   

