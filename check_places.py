import json, re

c = open('app.js', encoding='utf8').read()
match = re.search(r'const KSEB_SECTIONS = (\{.*?\});', c, re.DOTALL)
if not match:
    print("Could not find KSEB_SECTIONS")
    exit(1)

k = json.loads(match.group(1))

targets = [
    "manapally", "manipuzha", "thengamom", "arthingal", "arthungal",
    "chambakkulam", "champakkulam", "chambakulam", "cherthala", 
    "koottikkal", "peerumade", "karakutty", "karukutty", 
    "mannam", "pattimattom", "kizhakkancherry", "kodencheri", 
    "sreekantapuram", "sreekandapuram"
]

results = []
for district, sections in k.items():
    for section_name in sections.keys():
        name_lower = section_name.lower()
        for t in targets:
            if t in name_lower:
                results.append((t, section_name, district))
                break

print("Found targets:")
for res in sorted(results):
    print(res)
