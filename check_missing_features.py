import urllib.request
import re

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

live_index = fetch('https://sunovasolar.in/')
with open('index.html', 'r', encoding='utf-8') as f:
    local_index = f.read()

live_portal = fetch('https://sunovasolar.in/partner-portal.html')
with open('partner-portal.html', 'r', encoding='utf-8') as f:
    local_portal = f.read()

print("=== INDEX.HTML MISSING IN LOCAL ===")
if 'top-bar' not in local_index and 'top-bar' in live_index:
    print("MISSING IN LOCAL index.html: Top Utility Bar (LLPIN, Partner Portal, Staff Portal, Sunova Mail, Helpline)")

print("\n=== PARTNER-PORTAL.HTML MISSING IN LOCAL ===")
for term in ['Partner Resources & Downloads', 'Soura_Phase_II_Guidelines.pdf', 'downloadProformaTemplate', 'showChecklistModal', 'dealer-profile-details']:
    if term not in local_portal and term in live_portal:
        print(f"MISSING IN LOCAL partner-portal.html: {term}")

print("\n=== APP.JS MISSING IN LOCAL ===")
with open('app.js', 'r', encoding='utf-8') as f:
    local_app = f.read()
live_app = fetch('https://sunovasolar.in/app.js')

for term in ['fetchKSEBDetails', 'downloadProformaTemplate', 'showChecklistModal']:
    if term not in local_app and term in live_app:
        print(f"MISSING IN LOCAL app.js: {term}")
