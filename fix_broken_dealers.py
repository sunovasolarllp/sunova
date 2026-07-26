import re

content = open('app.js', encoding='utf-8').read()

dealers_match = re.search(r'const DEALERS = (\[.*?\]);', content, re.DOTALL)
dealers_text = dealers_match.group(1)

# Fix the broken area string
# broken: area: ", district: "Kannur", phone: "8590085865", lat: 11.8763836, lon: 75.3737973, kseb: "Kannur""
# target: area: "Kannur"

new_dealers_text = re.sub(r'area:\s*", district:.*?, kseb:\s*"([^"]+)""', r'area: "\1"', dealers_text)

new_content = content.replace(dealers_text, new_dealers_text)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
