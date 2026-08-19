import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  House,
  CalendarBlank,
  CheckSquare,
  ChartBar,
  CurrencyInr,
  Books,
  Bus,
  Chalkboard,
  ListChecks,
  ClipboardText,
  IdentificationCard,
  GraduationCap,
  Wallet,
  UsersThree,
  Newspaper,
  ShieldCheck,
  CalendarCheck,
  Signature,
  SignOut,
  Globe
} from '@phosphor-icons/react';

const ROLE_CONFIG = {
  student: {
    label: 'Student Portal',
    links: [
      { to: '/dashboard', label: 'Dashboard', icon: House, exact: true },
      { to: '/my/timetable', label: 'Timetable', icon: CalendarBlank },
      { to: '/my/attendance', label: 'Attendance', icon: CheckSquare },
      { to: '/my/grades', label: 'Grades', icon: ChartBar },
      { to: '/my/fees', label: 'Fees', icon: CurrencyInr },
      { to: '/my/library', label: 'Library', icon: Books },
      { to: '/my/transport', label: 'Transport', icon: Bus },
    ]
  },
  parent: {
    label: 'Parent Portal',
    links: [
      { to: '/dashboard', label: 'Dashboard', icon: House, exact: true },
      { to: '/my/fees', label: 'Fees & Payments', icon: CurrencyInr },
      { to: '/my/ptm', label: 'Book PTM', icon: CalendarCheck },
      { to: '/my/consent', label: 'Consent Forms', icon: Signature },
    ]
  },
  teacher: {
    label: 'Teacher Portal',
    links: [
      { to: '/dashboard', label: 'Dashboard', icon: House, exact: true },
      { to: '/teach/classes', label: 'My Classes', icon: Chalkboard },
      { to: '/teach/attendance', label: 'Mark Attendance', icon: CheckSquare },
      { to: '/teach/gradebook', label: 'Gradebook', icon: ListChecks },
      { to: '/teach/assignments', label: 'Assignments', icon: ClipboardText },
      { to: '/teach/hr', label: 'HR & Leave', icon: IdentificationCard },
    ]
  },
  admin: {
    label: 'Admin Console',
    links: [
      { to: '/dashboard', label: 'Dashboard', icon: House, exact: true },
      { to: '/admin/admissions', label: 'Admissions', icon: GraduationCap },
      { to: '/admin/finance', label: 'Finance', icon: Wallet },
      { to: '/admin/timetable', label: 'Timetable', icon: CalendarBlank },
      { to: '/admin/users', label: 'Users', icon: UsersThree },
      { to: '/admin/cms', label: 'CMS', icon: Newspaper },
      { to: '/admin/compliance', label: 'Compliance', icon: ShieldCheck },
    ]
  }
};

const MOBILE_LINK_LIMIT = 5;

export default function PortalSidebar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const safeRole = (role && ROLE_CONFIG[role]) ? role : 'student';
  const config = ROLE_CONFIG[safeRole];
  const mobileLinks = config.links.slice(0, MOBILE_LINK_LIMIT);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-neutral-50 border-r border-neutral-200 sticky top-20 h-[calc(100vh-5rem)]">

        {/* Portal label */}
        <div className="px-5 py-4 border-b border-neutral-200">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
            {config.label}
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-3 overflow-y-auto">
          <ul className="space-y-0.5 px-3">
            {config.links.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx}>
                  <NavLink
                    to={item.to}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all rounded-md ${
                        isActive
                          ? 'bg-white text-neutral-900 shadow-sm border border-neutral-200'
                          : 'text-neutral-500 hover:text-neutral-800 hover:bg-white/60'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`w-4 h-4 shrink-0 ${isActive ? 'text-neutral-800' : 'text-neutral-400'}`}
                          weight={isActive ? 'fill' : 'regular'}
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-neutral-200 space-y-0.5">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-neutral-700 hover:bg-white/60 rounded-md transition-colors"
          >
            <Globe className="w-4 h-4" />
            School Home
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
          >
            <SignOut className="w-4 h-4" weight="bold" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ─── MOBILE BOTTOM TAB BAR ─── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200">
        <ul className="flex">
          {mobileLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx} className="flex-1">
                <NavLink
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-1 py-2.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                      isActive ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="w-5 h-5" weight={isActive ? 'fill' : 'regular'} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
