import React, { useState } from 'react';
import { LivestockData, HealthStatus } from '../types';
import { Search, Filter, AlertTriangle, CheckCircle, HeartPulse, MoreHorizontal } from 'lucide-react';

interface LivestockHealthViewProps {
  data: LivestockData[];
}

const LivestockHealthView: React.FC<LivestockHealthViewProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredData = data.filter(animal => {
    const matchesSearch = animal.tagId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          animal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'ALL' || animal.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by Tag ID or System ID..." 
            className="w-full bg-slate-900 border border-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
            {(['ALL', HealthStatus.HEALTHY, HealthStatus.WARNING, HealthStatus.CRITICAL] as const).map(status => (
                <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        statusFilter === status 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Animal ID</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Temperature</th>
                <th className="p-4 font-semibold">Heart Rate</th>
                <th className="p-4 font-semibold">Activity</th>
                <th className="p-4 font-semibold">Last Update</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-700/50">
              {filteredData.map((animal) => (
                <tr key={animal.id} className="hover:bg-slate-700/30 transition-colors group">
                  <td className="p-4 font-medium text-white flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        {animal.type[0]}
                    </span>
                    <div>
                        <div>{animal.tagId}</div>
                        <div className="text-[10px] text-slate-500">{animal.id}</div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{animal.type}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      animal.status === HealthStatus.CRITICAL ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                      animal.status === HealthStatus.WARNING ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {animal.status === HealthStatus.CRITICAL && <AlertTriangle className="w-3 h-3" />}
                      {animal.status === HealthStatus.WARNING && <HeartPulse className="w-3 h-3" />}
                      {animal.status === HealthStatus.HEALTHY && <CheckCircle className="w-3 h-3" />}
                      {animal.status}
                    </span>
                  </td>
                  <td className="p-4">
                      <div className="flex items-center gap-2">
                          <span className={`font-mono font-medium ${animal.temperature > 39 ? 'text-rose-400' : 'text-slate-200'}`}>
                              {animal.temperature.toFixed(1)}°C
                          </span>
                      </div>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{animal.heartRate} bpm</td>
                  <td className="p-4">
                    <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${animal.activityLevel < 30 ? 'bg-rose-500' : 'bg-blue-500'}`}
                            style={{ width: `${animal.activityLevel}%` }}
                        ></div>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">{animal.activityLevel}%</span>
                  </td>
                  <td className="p-4 text-slate-400 font-mono text-xs">{animal.lastUpdate}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
            <div className="p-12 text-center text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No animals found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default LivestockHealthView;