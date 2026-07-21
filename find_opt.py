import sys
sys.stdout.reconfigure(encoding='utf-8')
lines = open('app.js', encoding='utf8').readlines()
for i, l in enumerate(lines):
    if 'document.createElement' in l and 'option' in l:
        print(f'{i}: {l.strip()}')
    if 'textContent' in l and 'dealer' in l.lower():
        print(f'{i}: {l.strip()}')
