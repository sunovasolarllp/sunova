import shutil
import os

files = [
    'partner-portal.html',
    'quotation-generator.html',
    'leads.html',
    'saved-quotes.html',
    'solar-tools.html',
    'kseb-feasibility.html',
    'tech-locker.html',
    'partner-security.html'
]

src_dir = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova"
dest_dirs = [
    r"C:\Users\a1ypwgg0\.gemini\antigravity\scratch\sunova_repo",
    r"C:\Users\a1ypwgg0\.gemini\antigravity\scratch\sunovasolar.in",
    r"C:\Users\a1ypwgg0\.gemini\antigravity\scratch\sunova-solar-website",
    r"C:\Users\a1ypwgg0\.gemini\antigravity\scratch\sunova"
]

for dest in dest_dirs:
    if os.path.exists(dest):
        for f in files:
            src_file = os.path.join(src_dir, f)
            dest_file = os.path.join(dest, f)
            if os.path.exists(src_file):
                shutil.copy2(src_file, dest_file)
        print(f"Synced {len(files)} files to {dest}")
