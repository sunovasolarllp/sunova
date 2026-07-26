import urllib.request
import re

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

live_index = fetch('https://sunovasolar.in/')
live_portal = fetch('https://sunovasolar.in/partner-portal.html')
live_login = fetch('https://sunovasolar.in/login.html')
live_css = fetch('https://sunovasolar.in/style.css')

# Extract top-bar HTML from live_index
top_bar_match = re.search(r'(<!-- Top Utility Bar -->.*?</div>\s*</div>\s*</div>)', live_index, re.DOTALL)
top_bar_html = top_bar_match.group(1) if top_bar_match else ""
print("Extracted Top Bar HTML length:", len(top_bar_html))

# Extract top-bar CSS from live_css
css_top_bar_match = re.search(r'(/\* Top Bar Utility \*/.*?)(?=/\* Navigation bar \*/|\.navbar|\.nav-container)', live_css, re.DOTALL)
if not css_top_bar_match:
    css_top_bar_match = re.search(r'(\.top-bar.*?\n\})\n', live_css, re.DOTALL)

# Extract dealer-profile-details JS snippet from live_portal
dp_match = re.search(r'(// Dynamically inject dealer detailed profile rows.*?dashView\.insertBefore\(infoContainer, resourceBox\);)', live_portal, re.DOTALL)
dp_js = dp_match.group(1) if dp_match else ""
print("Extracted Dealer Profile Details JS length:", len(dp_js))

# Apply 1: Update index.html top-bar
with open('index.html', 'r', encoding='utf-8') as f:
    local_index = f.read()

if 'top-bar' not in local_index and top_bar_html:
    # Insert inside <header class="navbar" id="navbar">
    local_index = local_index.replace('<header class="navbar" id="navbar">', '<header class="navbar" id="navbar">\n        ' + top_bar_html)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(local_index)
    print("Updated index.html with Top Utility Bar")

# Apply 2: Update partner-portal.html top-bar and dealer-profile-details
with open('partner-portal.html', 'r', encoding='utf-8') as f:
    local_portal = f.read()

if 'top-bar' not in local_portal and top_bar_html:
    local_portal = local_portal.replace('<header class="navbar" id="navbar">', '<header class="navbar" id="navbar">\n        ' + top_bar_html)
    print("Updated partner-portal.html with Top Utility Bar")

if 'dealer-profile-details' not in local_portal and dp_js:
    # Insert before showDashboard function ending or pin update feedback
    target_str = "feedback.textContent = 'PIN updated successfully!';"
    if target_str in local_portal:
        local_portal = local_portal.replace(target_str, target_str + "\n\n            " + dp_js)
        print("Updated partner-portal.html with dealer-profile-details injection logic")

with open('partner-portal.html', 'w', encoding='utf-8') as f:
    f.write(local_portal)

# Apply 3: Update login.html top-bar
with open('login.html', 'r', encoding='utf-8') as f:
    local_login = f.read()

if 'top-bar' not in local_login and top_bar_html:
    local_login = local_login.replace('<header class="navbar" id="navbar">', '<header class="navbar" id="navbar">\n        ' + top_bar_html)
    with open('login.html', 'w', encoding='utf-8') as f:
        f.write(local_login)
    print("Updated login.html with Top Utility Bar")

# Apply 4: Update style.css top-bar styles if missing
with open('style.css', 'r', encoding='utf-8') as f:
    local_css = f.read()

if '.top-bar' not in local_css:
    # Extract top-bar related CSS rules from live_css
    top_bar_rules = re.findall(r'(\.top-bar[^{]*\{[^}]*\})', live_css)
    top_bar_css_block = "\n".join(top_bar_rules)
    if not top_bar_css_block:
        # Fallback CSS block for top-bar
        top_bar_css_block = """
/* Top Utility Bar */
.top-bar {
    background: rgba(13, 19, 33, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.78rem;
    padding: 6px 0;
    color: var(--color-text-muted);
}
.top-bar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.top-bar-left span {
    font-weight: 500;
    letter-spacing: 0.3px;
}
.top-bar-right {
    display: flex;
    align-items: center;
    gap: 10px;
}
.top-bar-link {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color 0.2s ease;
}
.top-bar-link:hover {
    color: var(--color-sun-yellow);
}
.top-bar-separator {
    opacity: 0.3;
}
"""
    local_css = top_bar_css_block + "\n\n" + local_css
    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(local_css)
    print("Updated style.css with Top Bar CSS styles")

print("All missing details synchronized successfully!")
