import re

filepath = r"c:\Users\user\Desktop\El projecto\School website\client\src\pages\portals\admin\AdminTimetable.jsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Card imports
imports = """import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
"""
if "import { Card" not in content:
    content = content.replace("import { Clock", imports + "import { Clock")

# Card refactor
content = content.replace(
    '<div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">',
    '<Card className="shadow-sm space-y-4 border-slate-200 dark:border-slate-700">\n        <CardContent className="p-6">'
).replace('</div>\n\n    </div>', '</CardContent>\n      </Card>\n\n    </div>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated AdminTimetable.jsx")
