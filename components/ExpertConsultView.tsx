import React from 'react';
import { Phone, Video, MessageSquare, Star, Clock, CheckCircle, FileText, AlertTriangle, ChevronRight, Stethoscope, ShieldAlert } from 'lucide-react';
import { Expert, Consultation } from '../types';

interface ExpertConsultViewProps {
  experts: Expert[];
  consultations: Consultation[];
  onChatStart: (expert: Expert) => void;
}

const ExpertConsultView: React.FC<ExpertConsultViewProps> = ({ experts, consultations, onChatStart }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        
        {/* Left Column: Available Experts */}
        <div className="xl:col-span-2 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
            
            {/* AI Triage Queue (Active Alerts needing Expert) */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <ShieldAlert className="w-32 h-32 text-rose-500" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        AI Triage Queue
                        <span className="text-xs font-normal text-slate-400 ml-2 border-l border-slate-600 pl-2">System detected anomalies requiring expert review</span>
                    </h3>
                    
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        <div className="min-w-[300px] bg-slate-900/80 border border-slate-600 rounded-lg p-4 flex flex-col gap-3">
                             <div className="flex justify-between items-start">
                                <span className="text-xs font-bold bg-rose-500/20 text-rose-400 px-2 py-1 rounded border border-rose-500/20">CRITICAL</span>
                                <span className="text-xs text-slate-500">10 mins ago</span>
                             </div>
                             <div>
                                 <h4 className="text-sm font-bold text-white">Sudden Mortality Risk</h4>
                                 <p className="text-xs text-slate-400 mt-1">Pig #442 inactive &gt; 4hrs, Body Temp 35°C (Hypothermia).</p>
                             </div>
                             <div className="mt-auto pt-3 border-t border-slate-700 flex gap-2">
                                 <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium py-2 rounded transition-colors flex items-center justify-center gap-2">
                                     <Video className="w-3 h-3" /> Call Vet
                                 </button>
                                 <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium py-2 rounded transition-colors">
                                     Send Data
                                 </button>
                             </div>
                        </div>

                        <div className="min-w-[300px] bg-slate-900/80 border border-slate-600 rounded-lg p-4 flex flex-col gap-3">
                             <div className="flex justify-between items-start">
                                <span className="text-xs font-bold bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/20">WARNING</span>
                                <span className="text-xs text-slate-500">45 mins ago</span>
                             </div>
                             <div>
                                 <h4 className="text-sm font-bold text-white">Biosecurity Breach?</h4>
                                 <p className="text-xs text-slate-400 mt-1">Unidentified person detected near Isolation Barn B.</p>
                             </div>
                             <div className="mt-auto pt-3 border-t border-slate-700 flex gap-2">
                                 <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium py-2 rounded transition-colors flex items-center justify-center gap-2">
                                     <Video className="w-3 h-3" /> Consult Expert
                                 </button>
                                 <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium py-2 rounded transition-colors">
                                     View Footage
                                 </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expert List */}
            <div>
                 <h3 className="text-lg font-bold text-white mb-4">Available Experts</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experts.map(expert => (
                        <div key={expert.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg hover:border-slate-600 transition-all group">
                            <div className="flex gap-4">
                                <div className="relative">
                                    <img src={expert.imageUrl} alt={expert.name} className="w-16 h-16 rounded-xl object-cover" />
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-slate-800 rounded-full ${
                                        expert.status === 'Online' ? 'bg-emerald-500' :
                                        expert.status === 'Busy' ? 'bg-amber-500' : 'bg-slate-500'
                                    }`}></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white">{expert.name}</h4>
                                    <p className="text-xs text-blue-400 font-medium mb-1">{expert.role}</p>
                                    <p className="text-xs text-slate-400 mb-2">{expert.specialization}</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-bold text-slate-200">{expert.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <button 
                                    onClick={() => onChatStart(expert)}
                                    className="col-span-1 bg-slate-700 hover:bg-slate-600 text-slate-200 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                >
                                    <MessageSquare className="w-3.5 h-3.5" /> Chat
                                </button>
                                <button className="col-span-2 bg-blue-600 hover:bg-blue-500 text-white py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors">
                                    <Video className="w-3.5 h-3.5" /> Start Video Call
                                </button>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

        </div>

        {/* Right Column: Diagnosis & Protocols Feed */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-700 bg-slate-900/50">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    Diagnosis & Protocols
                </h3>
                <p className="text-xs text-slate-400 mt-1">Reports and instructions received from specialists</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {consultations.map((consult) => (
                    <div key={consult.id} className="bg-slate-700/30 border border-slate-700 rounded-xl p-4 hover:bg-slate-700/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-2">
                                {consult.status === 'Resolved' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                {consult.status === 'In Progress' && <Clock className="w-4 h-4 text-amber-500" />}
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                                    consult.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}>{consult.status}</span>
                             </div>
                             <span className="text-[10px] text-slate-500">{consult.date.split(' ')[0]}</span>
                        </div>
                        
                        <h4 className="text-sm font-bold text-white mb-1">{consult.subject}</h4>
                        <div className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                            <Stethoscope className="w-3 h-3" />
                            {consult.expertName}
                        </div>

                        {consult.diagnosis && (
                            <div className="bg-slate-900/50 rounded-lg p-3 mb-3 border border-slate-700/50">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Diagnosis</span>
                                <p className="text-xs text-slate-300 font-medium">{consult.diagnosis}</p>
                            </div>
                        )}

                        {consult.protocol && (
                             <div className="bg-indigo-500/10 rounded-lg p-3 border border-indigo-500/20">
                                <span className="text-[10px] uppercase font-bold text-indigo-400 mb-2 block">Action Protocol</span>
                                <ul className="space-y-1.5">
                                    {consult.protocol.map((step, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                                            <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[9px] flex-shrink-0 mt-0.5">{idx + 1}</span>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-between items-center">
                             <span className="text-[10px] text-slate-500">Data: {consult.attachedData}</span>
                             <button className="text-blue-400 hover:text-white text-xs font-medium flex items-center gap-1">
                                 Full Report <ChevronRight className="w-3 h-3" />
                             </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-4 border-t border-slate-700 bg-slate-900/30">
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg text-xs font-medium border border-slate-700 transition-colors">
                    View Consultation Archive
                </button>
            </div>
        </div>
    </div>
  );
};

export default ExpertConsultView;