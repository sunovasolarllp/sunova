import re

content = open('app.js', encoding='utf-8').read()

dealers_match = re.search(r'const DEALERS = (\[.*?\]);', content, re.DOTALL)
if dealers_match:
    dealers_text = dealers_match.group(1)
    
    # We want to replace the `area` string with the `kseb` string for all dealers
    # since `kseb` has the sanitized, correct spelling!
    
    def replacer(match):
        area_val = match.group(1)
        kseb_val = match.group(2)
        if area_val != kseb_val:
            # Replace area with kseb value
            print(f"Fixing area mismatch: '{area_val}' -> '{kseb_val}'")
            # We must return the full string with the modified area
            return match.group(0).replace(f'area: "{area_val}"', f'area: "{kseb_val}"')
        return match.group(0)

    # regex to match: area: "xxx" ... kseb: "yyy"
    new_dealers_text = re.sub(r'area:\s*"([^"]+)"(.*?kseb:\s*"([^"]+)")', replacer, dealers_text, flags=re.DOTALL)
    
    new_content = content.replace(dealers_text, new_dealers_text)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
