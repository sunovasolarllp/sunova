import urllib.request
import re

req = urllib.request.Request('https://sunovasolar.in/partner-portal.html', headers={'User-Agent': 'Mozilla/5.0'})
live_portal = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Extract exact dealer-profile-details injection snippet
pattern = r'(// Dynamically inject dealer detailed profile rows.*?dashView\.insertBefore\(infoContainer, resourceBox\);)'
match = re.search(pattern, live_portal, re.DOTALL)

if match:
    snippet = match.group(1)
    print("Found snippet, length:", len(snippet))
    
    with open('partner-portal.html', 'r', encoding='utf-8') as f:
        local_portal = f.read()
    
    if 'dealer-profile-details' not in local_portal:
        # Locate showDashboard function
        target = "document.getElementById('dash-partner-code').textContent = matchedDealer.code;"
        if target in local_portal:
            local_portal = local_portal.replace(target, target + "\n\n            " + snippet)
            with open('partner-portal.html', 'w', encoding='utf-8') as f:
                f.write(local_portal)
            print("Successfully injected dealer-profile-details into local partner-portal.html!")
        else:
            print("Target line not found in partner-portal.html")
    else:
        print("dealer-profile-details already present in partner-portal.html")
else:
    print("Snippet not found in live_portal")
