import re

content = open('app.js', encoding='utf-8').read()

replacements = [
    (r'area:\s*"kadappakada"', 'area: "Kadappakkada"'),
    (r'area:\s*"sasthamkotta"', 'area: "Sasthamcotta"'),
    (r'area:\s*"Mavelikara"', 'area: "Mavelikkara"'),
    (r'area:\s*"Thrikkakara"', 'area: "Thrikkakkara"'),
    (r'area:\s*"Chelakkara"', 'area: "Chelakara"'),
    (r'area:\s*"Elappully"', 'area: "Elapully"'),
    (r'area:\s*"Irikkoor"', 'area: "Irikkur"'),
    (r'area:\s*"Thaliparambu"', 'area: "Thaliparamba"'),
    (r'area:\s*"Badiaduka"', 'area: "Badiadka"'),
    (r'area:\s*"Balanthode"', 'area: "Balamthode"')
]

new_content = content
for old, new in replacements:
    new_content = re.sub(old, new, new_content, flags=re.IGNORECASE)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated 10 spelling mistakes in DEALERS array (area field) in app.js")
