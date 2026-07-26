import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Pattern to find the area and replace it with the kseb value
new_content = re.sub(r'area: "[^"]*"(.*?)kseb: ("[^"]*")', r'area: \2\1kseb: \2', content)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(new_content)
