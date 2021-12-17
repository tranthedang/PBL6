from django.db import models
from rest_framework import serializers


# Create your models here.
class Link(models.Model):
    url = models.CharField(max_length=30)
    description = models.CharField(max_length=500, default='', blank=True)
    count_click = models.IntegerField(default=0)
    category = models.CharField(max_length=200, default='', blank=True)


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'
