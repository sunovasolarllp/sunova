import urllib.request, json
ayoor_url = 'https://router.project-osrm.org/route/v1/driving/76.9065,8.92927;76.8601206,8.8978612?overview=false'
karavaloor_url = 'https://router.project-osrm.org/route/v1/driving/76.9065,8.92927;76.9250357,8.9807724?overview=false'
print('Ayoor road dist:', json.loads(urllib.request.urlopen(ayoor_url).read())['routes'][0]['distance']/1000)
print('Karavaloor road dist:', json.loads(urllib.request.urlopen(karavaloor_url).read())['routes'][0]['distance']/1000)
