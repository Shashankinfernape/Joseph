import React, { Suspense, lazy } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

// Eager load the common dashboards
import StudentDashboard from '../../pages/portals/student/StudentDashboard';
import ParentDashboard from '../../pages/portals/parent/ParentDashboard';
import TeacherDashboard from '../../pages/portals/teacher/TeacherDashboard';

// Lazy load the admin dashboard as it's heavy
const AdminDashboard = lazy(() => import('../../pages/portals/admin/AdminDashboard'));

export default function DashboardResolver() {
  const { role } = useAuth();

  switch (role) {
    case 'student':
      return <StudentDashboard />;
    case 'parent':
      return <ParentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'admin':
      return (
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Admin ERP...</div>}>
          <AdminDashboard />
        </Suspense>
      );
    default:
      return <Navigate to="/login" replace />;
  }
}
