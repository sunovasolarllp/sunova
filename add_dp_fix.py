import urllib.request
import re

req = urllib.request.Request('https://sunovasolar.in/partner-portal.html', headers={'User-Agent': 'Mozilla/5.0'})
live_portal = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

dp_match = re.search(r'(// Dynamically inject dealer detailed profile rows.*?dashView\.insertBefore\(infoContainer, resourceBox\);)', live_portal, re.DOTALL)
dp_snippet = dp_match.group(1) if dp_match else ""

with open('partner-portal.html', 'r', encoding='utf-8') as f:
    local_portal = f.read()

# Find showDashboard function body
idx = local_portal.find('function showDashboard(')
if idx != -1:
    # Find position where dash-partner-name or dashView is populated
    target_pos = local_portal.find('loadPartnerInquiries();', idx)
    if target_pos != -1:
        local_portal = local_portal[:target_pos] + dp_snippet + "\n            " + local_portal[target_pos:]
        with open('partner-portal.html', 'w', encoding='utf-8') as f:
            f.write(local_portal)
        print("SUCCESSFULLY INJECTED dealer-profile-details before loadPartnerInquiries()!")
    else:
        print("loadPartnerInquiries() not found in showDashboard")
else:
    print("showDashboard not found")
