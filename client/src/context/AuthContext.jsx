import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAPI } from '../utils/api';

const AuthContext = createContext();

// Pre-configured default demo users for instant 1-click testing
export const DEMO_PROFILES = [
  {
    role: 'student',
    label: 'Aarav Sharma (Class 10-A Student)',
    username: 'aarav.sharma',
    data: {
      id: 'USR-STU-001',
      username: 'aarav.sharma',
      name: 'Aarav Sharma',
      role: 'student',
      email: 'aarav.sharma@student.vidyamandir.edu.in',
      studentId: 'VMIS-STU-2021-084',
      rollNo: '10104',
      grade: 'Class 10',
      section: 'A',
      house: 'Ganga (Blue House)',
      bloodGroup: 'O+',
      busRoute: 'Route 2 (Indiranagar / Koramangala)',
      dob: '2010-09-14',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      parentId: 'USR-PAR-001',
      attendanceRate: 94.8
    }
  },
  {
    role: 'parent',
    label: 'Mr. Rajesh Sharma (Parent of Aarav & Ananya)',
    username: 'rajesh.sharma',
    data: {
      id: 'USR-PAR-001',
      username: 'rajesh.sharma',
      name: 'Mr. Rajesh Sharma & Dr. Neha Sharma',
      role: 'parent',
      email: 'rajesh.sharma@gmail.com',
      phone: '+91 98450 11223',
      childrenIds: ['USR-STU-001', 'USR-STU-002'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      address: 'B-402, Prestige Palms, Whitefield, Bengaluru - 560066'
    }
  },
  {
    role: 'teacher',
    label: 'Smt. Radhika Nair (PGT Maths & Class 10A Teacher)',
    username: 'radhika.nair',
    data: {
      id: 'USR-TCH-001',
      username: 'radhika.nair',
      name: 'Smt. Radhika Nair',
      role: 'teacher',
      email: 'radhika.nair@faculty.vidyamandir.edu.in',
      employeeId: 'VMIS-FAC-2016-042',
      designation: 'PGT Mathematics & Class 10A Class Teacher',
      qualification: 'M.Sc. (Applied Mathematics), B.Ed.',
      department: 'Mathematics',
      classesAssigned: ['Class 10-A', 'Class 10-B', 'Class 12-A'],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    }
  },
  {
    role: 'admin',
    label: 'Dr. Suniti Krishnan (Principal & SuperAdmin)',
    username: 'admin.principal',
    data: {
      id: 'USR-ADM-001',
      username: 'admin.principal',
      name: 'Dr. Suniti Krishnan',
      role: 'admin',
      email: 'principal@vidyamandir-bengaluru.edu.in',
      employeeId: 'VMIS-EXEC-001',
      designation: 'Principal & Head of School',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80'
    }
  },
  {
    role: 'alumni',
    label: 'Vikramaditya Rao (Batch of 2018 - Google DeepMind)',
    username: 'vikram.rao',
    data: {
      id: 'USR-ALM-001',
      username: 'vikram.rao',
      name: 'Vikramaditya Rao',
      role: 'alumni',
      email: 'vikram.rao@alumni.vidyamandir.edu.in',
      batch: '2018',
      currentRole: 'Senior AI Research Engineer @ Google DeepMind',
      location: 'Bengaluru / Mountain View',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80'
    }
  }
];

const DEMO_CREDS = [
  { email: 'student@gmail.com', password: '123', role: 'student' },
  { email: 'parent@gmail.com',  password: '123', role: 'parent' },
  { email: 'teacher@gmail.com', password: '123', role: 'teacher' },
  { email: 'admin@gmail.com',   password: '123', role: 'admin' },
];

export function AuthProvider({ children }) {
  // Default to student profile for immediate seamless previewing
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('vmis_user');
    return saved ? JSON.parse(saved) : DEMO_PROFILES[0].data;
  });

  const [token, setToken] = useState(() => localStorage.getItem('vmis_token') || 'demo-token-001');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vmis_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vmis_user');
    }
  }, [currentUser]);

  const switchDemoProfile = (role) => {
    const profile = DEMO_PROFILES.find(p => p.role === role);
    if (profile) {
      setCurrentUser(profile.data);
      setToken(`demo-token-${profile.data.id}`);
      localStorage.setItem('vmis_token', `demo-token-${profile.data.id}`);
    }
  };

  const login = async (username, password) => {
    const cred = DEMO_CREDS.find(c => c.email === username && c.password === password);
    if (cred) {
      const profile = DEMO_PROFILES.find(p => p.role === cred.role);
      if (profile) {
        setCurrentUser(profile.data);
        const newToken = `demo-token-${profile.data.id}`;
        setToken(newToken);
        localStorage.setItem('vmis_token', newToken);
        return { success: true, role: cred.role };
      }
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('vmis_user');
    localStorage.removeItem('vmis_token');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      token,
      isAuthenticated: Boolean(currentUser),
      role: currentUser?.role || 'guest',
      switchDemoProfile,
      login,
      logout,
      demoProfiles: DEMO_PROFILES
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
