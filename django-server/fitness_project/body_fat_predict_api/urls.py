
   
from django.contrib import admin
from django.urls import path
from .views import WeatherNowView

urlpatterns = [
    path('/', WeatherNowView.as_view()),
]