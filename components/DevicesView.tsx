
import React, { useState } from 'react';
import { Device, DeviceStatus } from '../types';
import { 
    Wifi, 
    WifiOff, 
    Battery, 
    BatteryLow, 
    Server, 
    Camera, 
    Radio, 
    Cpu, 
    AlertTriangle, 
    Wrench,
    Search,
    RefreshCw,
    Calendar,
    MapPin,
    MoreHorizontal
} from 'lucide-react';

interface DevicesViewProps {
  devices: Device[];
}

const DevicesView: React.FC<DevicesViewProps> = ({ devices }) => {
  const [filter, setFilter] = useState<'All' | DeviceStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = devices.filter(d => {
    const matchesFilter = filter === 'All' || d.status === filter;
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'Online').length,
    offline: devices.filter(d => d.status === 'Offline').length,
    maintenance: devices.filter(d => d.status === 'Maintenance').length,
    error: devices.filter(d => d.status === 'Error').length,
    lowBattery: devices.filter(d => d.batteryLevel && d.batteryLevel < 20).length
  };

  const getStatusColor = (status: DeviceStatus) => {
    switch(status) {
        case 'Online': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        case 'Offline': return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
        case 'Maintenance': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
        case 'Error': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
        default: return 'text-slate-400';
    }
  };

  const getDeviceIcon = (type: Device['type']) => {
      switch(type) {
          case 'Camera': return <Camera className="w-5 h-5 text-blue-400" />;
          case 'Sensor': return <Radio className="w-5 h-5 text-emerald-400" />;
          case 'Gateway': return <Cpu className="w-5 h-5 text-indigo-400" />;
          case 'Server': return <Server className="w-5 h-5 text-purple-400" />;
          case 'Controller': return <Wrench className="w-5 h-5 text-orange-400" />;
          default: return <Cpu className="w-5 h-5" />;
      }
  };

  return (
    <div className="space-y-6">
        {/* Status Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Devices</span>
                <div className="flex justify-between items-end mt-2">
                    <span className="text-2xl font-bold text-white">{stats.total}</span>
                    <Cpu className="w-6 h-6 text-slate-500 opacity-50" />
                </div>
            </div>
            
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">System Health</span>
                <div className="flex justify-between items-end mt-2">
                    <span className="text-2xl font-bold text-emerald-400">{((stats.online / stats.total) * 100).toFixed(0)}%</span>
                    <Wifi className="w-6 h-6 text-emerald-500 opacity-50" />
                </div>
                <span className="text-[10px] text-slate-500 mt-1">{stats.online} Online / {stats.offline} Offline</span>
            </div>

            <div className={`bg-slate-800 border rounded-xl p-4 shadow-lg flex flex-col justify-between ${stats.maintenance > 0 ? 'border-yellow-500/30' : 'border-slate-700'}`}>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Maintenance Due</span>
                <div className="flex justify-between items-end mt-2">
                    <span className={`text-2xl font-bold ${stats.maintenance > 0 ? 'text-yellow-400' : 'text-slate-200'}`}>{stats.maintenance}</span>
                    <Wrench className="w-6 h-6 text-yellow-500 opacity-50" />
                </div>
            </div>

            <div className={`bg-slate-800 border rounded-xl p-4 shadow-lg flex flex-col justify-between ${stats.error > 0 || stats.lowBattery > 0 ? 'border-rose-500/30' : 'border-slate-700'}`}>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Critical Attention</span>
                <div className="flex justify-between items-end mt-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-rose-400">{stats.error + stats.lowBattery}</span>
                        <span className="text-xs text-rose-400 font-medium">Alerts</span>
                    </div>
                    <AlertTriangle className="w-6 h-6 text-rose-500 opacity-50" />
                </div>
                <span className="text-[10px] text-slate-500 mt-1">{stats.lowBattery} Low Batt • {stats.error} Errors</span>
            </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search devices by name, ID or location..." 
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="flex gap-2">
                {(['All', 'Online', 'Offline', 'Maintenance', 'Error'] as const).map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                            filter === status 
                            ? 'bg-blue-600 text-white border-blue-500' 
                            : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map(device => (
                <div key={device.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg group hover:border-slate-600 transition-all">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-700/50 flex justify-between items-start">
                        <div className="flex gap-3">
                            <div className={`p-2 rounded-lg bg-slate-900 border border-slate-700`}>
                                {getDeviceIcon(device.type)}
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">{device.name}</h3>
                                <p className="text-xs text-slate-400 font-mono">{device.id}</p>
                            </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusColor(device.status)}`}>
                            {device.status.toUpperCase()}
                        </span>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                             <div className="flex items-center gap-2 text-slate-400">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="text-slate-200">{device.location}</span>
                             </div>
                             <div className="flex items-center gap-2 text-slate-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Install: {device.installDate}</span>
                             </div>
                        </div>

                        {/* Battery Level (if applicable) */}
                        {device.batteryLevel !== undefined && (
                            <div className="bg-slate-900/50 rounded-lg p-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    {device.batteryLevel < 20 ? <BatteryLow className="w-4 h-4 text-rose-500" /> : <Battery className="w-4 h-4 text-emerald-500" />}
                                    <span>Battery Level</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${device.batteryLevel < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                            style={{ width: `${device.batteryLevel}%` }}
                                        ></div>
                                    </div>
                                    <span className={`text-xs font-mono font-bold ${device.batteryLevel < 20 ? 'text-rose-400' : 'text-slate-200'}`}>
                                        {device.batteryLevel}%
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Issues / Maintenance */}
                        {(device.issues && device.issues.length > 0) || device.maintenanceDue ? (
                            <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 space-y-1">
                                {device.issues?.map((issue, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-rose-400 font-medium">
                                        <AlertTriangle className="w-3 h-3" />
                                        {issue}
                                    </div>
                                ))}
                                {device.maintenanceDue && (
                                     <div className="flex items-center gap-2 text-xs text-yellow-400 font-medium">
                                        <Wrench className="w-3 h-3" />
                                        Maint. Due: {device.maintenanceDue}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-[2px] bg-slate-700/30 w-full rounded my-4"></div>
                        )}

                         {/* Footer info */}
                         <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                            <span className="flex items-center gap-1">
                                <RefreshCw className="w-3 h-3" />
                                Last ping: {device.lastPing}
                            </span>
                            <span>FW: {device.firmware}</span>
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-slate-900/50 p-2 border-t border-slate-700 flex justify-between items-center">
                         <button className="text-xs font-medium text-blue-400 hover:text-white px-3 py-1.5 rounded hover:bg-slate-700 transition-colors">
                            View Logs
                         </button>
                         <button className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-700">
                             <MoreHorizontal className="w-4 h-4" />
                         </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default DevicesView;
