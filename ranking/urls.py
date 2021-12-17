from django.conf.urls import url
from ranking import views


urlpatterns = [
    url(r'get_links$', views.getUrl),
    url(r'map_reduce$', views.mapReduce),
    url(r'create_links$', views.createUrl) #adminsator only
]