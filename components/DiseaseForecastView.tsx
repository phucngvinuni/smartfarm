import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { BrainCircuit, AlertOctagon, ShieldCheck, ThermometerSun, TrendingUp } from 'lucide-react';

const mockForecastData = [
    { day: 'Mon', risk: 12, probability: 5 },
    { day: 'Tue', risk: 15, probability: 8 },
    { day: 'Wed', risk: 35, probability: 15 },
    { day: 'Thu', risk: 28, probability: 12 },
    { day: 'Fri', risk: 20, probability: 9 },
    { day: 'Sat', risk: 18, probability: 6 },
    { day: 'Sun', risk: 15, probability: 5 },
];

const DiseaseForecastView: React.FC = () => {
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-purple-500" />
                            7-Day Disease Risk Forecast
                        </h3>
                        <p className="text-sm text-slate-400">AI Prediction Model v2.4 based on environmental & bio-data</p>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="text-xs font-bold text-white bg-slate-700 px-2 py-1 rounded">Overall Risk: LOW</span>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockForecastData}>
                            <defs>
                                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="day" stroke="#64748b" axisLine={false} tickLine={false} dy={10} />
                            <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                                itemStyle={{ color: '#a78bfa' }}
                            />
                            <Area type="monotone" dataKey="risk" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg flex flex-col">
                <h3 className="font-bold text-white mb-4">Top Disease Threats</h3>
                <div className="space-y-4 flex-1">
                    <div className="bg-slate-700/30 rounded-lg p-3 border-l-4 border-yellow-500">
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-white text-sm">Mastitis</span>
                            <span className="text-yellow-500 text-xs font-bold">MEDIUM (35%)</span>
                        </div>
                        <p className="text-xs text-slate-400">Humidity spikes in Barn A increasing risk.</p>
                    </div>

                    <div className="bg-slate-700/30 rounded-lg p-3 border-l-4 border-emerald-500">
                         <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-white text-sm">Foot & Mouth</span>
                            <span className="text-emerald-500 text-xs font-bold">LOW (2%)</span>
                        </div>
                        <p className="text-xs text-slate-400">No regional outbreaks detected.</p>
                    </div>

                     <div className="bg-slate-700/30 rounded-lg p-3 border-l-4 border-emerald-500">
                         <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-white text-sm">Respiratory</span>
                            <span className="text-emerald-500 text-xs font-bold">LOW (12%)</span>
                        </div>
                        <p className="text-xs text-slate-400">Ventilation performing optimally.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
             <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                AI Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <ThermometerSun className="w-4 h-4" />
                        <span className="font-semibold text-sm">Adjust Ventilation</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Predicted humidity rise on Wednesday. Suggest increasing fan cycles in Barn A by 15% starting Tuesday night.
                    </p>
                    <button className="mt-3 text-xs bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded hover:bg-blue-600/30 transition-colors">Apply Config</button>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2 text-purple-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-semibold text-sm">Dietary Adjustment</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Slight weight stagnation in Pen 4. AI suggests increasing protein mix by 2% for the next 3 feeding cycles.
                    </p>
                     <button className="mt-3 text-xs bg-purple-600/20 text-purple-400 px-3 py-1.5 rounded hover:bg-purple-600/30 transition-colors">Notify Feeder</button>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                        <AlertOctagon className="w-4 h-4" />
                        <span className="font-semibold text-sm">Preventive Check</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Schedule hoof inspection for Cow #1024 and #1055 based on subtle gait anomalies detected by camera.
                    </p>
                     <button className="mt-3 text-xs bg-emerald-600/20 text-emerald-400 px-3 py-1.5 rounded hover:bg-emerald-600/30 transition-colors">Create Task</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DiseaseForecastView;