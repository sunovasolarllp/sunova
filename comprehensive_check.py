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

live_login = fetch('https://sunovasolar.in/login.html')
with open('login.html', 'r', encoding='utf-8') as f:
    local_login = f.read()

print("--- 1. INDEX.HTML COMPARISON ---")
# Check top bar
if 'top-bar' in live_index and 'top-bar' not in local_index:
    print("LIVE index.html has <div class='top-bar'>...</div> which is MISSING in local index.html!")

# Check footer links
live_footer_links = re.findall(r'<footer.*?</footer>', live_index, re.DOTALL)
local_footer_links = re.findall(r'<footer.*?</footer>', local_index, re.DOTALL)

print("\n--- 2. PARTNER-PORTAL.HTML COMPARISON ---")
# Check unique JS/HTML snippets in partner-portal.html
live_portal_func = re.findall(r'function\s+([a-zA-Z0-9_]+)', live_portal)
local_portal_func = re.findall(r'function\s+([a-zA-Z0-9_]+)', local_portal)
missing_portal_funcs = set(live_portal_func) - set(local_portal_func)
print("Functions in live partner-portal.html but missing in local:", missing_portal_funcs)

print("\n--- 3. LOGIN.HTML COMPARISON ---")
live_login_func = re.findall(r'function\s+([a-zA-Z0-9_]+)', live_login)
local_login_func = re.findall(r'function\s+([a-zA-Z0-9_]+)', local_login)
missing_login_funcs = set(live_login_func) - set(local_login_func)
print("Functions in live login.html but missing in local:", missing_login_funcs)

print("\n--- 4. ADDRESS / CONTACT DETAILS IN LIVE SITE ---")
print("Live Address / Contact info snippets:")
addr_match = re.search(r'<section[^>]*id=["\']address["\'].*?</section>', live_index, re.DOTALL)
if addr_match:
    print("Live Address Section length:", len(addr_match.group(0)))
local_addr_match = re.search(r'<section[^>]*id=["\']address["\'].*?</section>', local_index, re.DOTALL)
if local_addr_match:
    print("Local Address Section length:", len(local_addr_match.group(0)))
