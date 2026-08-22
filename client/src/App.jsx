import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PortalSidebar from './components/layout/PortalSidebar';
import PortalRightRail from './components/layout/PortalRightRail';

// Auth Components
import Login from './pages/public/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import AboutUs from './pages/public/AboutUs';
import Academics from './pages/public/Academics';
import Admissions from './pages/public/Admissions';
import Infrastructure from './pages/public/Infrastructure';
import Faculty from './pages/public/Faculty';
import NewsEvents from './pages/public/NewsEvents';
import Gallery from './pages/public/Gallery';
import MandatoryDisclosure from './pages/public/MandatoryDisclosure';
import ContactUs from './pages/public/ContactUs';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import Accessibility from './pages/public/Accessibility';

// Dashboard Views (Role-Aware)
import DashboardResolver from './components/auth/DashboardResolver';

// Student Pages
import StudentAttendance from './pages/portals/student/StudentAttendance';
import StudentTimetable from './pages/portals/student/StudentTimetable';
import StudentGrades from './pages/portals/student/StudentGrades';
import StudentTransport from './pages/portals/student/StudentTransport';
import StudentLibrary from './pages/portals/student/StudentLibrary';
import StudentLMS from './pages/portals/student/StudentLMS';

// Parent Pages
import ParentPTM from './pages/portals/parent/ParentPTM';
import ParentConsent from './pages/portals/parent/ParentConsent';

// Teacher Pages
import TeacherAttendance from './pages/portals/teacher/TeacherAttendance';
import TeacherGradebook from './pages/portals/teacher/TeacherGradebook';
import TeacherAssignments from './pages/portals/teacher/TeacherAssignments';
import TeacherHR from './pages/portals/teacher/TeacherHR';

// Admin Pages
import AdminAdmissions from './pages/portals/admin/AdminAdmissions';
import AdminCMS from './pages/portals/admin/AdminCMS';
import AdminTimetable from './pages/portals/admin/AdminTimetable';
import AdminCompliance from './pages/portals/admin/AdminCompliance';
import AdminUsers from './pages/portals/admin/AdminUsers';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const path = location.pathname;

  // Layout Mode 2: Dashboard Mode (Header at top + Sidebar & Main side-by-side)
  const isDashboardMode = path === '/dashboard' || path.startsWith('/my') || path.startsWith('/teach') || path.startsWith('/admin');

  if (isDashboardMode) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-black font-sans pt-16 md:pt-20">
        <div className="ambient-glow"></div>
        <Header />
        <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
          <PortalSidebar />
          <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 overflow-x-hidden">
            <div className="w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-cbse-gold selection:text-cbse-navy">
      <div className="ambient-glow"></div>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}


export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <LayoutWrapper>
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/academics" element={<Academics />} />
                  <Route path="/admissions" element={<Admissions />} />
                  <Route path="/infrastructure" element={<Infrastructure />} />
                  <Route path="/faculty" element={<Faculty />} />
                  <Route path="/news-events" element={<NewsEvents />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/accessibility" element={<Accessibility />} />
                  <Route path="/login" element={<Login />} />

                  {/* Universal Dashboard Route */}
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardResolver /></ProtectedRoute>} />

                  {/* Student Routes */}
                  <Route path="/my/grades" element={<ProtectedRoute requiredRole="student"><StudentGrades /></ProtectedRoute>} />
                  <Route path="/my/attendance" element={<ProtectedRoute requiredRole="student"><StudentAttendance /></ProtectedRoute>} />
                  <Route path="/my/timetable" element={<ProtectedRoute requiredRole="student"><StudentTimetable /></ProtectedRoute>} />
                  <Route path="/my/library" element={<ProtectedRoute requiredRole="student"><StudentLibrary /></ProtectedRoute>} />
                  <Route path="/my/transport" element={<ProtectedRoute requiredRole="student"><StudentTransport /></ProtectedRoute>} />
                  <Route path="/my/lms" element={<ProtectedRoute requiredRole="student"><StudentLMS /></ProtectedRoute>} />

                  {/* Parent Routes */}
                  <Route path="/my/ptm" element={<ProtectedRoute requiredRole="parent"><ParentPTM /></ProtectedRoute>} />
                  <Route path="/my/consent" element={<ProtectedRoute requiredRole="parent"><ParentConsent /></ProtectedRoute>} />

                  {/* Teacher Routes */}
                  <Route path="/teach/classes" element={<ProtectedRoute requiredRole="teacher"><div>Classes Stub</div></ProtectedRoute>} />
                  <Route path="/teach/attendance" element={<ProtectedRoute requiredRole="teacher"><TeacherAttendance /></ProtectedRoute>} />
                  <Route path="/teach/gradebook" element={<ProtectedRoute requiredRole="teacher"><TeacherGradebook /></ProtectedRoute>} />
                  <Route path="/teach/assignments" element={<ProtectedRoute requiredRole="teacher"><TeacherAssignments /></ProtectedRoute>} />
                  <Route path="/teach/hr" element={<ProtectedRoute requiredRole="teacher"><TeacherHR /></ProtectedRoute>} />

                  {/* Admin Routes */}
                  <Route path="/admin/admissions" element={<ProtectedRoute requiredRole="admin"><AdminAdmissions /></ProtectedRoute>} />
                  <Route path="/admin/timetable" element={<ProtectedRoute requiredRole="admin"><AdminTimetable /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
                  <Route path="/admin/cms" element={<ProtectedRoute requiredRole="admin"><AdminCMS /></ProtectedRoute>} />
                  <Route path="/admin/compliance" element={<ProtectedRoute requiredRole="admin"><AdminCompliance /></ProtectedRoute>} />

                  {/* Fallback for old portal routes to avoid 404s during migration */}
                  <Route path="/portals/*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </LayoutWrapper>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
