import urllib.request
import re

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

live_html = fetch('https://sunovasolar.in/')
with open('index.html', 'r', encoding='utf-8') as f:
    local_html = f.read()

print("--- TOP BAR CHECK ---")
print("Top bar in live index:", "top-bar" in live_html)
print("Top bar in local index:", "top-bar" in local_html)

print("\n--- NAV LINKS CHECK ---")
live_nav = re.findall(r'<a[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', live_html)
local_nav = re.findall(r'<a[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', local_html)

live_hrefs = set([h[0] for h in live_nav])
local_hrefs = set([h[0] for h in local_nav])

print("Hrefs in live but missing in local:", live_hrefs - local_hrefs)
print("Hrefs in local but missing in live:", local_hrefs - live_hrefs)

print("\n--- IMAGES CHECK ---")
live_imgs = set(re.findall(r'src=["\']([^"\']+)["\']', live_html))
local_imgs = set(re.findall(r'src=["\']([^"\']+)["\']', local_html))
print("Images in live but missing in local:", live_imgs - local_imgs)

print("\n--- TELEPHONE & ADDRESS METADATA ---")
live_tels = set(re.findall(r'tel:([0-9+]+)', live_html))
local_tels = set(re.findall(r'tel:([0-9+]+)', local_html))
print("Live Tels:", live_tels)
print("Local Tels:", local_tels)

print("\n--- SEARCH FOR SPECIFIC PHRASES IN LIVE VS LOCAL ---")
keywords = ['LLPIN', 'MCA', 'Gov', 'Thodupuzha', 'Idukki', 'KSEB', 'Surya Ghar', 'Helpline', 'Mail', 'Partner', 'Staff', 'Hostinger', 'GST', 'Bank', 'Address', 'Contact', 'Social']
for kw in keywords:
    live_count = len(re.findall(kw, live_html, re.IGNORECASE))
    local_count = len(re.findall(kw, local_html, re.IGNORECASE))
    print(f"Keyword '{kw}': Live={live_count}, Local={local_count}")
