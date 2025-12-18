import React, { useState } from 'react';
import { Camera, Scan, Activity, AlertTriangle, Maximize2, MoreVertical, Disc, Settings2 } from 'lucide-react';

const AICameraFeed: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg flex flex-col h-full group/card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50 backdrop-blur-md">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Camera className="w-5 h-5 text-purple-500" />
          AI Camera - Zone B
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              LIVE
            </span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="relative flex-1 bg-black group overflow-hidden">
        {/* Placeholder image for livestock */}
        <img 
          src="https://picsum.photos/seed/cows/800/600?grayscale" 
          alt="Livestock Camera Feed" 
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        
        {/* Controls Overlay */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <button className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm border border-white/10" title="Full Screen">
                <Maximize2 className="w-4 h-4" />
            </button>
             <button className="p-2 bg-black/50 hover:bg-black/70 text-rose-500 rounded-lg backdrop-blur-sm border border-white/10" title="Record">
                <Disc className="w-4 h-4" />
            </button>
             <button className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm border border-white/10" title="Settings">
                <Settings2 className="w-4 h-4" />
            </button>
        </div>

        {/* Simulated AI Overlays (Bounding Boxes) */}
        <div className="absolute top-[30%] left-[20%] w-[15%] h-[20%] border-2 border-emerald-500 rounded opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="absolute -top-7 left-0 bg-emerald-500/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm">
            ID: 1024 • 98%
          </div>
        </div>

        <div className="absolute top-[40%] left-[50%] w-[18%] h-[25%] border-2 border-red-500 rounded opacity-90 animate-pulse">
           <div className="absolute -top-7 left-0 bg-red-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 flex items-center gap-1 rounded-sm shadow-sm">
            <AlertTriangle className="w-3 h-3" />
            Lame: 82%
          </div>
        </div>

        <div className="absolute top-[25%] right-[15%] w-[12%] h-[18%] border-2 border-emerald-500 rounded opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="absolute -top-7 left-0 bg-emerald-500/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm">
            ID: 1042 • 96%
          </div>
        </div>

        {/* HUD Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
           <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-3 border border-white/10 flex justify-between items-center text-xs text-slate-300">
              <div className="flex gap-6">
                  <div className="flex flex-col gap-0.5">
                      <span className="text-slate-400 uppercase text-[9px] font-bold tracking-wider">Detected</span>
                      <span className="font-bold text-white text-base">12</span>
                  </div>
                   <div className="flex flex-col gap-0.5">
                      <span className="text-slate-400 uppercase text-[9px] font-bold tracking-wider">Anomalies</span>
                      <span className="font-bold text-red-400 text-base animate-pulse">1</span>
                  </div>
              </div>
              <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5 text-emerald-400">
                      <Scan className="w-3.5 h-3.5" />
                      <span className="font-medium">Tracking Active</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-1 text-slate-400">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Behavior: <span className="text-white">Analyzing...</span></span>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AICameraFeed;