import json, re

c = open('app.js', encoding='utf8').read()
match = re.search(r'const KSEB_SECTIONS = (\{.*?\});', c, re.DOTALL)
k = json.loads(match.group(1))

# 1. Manapally
# It is 'Manappally' in Kollam
if 'Manappally' in k['Kollam']:
    k['Kollam']['Manapally'] = k['Kollam'].pop('Manappally')

# 2. Manipuzha -> keep only in Kottayam
for d in list(k.keys()):
    if d != 'Kottayam' and 'Manipuzha' in k[d]:
        del k[d]['Manipuzha']

# 3. Thengamom -> Pathanamthitta (current name: Thengamom-Pallickal)
for d in list(k.keys()):
    if d != 'Pathanamthitta' and 'Thengamom-Pallickal' in k[d]:
        del k[d]['Thengamom-Pallickal']
if 'Thengamom-Pallickal' in k['Pathanamthitta']:
    k['Pathanamthitta']['Thengamom'] = k['Pathanamthitta'].pop('Thengamom-Pallickal')

# 4. Arthingal -> Alappuzha (current name: Arthinkal)
if 'Arthinkal' in k['Alappuzha']:
    k['Alappuzha']['Arthingal'] = k['Alappuzha'].pop('Arthinkal')

# 5. Chambakkulam -> Alappuzha (current name: Chambakulam)
if 'Chambakulam' in k['Alappuzha']:
    k['Alappuzha']['Chambakkulam'] = k['Alappuzha'].pop('Chambakulam')

# 6, 7. Cherthala, Cherthala East -> Already Alappuzha

# 8. Koottikkal -> Kottayam (already there)

# 9. Peerumade -> Idukki (remove from Kottayam)
if 'Peerumade' in k['Kottayam']:
    del k['Kottayam']['Peerumade']

# 10, 11. Karakutty, Mannam -> Ernakulam (already there)

# 12. Pattimattom -> Ernakulam (current name: Pattimattam)
if 'Pattimattam' in k['Ernakulam']:
    k['Ernakulam']['Pattimattom'] = k['Ernakulam'].pop('Pattimattam')

# 13, 14, 15. Kizhakkancherry, Kodencheri, Sreekantapuram are fine

# Sort districts and sections for cleanliness
new_k = {d: dict(sorted(k[d].items())) for d in sorted(k.keys())}

# Generate JS code
js_str = json.dumps(new_k, indent=4)
# Add spacing to match original format (approximate)
new_c = c[:match.start(1)] + js_str + c[match.end(1):]

with open('app.js', 'w', encoding='utf8') as f:
    f.write(new_c)

print("Updated app.js successfully.")
