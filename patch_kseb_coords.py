import urllib.request
import json
import time
import re
import os

def geocode(query):
    url = f"https://photon.komoot.io/api/?q={urllib.parse.quote(query)}&limit=1"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=2) as response:
            data = json.loads(response.read().decode())
            if data['features']:
                coords = data['features'][0]['geometry']['coordinates']
                return coords[1], coords[0] # lat, lon
    except Exception as e:
        pass
    return None, None

def patch_app_js():
    app_js_path = "app.js"
    with open(app_js_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract KSEB_SECTIONS
    match = re.search(r'const KSEB_SECTIONS = (\{[\s\S]*?\n\});', content)
    if not match:
        print("KSEB_SECTIONS not found!")
        return
    
    kseb_json_str = match.group(1)
    
    # Parse json (need to make it strictly valid json for parsing if it isn't)
    # The current string in app.js is valid JSON (using double quotes)
    kseb_sections = json.loads(kseb_json_str)
    
    print(f"Total districts: {len(kseb_sections)}", flush=True)
    total = 0
    
    for dist, sections in kseb_sections.items():
        print(f"Geocoding {dist}...", flush=True)
        for section, data in sections.items():
            # data can be either an integer (code) or already a dict {code, lat, lon}
            if isinstance(data, int):
                code = data
                lat, lon = geocode(f"{section} {dist} Kerala")
                if lat and lon:
                    sections[section] = {"code": code, "lat": round(lat, 5), "lon": round(lon, 5)}
                else:
                    sections[section] = {"code": code, "lat": None, "lon": None}
            total += 1
            if total % 50 == 0:
                print(f"  Geocoded {total} sections...", flush=True)
            time.sleep(0.1) # 10 requests per sec
            
    # Serialize back
    new_kseb_json_str = json.dumps(kseb_sections, indent=4)
    # Replace in content
    new_content = content.replace(kseb_json_str, new_kseb_json_str)
    
    with open(app_js_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print(f"Successfully patched {total} sections into app.js", flush=True)

if __name__ == "__main__":
    patch_app_js()
