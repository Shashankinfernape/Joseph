import os
import re

DIR = r"c:\Users\user\Desktop\El projecto\School website\client\src\pages\portals\admin"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Imports
    if "import { Button }" not in content and "<button" in content:
        content = re.sub(r"(import React.*?;\n)", r"\1import { Button } from '../../../components/ui/Button';\n", content, count=1)
    
    content = content.replace("<button", "<Button").replace("</button>", "</Button>")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in os.listdir(DIR):
    if filename.endswith(".jsx"):
        process_file(os.path.join(DIR, filename))
print("Done")
