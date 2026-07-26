import json, re
import difflib

content = open('app.js', encoding='utf-8').read()

kseb_match = re.search(r'const KSEB_SECTIONS = (\{.*?\});', content, re.DOTALL)
kseb = json.loads(kseb_match.group(1))

all_sections = []
for dist, secs in kseb.items():
    for sec in secs.keys():
        all_sections.append(sec)

dealers_match = re.search(r'const DEALERS = (\[.*?\]);', content, re.DOTALL)
dealers_text = dealers_match.group(1)

# Quick regex to parse out kseb fields
kseb_fields = re.findall(r'kseb:\s*"([^"]+)"', dealers_text)
area_fields = re.findall(r'area:\s*"([^"]+)"', dealers_text)

# We want to check the kseb field since that's what's used for matching
mismatches = []
for k in kseb_fields:
    # checkKSEBMatch strips out east/west/north/south/central
    base = re.sub(r'east|west|north|south|central', '', k.lower()).strip()
    
    # Check if this base is inside any section's lowercase name
    found = False
    for sec in all_sections:
        if base in sec.lower():
            found = True
            break
            
    if not found:
        # fuzzy match
        closest = difflib.get_close_matches(k, all_sections, n=1, cutoff=0.6)
        suggested = closest[0] if closest else "NO MATCH"
        mismatches.append(f"Dealer KSEB: '{k}' -> Closest match: '{suggested}'")

for m in mismatches:
    print(m)
    
if not mismatches:
    print("No spelling mistakes found in dealer kseb fields.")
