import glob

for f in sorted(glob.glob('*.html')):
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    vp = 'viewport' in c
    print(f"{f}: viewport={vp}")
