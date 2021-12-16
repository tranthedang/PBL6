from django.conf.urls import url
from find import views

urlpatterns = [
    url(r'get_words$', views.getWords)
]