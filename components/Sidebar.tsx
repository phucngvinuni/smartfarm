import React from 'react';
import { 
  LayoutDashboard, 
  Thermometer, 
  Camera, 
  Map, 
  Database, 
  Settings, 
  FileText,
  Activity,
  LogOut,
  BrainCircuit,
  ChevronRight,
  Cpu,
  Stethoscope,
  X,
  Info,
  Zap,
  TrendingUp,
  QrCode
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: string;
  onLogout: () => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole, onLogout, isMobileOpen, onClose }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: Map, label: 'Farm Map' },
    { icon: Activity, label: 'Livestock Health' },
    { icon: Thermometer, label: 'Environment' },
    { icon: Cpu, label: 'Devices' },
    { icon: Zap, label: 'Automation' },
    { icon: Camera, label: 'AI Monitoring' },
    { icon: TrendingUp, label: 'Profit Predictor' }, // New Feature
    { icon: QrCode, label: 'Health Passport' }, // New Feature
    { icon: Stethoscope, label: 'Expert Consult' },
    { icon: BrainCircuit, label: 'Disease Forecast' },
    { icon: Database, label: 'Traceability' },
    { icon: FileText, label: 'Reports' },
    { icon: Info, label: 'About Us' },
  ];

  const handleNavClick = (label: string) => {
    setActiveTab(label);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <div className={`
        w-64 bg-slate-50 dark:bg-[#0a1018] border-r border-slate-200 dark:border-slate-800 h-screen flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 shadow-2xl
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-[#0a1018]">
          <div className="flex items-center gap-3">
            {/* Custom Aura AI Logo - Refined */}
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Connections with rounded caps and thicker strokes */}
                    <path d="M35 55 L65 30" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-400 dark:text-slate-600" />
                    <path d="M35 55 L80 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-400 dark:text-slate-600" />
                    <path d="M35 55 L70 75" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-400 dark:text-slate-600" />
                    
                    {/* Nodes */}
                    <circle cx="35" cy="55" r="14" fill="url(#grad-main)" />
                    <circle cx="65" cy="30" r="8" fill="#0D577C" />
                    <circle cx="80" cy="50" r="7" fill="#0D577C" />
                    <circle cx="70" cy="75" r="8" fill="#0D577C" />
                    
                    <defs>
                        <linearGradient id="grad-main" x1="20" y1="55" x2="50" y2="55" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#0B7D35" />
                            <stop offset="1" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Aura AI</h1>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 py-6 px-3 overflow-y-auto custom-scrollbar">
          <p className="px-3 text-[11px] font-bold text-[#0D577C] uppercase mb-3 tracking-widest">Main Menu</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label)}
                  className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#0B7D35] to-[#0D577C] text-white shadow-lg shadow-[#0B7D35]/20' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-[#0E6565]/10 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                      {item.label}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                </button>
              );
            })}
          </nav>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800 mx-3"></div>

          <p className="px-3 text-[11px] font-bold text-[#0D577C] uppercase mb-3 tracking-widest">System</p>
          <nav className="space-y-1">
              <button 
                  onClick={() => handleNavClick('Settings')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'Settings' 
                        ? 'bg-gradient-to-r from-[#0B7D35] to-[#0D577C] text-white shadow-lg' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-[#0E6565]/10 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
              >
                  <Settings className={`w-5 h-5 transition-colors ${activeTab === 'Settings' ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                  Settings
              </button>
              <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-rose-500 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 transition-colors"
              >
                  <LogOut className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  Logout
              </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#05090d]">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <div className="relative">
                  <img 
                    src={userRole === 'Admin' 
                      ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    } 
                    alt="User" 
                    className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-600 object-cover" 
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#0B7D35] border-2 border-slate-100 dark:border-slate-900 rounded-full"></span>
              </div>
              <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{userRole === 'Admin' ? 'System Admin' : 'John Farmer'}</p>
                  <p className="text-xs text-slate-500">{userRole}</p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;