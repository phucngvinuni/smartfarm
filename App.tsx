import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  Wind, 
  Users, 
  AlertOctagon,
  Cpu,
  Menu
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import EnvironmentCharts from './components/EnvironmentCharts';
import AICameraFeed from './components/AICameraFeed';
import AlertList from './components/AlertList';
import FarmMap from './components/FarmMap';
import LivestockHealthView from './components/LivestockHealthView';
import EnvironmentView from './components/EnvironmentView';
import AIMonitoringView from './components/AIMonitoringView';
import DiseaseForecastView from './components/DiseaseForecastView';
import TraceabilityView from './components/TraceabilityView';
import ReportsView from './components/ReportsView';
import DevicesView from './components/DevicesView';
import LoginView from './components/LoginView';
import ExpertConsultView from './components/ExpertConsultView';
import ChatWindow from './components/ChatWindow';
import SettingsView from './components/SettingsView';
import AIChatBot from './components/AIChatBot';
import LandingPage from './components/LandingPage';
import AutomationView from './components/AutomationView';
import ProfitPredictorView from './components/ProfitPredictorView'; // Imported
import HealthPassportView from './components/HealthPassportView'; // Imported
import { generateEnvironmentHistory, generateLivestockData, mockAlerts, generateDevices, mockExperts, mockConsultations } from './services/mockData';
import { EnvironmentData, LivestockData, Device, Expert, Consultation } from './types';

function App() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>('');

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Chat State
  const [activeChatExpert, setActiveChatExpert] = useState<Expert | null>(null);

  // Data State
  const [envData, setEnvData] = useState<EnvironmentData[]>([]);
  const [livestockData, setLivestockData] = useState<LivestockData[]>([]);
  const [deviceData, setDeviceData] = useState<Device[]>([]);
  const [expertData, setExpertData] = useState<Expert[]>([]);
  const [consultationData, setConsultationData] = useState<Consultation[]>([]);
  const [activeTab, setActiveTab] = useState('Overview');

  // Handle Theme Change
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Initial data load
    setEnvData(generateEnvironmentHistory());
    setLivestockData(generateLivestockData(60)); // Generate 60 animals for the map
    setDeviceData(generateDevices());
    setExpertData(mockExperts);
    setConsultationData(mockConsultations);

    // Simulate real-time update every 5 seconds
    const interval = setInterval(() => {
        setEnvData(prev => {
            const last = prev[prev.length - 1];
            const now = new Date();
            const newData = {
                timestamp: now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes(),
                temperature: last.temperature + (Math.random() - 0.5),
                humidity: last.humidity + (Math.random() - 0.5),
                co2: last.co2 + (Math.random() * 20 - 10),
                nh3: last.nh3 + (Math.random() * 2 - 1)
            };
            return [...prev.slice(1), newData];
        });
        
        // Simulate livestock movement slightly and update timestamp
        setLivestockData(prev => prev.map(animal => ({
            ...animal,
            lastUpdate: new Date().toLocaleTimeString(),
            location: {
                x: Math.max(0, Math.min(100, animal.location.x + (Math.random() - 0.5) * 2)),
                y: Math.max(0, Math.min(100, animal.location.y + (Math.random() - 0.5) * 2))
            }
        })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setActiveTab('Overview');
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  // If on Landing Page, render full width
  if (activeTab === 'About Us') {
      return (
          <div className="min-h-screen bg-slate-50 dark:bg-[#05090d] text-slate-900 dark:text-slate-200 font-sans selection:bg-[#0B7D35]/30 relative transition-colors duration-300">
             <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                userRole={userRole}
                onLogout={handleLogout}
                isMobileOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
             <div className="md:ml-64 transition-all duration-300 ease-in-out">
                 {/* Mobile Header Button overlay for landing page */}
                 <div className="md:hidden fixed top-4 right-4 z-50">
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)} 
                        className="p-2 bg-slate-900/80 backdrop-blur rounded-lg text-white border border-slate-700 shadow-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                 </div>
                 <LandingPage />
             </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05090d] text-slate-900 dark:text-slate-200 font-sans selection:bg-[#0B7D35]/30 relative transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userRole={userRole}
        onLogout={handleLogout}
        isMobileOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="md:ml-64 p-4 md:p-8 transition-all duration-300 ease-in-out">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6 bg-white/80 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm">
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M35 55 L65 30" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-400 dark:text-slate-600" />
                        <path d="M35 55 L80 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-400 dark:text-slate-600" />
                        <path d="M35 55 L70 75" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-400 dark:text-slate-600" />
                        
                        <circle cx="35" cy="55" r="14" fill="#0B7D35" />
                        <circle cx="65" cy="30" r="8" fill="#0D577C" />
                        <circle cx="80" cy="50" r="7" fill="#0D577C" />
                        <circle cx="70" cy="75" r="8" fill="#0D577C" />
                    </svg>
                 </div>
                 <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Aura AI</h1>
             </div>
             <button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-200 transition-colors"
             >
                 <Menu className="w-6 h-6" />
             </button>
        </div>

        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">{activeTab}</h2>
            <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-xs md:text-sm">
              <span className="w-2 h-2 rounded-full bg-[#0B7D35] animate-pulse shadow-[0_0_10px_rgba(11,125,53,0.5)]"></span>
              Aura Systems Operational • Last updated: Just now
            </p>
          </div>
          {activeTab !== 'Settings' && activeTab !== 'Automation' && activeTab !== 'Profit Predictor' && activeTab !== 'Health Passport' && (
            <div className="flex gap-3 w-full md:w-auto">
               <button className="flex-1 md:flex-none bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-medium text-sm transition-all hover:shadow-lg active:scale-95 text-center">
                  Export Report
               </button>
               {userRole === 'Admin' && (
                  <button className="flex-1 md:flex-none bg-gradient-to-r from-[#0B7D35] to-[#0D577C] hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg shadow-[#0E6565]/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                      <span>+</span> Add IoT Device
                  </button>
               )}
            </div>
          )}
        </div>

        {/* Dynamic Content Rendering */}
        <div className="animate-in fade-in duration-500 pb-10">
          {activeTab === 'Overview' && (
            <>
              {/* Top Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                  title="Total Livestock" 
                  value="1,248" 
                  unit="heads"
                  icon={Users}
                  color="text-[#0D577C]"
                  trend="+12"
                  trendUp={true}
                />
                <StatCard 
                  title="Health Index" 
                  value="98.2" 
                  unit="%"
                  icon={Activity}
                  color="text-[#0B7D35]"
                  trend="+0.5%"
                  trendUp={true}
                />
                <StatCard 
                  title="Disease Alerts" 
                  value="3" 
                  unit="risks"
                  icon={AlertOctagon}
                  color="text-rose-500"
                  trend="-2"
                  trendUp={true} 
                />
                <StatCard 
                  title="IoT Devices Online" 
                  value="452" 
                  unit="/ 455"
                  icon={Cpu}
                  color="text-[#0E6565]"
                />
              </div>

              {/* Main Content Grid - Middle Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 min-h-[400px]">
                  <EnvironmentCharts data={envData} />
                </div>

                {/* Alert Feed */}
                <div className="lg:col-span-1 min-h-[400px]">
                  <AlertList alerts={mockAlerts} />
                </div>
              </div>

              {/* Bottom Row - AI & Specific Metrics */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-1 min-h-[400px]">
                      <AICameraFeed />
                  </div>
                  
                  <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm dark:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all group cursor-pointer">
                          <div className="flex justify-between items-start mb-4">
                              <h4 className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                                  <Thermometer className="w-4 h-4 text-[#0B7D35]" />
                                  Avg Herd Temperature
                              </h4>
                              <span className="text-xs font-bold bg-[#0B7D35]/10 text-[#0B7D35] px-2 py-1 rounded">Stable</span>
                          </div>
                          <div className="flex items-end gap-2 mb-3">
                               <span className="text-4xl font-bold text-slate-800 dark:text-white group-hover:scale-105 transition-transform origin-left">38.5</span>
                               <span className="text-slate-500 dark:text-slate-400 mb-1">°C</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700/50 h-2 rounded-full overflow-hidden mb-2">
                              <div className="bg-gradient-to-r from-[#0E6565] to-[#0B7D35] h-full w-[70%] rounded-full"></div>
                          </div>
                          <p className="text-xs text-slate-500">Within safe range (38.0 - 39.0°C)</p>
                      </div>

                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm dark:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all group cursor-pointer">
                          <div className="flex justify-between items-start mb-4">
                              <h4 className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                                  <Droplets className="w-4 h-4 text-[#0D577C]" />
                                  Water Consumption Today
                              </h4>
                              <span className="text-xs font-bold bg-[#0D577C]/10 text-[#0D577C] px-2 py-1 rounded">Slight Increase</span>
                          </div>
                          <div className="flex items-end gap-2 mb-3">
                               <span className="text-4xl font-bold text-[#0D577C] group-hover:scale-105 transition-transform origin-left">4,200</span>
                               <span className="text-slate-500 dark:text-slate-400 mb-1">liters</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700/50 h-2 rounded-full overflow-hidden mb-2">
                              <div className="bg-gradient-to-r from-[#0D577C] to-blue-400 h-full w-[85%] rounded-full"></div>
                          </div>
                           <p className="text-xs text-slate-500">+5% vs weekly average</p>
                      </div>

                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm dark:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all group cursor-pointer">
                          <div className="flex justify-between items-start mb-4">
                              <h4 className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                                  <Wind className="w-4 h-4 text-yellow-500" />
                                  Air Quality (NH3)
                              </h4>
                              <span className="text-xs font-bold bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">Warning</span>
                          </div>
                          <div className="flex items-end gap-2 mb-3">
                               <span className="text-4xl font-bold text-yellow-500 group-hover:scale-105 transition-transform origin-left">22</span>
                               <span className="text-slate-500 dark:text-slate-400 mb-1">ppm</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700/50 h-2 rounded-full overflow-hidden mb-2">
                              <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full w-[45%] rounded-full"></div>
                          </div>
                          <p className="text-xs text-slate-500">Check ventilation in Zone C</p>
                      </div>
                       
                       <div className="group bg-gradient-to-br from-[#0E6565] to-[#0D577C] rounded-xl p-5 shadow-lg flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-[#0E6565]/20 hover:scale-[1.02] transition-all relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="p-3 bg-white/10 rounded-full mb-3 group-hover:bg-white/20 transition-colors">
                            <Cpu className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-white font-bold text-lg">Blockchain Sync</h4>
                          <p className="text-slate-200 text-sm mt-1 mb-4">100% Traceability Data Synced</p>
                          <button className="bg-white/10 hover:bg-white/25 text-white text-xs font-semibold px-4 py-2 rounded-lg border border-white/20 transition-all w-full">
                              View Smart Contract
                          </button>
                      </div>
                  </div>
              </div>
            </>
          )}

          {activeTab === 'Farm Map' && (
            <FarmMap data={livestockData} />
          )}

          {activeTab === 'Livestock Health' && (
            <LivestockHealthView data={livestockData} />
          )}

          {activeTab === 'Environment' && (
            <EnvironmentView data={envData} />
          )}

          {activeTab === 'Devices' && (
            <DevicesView devices={deviceData} />
          )}

          {activeTab === 'Automation' && (
            <AutomationView />
          )}

           {activeTab === 'Profit Predictor' && (
            <ProfitPredictorView />
          )}

           {activeTab === 'Health Passport' && (
            <HealthPassportView />
          )}

          {activeTab === 'AI Monitoring' && (
            <AIMonitoringView />
          )}
          
          {activeTab === 'Expert Consult' && (
            <ExpertConsultView 
                experts={expertData} 
                consultations={consultationData} 
                onChatStart={setActiveChatExpert}
            />
          )}

          {activeTab === 'Disease Forecast' && (
            <DiseaseForecastView />
          )}

          {activeTab === 'Traceability' && (
            <TraceabilityView />
          )}

          {activeTab === 'Reports' && (
            <ReportsView />
          )}

          {activeTab === 'Settings' && (
            <SettingsView 
                isDarkMode={theme === 'dark'} 
                toggleTheme={toggleTheme} 
                userRole={userRole}
            />
          )}
        </div>
      </main>

      {/* Global Chat Overlay */}
      {activeChatExpert && (
        <ChatWindow 
            expert={activeChatExpert} 
            onClose={() => setActiveChatExpert(null)} 
        />
      )}
      
      {/* AI Assistant Chatbot - Connected to Main App State */}
      <AIChatBot 
         envData={envData}
         livestockData={livestockData}
         experts={expertData}
      />
    </div>
  );
}

export default App;