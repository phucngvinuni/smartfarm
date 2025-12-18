import React from 'react';
import EnvironmentCharts from './EnvironmentCharts';
import { EnvironmentData } from '../types';
import { Wind, Droplets, Thermometer, AlertCircle, Fan, Sun } from 'lucide-react';

interface EnvironmentViewProps {
  data: EnvironmentData[];
}

const EnvironmentView: React.FC<EnvironmentViewProps> = ({ data }) => {
  const current = data[data.length - 1] || { temperature: 0, humidity: 0, co2: 0, nh3: 0 };

  return (
    <div className="space-y-6">
      {/* Zone Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Barn A */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Fan className="w-24 h-24 text-blue-500" />
            </div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white text-lg">Barn A</h3>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-2 py-1 rounded">OPTIMAL</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-slate-400 text-xs block mb-1">Temp</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Thermometer className="w-4 h-4 text-orange-400" />
                        {current.temperature.toFixed(1)}°
                    </span>
                </div>
                <div>
                    <span className="text-slate-400 text-xs block mb-1">Humidity</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        {current.humidity.toFixed(0)}%
                    </span>
                </div>
                <div>
                    <span className="text-slate-400 text-xs block mb-1">NH3</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Wind className="w-4 h-4 text-slate-400" />
                        12ppm
                    </span>
                </div>
                <div>
                    <span className="text-slate-400 text-xs block mb-1">Light</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Sun className="w-4 h-4 text-yellow-400" />
                        320lx
                    </span>
                </div>
            </div>
        </div>

        {/* Barn B */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Fan className="w-24 h-24 text-yellow-500" />
            </div>
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white text-lg">Barn B</h3>
                <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> WARNING
                </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-slate-400 text-xs block mb-1">Temp</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Thermometer className="w-4 h-4 text-orange-400" />
                        {(current.temperature + 1.2).toFixed(1)}°
                    </span>
                </div>
                <div>
                    <span className="text-slate-400 text-xs block mb-1">Humidity</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        {(current.humidity + 5).toFixed(0)}%
                    </span>
                </div>
                <div>
                    <span className="text-slate-400 text-xs block mb-1">NH3</span>
                    <span className="text-xl font-mono text-yellow-400 flex items-center gap-1">
                        <Wind className="w-4 h-4" />
                        {(current.nh3 + 15).toFixed(0)}ppm
                    </span>
                </div>
                 <div>
                    <span className="text-slate-400 text-xs block mb-1">Light</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Sun className="w-4 h-4 text-yellow-400" />
                        290lx
                    </span>
                </div>
            </div>
        </div>

        {/* Pasture / Outdoor */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sun className="w-24 h-24 text-orange-500" />
            </div>
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white text-lg">Outdoors</h3>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold px-2 py-1 rounded">CLEAR</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-slate-400 text-xs block mb-1">Temp</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Thermometer className="w-4 h-4 text-orange-400" />
                        32.5°
                    </span>
                </div>
                <div>
                    <span className="text-slate-400 text-xs block mb-1">Humidity</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        45%
                    </span>
                </div>
                <div>
                    <span className="text-slate-400 text-xs block mb-1">Wind</span>
                    <span className="text-xl font-mono text-white flex items-center gap-1">
                        <Wind className="w-4 h-4 text-slate-400" />
                        12km/h
                    </span>
                </div>
                 <div>
                    <span className="text-slate-400 text-xs block mb-1">UV Index</span>
                    <span className="text-xl font-mono text-orange-400 flex items-center gap-1">
                        <Sun className="w-4 h-4" />
                        High (8)
                    </span>
                </div>
            </div>
        </div>
      </div>

      <div className="h-[500px]">
        <EnvironmentCharts data={data} />
      </div>
    </div>
  );
};

export default EnvironmentView;