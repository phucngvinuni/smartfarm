import React, { useState } from 'react';
import { 
    QrCode, 
    ShieldCheck, 
    Calendar, 
    Syringe, 
    FileText, 
    Share2, 
    Download, 
    Search,
    ChevronRight,
    Award
} from 'lucide-react';
import { LivestockData } from '../types';

const mockPassportData = {
    id: "PASS-VN-2025-8821",
    issueDate: "2025-01-15",
    animalId: "VN-1024",
    breed: "Landrace x Yorkshire",
    dob: "2024-11-02",
    farm: "Aura Model Farm A",
    owner: "Nguyen Van A",
    vaccines: [
        { date: "2024-11-15", name: "FMD Type O", batch: "BATCH-99", vet: "Dr. Sarah Nguyen" },
        { date: "2024-12-01", name: "PRRS Live", batch: "PRRS-221", vet: "Dr. Sarah Nguyen" },
        { date: "2025-01-10", name: "CSF (Hog Cholera)", batch: "CSF-882", vet: "Dr. Michael Chen" },
    ],
    feedHistory: "Organic Corn Mix (GreenFields Co.)",
    healthStatus: "Grade A - Export Quality"
};

const HealthPassportView: React.FC = () => {
    const [selectedId, setSelectedId] = useState("VN-1024");
    const [isGenerating, setIsGenerating] = useState(false);

    const handlePrint = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Selector & List */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <Search className="w-5 h-5 text-blue-500" />
                        Find Livestock
                    </h3>
                    <input 
                        type="text" 
                        placeholder="Search Tag ID (e.g., VN-1024)..."
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                    />
                    
                    <div className="space-y-2">
                        {['VN-1024', 'VN-1025', 'VN-1055', 'VN-1089'].map(id => (
                            <div 
                                key={id}
                                onClick={() => setSelectedId(id)}
                                className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center transition-all ${
                                    selectedId === id 
                                    ? 'bg-blue-600/20 border-blue-500 text-white' 
                                    : 'bg-slate-700/30 border-slate-700 text-slate-400 hover:bg-slate-700'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center font-bold text-xs">
                                        PIG
                                    </div>
                                    <span className="font-mono font-medium">#{id}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 opacity-50" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-xl p-6 text-center">
                    <Award className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">Premium Traceability</h3>
                    <p className="text-sm text-indigo-200 mb-4">
                        Animals with digital passports sell for <strong>15-20% higher</strong> prices at processing plants.
                    </p>
                    <button className="text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                        Learn about Export Standards
                    </button>
                </div>
            </div>

            {/* Right: The Passport Card */}
            <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <QrCode className="w-7 h-7 text-white" />
                        Digital Health Passport
                    </h2>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            <Share2 className="w-4 h-4" /> Share Link
                        </button>
                        <button 
                            onClick={handlePrint}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            {isGenerating ? 'Generating...' : <><Download className="w-4 h-4" /> Download PDF</>}
                        </button>
                    </div>
                </div>

                {/* VISUAL PASSPORT CARD */}
                <div className="relative w-full max-w-2xl mx-auto perspective-1000">
                    <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl relative">
                        {/* Header Stripe */}
                        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-10 h-10" />
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight uppercase">Health Passport</h1>
                                    <p className="text-xs opacity-80 uppercase tracking-widest">Livestock Registry</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs opacity-70">Passport No.</div>
                                <div className="font-mono font-bold text-lg">{mockPassportData.id}</div>
                            </div>
                        </div>

                        {/* Body Content */}
                        <div className="p-8 grid grid-cols-3 gap-8">
                            {/* QR Code Section */}
                            <div className="col-span-1 flex flex-col items-center justify-center border-r border-slate-200 pr-6">
                                <div className="bg-white p-2 border-4 border-slate-900 rounded-lg mb-4">
                                     {/* Mock QR */}
                                     <svg viewBox="0 0 100 100" className="w-32 h-32" fill="currentColor">
                                        <rect x="0" y="0" width="100" height="100" fill="white" />
                                        <path d="M10 10h30v30h-30z M60 10h30v30h-30z M10 60h30v30h-30z M50 10h10v10h-10z M60 50h10v10h-10z M20 20h10v10h-10z M70 20h10v10h-10z M20 70h10v10h-10z" fill="black" />
                                        <path d="M45 45h10v10h-10z M55 55h10v10h-10z M80 80h10v10h-10z" fill="black" />
                                     </svg>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono text-center">Scan for Blockchain Verification</span>
                                <span className="mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                                    VERIFIED
                                </span>
                            </div>

                            {/* Details Section */}
                            <div className="col-span-2 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] uppercase text-slate-500 font-bold">Animal ID</label>
                                        <div className="font-bold text-xl">{mockPassportData.animalId}</div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase text-slate-500 font-bold">Date of Birth</label>
                                        <div className="font-medium">{mockPassportData.dob}</div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase text-slate-500 font-bold">Breed</label>
                                        <div className="font-medium">{mockPassportData.breed}</div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase text-slate-500 font-bold">Farm Origin</label>
                                        <div className="font-medium">{mockPassportData.farm}</div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <label className="text-[10px] uppercase text-slate-500 font-bold mb-2 flex items-center gap-1">
                                        <Syringe className="w-3 h-3" /> Recent Immunization
                                    </label>
                                    <div className="space-y-2">
                                        {mockPassportData.vaccines.map((vax, idx) => (
                                            <div key={idx} className="flex justify-between text-xs border-b border-slate-50 pb-1 last:border-0">
                                                <span className="font-medium">{vax.name}</span>
                                                <span className="text-slate-500">{vax.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Hologram Effect */}
                        <div className="h-4 bg-gradient-to-r from-emerald-300 via-emerald-100 to-emerald-300 opacity-50"></div>
                    </div>
                    
                    {/* Shadow effect */}
                    <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/40 blur-xl -z-10 rounded-full"></div>
                </div>

                <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-slate-400" />
                        Detailed Medical History
                    </h4>
                    <div className="relative pl-4 border-l-2 border-slate-700 space-y-6">
                        {/* Timeline Item */}
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
                            <div className="text-sm font-bold text-white">Export Quality Certification</div>
                            <div className="text-xs text-slate-400">2025-01-20 • Aura System AI Analysis</div>
                            <p className="text-xs text-slate-300 mt-1">
                                Animal met all weight, health, and biosecurity parameters for export grade classification.
                            </p>
                        </div>
                         {/* Timeline Item */}
                         <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-800"></div>
                            <div className="text-sm font-bold text-white">Routine Checkup</div>
                            <div className="text-xs text-slate-400">2024-12-15 • Dr. Sarah Nguyen</div>
                            <p className="text-xs text-slate-300 mt-1">
                                General health check passed. Weight gain trajectory optimal.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthPassportView;