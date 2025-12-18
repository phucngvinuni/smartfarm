import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle, Bell, Filter, X } from 'lucide-react';
import { Alert } from '../types';

interface AlertListProps {
  alerts: Alert[];
}

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-500" />
          Alerts
        </h3>
        <div className="flex gap-2">
            <button className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
            </button>
            <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center min-w-[24px]">{alerts.length}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`group relative p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
              alert.severity === 'high' 
                ? 'bg-gradient-to-r from-rose-500/10 to-transparent border-rose-500/20 hover:border-rose-500/40' 
                : alert.severity === 'medium'
                ? 'bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/20 hover:border-amber-500/40'
                : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
            }`}
          >
            <button className="absolute top-2 right-2 p-1 text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3.5 h-3.5" />
            </button>
            
            <div className="flex gap-3">
                <div className="mt-1 flex-shrink-0">
                {alert.severity === 'high' && <AlertTriangle className="w-5 h-5 text-rose-500" />}
                {alert.severity === 'medium' && <AlertCircle className="w-5 h-5 text-amber-500" />}
                {alert.severity === 'low' && <CheckCircle className="w-5 h-5 text-slate-400" />}
                </div>
                <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 pr-4">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                        alert.severity === 'high' ? 'text-rose-400 border-rose-400/30 bg-rose-400/10' :
                        alert.severity === 'medium' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' :
                        'text-slate-400 border-slate-400/30 bg-slate-400/10'
                    }`}>
                        {alert.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-slate-200 leading-snug font-medium">{alert.message}</p>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    <span>Source: <span className="text-slate-300">{alert.source}</span></span>
                </div>
                </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-slate-700 bg-slate-800/50">
          <button className="w-full py-2 text-sm text-center text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all font-medium border border-transparent hover:border-slate-700">
              View all alert history
          </button>
      </div>
    </div>
  );
};

export default AlertList;