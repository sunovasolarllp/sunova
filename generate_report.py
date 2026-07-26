import urllib.request
import difflib

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

files = [
    ('index.html', 'https://sunovasolar.in/'),
    ('app.js', 'https://sunovasolar.in/app.js'),
    ('partner-portal.html', 'https://sunovasolar.in/partner-portal.html'),
    ('login.html', 'https://sunovasolar.in/login.html'),
    ('style.css', 'https://sunovasolar.in/style.css'),
]

report = []

for filename, url in files:
    report.append(f"==================================================")
    report.append(f"FILE: {filename}")
    report.append(f"==================================================")
    live_content = fetch(url).splitlines()
    with open(filename, 'r', encoding='utf-8') as f:
        local_content = f.read().splitlines()
    
    diff = list(difflib.unified_diff(live_content, local_content, fromfile='live', tofile='local', lineterm=''))
    
    only_live = [l[1:] for l in diff if l.startswith('-') and not l.startswith('---')]
    only_local = [l[1:] for l in diff if l.startswith('+') and not l.startswith('+++')]
    
    report.append(f"Items in LIVE but NOT in LOCAL (Count={len(only_live)}):")
    for item in only_live:
        if item.strip():
            report.append("  LIVE: " + item.strip())
            
    report.append(f"\nItems in LOCAL but NOT in LIVE (Count={len(only_local)}):")
    for item in only_local:
        if item.strip():
            report.append("  LOCAL: " + item.strip())
    report.append("\n")

with open('diff_detailed_report.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(report))

print("Detailed report written to diff_detailed_report.txt")
