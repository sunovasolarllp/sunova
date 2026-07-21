import json, re, math

content = open('app.js', encoding='utf-8').read()

kseb_match = re.search(r'const KSEB_SECTIONS = (\{.*?\});', content, re.DOTALL)
kseb = json.loads(kseb_match.group(1))

# Extract DEALERS manually since eval() fails on JS objects with unquoted keys
dealers_match = re.search(r'const DEALERS = (\[.*?\]);', content, re.DOTALL)
dealers_text = dealers_match.group(1)

dealers = []
for m in re.finditer(r'\{([^}]+)\}', dealers_text):
    props = m.group(1)
    name = re.search(r'name:\s*"([^"]+)"', props).group(1) if re.search(r'name:\s*"([^"]+)"', props) else "Unknown"
    area = re.search(r'area:\s*"([^"]+)"', props).group(1) if re.search(r'area:\s*"([^"]+)"', props) else "Unknown"
    district = re.search(r'district:\s*"([^"]+)"', props).group(1) if re.search(r'district:\s*"([^"]+)"', props) else "Unknown"
    
    lat_m = re.search(r'lat:\s*([0-9.]+)', props)
    lon_m = re.search(r'lon:\s*([0-9.]+)', props)
    
    if lat_m and lon_m:
        dealers.append({
            'name': name,
            'area': area,
            'district': district,
            'lat': float(lat_m.group(1)),
            'lon': float(lon_m.group(1))
        })

lat1, lon1 = 9.95139, 76.93897 # Idukki Kanjikuzhy

def calc(lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

for d in dealers:
    d['dist'] = calc(d['lat'], d['lon'])

dealers.sort(key=lambda x: x['dist'])

print("Top 5 closest to Idukki Kanjikuzhy (9.95139, 76.93897):")
for d in dealers[:5]:
    print(f"{d['dist']:.2f} km - {d['name']} in {d['area']} ({d['district']})")
