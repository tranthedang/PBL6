from django.conf.urls import url
from searchv2 import views


urlpatterns = [
    url(r'search$', views.searchUrl),
    url(r'view-result$', views.viewResult)
]
