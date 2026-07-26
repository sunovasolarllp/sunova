import urllib.request
import re

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

live_index = fetch('https://sunovasolar.in/')
with open('index.html', 'r', encoding='utf-8') as f:
    local_index = f.read()

live_app = fetch('https://sunovasolar.in/app.js')
with open('app.js', 'r', encoding='utf-8') as f:
    local_app = f.read()

live_portal = fetch('https://sunovasolar.in/partner-portal.html')
with open('partner-portal.html', 'r', encoding='utf-8') as f:
    local_portal = f.read()

live_login = fetch('https://sunovasolar.in/login.html')
with open('login.html', 'r', encoding='utf-8') as f:
    local_login = f.read()

print(f"index.html: Live {len(live_index)} vs Local {len(local_index)}")
print(f"app.js: Live {len(live_app)} vs Local {len(local_app)}")
print(f"partner-portal.html: Live {len(live_portal)} vs Local {len(local_portal)}")
print(f"login.html: Live {len(live_login)} vs Local {len(local_login)}")

# Compare HTML tags and text elements in index.html
live_ids = set(re.findall(r'id=["\']([^"\']+)["\']', live_index))
local_ids = set(re.findall(r'id=["\']([^"\']+)["\']', local_index))

print("\n--- IDs in Live but missing in Local ---")
print(sorted(list(live_ids - local_ids)))

print("\n--- IDs in Local but missing in Live ---")
print(sorted(list(local_ids - live_ids)))

# Check specific data structures in app.js
live_dealers_count = len(re.findall(r'name:', live_app))
local_dealers_count = len(re.findall(r'name:', local_app))
print(f"\nDealer occurrences in app.js: Live {live_dealers_count} vs Local {local_dealers_count}")

# Check sections in live index vs local index
live_sections = re.findall(r'<section[^>]*id=["\']([^"\']+)["\']', live_index)
local_sections = re.findall(r'<section[^>]*id=["\']([^"\']+)["\']', local_index)
print(f"\nLive sections: {live_sections}")
print(f"Local sections: {local_sections}")
