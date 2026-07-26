import re

content = open('app.js', encoding='utf-8').read()

replacements = [
    (r'kseb:\s*"kadappakada"', 'kseb: "Kadappakkada"'),
    (r'kseb:\s*"sasthamkotta"', 'kseb: "Sasthamcotta"'),
    (r'kseb:\s*"Mavelikara"', 'kseb: "Mavelikkara"'),
    (r'kseb:\s*"Thrikkakara"', 'kseb: "Thrikkakkara"'),
    (r'kseb:\s*"Chelakkara"', 'kseb: "Chelakara"'),
    (r'kseb:\s*"Elappully"', 'kseb: "Elapully"'),
    (r'kseb:\s*"Irikkoor"', 'kseb: "Irikkur"'),
    (r'kseb:\s*"Thaliparambu"', 'kseb: "Thaliparamba"'),
    (r'kseb:\s*"Badiaduka"', 'kseb: "Badiadka"'),
    (r'kseb:\s*"Balanthode"', 'kseb: "Balamthode"')
]

new_content = content
for old, new in replacements:
    new_content = re.sub(old, new, new_content, flags=re.IGNORECASE)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated 10 spelling mistakes in DEALERS array in app.js")
