import React from 'react';
import { Calendar, Bell, ExternalLink } from 'lucide-react';

export default function PortalRightRail() {
  return (
    <aside className="hidden xl:block w-72 shrink-0 space-y-6 sticky top-24 self-start">
      {/* Calendar Mini */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h3>Upcoming Events</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-indigo-50 text-indigo-700 rounded-lg p-2 text-center min-w-[3rem]">
              <div className="text-xs font-bold uppercase">Aug</div>
              <div className="text-lg font-black leading-none">24</div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">Science Fair</h4>
              <p className="text-xs text-slate-500">Main Auditorium, 9:00 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-emerald-50 text-emerald-700 rounded-lg p-2 text-center min-w-[3rem]">
              <div className="text-xs font-bold uppercase">Sep</div>
              <div className="text-lg font-black leading-none">05</div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">Teacher's Day</h4>
              <p className="text-xs text-slate-500">School Grounds, 10:00 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications or Quick Links */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold">
          <Bell className="w-5 h-5 text-indigo-600" />
          <h3>Recent Updates</h3>
        </div>
        <ul className="space-y-3">
          <li className="text-sm">
            <a href="#" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
              Term 1 Results Published
            </a>
          </li>
          <li className="text-sm">
            <a href="#" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
              New Library Books Available
            </a>
          </li>
          <li className="text-sm">
            <a href="#" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
              Bus Route 4 Modified
            </a>
          </li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Quick Links</h3>
        <div className="space-y-2">
          <a href="#" className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-600 bg-white p-2 border border-slate-100 rounded-lg shadow-sm transition-colors">
            <span>Help Desk</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a href="#" className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-600 bg-white p-2 border border-slate-100 rounded-lg shadow-sm transition-colors">
            <span>School Policies</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}
