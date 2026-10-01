import os
import re

html_files = [
    'index.html',
    'login.html',
    'partner-portal.html',
    'quotation-generator.html',
    'leads.html',
    'saved-quotes.html',
    'solar-tools.html',
    'kseb-feasibility.html',
    'tech-locker.html',
    'partner-security.html'
]

base_dir = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova"

for f in html_files:
    file_path = os.path.join(base_dir, f)
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as fh:
            content = fh.read()
        
        updated = re.sub(r'style\.css\?v=[0-9\.]+', 'style.css?v=9.9', content)
        with open(file_path, 'w', encoding='utf-8') as fh:
            fh.write(updated)
        print(f"Updated CSS cache bust in {f}")

# Now sync all files to scratch mirrors
import shutil

dest_dirs = [
    r"C:\Users\a1ypwgg0\.gemini\antigravity\scratch\sunova_repo",
    r"C:\Users\a1ypwgg0\.gemini\antigravity\scratch\sunovasolar.in",
    r"C:\Users\a1ypwgg0\.gemini\antigravity\scratch\sunova-solar-website",
    r"C:\Users\a1ypwgg0\.gemini\antigravity\scratch\sunova"
]

all_sync_files = html_files + ['style.css']

for dest in dest_dirs:
    if os.path.exists(dest):
        for f in all_sync_files:
            src = os.path.join(base_dir, f)
            dst = os.path.join(dest, f)
            if os.path.exists(src):
                shutil.copy2(src, dst)
        print(f"Synced to {dest}")
