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
        
        {/* CAM-01 (Zone B - Chickens) - Fixed View */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl relative overflow-hidden aspect-video flex items-center justify-center group">
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                CAM-01 (Zone B - Chickens)
            </div>
            <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=ddm2hzdhy&public_id=Tracker_Distance_Measure_2_fdmpw8&autoplay=true&autoplay_mode=on-scroll&muted=true&loop=true&controls=false&control_bar[volumePanel]=false"
                className="w-full h-full object-cover border-0"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10 pointer-events-none">
                <div className="bg-black/60 backdrop-blur rounded p-2 text-xs border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">Status</div>
                    <div className="text-emerald-400 font-bold">Tracking Active</div>
                </div>
            </div>
        </div>

        {/* CAM-02 (Zone A - Cows) - Fixed View */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl relative overflow-hidden aspect-video flex items-center justify-center group">
             <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                CAM-02 (Zone A - Cows)
            </div>
            <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=ddm2hzdhy&public_id=AI_based_animal_behaviour_analysis_-_Dadong_Wang_720p_h264_nwc7t3&autoplay=true&autoplay_mode=on-scroll&muted=true&loop=true&controls=false&control_bar[volumePanel]=false&control_bar[fullscreenToggle]=false"
                className="w-full h-full object-cover border-0"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10 pointer-events-none">
                <div className="bg-black/60 backdrop-blur rounded p-2 text-xs border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">Behavior</div>
                    <div className="text-blue-400 font-bold">Feeding (Normal)</div>
                </div>
            </div>
        </div>

        {/* CAM-03 (Entry Gate) - Fixed View */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl relative overflow-hidden aspect-video flex items-center justify-center group">
             <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                CAM-03 (Entry Gate)
            </div>
            <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=ddm2hzdhy&public_id=1220_eqaghk&autoplay=true&autoplay_mode=on-scroll&muted=true&loop=true&controls=false&control_bar[volumePanel]=false&control_bar[fullscreenToggle]=false"
                className="w-full h-full object-cover border-0"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10 pointer-events-none">
                <div className="bg-black/60 backdrop-blur rounded p-2 text-xs border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase">Counting</div>
                    <div className="text-emerald-400 font-bold">Total: 42</div>
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
                    AI Camera 02
                </div>
            </div>
            
             <div className="bg-slate-700/30 border border-slate-700 rounded-lg p-3 opacity-70">
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                        COUNTING
                    </span>
                    <span className="text-xs text-slate-500 font-mono">10:40 AM</span>
                </div>
                <p className="text-sm text-slate-300 font-medium mb-2">Zone B Headcount: 35 (Chickens)</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Video className="w-3 h-3" />
                    AI Camera 01
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