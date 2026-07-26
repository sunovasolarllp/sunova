with open('partner-portal.html', 'r', encoding='utf-8') as f:
    portal = f.read()

with open('login.html', 'r', encoding='utf-8') as f:
    login = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    idx_html = f.read()

print('index.html top-bar:', 'top-bar' in idx_html)
print('partner-portal.html top-bar:', 'top-bar' in portal)
print('partner-portal.html dealer-profile-details:', 'dealer-profile-details' in portal)
print('login.html top-bar:', 'top-bar' in login)
