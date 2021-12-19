from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import requests
from bs4 import BeautifulSoup
from rest_framework.decorators import api_view

@api_view(['POST'])
def getUrls(url):
    try:
        dataReceive = JSONParser().parse(url)
        text = getLinks(dataReceive['url'])
        dataReturn = text
        return JsonResponse(dataReturn, safe=False)
    except:
        return JsonResponse("Connection error", safe=False)
        

def getLinks(url):
    links = []
    try:
        website = requests.get(url).text # Get html in text
        soup = BeautifulSoup(website,'html.parser')   # BeautifulSoup object which will ping the requested url for data

        for each_link in soup.find_all('a'):
            links.append(each_link.get('href')) # Do a loop and save all url to links
            
        unique_links = list(dict.fromkeys(links)) # Remove all duplicate url
        links.clear()
        
        unique_links.append(len(unique_links)) # Save the length of the links and the end of links
        links.append(unique_links) 
        return links
    except:
        return "It's not an URL"
    

