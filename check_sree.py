import json, re
c = open('app.js', encoding='utf8').read()
k = json.loads(re.search(r'const KSEB_SECTIONS = (\{.*?\});', c, re.DOTALL).group(1))
sree = k['Kannur']['Sreekantapuram']
print('Sreekantapuram coords:', sree)

d = json.loads(re.search(r'const DEALERS = (\[.*?\]);', c, re.DOTALL).group(1))
kannur_dealers = [dealer for dealer in d if dealer['district'].lower() == 'kannur']
print('Kannur Dealers count:', len(kannur_dealers))

import math
def haversine(lat1, lon1, lat2, lon2):
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    a = math.sin((lat2-lat1)/2)**2 + math.cos(lat1)*math.cos(lat2)*math.sin((lon2-lon1)/2)**2
    return 6371 * 2 * math.asin(math.sqrt(a))

min_dist = float('inf')
closest = None
for dealer in d:
    if 'lat' in dealer and 'lon' in dealer:
        dist = haversine(sree['lat'], sree['lon'], dealer['lat'], dealer['lon'])
        if dist < min_dist:
            min_dist = dist
            closest = dealer
            
print('Closest dealer overall:', closest['name'], '-', closest['area'], 'in', closest['district'], 'Dist:', min_dist)
