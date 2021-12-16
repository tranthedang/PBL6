from django.conf.urls import url
from searchv2 import views


urlpatterns = [
    url(r'get_urls$', views.getUrls)
]
