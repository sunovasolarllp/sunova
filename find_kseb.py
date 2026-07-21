import json, re

content = open('app.js', encoding='utf-8').read()

kseb_match = re.search(r'const KSEB_SECTIONS = (\{.*?\});', content, re.DOTALL)
kseb = json.loads(kseb_match.group(1))
all_kseb_sections = []
for dist, secs in kseb.items():
    for sec in secs.keys():
        all_kseb_sections.append(sec)

dealers_match = re.search(r'const DEALERS = (\[.*?\]);', content, re.DOTALL)
dealers_text = dealers_match.group(1)

places = ["karunagapally", "north karunagapally south", "manapally", "manipuzha", "thengamom", "arthingal", "chambakkulam", "cherthala", "cherthala east", "koottikkal", "peerumade", "karakutty", "mannam", "pattimattom", "kizhakkancherry", "kodencheri", "sreekantapuram"]

def fuzzy_match(q, choices):
    q = q.lower().replace(" ", "")
    best = None
    best_dist = 999
    for c in choices:
        c_clean = c.lower().replace(" ", "")
        if q in c_clean or c_clean in q:
            return c
    # simple levenshtein or just prefix
    for c in choices:
        c_clean = c.lower().replace(" ", "")
        if c_clean.startswith(q[:4]):
            return c
    return None

for p in places:
    # try splitting if "north south"
    if " north " in p or " south " in p or p.startswith("north"):
        print(f"[{p}] -> Requires manual look")
        continue
    
    kseb_match = fuzzy_match(p, all_kseb_sections)
    print(f"[{p}] -> KSEB: {kseb_match}")
