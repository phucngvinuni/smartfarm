import React from 'react';
import { Moon, Sun, Bell, Shield, User, Smartphone, Globe, Mail } from 'lucide-react';

interface SettingsViewProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  userRole: string;
}

const SettingsView: React.FC<SettingsViewProps> = ({ isDarkMode, toggleTheme, userRole }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Section */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm dark:shadow-lg">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          Profile Settings
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src={userRole === 'Admin' 
                ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              } 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 dark:border-slate-600"
            />
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-500 transition-colors">
              <User className="w-3 h-3" />
            </button>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{userRole === 'Admin' ? 'System Admin' : 'John Farmer'}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{userRole}</p>
            <div className="flex gap-2">
              <span className="text-xs bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-500/20 font-medium">Verified</span>
              <span className="text-xs bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded border border-blue-200 dark:border-blue-500/20 font-medium">Premium Plan</span>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-slate-400" />
              john.farmer@aurafarm.com
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Phone Number</label>
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              <Smartphone className="w-4 h-4 text-slate-400" />
              +84 912 345 678
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm dark:shadow-lg">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          {isDarkMode ? <Moon className="w-5 h-5 text-purple-500" /> : <Sun className="w-5 h-5 text-amber-500" />}
          Appearance
        </h3>
        
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">Dark Mode</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Toggle between light and dark themes for the dashboard.</p>
          </div>
          <button 
            onClick={toggleTheme}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${
              isDarkMode ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`${
                isDarkMode ? 'translate-x-7' : 'translate-x-1'
              } inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md flex items-center justify-center`}
            >
              {isDarkMode ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-amber-500" />}
            </span>
          </button>
        </div>
      </div>

      {/* Notifications Section (Mock) */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm dark:shadow-lg">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-rose-500" />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Critical Alerts</h4>
              <p className="text-xs text-slate-500">Receive push notifications for critical health & env issues.</p>
            </div>
            <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
            </div>
          </div>
          <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Weekly Reports</h4>
              <p className="text-xs text-slate-500">Email summary of farm performance every Monday.</p>
            </div>
            <div className="w-10 h-6 bg-slate-300 dark:bg-slate-600 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* System Section (Mock) */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm dark:shadow-lg">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-500" />
          System
        </h3>
        <div className="flex items-center justify-between">
           <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Language</h4>
              <p className="text-xs text-slate-500">Select your preferred language interface.</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500">
              <option>English (US)</option>
              <option>Vietnamese</option>
              <option>Japanese</option>
            </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;