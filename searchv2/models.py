from django.db import models
from rest_framework import serializers
from PBL6 import settings


# Create your models here.
class Search(models.Model):
    url = models.CharField(max_length=500, default='Put your URL here', blank=True)
    data = models.TextField(default='[]',blank=True)


class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Search
        fields = '__all__'