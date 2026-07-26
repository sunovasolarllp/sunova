import urllib.request
import json
import time

def geocode(query):
    url = f"https://photon.komoot.io/api/?q={urllib.parse.quote(query)}&limit=1"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data['features']:
                coords = data['features'][0]['geometry']['coordinates']
                return coords[1], coords[0] # lat, lon
    except Exception as e:
        print(f"Error: {e}")
    return None

print(geocode("Alappuzha Kerala"))
