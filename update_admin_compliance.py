import re

filepath = r"c:\Users\user\Desktop\El projecto\School website\client\src\pages\portals\admin\AdminCompliance.jsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
imports = """import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../../../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
"""

content = content.replace("import { Button }", imports + "import { Button }")

# Table to Card
content = content.replace(
    '<div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">',
    '<Card className="overflow-hidden shadow-sm border-slate-200 dark:border-slate-700">\n        <CardContent className="p-0">'
).replace('</div>\n      </div>\n\n      {/* Edit Modal */}', '</CardContent>\n      </Card>\n\n      {/* Edit Modal */}')

# Replace Action column button with DropdownMenu
btn_block = """<Button
                      onClick={() => {
                        setEditItem(doc);
                        setNewDetails(doc.details);
                        setNewExpiry(doc.expiryDate || '2028-12-31');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cbse-light text-cbse-blue font-bold text-xs hover:bg-cbse-blue hover:text-white transition-colors"
                    >
                      Update NOC
                    </Button>"""

dropdown_block = """<DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setEditItem(doc);
                          setNewDetails(doc.details);
                          setNewExpiry(doc.expiryDate || '2028-12-31');
                        }}>
                          Update NOC
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>"""

content = content.replace(btn_block, dropdown_block)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated AdminCompliance.jsx")
