import re

filepath = r"c:\Users\user\Desktop\El projecto\School website\client\src\pages\portals\admin\AdminFinance.jsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Card imports
imports = """import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
"""
if "import { Card" not in content:
    content = content.replace("import { DollarSign", imports + "import { DollarSign")

# KPI Cards
content = re.sub(
    r'<div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">\s*<span className="text-\[10px\] uppercase font-bold text-slate-400">(.*?)</span>\s*(<div.*?>.*?</div>)\s*<span className="(.*?)">(.*?)</span>\s*</div>',
    r"""<Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-400">\1</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            \2
            <span className="\3">\4</span>
          </CardContent>
        </Card>""",
    content,
    flags=re.DOTALL
)

# Table to Card
content = content.replace(
    '<div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">',
    '<Card className="overflow-hidden shadow-sm border-slate-200 dark:border-slate-700">'
)
content = content.replace(
    '<div className="bg-cbse-navy text-white p-4 font-bold text-xs uppercase tracking-wider flex justify-between">',
    '<CardHeader className="bg-cbse-navy text-white p-4 font-bold text-xs uppercase tracking-wider flex flex-row justify-between rounded-t-xl">\n          <CardTitle className="text-xs uppercase">'
)
content = content.replace(
    '<span>CBSE Statutory Disclosure</span>\n        </div>',
    '</CardTitle>\n          <span>CBSE Statutory Disclosure</span>\n        </CardHeader>\n        <CardContent className="p-0">'
)

content = content.replace(
    '</div>\n\n    </div>',
    '</CardContent>\n      </Card>\n\n    </div>'
)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated AdminFinance.jsx")
