import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Student, 
  Users, 
  ChalkboardTeacher, 
  Gear, 
  Eye, 
  EyeSlash, 
  ArrowLeft,
  CircleNotch
} from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('123'); // auto-fill password for demo purposes too
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      navigate(`/portals/${res.role}`);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans relative">
      {/* Back Link */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 z-20 flex items-center gap-2 text-white bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full transition-colors backdrop-blur-sm md:text-slate-700 md:bg-white/50 md:hover:bg-white/80"
      >
        <ArrowLeft weight="bold" />
        <span className="font-medium text-sm">Back to Website</span>
      </Link>

      {/* Left Panel - Decorative */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex flex-1 relative bg-cbse-navy overflow-hidden flex-col justify-between p-12"
      >
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-cbse-navy to-indigo-900 opacity-90 z-0"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 pt-12">
          <h1 className="text-5xl font-display font-bold text-white mb-4 leading-tight">
            St. Joseph English High School CBSE School <br/> International School
          </h1>
          <p className="text-blue-100 text-lg max-w-md">
            Empowering minds, shaping futures. Access your dedicated portal to stay connected with your educational journey.
          </p>
        </div>

        <div className="relative z-10 pb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <p className="text-white italic text-lg mb-4">
              "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
            </p>
            <p className="text-blue-200 font-medium">— Malcolm X</p>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex items-center justify-center p-6 md:p-12 w-full max-w-2xl mx-auto"
      >
        <div className="w-full max-w-md">
          {/* Mobile Header (visible only on small screens) */}
          <div className="md:hidden text-center mb-8 mt-12">
            <h1 className="text-3xl font-display font-bold text-cbse-navy mb-2">VMIS Portal</h1>
            <p className="text-slate-600">Sign in to your account</p>
          </div>

          <div className="text-center md:text-left mb-8 hidden md:block">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-600">Please sign in to your account.</p>
          </div>

          {/* Role Selectors */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Quick Login (Demo)</p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => handleRoleSelect('student@gmail.com')}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-medium"
              >
                <Student size={20} weight="fill" />
                Student
              </button>
              <button 
                type="button"
                onClick={() => handleRoleSelect('parent@gmail.com')}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-success/10 text-success hover:bg-success hover:text-white transition-all font-medium"
              >
                <Users size={20} weight="fill" />
                Parent
              </button>
              <button 
                type="button"
                onClick={() => handleRoleSelect('teacher@gmail.com')}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all font-medium"
              >
                <ChalkboardTeacher size={20} weight="fill" />
                Teacher
              </button>
              <button 
                type="button"
                onClick={() => handleRoleSelect('admin@gmail.com')}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all font-medium"
              >
                <Gear size={20} weight="fill" />
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block px-4 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-white rounded-xl border border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-cbse-navy peer shadow-sm"
                placeholder=" "
                required
              />
              <label 
                htmlFor="email" 
                className="absolute text-sm text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-cbse-navy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
              >
                Email address
              </label>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block px-4 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-white rounded-xl border border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-cbse-navy peer shadow-sm pr-12"
                placeholder=" "
                required
              />
              <label 
                htmlFor="password" 
                className="absolute text-sm text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-cbse-navy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-cbse-navy bg-white border-slate-300 rounded focus:ring-cbse-navy focus:ring-2"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-slate-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-cbse-navy hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-cbse-navy hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cbse-navy transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <CircleNotch size={20} className="animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>Demo Credentials:</p>
            <p>student@gmail.com / 123 | parent@gmail.com / 123</p>
            <p>teacher@gmail.com / 123 | admin@gmail.com / 123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
