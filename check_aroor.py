import re, math
c = open('app.js', encoding='utf8').read()
aroor = {'lat': 9.87831, 'lon': 76.30388}

# Extract all dealers correctly
dealers = re.findall(r'name:\s*"(.*?)".*?area:\s*"(.*?)".*?district:\s*"(.*?)".*?lat:\s*([\d\.]+).*?lon:\s*([\d\.]+)', c, re.DOTALL)

min_dist = float('inf')
closest = None

def haversine(lat1, lon1, lat2, lon2):
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    a = math.sin((lat2-lat1)/2)**2 + math.cos(lat1)*math.cos(lat2)*math.sin((lon2-lon1)/2)**2
    return 6371 * 2 * math.asin(math.sqrt(a))

for name, area, district, lat, lon in dealers:
    dist = haversine(aroor['lat'], aroor['lon'], float(lat), float(lon))
    if dist < min_dist:
        min_dist = dist
        closest = (name, area, district)

print('Closest to Aroor:', closest, 'Dist:', min_dist)
