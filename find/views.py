import requests
import operator
from bs4 import BeautifulSoup
from collections import Counter
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

words_count = []
top_common = []

def getWords(url):
    try:
        dataReceive = JSONParser().parse(url)
        text = getWordList(dataReceive['url'])
        dataReturn = {
            "data" : text
        }
        print(text)
        return JsonResponse(dataReturn, safe=False)
    except:
        return JsonResponse("Connection error", safe=False)
    

def getWordList(url):
    wordlist = []
    source_code = requests.get(url).text
    soup = BeautifulSoup(source_code, 'html.parser')	# BeautifulSoup object which will ping the requested url for data

    for each_text in soup.findAll(True):	# Text in given web-page is stored under tags with classes so we use True to find them all
        content = each_text.text
        words = content.lower().split()		# use split() to break the sentence into words and convert them into lowercase
        for each_word in words:
            wordlist.append(each_word)
    return cleanWordlist(wordlist) # Function removes any unwanted symbols after the loop

def cleanWordlist(wordlist):
    clean_list = []
    for word in wordlist:
        symbols = "!@#$%^&*()_-+={[}]|\;:\"<>?/., " # Define a list of symbols string

        for i in range(len(symbols)):
            word = word.replace(symbols[i], '') # Delete symbols

        if len(word) > 0:
            clean_list.append(word) # Save data after cleaning
   
    return createDictionary(clean_list) # Creates a dictionary containing each word's count and top_20 occurring words
    
def createDictionary(clean_list):
    try:
        word_count = {}
        for word in clean_list:
            if word in word_count:
                word_count[word] += 1
            else:
                word_count[word] = 1

        for key, value in sorted(word_count.items(), key = operator.itemgetter(1)): # operator.itemgette: Use to take one parameter either 1(denotes keys) or 0 (denotes corresponding values)
            words_count.append((key,value))

        counter = Counter(word_count)
        top_common = counter.most_common(20) # Top 20 most common url
        return top_common
    except:
        return "Calculation error"