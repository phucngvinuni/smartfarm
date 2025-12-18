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
  Cpu
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole, onLogout }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: Map, label: 'Farm Map' },
    { icon: Activity, label: 'Livestock Health' },
    { icon: Thermometer, label: 'Environment' },
    { icon: Cpu, label: 'Devices' },
    { icon: Camera, label: 'AI Monitoring' },
    { icon: BrainCircuit, label: 'Disease Forecast' },
    { icon: Database, label: 'Traceability' },
    { icon: FileText, label: 'Reports' },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 shadow-2xl">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Activity className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">SmartFarm</h1>
            <span className="text-xs font-semibold text-blue-400 tracking-wider">AI MONITOR</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-3 overflow-y-auto custom-scrollbar">
        <p className="px-3 text-[11px] font-bold text-slate-500 uppercase mb-3 tracking-widest">Main Menu</p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    {item.label}
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
              </button>
            );
          })}
        </nav>

        <div className="my-6 border-t border-slate-800 mx-3"></div>

        <p className="px-3 text-[11px] font-bold text-slate-500 uppercase mb-3 tracking-widest">System</p>
        <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
                <Settings className="w-5 h-5 text-slate-500" />
                Settings
            </button>
             <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
             >
                <LogOut className="w-5 h-5 text-slate-500" />
                Logout
            </button>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="relative">
                <img src={userRole === 'Admin' ? "https://picsum.photos/40?grayscale" : "https://images.unsplash.com/photo-1542384701-c0e46e0604a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"} alt="User" className="w-9 h-9 rounded-full border border-slate-600 object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
                <p className="text-sm font-medium text-white">{userRole === 'Admin' ? 'System Admin' : 'John Farmer'}</p>
                <p className="text-xs text-slate-500">{userRole}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;