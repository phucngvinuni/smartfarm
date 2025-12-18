import React, { useState, useMemo, useEffect } from 'react';
import { LivestockData, HealthStatus, LivestockHistoryPoint } from '../types';
import { Heart, Thermometer, Activity, X, TrendingUp, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getLivestockHistory } from '../services/mockData';

interface FarmMapProps {
  data: LivestockData[];
}

const FarmMap: React.FC<FarmMapProps> = ({ data }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<LivestockData | null>(null);
  const [historyData, setHistoryData] = useState<LivestockHistoryPoint[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'overview' | 'trends'>('overview');

  const counts = useMemo(() => ({
    ALL: data.length,
    CRITICAL: data.filter(d => d.status === HealthStatus.CRITICAL).length,
    WARNING: data.filter(d => d.status === HealthStatus.WARNING).length,
    Cow: data.filter(d => d.type === 'Cow').length,
    Pig: data.filter(d => d.type === 'Pig').length,
    Chicken: data.filter(d => d.type === 'Chicken').length,
  }), [data]);

  const filteredData = useMemo(() => {
    if (filter === 'ALL') return data;
    return data.filter(d => d.status === filter || d.type === filter);
  }, [data, filter]);

  // Fetch history when an animal is selected
  useEffect(() => {
    if (selectedAnimal) {
        setHistoryData(getLivestockHistory(selectedAnimal.id));
        setActiveTab('overview'); // Reset tab on new selection
    } else {
        setHistoryData([]);
    }
  }, [selectedAnimal]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl h-[calc(100vh-10rem)] flex flex-col overflow-hidden relative">
      {/* Map Header / Controls */}
      <div className="absolute top-4 left-4 z-10 bg-slate-800/90 backdrop-blur-md p-2 rounded-lg border border-slate-700 shadow-lg flex gap-2 items-center">
        <button 
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
        >
          ALL ({counts.ALL})
        </button>
        <button 
          onClick={() => setFilter(HealthStatus.CRITICAL)}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${filter === HealthStatus.CRITICAL ? 'bg-rose-500 text-white' : 'bg-slate-700 text-rose-400 hover:bg-slate-600'}`}
        >
          CRITICAL ({counts.CRITICAL})
        </button>
        <button 
          onClick={() => setFilter(HealthStatus.WARNING)}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${filter === HealthStatus.WARNING ? 'bg-yellow-500 text-black' : 'bg-slate-700 text-yellow-400 hover:bg-slate-600'}`}
        >
          WARNING ({counts.WARNING})
        </button>

        {/* Separator */}
        <div className="w-px h-5 bg-slate-600 mx-1"></div>

        <button 
          onClick={() => setFilter('Cow')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filter === 'Cow' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
        >
          COW ({counts.Cow})
        </button>
        <button 
          onClick={() => setFilter('Pig')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filter === 'Pig' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
        >
          PIG ({counts.Pig})
        </button>
        <button 
          onClick={() => setFilter('Chicken')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filter === 'Chicken' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
        >
          CHICKEN ({counts.Chicken})
        </button>
      </div>

      {/* Map Area */}
      <div 
        className="relative flex-1 bg-[#0f172a] cursor-crosshair overflow-hidden group"
        onClick={() => setSelectedAnimal(null)}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Structures / Zones (Visual indicators) */}
        {/* Barn A */}
        <div className="absolute top-[10%] left-[10%] w-[25%] h-[30%] border-2 border-slate-600 bg-slate-800/30 rounded-lg flex items-center justify-center pointer-events-none">
             <span className="text-slate-500 font-black text-2xl tracking-widest opacity-30 select-none">BARN A</span>
        </div>
        {/* Barn B */}
        <div className="absolute top-[10%] right-[10%] w-[25%] h-[30%] border-2 border-slate-600 bg-slate-800/30 rounded-lg flex items-center justify-center pointer-events-none">
             <span className="text-slate-500 font-black text-2xl tracking-widest opacity-30 select-none">BARN B</span>
        </div>
        {/* Pasture */}
        <div className="absolute bottom-[10%] left-[10%] right-[10%] h-[35%] border-2 border-dashed border-emerald-900/50 bg-emerald-900/10 rounded-3xl flex items-center justify-center pointer-events-none">
             <span className="text-emerald-800 font-black text-4xl tracking-widest opacity-30 select-none">GRAZING PASTURE</span>
        </div>
        
        {/* Watering Hole */}
        <div className="absolute bottom-[20%] right-[30%] w-[15%] h-[15%] bg-blue-900/20 rounded-full border border-blue-800/30 blur-sm pointer-events-none"></div>

        {/* Animal Markers */}
        {filteredData.map(animal => (
          <div
            key={animal.id}
            style={{ 
              left: `${animal.location.x}%`, 
              top: `${animal.location.y}%`,
              transition: 'all 1s ease-in-out'
            }}
            className={`absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg transition-transform hover:scale-[2.5] z-20 cursor-pointer flex items-center justify-center ${
              animal.status === HealthStatus.CRITICAL ? 'bg-rose-500 shadow-rose-500/50 animate-pulse' :
              animal.status === HealthStatus.WARNING ? 'bg-yellow-400 shadow-yellow-400/50' :
              'bg-emerald-500 shadow-emerald-500/50'
            } ${
                // Size differentiation based on type
                animal.type === 'Chicken' ? 'w-2 h-2' : 
                animal.type === 'Pig' ? 'w-2.5 h-2.5' : 'w-3 h-3'
            }`}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedAnimal(animal);
            }}
          >
            {/* Ping effect for critical */}
            {animal.status === HealthStatus.CRITICAL && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>
            )}
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      <div className={`absolute top-4 right-4 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-600 rounded-xl shadow-2xl transition-all duration-300 transform origin-top-right z-30 max-h-[calc(100%-2rem)] flex flex-col ${selectedAnimal ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        {selectedAnimal && (
            <div className="flex flex-col h-full">
                {/* Panel Header */}
                <div className="p-5 pb-2">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="bg-blue-600 text-[10px] px-1.5 py-0.5 rounded text-white uppercase">{selectedAnimal.type}</span>
                            #{selectedAnimal.tagId}
                            </h4>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3" />
                                Last update: <span className="text-slate-200 font-mono">{selectedAnimal.lastUpdate}</span>
                            </p>
                        </div>
                        <button onClick={() => setSelectedAnimal(null)} className="text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-slate-700/50 rounded-lg p-1 mb-2">
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Live Stats
                        </button>
                        <button 
                            onClick={() => setActiveTab('trends')}
                            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${activeTab === 'trends' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Trends (24h)
                        </button>
                    </div>
                </div>
                
                {/* Scrollable Content Area */}
                <div className="p-5 pt-2 overflow-y-auto custom-scrollbar flex-1">
                    
                    {activeTab === 'overview' ? (
                        <div className="space-y-4">
                            <div className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Heart className="w-4 h-4 text-rose-400" />
                                    <span className="text-sm">Status</span>
                                </div>
                                <span className={`text-sm font-bold px-2 py-0.5 rounded ${
                                    selectedAnimal.status === HealthStatus.CRITICAL ? 'bg-rose-500/20 text-rose-400' :
                                    selectedAnimal.status === HealthStatus.WARNING ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-emerald-500/20 text-emerald-400'
                                }`}>
                                    {selectedAnimal.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-700/30 rounded-lg p-3">
                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                                        <Thermometer className="w-3.5 h-3.5" />
                                        Temp
                                    </div>
                                    <span className="text-lg font-semibold text-white">{selectedAnimal.temperature.toFixed(1)}°C</span>
                                </div>
                                <div className="bg-slate-700/30 rounded-lg p-3">
                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                                        <Activity className="w-3.5 h-3.5" />
                                        HR
                                    </div>
                                    <span className="text-lg font-semibold text-white">{selectedAnimal.heartRate} bpm</span>
                                </div>
                            </div>

                            <div className="bg-slate-700/30 rounded-lg p-3">
                                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                                    <span>Activity Level</span>
                                    <span>{selectedAnimal.activityLevel}%</span>
                                </div>
                                <div className="w-full bg-slate-600 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${selectedAnimal.activityLevel < 30 ? 'bg-rose-500' : 'bg-blue-500'}`} 
                                        style={{ width: `${selectedAnimal.activityLevel}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-medium transition-colors mt-2">
                                View Full Medical Record
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Temperature Trend */}
                            <div className="bg-slate-700/20 rounded-lg p-3 border border-slate-700/50">
                                <h5 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                                    <Thermometer className="w-3 h-3 text-orange-400" />
                                    Temperature (°C)
                                </h5>
                                <div className="h-32 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={historyData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                            <XAxis dataKey="time" hide />
                                            <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} hide />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', fontSize: '10px' }}
                                                itemStyle={{ color: '#fb923c' }}
                                            />
                                            <Line type="monotone" dataKey="temperature" stroke="#fb923c" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Heart Rate Trend */}
                            <div className="bg-slate-700/20 rounded-lg p-3 border border-slate-700/50">
                                <h5 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                                    <Heart className="w-3 h-3 text-rose-400" />
                                    Heart Rate (bpm)
                                </h5>
                                <div className="h-32 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={historyData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                            <XAxis dataKey="time" hide />
                                            <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', fontSize: '10px' }}
                                                itemStyle={{ color: '#f43f5e' }}
                                            />
                                            <Line type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Activity Trend */}
                            <div className="bg-slate-700/20 rounded-lg p-3 border border-slate-700/50">
                                <h5 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                                    <Activity className="w-3 h-3 text-blue-400" />
                                    Activity (%)
                                </h5>
                                <div className="h-32 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={historyData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                            <XAxis dataKey="time" hide />
                                            <YAxis domain={[0, 100]} hide />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', fontSize: '10px' }}
                                                itemStyle={{ color: '#60a5fa' }}
                                            />
                                            <Line type="step" dataKey="activity" stroke="#60a5fa" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default FarmMap;