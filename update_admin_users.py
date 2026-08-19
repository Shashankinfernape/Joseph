import re

filepath = r"c:\Users\user\Desktop\El projecto\School website\client\src\pages\portals\admin\AdminUsers.jsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
imports = """import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../../../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
"""

content = content.replace("import { Button }", imports + "import { Button }")

# Replace Avatar img
content = re.sub(
    r'<img\s*src=\{u\.avatar \|\| "[^"]+"\}\s*alt=\{u\.name\}\s*className="w-9 h-9 rounded-xl object-cover border border-slate-300"\s*/>',
    r"""<Avatar className="w-9 h-9 rounded-xl border border-slate-300">
                      <AvatarImage src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"} alt={u.name} className="rounded-xl object-cover" />
                      <AvatarFallback className="rounded-xl text-[10px] font-bold bg-slate-800 text-white">
                        {u.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>""",
    content
)

# Table to Card
content = content.replace(
    '<div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">',
    '<Card className="overflow-hidden shadow-sm border-slate-200 dark:border-slate-700">\n        <CardContent className="p-0">'
).replace('</div>\n\n    </div>', '</CardContent>\n      </Card>\n\n    </div>')

# Actions Dropdown
content = content.replace(
    '<th className="p-4 text-center">Status</th>',
    '<th className="p-4 text-center">Status</th>\n                <th className="p-4 text-center">Actions</th>'
)

action_dropdown = """<td className="p-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>"""

content = content.replace(
    '</span>\n                  </td>\n                </tr>',
    f'</span>\n                  </td>\n                  {action_dropdown}\n                </tr>'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated AdminUsers.jsx")
