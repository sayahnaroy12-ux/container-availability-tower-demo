import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Lock, Mail, AlertCircle, ShieldCheck, Activity, Globe, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useSupplyChain } from '../store/SupplyChainContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useSupplyChain();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSuccess(true);
    setTimeout(() => {
      setIsResetModalOpen(false);
      setResetSuccess(false);
      setResetEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row overflow-hidden">
      {/* Left Side: Visual Section */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 items-center justify-center p-12 overflow-hidden">
        {/* Abstract Map/Network Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl mix-blend-screen"></div>
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Simulated routes */}
            <path d="M 100 200 Q 300 100 500 300 T 900 200" fill="none" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M 200 400 Q 400 500 600 300 T 800 400" fill="none" stroke="rgba(99, 102, 241, 0.5)" strokeWidth="2" strokeDasharray="5,5" />
            {/* Nodes */}
            <circle cx="100" cy="200" r="4" fill="#3b82f6" />
            <circle cx="500" cy="300" r="6" fill="#6366f1" />
            <circle cx="900" cy="200" r="4" fill="#3b82f6" />
            <circle cx="200" cy="400" r="4" fill="#6366f1" />
            <circle cx="600" cy="300" r="6" fill="#3b82f6" />
            <circle cx="800" cy="400" r="4" fill="#6366f1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
              <Globe className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-medium text-blue-100 tracking-wide uppercase">Global Operations Hub</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              AI-Powered <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                MEARSK TOWER
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl">
              Monitor shipments, predict disruptions, and optimize logistics operations in real time with advanced artificial intelligence.
            </p>
            <p className="mb-8 text-sm font-medium tracking-wide text-cyan-200/80">
              AI Tower built by Global Edge Consultants
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Enterprise Security</h3>
                <p className="text-sm text-slate-400">Bank-grade encryption</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <Activity className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">AI Analytics</h3>
                <p className="text-sm text-slate-400">Predictive insights</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <MapPin className="w-8 h-8 text-sky-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Real-Time Tracking</h3>
                <p className="text-sm text-slate-400">Global visibility</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 sm:p-12 bg-slate-50 dark:bg-slate-900 relative">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 p-8 sm:p-10">
            <div className="flex justify-center mb-8 md:hidden">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Sign in to access your control tower</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 px-4 py-3 rounded-xl flex items-center text-sm"
              >
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                    placeholder="admin@supplychain.com"
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Password</label>
                  <button 
                    type="button"
                    onClick={() => setIsResetModalOpen(true)}
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                    placeholder="••••••••"
                  />
                </div>
                <div className="mt-2 flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                  Secure enterprise authentication
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                >
                  Login to Dashboard
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 21 21">
                    <path d="M10 0H0v10h10V0z" fill="#f25022"/>
                    <path d="M21 0H11v10h10V0z" fill="#7fba00"/>
                    <path d="M10 11H0v10h10V11z" fill="#00a4ef"/>
                    <path d="M21 11H11v10h10V11z" fill="#ffb900"/>
                  </svg>
                  Microsoft
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              New to the platform?{' '}
              <Link to="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Register New Manager
              </Link>
            </p>

            {/* Visual Trust Elements */}
            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <Activity className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">AI-Powered Analytics</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <Globe className="w-3.5 h-3.5 text-sky-500" />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Real-Time Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-slate-100 dark:border-slate-800"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Enter your email address to receive a password reset link.</p>
              
              {resetSuccess ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl flex items-center text-sm mb-4">
                  <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                  Reset link sent! Check your inbox.
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsResetModalOpen(false)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-500/30"
                    >
                      Send Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
