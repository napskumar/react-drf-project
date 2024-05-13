from django.urls import path
from api import views
from api.views import *

urlpatterns = [
    path('create/',views.taskCreate.as_view(),name='create'),
    path('delete/<int:pk>',views.taskDelete.as_view(),name='delete'),
]