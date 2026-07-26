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
    ('kseb.html', 'https://sunovasolar.in/kseb.html'),
]

out = []

for filename, url in files:
    out.append(f"==================== DIFF FOR {filename} ====================")
    live_content = fetch(url).splitlines()
    with open(filename, 'r', encoding='utf-8') as f:
        local_content = f.read().splitlines()
    
    diff = list(difflib.unified_diff(live_content, local_content, fromfile='live_'+filename, tofile='local_'+filename, lineterm=''))
    out.append(f"Total diff lines: {len(diff)}")
    for line in diff:
        out.append(line)

with open('diff_output.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print("Diff saved to diff_output.txt")
