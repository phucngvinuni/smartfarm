import React, { useState } from 'react';
import { Activity, User, Lock, ArrowRight, Sprout, Tractor, Leaf } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements with New Gradient Palette */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B7D35] via-[#0E6565] to-[#0D577C]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Branding */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between bg-gradient-to-br from-[#0D577C]/40 to-[#0B7D35]/10 border-r border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0B7D35] to-[#0D577C] rounded-xl flex items-center justify-center shadow-lg shadow-[#0B7D35]/30">
                    <Leaf className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">AuraFarm</h1>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Cultivating Intelligence <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B7D35] to-[#4ade80]">Naturally.</span>
            </h2>
            <p className="text-slate-300 leading-relaxed font-light">
              Next-generation livestock monitoring powered by AuraAI. Seamlessly integrating environmental data with animal health metrics.
            </p>
          </div>

          <div className="mt-8 space-y-4">
             <div className="flex items-center gap-3 text-slate-200 bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <Sprout className="w-5 h-5 text-[#0B7D35]" />
                <span className="text-sm font-medium">Eco-Smart Analysis</span>
             </div>
             <div className="flex items-center gap-3 text-slate-200 bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <Activity className="w-5 h-5 text-[#0D577C]" />
                <span className="text-sm font-medium">Real-time Vitals Trace</span>
             </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-10 bg-[#0f172a]/80">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-1">Welcome Back</h3>
            <p className="text-slate-400 text-sm">Sign in to access your Aura dashboard.</p>
          </div>

          {/* Role Toggle */}
          <div className="bg-slate-900 p-1 rounded-lg flex mb-8 border border-slate-700">
            <button 
                onClick={() => setRole('Farmer')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'Farmer' ? 'bg-gradient-to-r from-[#0B7D35] to-[#0E6565] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
                Farmer
            </button>
            <button 
                onClick={() => setRole('Admin')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'Admin' ? 'bg-gradient-to-r from-[#0E6565] to-[#0D577C] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
                Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-[#0E6565] uppercase tracking-wider mb-2">ID / Username</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-slate-950/50 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#0B7D35] transition-colors placeholder:text-slate-600"
                        placeholder="Enter your ID"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-[#0E6565] uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-950/50 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#0B7D35] transition-colors placeholder:text-slate-600"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#0B7D35] focus:ring-offset-slate-900" />
                    <span className="text-slate-400">Remember me</span>
                </label>
                <a href="#" className="text-[#0D577C] hover:text-[#0E6565] font-medium">Forgot password?</a>
            </div>

            {error && (
                <div className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
                    {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#0B7D35] via-[#0E6565] to-[#0D577C] hover:opacity-90 text-white py-3 rounded-lg font-bold shadow-lg shadow-[#0E6565]/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        Access Dashboard <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
            AuraFarm Systems • <span className="text-[#0B7D35] font-medium">Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;