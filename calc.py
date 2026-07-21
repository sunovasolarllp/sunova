import json, re, math
c = open('app.js', encoding='utf8').read()
k = json.loads(re.search(r'const KSEB_SECTIONS = (\{.*?\});', c, re.DOTALL).group(1))
anchal = k['Kollam']['Anchal']
ayoor = {'lat': 8.8978612, 'lon': 76.8601206}
karavaloor = {'lat': 8.9807724, 'lon': 76.9250357}

print('Anchal KSEB:', anchal)

def haversine(lat1, lon1, lat2, lon2):
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    return 6371 * 2 * math.asin(math.sqrt(a))

print('Dist to Ayoor:', haversine(anchal['lat'], anchal['lon'], ayoor['lat'], ayoor['lon']))
print('Dist to Karavaloor:', haversine(anchal['lat'], anchal['lon'], karavaloor['lat'], karavaloor['lon']))
