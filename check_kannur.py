import re
c = open('app.js', encoding='utf8').read()
dealers = re.findall(r'name:\s*"(.*?)".*?area:\s*"(.*?)".*?district:\s*"(.*?)".*?kseb:\s*"(.*?)"', c, re.DOTALL)
kannur_dealers = [d for d in dealers if d[2].lower() == 'kannur']
print('Dealers in Kannur:', kannur_dealers)
