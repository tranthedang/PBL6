from django.db import models
from rest_framework import serializers


# Create your models here.
class Find(models.Model):
    keyword = models.CharField(max_length=500, default='Put your key word here', blank=True)
    keydata = models.TextField(default='[]',blank=True)


class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Find
        fields = '__all__'