import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../../../components/ui/dropdown-menu';
import { MoreHorizontal, ShieldCheck, Save } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';

export default function AdminCompliance() {
  const [disclosures, setDisclosures] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [newDetails, setNewDetails] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const { addToast } = useToast();

  const loadDisclosures = () => {
    fetchAPI('/compliance/disclosures').then(res => res.success && setDisclosures(res.disclosures)).catch(console.error);
  };

  useEffect(() => { loadDisclosures(); }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editItem) return;
    try {
      const res = await fetchAPI('/compliance/update-noc', {
        method: 'POST',
        body: JSON.stringify({ id: editItem.id, details: newDetails, expiryDate: newExpiry, status: 'Valid' })
      });
      if (res.success) { addToast('Certificate updated!', 'success'); setEditItem(null); loadDisclosures(); }
    } catch { addToast('Error updating document', 'error'); }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>CBSE Appendix-IX &amp; RTE Act Regulatory Monitor</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          CBSE Compliance &amp; Certificate Expiry Tracker
        </h1>
        <p className="text-xs text-slate-500">Audited statutory certificates, Fire NOC, Building NBC fitness, and water testing reports.</p>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-cbse-navy text-white text-[11px] font-bold">
                  <th className="p-4">ID</th>
                  <th className="p-4">Certificate / Mandatory Document Title</th>
                  <th className="p-4">Reference &amp; Renewal Details</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {disclosures.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 font-mono font-bold text-slate-400">{doc.id}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <div className="text-[10px] text-cbse-accent uppercase font-mono">{doc.category}</div>
                      <div>{doc.field}</div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{doc.details}</td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {doc.expiryDate || 'Permanent'}
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
                          <DropdownMenuItem onClick={() => { setEditItem(doc); setNewDetails(doc.details); setNewExpiry(doc.expiryDate || '2028-12-31'); }}>
                            Update NOC
                          </DropdownMenuItem>
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

      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border space-y-4">
            <div className="flex justify-between items-start pb-2 border-b">
              <div>
                <span className="text-[10px] font-bold uppercase text-cbse-accent font-mono">Update Statutory Certificate</span>
                <h3 className="font-bold text-sm">{editItem.field}</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setEditItem(null)}>✕</Button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Certificate Order / Authority *</label>
                <textarea rows="3" required value={newDetails} onChange={e => setNewDetails(e.target.value)}
                  className="w-full p-3 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-cbse-accent"></textarea>
              </div>
              <div>
                <label className="block font-bold mb-1">New Expiry Date *</label>
                <Input type="date" required value={newExpiry} onChange={e => setNewExpiry(e.target.value)} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditItem(null)}>Cancel</Button>
                <Button type="submit" className="bg-cbse-navy text-white hover:bg-cbse-blue flex items-center gap-1.5">
                  <Save className="w-4 h-4" /> Update &amp; Publish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
