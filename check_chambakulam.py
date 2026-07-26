import json, re, math
c = open('app.js', encoding='utf8').read()
k = json.loads(re.search(r'const KSEB_SECTIONS = (\{.*?\});', c, re.DOTALL).group(1))
c_kseb = k['Alappuzha']['Chambakulam']
print('Chambakulam KSEB coordinates:', c_kseb)
d = json.loads(re.search(r'const DEALERS = (\[.*?\]);', c, re.DOTALL).group(1))
min_dist = float('inf')
closest = None

def haversine(lat1, lon1, lat2, lon2):
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    a = math.sin((lat2-lat1)/2)**2 + math.cos(lat1)*math.cos(lat2)*math.sin((lon2-lon1)/2)**2
    return 6371 * 2 * math.asin(math.sqrt(a))

for dealer in d:
    if 'lat' in dealer and 'lon' in dealer:
        dist = haversine(c_kseb['lat'], c_kseb['lon'], dealer['lat'], dealer['lon'])
        if dist < min_dist:
            min_dist = dist
            closest = dealer

print('Closest dealer:', closest['name'], '-', closest['area'], 'in', closest['district'], 'Dist:', min_dist)
