from django.shortcuts import render
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from ranking.models import Link, LinkSerializer
from collections import defaultdict
from rest_framework.decorators import api_view
import re

@api_view(['GET'])
def getUrl(request):
    Url = list(Link.objects.all().values())
    Url_serializer = LinkSerializer(data=Url, many=True)
    if Url_serializer.is_valid():
        return JsonResponse(Url, safe=False)
    return JsonResponse(Url_serializer.errors, safe=False)

@api_view(['POST'])
def createUrl(request):
    link_data = JSONParser().parse(request)
    print(link_data)
    link_serializer = LinkSerializer(data=link_data)
    if link_serializer.is_valid():
        link_serializer.save()
        return JsonResponse("Added", safe=False)
    return JsonResponse(link_serializer.errors, safe=False)

@api_view(['POST'])
def mapReduce(request):
    try:
        data = JSONParser().parse(request)
        link_count(data['data'])
        return JsonResponse("Succed",safe=False)
    except:
        return JsonResponse("Failed",safe=False)

## SPLIT ##
def splitter(message):
    all_links = re.findall("[A-Za-z0-9]+", message)
    set_all_links = set(all_links)
    if len(all_links) == len(set_all_links):
        return set(all_links)
    else:
        return all_links

## MAPPER ##
def mapper(document):
    for each_link in splitter(document):
        yield (each_link, 1)

## REDUCE ##
def reducer(link, count):
    array = []
    array.append(int(link))
    array.append(len(count))
    updateData(array)

def link_count(documents):
    collector = defaultdict(list)
    for document in documents:
        for link, count in mapper(document):
            ## SUFFLE ##
            collector[link].append(count)
    for link, count in collector.items():
        reducer(link, count)
        
def updateData(data):
    count = 0
    link = Link.objects.get(id=data[0])
    count = link.count_click + data[1]
    location_res = {
        "id": data[0],
        "url": link.url,
        "description": link.description,
        "count_click": count,
        "category": link.category
    }
    link_serializer = LinkSerializer(link, data=location_res)
    if link_serializer.is_valid():
        link_serializer.save()
        print('Done for:', link_serializer)
    else:
        print('Error', link_serializer)

