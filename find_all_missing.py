import urllib.request
import re

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

live_index = fetch('https://sunovasolar.in/')
live_portal = fetch('https://sunovasolar.in/partner-portal.html')
live_login = fetch('https://sunovasolar.in/login.html')
live_app = fetch('https://sunovasolar.in/app.js')
live_css = fetch('https://sunovasolar.in/style.css')

with open('index.html', 'r', encoding='utf-8') as f:
    local_index = f.read()

with open('partner-portal.html', 'r', encoding='utf-8') as f:
    local_portal = f.read()

with open('login.html', 'r', encoding='utf-8') as f:
    local_login = f.read()

with open('app.js', 'r', encoding='utf-8') as f:
    local_app = f.read()

with open('style.css', 'r', encoding='utf-8') as f:
    local_css = f.read()

print("==================================================")
print("ANALYZING MISSING DETAILS FROM SUNOVASOLAR.IN LIVE")
print("==================================================")

# 1. Top bar in index.html
if 'top-bar' in live_index and 'top-bar' not in local_index:
    print("[MISSING in index.html] Top Utility Bar containing LLPIN info, Partner Portal link, Staff Portal link, Sunova Mail link, Helpline phone")

# 2. Dealer profile details in partner-portal.html
if 'dealer-profile-details' in live_portal and 'dealer-profile-details' not in local_portal:
    print("[MISSING in partner-portal.html] Dynamic dealer-profile-details container injection on partner login")

# 3. Top bar styles in style.css
if '.top-bar' in live_css and '.top-bar' not in local_css:
    print("[MISSING in style.css] .top-bar CSS styles")

# 4. Check if top-bar is in partner-portal.html
if 'top-bar' in live_portal and 'top-bar' not in local_portal:
    print("[MISSING in partner-portal.html] Top Utility Bar")

# 5. Check if top-bar is in login.html
if 'top-bar' in live_login and 'top-bar' not in local_login:
    print("[MISSING in login.html] Top Utility Bar")

# 6. Check for any missing script links or meta tags
meta_og = re.findall(r'<meta property="og:[^>]+>', live_index)
for m in meta_og:
    if m not in local_index:
        print(f"[MISSING meta tag in index.html]: {m}")

print("Analysis complete.")
