from _typeshed import SupportsLenAndGetItem
from django.shortcuts import render
import re
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from searchv2.models import SearchSerializer

# Create your views here.

def searchUrl(request):
    data = JSONParser().parse(request)
    data_serializer = SearchSerializer(data=data)
    if data_serializer.is_valid():
        data_serializer.save()
        return JsonResponse("add succs", safe=False)
    return JsonResponse(data_serializer.errors, safe=False)

# ## SPLIT ##
# def tokenize(message):
#     all_words = re.findall("[A-Za-z0-9]+", message)
#     set_all_words = set(all_words)
#     if len(all_words) == len(set_all_words):
#         return set(all_words)
#     else:
#         return all_words

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
