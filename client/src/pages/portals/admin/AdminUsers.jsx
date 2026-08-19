import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../../../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Settings, Users, ShieldCheck, UserCheck, Search, Key } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const { addToast } = useToast();

  useEffect(() => {
    fetchAPI('/auth/users').then(res => res.success && setUsers(res.users)).catch(() => {});
  }, []);

  const filtered = users.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(search.toLowerCase()) ||
                          u.username?.toLowerCase().includes(search.toLowerCase()) ||
                          u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === 'ALL' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Settings className="w-4 h-4 text-blue-700" />
          <span>Role-Based Access Control (RBAC) Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          User Directory & Stakeholder Permissions
        </h1>
        <p className="text-xs text-slate-500">
          Manage system credentials, SSO bindings (Google Workspace / Microsoft 365), and portal access tiers.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {['ALL', 'student', 'parent', 'teacher', 'admin', 'alumni'].map(r => (
            <Button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                filterRole === r
                  ? 'bg-cbse-navy text-white shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {r === 'ALL' ? 'All Users' : `${r}s`}
            </Button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden shadow-sm border-slate-200 dark:border-slate-700">
        <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-cbse-navy text-white text-[11px] font-bold">
                <th className="p-4">User</th>
                <th className="p-4">Role & ID</th>
                <th className="p-4">Email / Contact</th>
                <th className="p-4">SSO Authentication</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="p-4 flex items-center gap-3">
                    <Avatar className="w-9 h-9 rounded-xl border border-slate-300">
                      <AvatarImage src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"} alt={u.name} className="rounded-xl object-cover" />
                      <AvatarFallback className="rounded-xl text-[10px] font-bold bg-slate-800 text-white">
                        {u.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">@{u.username}</div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="capitalize font-bold text-cbse-blue dark:text-cbse-gold block">
                      {u.role} Portal
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {u.studentId || u.employeeId || u.id}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    {u.email}
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200">
                      <Key className="w-3 h-3 text-emerald-600" />
                      <span>Google SSO Linked</span>
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-center">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      </Card>

    </div>
  );
}
