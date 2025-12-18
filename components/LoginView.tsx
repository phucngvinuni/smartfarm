import React, { useState } from 'react';
import { Activity, User, Lock, ArrowRight, Sprout, Tractor } from 'lucide-react';

interface LoginViewProps {
  onLogin: (role: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'Farmer' | 'Admin'>('Farmer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      if (username && password) {
        onLogin(role);
      } else {
        setError('Please enter valid credentials');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Branding */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between bg-gradient-to-br from-blue-900/40 to-slate-900 border-r border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Activity className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">SmartFarm</h1>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Monitor your farm <br/>
              <span className="text-blue-400">Intelligently.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Real-time livestock health tracking, environmental sensors, and AI-driven disease forecasting in one unified dashboard.
            </p>
          </div>

          <div className="mt-8 space-y-4">
             <div className="flex items-center gap-3 text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">Crop & Environment Analytics</span>
             </div>
             <div className="flex items-center gap-3 text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <Tractor className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-medium">Automated Device Control</span>
             </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-10 bg-slate-900">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-1">Welcome Back</h3>
            <p className="text-slate-500 text-sm">Please sign in to access your dashboard.</p>
          </div>

          {/* Role Toggle */}
          <div className="bg-slate-800 p-1 rounded-lg flex mb-8">
            <button 
                onClick={() => setRole('Farmer')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'Farmer' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
                Farmer View
            </button>
            <button 
                onClick={() => setRole('Admin')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'Admin' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
                Admin Panel
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                        placeholder="Enter your ID"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-offset-slate-900" />
                    <span className="text-slate-400">Remember me</span>
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>

            {error && (
                <div className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
                    {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        Sign In <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
            System Status: <span className="text-emerald-500 font-medium">Operational</span> • v2.5.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;