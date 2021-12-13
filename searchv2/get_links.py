import requests
import json
from bs4 import BeautifulSoup
# from rest_framework.parsers import JSONParser


def get_links(url):
    links=[]
    website = requests.get(url)
    website_text = website.text
    soup = BeautifulSoup(website_text)

    for link in soup.find_all('a'):
        links.append(link.get('href')) #do a loop and save all url to links

    lengthLinks = len(links) 
    links.append(lengthLinks) #save the length of the links and the end of links
    
    out_file = open("urlData.json", "w")
    json.dump(links, out_file, indent=4)
    
# get_links("https://vnexpress.net/")


# def addParticipant(request):
#     request_data = JSONParser().parse(request)
#     try:
#         contest = Contests.objects.get(id=request_data['id'])
#         participant = json.loads(contest.participants)
        
#         if request_data['username'] in participant:
#             return JsonResponse("Username had been added in Contest", safe=False)
#         participant[request_data['username']] = 0
#         contest_data = {
#             "id": contest.id,
#             "participants": json.dumps(participant)
#         }
#         contest_serializer = ContestSerializer(contest, data=contest_data)
        
#         if contest_serializer.is_valid():
#             contest_serializer.save()
#             return JsonResponse("Joint Contest Successfully", safe=False)
#         return JsonResponse(contest_serializer.errors, safe=False)
    
#     except Exception as e:
#         return JsonResponse(e, safe=False)