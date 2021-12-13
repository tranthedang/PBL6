# from _typeshed import SupportsLenAndGetItem
from django.shortcuts import render
import re
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from searchv2.models import SearchSerializer
from searchv2.models import Search
import json

# Create your views here.

def searchUrl(request):
    data = JSONParser().parse(request)
    print(data)
    data['data'] = str(data['data'])
    data_serializer = SearchSerializer(data=data)
    if data_serializer.is_valid():
        data_serializer.save()
        return JsonResponse("add succs", safe=False)
    return JsonResponse(data_serializer.errors, safe=False)

def getUrls(request):
    data = JSONParser().parse(request)
    data_real = Search.objects.get(url=data['url'])
    list_data = json.loads(data_real.data)
    jsonres = {
            "id": data_real.id,
            "creator": data_real.url,
            "participants": list_data
        }
    return JsonResponse(jsonres, safe=False)
    
# ## SPLIT ##
# def tokenize(message):
#     all_urls = re.findall("[A-Za-z0-9]+", message)
#     set_all_urls = set(all_urls)
#     if len(all_urls) == len(set_all_urls):
#         return set(all_urls)
#     else:
#         return all_urls

# ## MAPPER ##
# def wc_mapper(document):
#     for word in tokenize(document):
#         yield (word, 1)

# ## REDUCE ##
# def wc_reducer(word, counts):
#     array = []
#     array.append(int(word))
#     array.append(len(counts))
#     updateData(array)


# def word_count(documents):
#     collector = defaultdict(list)
#     for document in documents:
#         for word, count in wc_mapper(document):
#             ## SUFFLE ##
#             collector[word].append(count)
#     for word, counts in collector.items():
#         wc_reducer(word, counts)

# def mapReduce(request):
#     data = JSONParser().parse(request)
#     word_count(data['data'])
#     return
