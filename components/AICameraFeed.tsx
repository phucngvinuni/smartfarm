import React, { useState, useEffect, useRef } from 'react';
import { Camera, Scan, Activity, AlertTriangle, Maximize2, MoreVertical, Disc, Settings2, ChevronDown, Eye, EyeOff, Moon, Sun } from 'lucide-react';

// Define interface for camera objects
interface CameraData {
  id: string;
  name: string;
  status: string;
  embedSrc?: string;
  url?: string;
  type: string;
  stats: { detected: number; sick: number };
}

// Define available cameras
const CAMERAS: CameraData[] = [
  {
    id: 'cam-01',
    name: 'Zone B - Chickens',
    status: 'Live',
    embedSrc: 'https://player.cloudinary.com/embed/?cloud_name=ddm2hzdhy&public_id=Tracker_Distance_Measure_2_fdmpw8&autoplay=true&autoplay_mode=on-scroll&muted=true&loop=true&controls=false&control_bar[volumePanel]=false',
    type: 'Chicken',
    stats: { detected: 35, sick: 2 }
  },
  {
    id: 'cam-02',
    name: 'Zone A - Dairy Cows',
    status: 'Live',
    embedSrc: 'https://player.cloudinary.com/embed/?cloud_name=ddm2hzdhy&public_id=AI_based_animal_behaviour_analysis_-_Dadong_Wang_720p_h264_nwc7t3&autoplay=true&autoplay_mode=on-scroll&muted=true&loop=true&controls=false&control_bar[volumePanel]=false&control_bar[fullscreenToggle]=false',
    type: 'Cow',
    stats: { detected: 8, sick: 0 }
  },
  {
    id: 'cam-03',
    name: 'Zone C - Entry Gate',
    status: 'Live',
    embedSrc: 'https://player.cloudinary.com/embed/?cloud_name=ddm2hzdhy&public_id=1220_eqaghk&autoplay=true&autoplay_mode=on-scroll&muted=true&loop=true&controls=false&control_bar[volumePanel]=false&control_bar[fullscreenToggle]=false',
    type: 'Cow',
    stats: { detected: 42, sick: 0 }
  },
  {
    id: 'cam-04',
    name: 'Zone C - Pigs',
    status: 'Live',
    embedSrc: 'https://player.cloudinary.com/embed/?cloud_name=ddm2hzdhy&public_id=1219_1_bzdacc&autoplay=true&autoplay_mode=on-scroll&muted=true&loop=true&controls=false&control_bar[volumePanel]=false&control_bar[fullscreenToggle]=false',
    type: 'Pig',
    stats: { detected: 18, sick: 1 }
  }
];

const AICameraFeed: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [activeCameraId, setActiveCameraId] = useState(CAMERAS[0].id);
  const [isNightVision, setIsNightVision] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeCamera = CAMERAS.find(c => c.id === activeCameraId) || CAMERAS[0];

  useEffect(() => {
    if (videoRef.current && activeCamera.url) {
        videoRef.current.load();
    }
  }, [activeCameraId, activeCamera]);

  return (
    <div 
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm dark:shadow-lg flex flex-col h-full group/card relative z-0"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
          setIsHovering(false);
          setIsMenuOpen(false);
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-20 relative">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Camera className={`w-5 h-5 ${isNightVision ? 'text-emerald-500' : 'text-purple-500'}`} />
            <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                {activeCamera.name}
                <ChevronDown className="w-3 h-3 text-slate-400" />
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-wider">ID: {activeCamera.id.toUpperCase()}</span>
            </div>
        </div>

        {/* Camera Dropdown */}
        {isMenuOpen && (
            <div className="absolute top-full left-4 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                {CAMERAS.map(cam => (
                    <button
                        key={cam.id}
                        onClick={() => {
                            setActiveCameraId(cam.id);
                            setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${activeCameraId === cam.id ? 'bg-blue-50 dark:bg-slate-700/50 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}
                    >
                        {cam.name}
                        {activeCameraId === cam.id && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                    </button>
                ))}
            </div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              LIVE
            </span>
          </div>
          <button 
            onClick={() => setIsNightVision(!isNightVision)}
            className={`p-1.5 rounded-lg transition-colors ${isNightVision ? 'bg-emerald-500/20 text-emerald-500 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            title="Toggle Night Vision"
          >
            {isNightVision ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Video Area */}
      <div className="relative flex-1 bg-black group overflow-hidden">
        
        {activeCamera.embedSrc ? (
            <iframe
                src={activeCamera.embedSrc}
                className={`w-full h-full object-cover border-0 transition-all duration-700 ${
                     isNightVision ? 'grayscale sepia-[.5] hue-rotate-[90deg] contrast-[1.2] brightness-[1.1] saturate-[300%]' : ''
                }`}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
            />
        ) : (
            <video 
                ref={videoRef}
                src={activeCamera.url}
                autoPlay
                muted
                loop
                playsInline
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-105 ${
                    isNightVision ? 'grayscale sepia-[.5] hue-rotate-[90deg] contrast-[1.2] brightness-[1.1] saturate-[300%]' : 'opacity-90'
                }`}
            />
        )}
        
        {isNightVision && (
            <div className="absolute inset-0 pointer-events-none z-10 opacity-20" style={{
                backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 20, 0, 0.5) 50%)',
                backgroundSize: '100% 4px'
            }}></div>
        )}

        {!activeCamera.embedSrc && (
            <div className="absolute top-4 left-4 font-mono text-xs text-white/80 z-10 bg-black/20 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                {new Date().toLocaleDateString()} <span className="text-emerald-400">{new Date().toLocaleTimeString()}</span>
            </div>
        )}
        
        {/* Controls Overlay */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 z-20 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
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

        {/* HUD Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
           <div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-md rounded-lg p-3 border border-slate-200 dark:border-white/10 flex justify-between items-center text-xs text-slate-700 dark:text-slate-300">
              <div className="flex gap-6">
                  <div className="flex flex-col gap-0.5">
                      <span className="text-slate-500 dark:text-slate-400 uppercase text-[9px] font-bold tracking-wider">Detected</span>
                      <span className="font-bold text-slate-900 dark:text-white text-base">{activeCamera.stats.detected}</span>
                  </div>
                   <div className="flex flex-col gap-0.5">
                      <span className="text-slate-500 dark:text-slate-400 uppercase text-[9px] font-bold tracking-wider">Anomalies</span>
                      <span className={`font-bold text-base ${activeCamera.stats.sick > 0 ? 'text-red-500 dark:text-red-400 animate-pulse' : 'text-emerald-500 dark:text-emerald-400'}`}>
                          {activeCamera.stats.sick}
                      </span>
                  </div>
              </div>
              <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Scan className="w-3.5 h-3.5" />
                      <span className="font-medium">Tracking Active</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-1 text-slate-500 dark:text-slate-400">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Processing: <span className="text-slate-900 dark:text-white">14ms</span></span>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AICameraFeed;