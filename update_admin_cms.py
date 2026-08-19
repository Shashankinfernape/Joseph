import re

filepath = r"c:\Users\user\Desktop\El projecto\School website\client\src\pages\portals\admin\AdminCMS.jsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Card imports
imports = """import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
"""
if "import { Card" not in content:
    content = content.replace("import { Layers", imports + "import { Layers")

# Replace alert editor div
content = re.sub(
    r'<div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl">\s*<h3 className="font-bold text-base text-cbse-navy dark:text-white font-serif">\s*Edit Top Alert Strip Banner\s*</h3>',
    r"""<Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="text-base text-cbse-navy dark:text-white font-serif">Edit Top Alert Strip Banner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">""",
    content
)

# Tab 1 closure
content = content.replace(
    '</button>\n          </form>\n        </div>\n      )}',
    '</button>\n          </form>\n        </CardContent>\n        </Card>\n      )}'
)

# Replace other forms (News, Events, Gallery)
content = re.sub(
    r'<div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">\s*<h3 className="font-bold text-base text-cbse-navy dark:text-white font-serif">(.*?)</h3>',
    r"""<Card className="lg:col-span-6">
            <CardHeader>
              <CardTitle className="text-base text-cbse-navy dark:text-white font-serif">\1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">""",
    content
)

# Close forms CardContent for News, Events, Gallery
content = re.sub(
    r'</form>\n          </div>',
    r'</form>\n            </CardContent>\n          </Card>',
    content
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated AdminCMS.jsx")
