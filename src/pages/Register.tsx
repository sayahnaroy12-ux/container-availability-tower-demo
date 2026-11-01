import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Lock, Mail, User, Phone, Briefcase, Building2, Map, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft, Activity, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSupplyChain } from '../store/SupplyChainContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useSupplyChain();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    company: '',
    industry: '',
    headquarters: '',
    department: '',
    password: '',
    confirmPassword: '',
    isAuthorized: false
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (!password) return score;
    if (password.length > 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-slate-200 dark:bg-slate-700';
    if (score === 1) return 'bg-rose-500';
    if (score === 2) return 'bg-amber-500';
    if (score === 3) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return '';
    if (score === 1) return 'Weak';
    if (score === 2) return 'Fair';
    if (score === 3) return 'Good';
    return 'Strong';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    setError('');
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.role) {
        setError('Please fill in all manager details.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.company || !formData.industry || !formData.headquarters || !formData.department) {
        setError('Please fill in all company details.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!formData.isAuthorized) {
      setError('You must confirm you are an authorized employee.');
      return;
    }
    
    const success = register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      company: formData.company,
      industry: formData.industry,
      headquarters: formData.headquarters,
      department: formData.department,
      password: formData.password
    });
    
    if (success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError('An account with this email already exists.');
    }
  };

  const steps = [
    { num: 1, title: 'Manager Details' },
    { num: 2, title: 'Company Details' },
    { num: 3, title: 'Security Setup' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200/50 dark:border-slate-800/50"
      >
        <div className="p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">New Manager Registration</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Join your company's MEARSK TOWER</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out z-0"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
            
            <div className="relative z-10 flex justify-between">
              {steps.map((step) => (
                <div key={step.num} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 shadow-sm ${
                      currentStep >= step.num 
                        ? 'bg-blue-600 text-white shadow-blue-500/30' 
                        : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {currentStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    currentStep >= step.num ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
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
          
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl flex items-center text-sm"
            >
              <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
              Registration Successful – Redirecting to login...
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Manager Full Name</label>
                      <div className="relative">
                        <User className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                          placeholder="Jane Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Work Email Address</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                          placeholder="jane.doe@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Job Role</label>
                      <div className="relative">
                        <Briefcase className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <select
                          name="role"
                          required
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white appearance-none shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                        >
                          <option value="" disabled>Select Role</option>
                          <option value="Supply Chain Manager">Supply Chain Manager</option>
                          <option value="Logistics Manager">Logistics Manager</option>
                          <option value="Warehouse Manager">Warehouse Manager</option>
                          <option value="Operations Manager">Operations Manager</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Company Name</label>
                      <div className="relative">
                        <Building2 className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Company Industry</label>
                      <div className="relative">
                        <Briefcase className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <select
                          name="industry"
                          required
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white appearance-none shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                        >
                          <option value="" disabled>Select Industry</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Retail">Retail</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Pharmaceutical">Pharmaceutical</option>
                          <option value="Automotive">Automotive</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Headquarters Location</label>
                      <div className="relative">
                        <Map className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <input
                          type="text"
                          name="headquarters"
                          required
                          value={formData.headquarters}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                          placeholder="New York, USA"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Department</label>
                      <div className="relative">
                        <Building2 className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <select
                          name="department"
                          required
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white appearance-none shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                        >
                          <option value="" disabled>Select Department</option>
                          <option value="Supply Chain">Supply Chain</option>
                          <option value="Logistics">Logistics</option>
                          <option value="Procurement">Procurement</option>
                          <option value="Inventory Management">Inventory Management</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Create Password</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <input
                          type="password"
                          name="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                          placeholder="••••••••"
                        />
                      </div>
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Password strength</span>
                            <span className={`text-xs font-medium ${
                              passwordStrength === 1 ? 'text-rose-500' :
                              passwordStrength === 2 ? 'text-amber-500' :
                              passwordStrength === 3 ? 'text-blue-500' :
                              'text-emerald-500'
                            }`}>
                              {getStrengthText(passwordStrength)}
                            </span>
                          </div>
                          <div className="flex space-x-1 h-1.5">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className={`flex-1 rounded-full ${
                                  passwordStrength >= level ? getStrengthColor(passwordStrength) : 'bg-slate-200 dark:bg-slate-700'
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">Confirm Password</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-blue-500" />
                        <input
                          type="password"
                          name="confirmPassword"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm group-focus-within:shadow-md group-focus-within:shadow-blue-500/10"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 mt-6">
                    <div className="flex items-center h-5">
                      <input
                        id="isAuthorized"
                        name="isAuthorized"
                        type="checkbox"
                        checked={formData.isAuthorized}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <label htmlFor="isAuthorized" className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      I confirm I am an authorized employee of this company and have permission to access MEARSK TOWER.
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={success}
                  className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Complete Registration
                </button>
              )}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>

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
          </form>
        </div>
      </motion.div>
    </div>
  );
}
