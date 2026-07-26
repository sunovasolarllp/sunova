import urllib.request

common_files = [
    'robots.txt',
    'sitemap.xml',
    'favicon.ico',
    'assets/logo.jpg',
    'assets/hero.jpg',
    'assets/commercial.jpg',
    'inquiries_db.php',
    'proxy.php',
    'recapV2.js',
    'kseb_sections.json',
    'saved_quotes_db.json'
]

for f in common_files:
    url = f'https://sunovasolar.in/{f}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        content = res.read()
        print(f"FOUND {f}: {len(content)} bytes")
    except Exception as e:
        print(f"NOT FOUND {f}: {e}")
