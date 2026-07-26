import re

content = open('app.js', encoding='utf-8').read()

replacements = [
    (r'kseb:\s*"karunagapaalli"', 'kseb: "Karunagappally"'), # Covers both Karunagappally North and South
    (r'kseb:\s*"manapally"', 'kseb: "Manappally"'),
    (r'kseb:\s*"manipuzha"', 'kseb: "Manipuzha"'),
    (r'kseb:\s*"thengamom"', 'kseb: "Thengamom-Pallickal"'),
    (r'kseb:\s*"arthingal"', 'kseb: "Arthinkal"'),
    (r'kseb:\s*"chambakkulam"', 'kseb: "Chambakulam"'),
    (r'kseb:\s*"cherthala"', 'kseb: "Cherthala"'),
    (r'kseb:\s*"koottikkal"', 'kseb: "Koottikkal"'),
    (r'kseb:\s*"peerumade"', 'kseb: "Peerumade"'),
    (r'kseb:\s*"karakutty"', 'kseb: "Karakutty"'),
    (r'kseb:\s*"mannam"', 'kseb: "Mannam"'),
    (r'kseb:\s*"pattimattom"', 'kseb: "Pattimattam"'),
    (r'kseb:\s*"kizhakkancherry"', 'kseb: "Kizhakkancherry"'),
    (r'kseb:\s*"kodencheri"', 'kseb: "Kodencheri"'),
    (r'kseb:\s*"sreekantapuram"', 'kseb: "Sreekantapuram"'),
]

new_content = content
for old, new in replacements:
    new_content = re.sub(old, new, new_content, flags=re.IGNORECASE)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated DEALERS kseb field in app.js")
