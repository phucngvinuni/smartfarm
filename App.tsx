import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  Wind, 
  Users, 
  AlertOctagon,
  Cpu
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
import { generateEnvironmentHistory, generateLivestockData, mockAlerts } from './services/mockData';
import { EnvironmentData, LivestockData } from './types';

function App() {
  const [envData, setEnvData] = useState<EnvironmentData[]>([]);
  const [livestockData, setLivestockData] = useState<LivestockData[]>([]);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    // Initial data load
    setEnvData(generateEnvironmentHistory());
    setLivestockData(generateLivestockData(60)); // Generate 60 animals for the map

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="ml-64 p-8 transition-all duration-300 ease-in-out">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{activeTab}</h2>
            <p className="text-slate-400 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              System operating normally • Last updated: Just now
            </p>
          </div>
          <div className="flex gap-3">
             <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg border border-slate-700 font-medium text-sm transition-all hover:shadow-lg active:scale-95">
                Export Report
             </button>
             <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 active:scale-95 flex items-center gap-2">
                <span>+</span> Add IoT Device
             </button>
          </div>
        </div>

        {/* Dynamic Content Rendering */}
        <div className="animate-in fade-in duration-500">
          {activeTab === 'Overview' && (
            <>
              {/* Top Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                  title="Total Livestock" 
                  value="1,248" 
                  unit="heads"
                  icon={Users}
                  color="text-blue-500"
                  trend="+12"
                  trendUp={true}
                />
                <StatCard 
                  title="Health Index" 
                  value="98.2" 
                  unit="%"
                  icon={Activity}
                  color="text-emerald-500"
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
                  color="text-purple-500"
                />
              </div>

              {/* Main Content Grid - Middle Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                  <EnvironmentCharts data={envData} />
                </div>

                {/* Alert Feed */}
                <div className="lg:col-span-1">
                  <AlertList alerts={mockAlerts} />
                </div>
              </div>

              {/* Bottom Row - AI & Specific Metrics */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-1 min-h-[400px]">
                      <AICameraFeed />
                  </div>
                  
                  <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg hover:border-slate-600 transition-all group cursor-pointer">
                          <div className="flex justify-between items-start mb-4">
                              <h4 className="text-slate-400 font-medium flex items-center gap-2">
                                  <Thermometer className="w-4 h-4 text-emerald-500" />
                                  Avg Herd Temperature
                              </h4>
                              <span className="text-xs font-bold bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">Stable</span>
                          </div>
                          <div className="flex items-end gap-2 mb-3">
                               <span className="text-4xl font-bold text-white group-hover:scale-105 transition-transform origin-left">38.5</span>
                               <span className="text-slate-400 mb-1">°C</span>
                          </div>
                          <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden mb-2">
                              <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full w-[70%] rounded-full"></div>
                          </div>
                          <p className="text-xs text-slate-500">Within safe range (38.0 - 39.0°C)</p>
                      </div>

                      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg hover:border-slate-600 transition-all group cursor-pointer">
                          <div className="flex justify-between items-start mb-4">
                              <h4 className="text-slate-400 font-medium flex items-center gap-2">
                                  <Droplets className="w-4 h-4 text-blue-500" />
                                  Water Consumption Today
                              </h4>
                              <span className="text-xs font-bold bg-blue-500/10 text-blue-500 px-2 py-1 rounded">Slight Increase</span>
                          </div>
                          <div className="flex items-end gap-2 mb-3">
                               <span className="text-4xl font-bold text-blue-400 group-hover:scale-105 transition-transform origin-left">4,200</span>
                               <span className="text-slate-400 mb-1">liters</span>
                          </div>
                          <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden mb-2">
                              <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full w-[85%] rounded-full"></div>
                          </div>
                           <p className="text-xs text-slate-500">+5% vs weekly average</p>
                      </div>

                      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg hover:border-slate-600 transition-all group cursor-pointer">
                          <div className="flex justify-between items-start mb-4">
                              <h4 className="text-slate-400 font-medium flex items-center gap-2">
                                  <Wind className="w-4 h-4 text-yellow-500" />
                                  Air Quality (NH3)
                              </h4>
                              <span className="text-xs font-bold bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">Warning</span>
                          </div>
                          <div className="flex items-end gap-2 mb-3">
                               <span className="text-4xl font-bold text-yellow-500 group-hover:scale-105 transition-transform origin-left">22</span>
                               <span className="text-slate-400 mb-1">ppm</span>
                          </div>
                          <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden mb-2">
                              <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full w-[45%] rounded-full"></div>
                          </div>
                          <p className="text-xs text-slate-500">Check ventilation in Zone C</p>
                      </div>
                       
                       <div className="group bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-5 shadow-lg flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-indigo-500/20 hover:scale-[1.02] transition-all relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="p-3 bg-white/10 rounded-full mb-3 group-hover:bg-white/20 transition-colors">
                            <Cpu className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-white font-bold text-lg">Blockchain Sync</h4>
                          <p className="text-indigo-200 text-sm mt-1 mb-4">100% Traceability Data Synced</p>
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

          {activeTab === 'AI Monitoring' && (
            <AIMonitoringView />
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
        </div>
      </main>
    </div>
  );
}

export default App;