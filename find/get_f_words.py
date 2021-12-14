import requests
import operator
import json
from bs4 import BeautifulSoup
from collections import Counter

def start(url):

    wordlist = []
    source_code = requests.get(url).text
    soup = BeautifulSoup(source_code, 'html.parser')	# BeautifulSoup object which will ping the requested url for data

    for each_text in soup.findAll(True):	# Text in given web-page is stored under tags with classes so we use True to find them all
        content = each_text.text
        words = content.lower().split()		# use split() to break the sentence into words and convert them into lowercase
        for each_word in words:
            wordlist.append(each_word)
    clean_wordlist(wordlist) # Function removes any unwanted symbols after the loop


def clean_wordlist(wordlist):

    clean_list = []
    for word in wordlist:
        symbols = "!@#$%^&*()_-+={[}]|\;:\"<>?/., " # Define a list of symbols string

        for i in range(len(symbols)):
            word = word.replace(symbols[i], '') # Delete symbols

        if len(word) > 0:
            clean_list.append(word) # Save data after cleaning
   
    create_dictionary(clean_list) # Creates a dictionary containing each word's count and top_20 occurring words


def create_dictionary(clean_list):
    
    word_count = {}
    for word in clean_list:
        if word in word_count:
            word_count[word] += 1
        else:
            word_count[word] = 1
            
    # # Uncomment this if you want to display each word's count:  
    # words_count = []
    # for key, value in sorted(word_count.items(), key = operator.itemgetter(1)): # operator.itemgette: Use to take one parameter either 1(denotes keys) or 0 (denotes corresponding values)
    #     print ("% s : % s " % (key, value))   
    #     words_count.append((key,value))
    # print(words_count)

    counter = Counter(word_count)
    top = counter.most_common(20)
    print(top)
    out_file = open("get_f_words.json","w")
    json.dump(top,out_file,indent=4)
    
if __name__ == '__main__':    
    url = "https://facebook.com/"
    start(url)