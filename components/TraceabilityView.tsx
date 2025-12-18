import React from 'react';
import { Box, Link, CheckCircle, FileCheck, Truck, Syringe, Wheat, Search } from 'lucide-react';

const TraceabilityView: React.FC = () => {
  return (
    <div className="space-y-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                     <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Link className="w-6 h-6 text-indigo-500" />
                        Blockchain Traceability Ledger
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">Immutable record of livestock lifecycle events.</p>
                </div>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Verify Hash or Tag ID..." 
                        className="bg-slate-900 border border-slate-700 text-slate-200 pl-4 pr-10 py-2 rounded-lg w-64 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                </div>
            </div>

            {/* Timeline for a specific animal example */}
            <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700"></div>
                
                <div className="space-y-8">
                    {/* Event 1 */}
                    <div className="relative flex items-start group">
                        <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500 z-10"></div>
                        <div className="ml-16 w-full">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                <span className="text-sm font-mono text-slate-400">2025-10-24 08:30:00</span>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                                    <CheckCircle className="w-3 h-3" /> VERIFIED
                                </span>
                            </div>
                            <div className="bg-slate-700/30 border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                                        <Syringe className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h4 className="font-bold text-white">Vaccination Record Created</h4>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="block text-slate-500 text-xs">Animal ID</span>
                                        <span className="text-slate-300 font-mono">VN-1024</span>
                                    </div>
                                     <div>
                                        <span className="block text-slate-500 text-xs">Vaccine</span>
                                        <span className="text-slate-300">FMD-Vax Type O</span>
                                    </div>
                                     <div>
                                        <span className="block text-slate-500 text-xs">Batch No</span>
                                        <span className="text-slate-300 font-mono">BATCH-992</span>
                                    </div>
                                     <div>
                                        <span className="block text-slate-500 text-xs">Tx Hash</span>
                                        <span className="text-indigo-400 font-mono text-xs cursor-pointer hover:underline">0x8f...2a91</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Event 2 */}
                    <div className="relative flex items-start group">
                        <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 z-10"></div>
                        <div className="ml-16 w-full">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                <span className="text-sm font-mono text-slate-400">2025-10-23 14:15:00</span>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                                    <CheckCircle className="w-3 h-3" /> VERIFIED
                                </span>
                            </div>
                            <div className="bg-slate-700/30 border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                        <Wheat className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-white">Feed Batch Consumption</h4>
                                </div>
                                <p className="text-sm text-slate-400 mb-2">Organic Corn Mix - Supplier: GreenFields Co.</p>
                                <div className="text-xs text-indigo-400 font-mono cursor-pointer hover:underline">
                                    Tx: 0x3c...b210
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Event 3 */}
                    <div className="relative flex items-start group">
                         <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-500 z-10"></div>
                        <div className="ml-16 w-full">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                <span className="text-sm font-mono text-slate-400">2025-10-20 09:00:00</span>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                                    <CheckCircle className="w-3 h-3" /> VERIFIED
                                </span>
                            </div>
                            <div className="bg-slate-700/30 border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-slate-500/20 rounded-lg">
                                        <FileCheck className="w-5 h-5 text-slate-300" />
                                    </div>
                                    <h4 className="font-bold text-white">Health Certificate Issued</h4>
                                </div>
                                <p className="text-sm text-slate-400 mb-2">Monthly Vet Checkup - Status: Healthy</p>
                                <div className="text-xs text-indigo-400 font-mono cursor-pointer hover:underline">
                                    Tx: 0xa1...99cf
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-5 shadow-lg text-white">
                <Box className="w-8 h-8 mb-3 opacity-80" />
                <h4 className="text-2xl font-bold mb-1">14,205</h4>
                <p className="text-indigo-200 text-sm">Total Blocks Mined</p>
            </div>
             <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
                <h4 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Last Sync</h4>
                <div className="text-xl font-mono text-white">Just now</div>
                <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Node Active
                </div>
            </div>
             <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
                <h4 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Smart Contracts</h4>
                <div className="text-xl font-mono text-white">12 Active</div>
                <div className="text-xs text-slate-500 mt-2">v2.1.0 Deployed</div>
            </div>
        </div>
    </div>
  );
};

export default TraceabilityView;