import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentFees from './student/StudentFees';
import ParentFees from './parent/ParentFees';
import { Navigate } from 'react-router-dom';

export default function SharedFees() {
  const { role } = useAuth();

  if (role === 'student') return <StudentFees />;
  if (role === 'parent') return <ParentFees />;

  return <Navigate to="/dashboard" replace />;
}
