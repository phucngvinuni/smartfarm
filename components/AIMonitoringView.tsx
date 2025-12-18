import React from 'react';
import AICameraFeed from './AICameraFeed';
import { AlertTriangle, Video, Eye, Server } from 'lucide-react';
import { mockAlerts } from '../services/mockData';

const AIMonitoringView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
      {/* Main Camera Grid */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-y-auto custom-scrollbar pr-2">
        <div className="aspect-video">
            <AICameraFeed />
        </div>
        
        {/* Mock other cameras with static content for now, ideally reused components */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl relative overflow-hidden aspect-video flex items-center justify-center group">
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                CAM-02 (Barn A)
            </div>
            <Video className="w-12 h-12 text-slate-700" />
            <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
                 <img src="https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Feed" className="w-full h-full object-cover opacity-40 grayscale" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="bg-black/60 backdrop-blur rounded p-2 text-xs">
                    <div className="text-slate-400">Analysis</div>
                    <div className="text-emerald-400 font-bold">Normal Behavior</div>
                </div>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl relative overflow-hidden aspect-video flex items-center justify-center group">
             <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                CAM-03 (Entry Gate)
            </div>
             <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
                 <img src="https://images.pexels.com/photos/2252569/pexels-photo-2252569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Feed" className="w-full h-full object-cover opacity-40 grayscale" />
            </div>
            {/* Detection Box */}
            <div className="absolute top-1/2 left-1/3 w-1/4 h-1/3 border-2 border-blue-500 rounded">
                <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] px-1 rounded">Staff: #412</div>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl relative overflow-hidden aspect-video flex items-center justify-center group">
             <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                CAM-04 (Isolation)
            </div>
             <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
                 <img src="https://images.pexels.com/photos/1117268/pexels-photo-1117268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Feed" className="w-full h-full object-cover opacity-40 grayscale" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/70 backdrop-blur-sm p-4 rounded-xl border border-rose-500/30 flex flex-col items-center">
                    <AlertTriangle className="w-8 h-8 text-rose-500 mb-2" />
                    <span className="text-rose-400 font-bold">Motion Detected</span>
                    <span className="text-xs text-slate-400">Restricted Area</span>
                </div>
            </div>
        </div>
      </div>

      {/* AI Sidebar */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-700 bg-slate-900/50">
            <h3 className="font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-500" />
                Edge AI Analysis Log
            </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {mockAlerts.filter(a => a.type === 'AI_DETECTION').map(alert => (
                <div key={alert.id} className="bg-slate-700/30 border border-slate-700 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                        <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/30">
                            OBJECT DETECTION
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-300 font-medium mb-2">{alert.message}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Video className="w-3 h-3" />
                        {alert.source}
                    </div>
                </div>
            ))}

            {/* Simulated log entries */}
             <div className="bg-slate-700/30 border border-slate-700 rounded-lg p-3 opacity-70">
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">
                        BEHAVIOR ANALYSIS
                    </span>
                    <span className="text-xs text-slate-500 font-mono">10:41 AM</span>
                </div>
                <p className="text-sm text-slate-300 font-medium mb-2">Cow #1024 - Eating duration normal (45 mins)</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Video className="w-3 h-3" />
                    AI Camera 01
                </div>
            </div>
            
             <div className="bg-slate-700/30 border border-slate-700 rounded-lg p-3 opacity-70">
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                        COUNTING
                    </span>
                    <span className="text-xs text-slate-500 font-mono">10:40 AM</span>
                </div>
                <p className="text-sm text-slate-300 font-medium mb-2">Zone B Headcount: 12 (Match)</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Video className="w-3 h-3" />
                    AI Camera 02
                </div>
            </div>
        </div>
        <div className="p-4 border-t border-slate-700 bg-slate-900/30">
            <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Model: YOLOv8-Farm-Optimized</span>
                <span className="flex items-center gap-1 text-emerald-400">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Online (14ms latency)
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIMonitoringView;