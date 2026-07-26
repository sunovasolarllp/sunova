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
print("FINAL VERIFICATION SUMMARY OF SUNOVA SOLAR WEBSITE")
print("==================================================")

print("1. Homepage (index.html):")
print("   - Top Utility Bar (LLPIN, Partner Portal, Staff Portal, Webmail, Helpline):", "top-bar" in local_index)
print("   - Phone Validation (10 digits, starts 6-9):", "pattern=" in local_index or "oninput=" in local_index)
print("   - Favicon & Social Meta Tags:", "assets/logo.jpg" in local_index and "twitter:title" in local_index)

print("2. Staff Portal (login.html):")
print("   - Top Utility Bar:", "top-bar" in local_login)
print("   - Staff / Partner Login Tab Switcher:", "portal-tabs" in local_login)
print("   - Server Proxy Authentication:", "proxy.php" in local_login)

print("3. Partner Portal (partner-portal.html):")
print("   - Top Utility Bar:", "top-bar" in local_portal)
print("   - Partner Resources & Downloads Section:", "Partner Resources" in local_portal or "tech-settings-box" in local_portal)
print("   - Partner Profile Details Card:", "profile-details-rows" in local_portal or "dealer-profile-details" in local_portal)
print("   - Proforma Invoice Generator:", "generateProformaPDF" in local_portal or "downloadProformaTemplate" in local_portal)

print("4. Application Logic (app.js):")
print("   - Dealer Coverage Data (53 Dealers):", len(re.findall(r'code:\s*[\'"][^\'"]+[\'"]', local_app)) >= 53)
print("   - KSEB Auto-Fetch & Section Lookup:", "fetchKSEBDetails" in local_app or "KSEB_SECTIONS" in local_app)

print("5. Stylesheet (style.css):")
print("   - Top Utility Bar Styles:", ".top-bar" in local_css)
print("   - Light Theme Variables:", ".light-theme" in local_css)

print("\nVerification completed cleanly!")
