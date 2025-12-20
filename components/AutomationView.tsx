import React, { useState } from 'react';
import { 
    Zap, 
    Plus, 
    Trash2, 
    Thermometer, 
    Droplets, 
    Wind, 
    Clock, 
    ArrowRight, 
    Fan, 
    Lightbulb, 
    Power,
    Check,
    Bell,
    Smartphone
} from 'lucide-react';

interface AutomationRule {
    id: string;
    name: string;
    isEnabled: boolean;
    trigger: {
        type: 'Temperature' | 'Humidity' | 'NH3' | 'Time' | 'Manual';
        operator: '>' | '<' | '=' | 'At';
        value: string;
        source?: string;
    };
    action: {
        type: 'Device' | 'Notification';
        target: string;
        state: 'On' | 'Off' | 'Level 1' | 'Level 2' | 'Send Alert';
    };
    lastTriggered?: string;
}

const AutomationView: React.FC = () => {
    const [rules, setRules] = useState<AutomationRule[]>([
        {
            id: '1',
            name: 'High Temp Cooling - Barn A',
            isEnabled: true,
            trigger: { type: 'Temperature', operator: '>', value: '32°C', source: 'Barn A Sensor' },
            action: { type: 'Device', target: 'Barn A Fan System', state: 'Level 2' },
            lastTriggered: 'Today, 10:15 AM'
        },
        {
            id: '2',
            name: 'Night Lighting Schedule',
            isEnabled: true,
            trigger: { type: 'Time', operator: 'At', value: '18:00', source: 'System Clock' },
            action: { type: 'Device', target: 'Perimeter Lights', state: 'On' },
            lastTriggered: 'Yesterday, 06:00 PM'
        },
        {
            id: '3',
            name: 'NH3 Emergency Vent',
            isEnabled: false,
            trigger: { type: 'NH3', operator: '>', value: '25ppm', source: 'Barn B Sensor' },
            action: { type: 'Device', target: 'Exhaust Fans', state: 'On' },
        }
    ]);

    const [isCreating, setIsCreating] = useState(false);

    const toggleRule = (id: string) => {
        setRules(rules.map(r => r.id === id ? { ...r, isEnabled: !r.isEnabled } : r));
    };

    const deleteRule = (id: string) => {
        setRules(rules.filter(r => r.id !== id));
    };

    const getIconForType = (type: string) => {
        switch(type) {
            case 'Temperature': return <Thermometer className="w-4 h-4 text-orange-400" />;
            case 'Humidity': return <Droplets className="w-4 h-4 text-blue-400" />;
            case 'NH3': return <Wind className="w-4 h-4 text-slate-400" />;
            case 'Time': return <Clock className="w-4 h-4 text-purple-400" />;
            default: return <Zap className="w-4 h-4" />;
        }
    };

    const getActionIcon = (target: string) => {
        if (target.toLowerCase().includes('fan')) return <Fan className="w-4 h-4 text-blue-400" />;
        if (target.toLowerCase().includes('light')) return <Lightbulb className="w-4 h-4 text-yellow-400" />;
        return <Power className="w-4 h-4 text-slate-400" />;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-4 w-full md:w-auto">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                        <Zap className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Smart Automation Hub</h3>
                        <p className="text-xs text-slate-400">Automate device actions based on sensor data</p>
                    </div>
                </div>

                <button 
                    onClick={() => setIsCreating(!isCreating)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 w-full md:w-auto justify-center"
                >
                    <Plus className="w-5 h-5" />
                    Create New Rule
                </button>
            </div>

            {/* Rule Creator (Mock UI) */}
            {isCreating && (
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl animate-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold text-white mb-4">Configure Logic</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        
                        {/* IF Section */}
                        <div className="flex-1 bg-slate-900/50 p-4 rounded-lg border border-slate-700 w-full">
                            <span className="text-xs font-bold text-orange-400 uppercase mb-2 block">IF (Trigger)</span>
                            <div className="flex gap-2 mb-2">
                                <select className="bg-slate-800 border border-slate-600 text-white text-sm rounded p-2 flex-1">
                                    <option>Temperature</option>
                                    <option>Humidity</option>
                                    <option>NH3 Level</option>
                                    <option>Time of Day</option>
                                </select>
                                <select className="bg-slate-800 border border-slate-600 text-white text-sm rounded p-2 w-20">
                                    <option>{'>'}</option>
                                    <option>{'<'}</option>
                                    <option>{'='}</option>
                                </select>
                            </div>
                            <input type="text" placeholder="Value (e.g. 35)" className="bg-slate-800 border border-slate-600 text-white text-sm rounded p-2 w-full" />
                        </div>

                        <ArrowRight className="w-6 h-6 text-slate-500 rotate-90 md:rotate-0" />

                        {/* THEN Section */}
                        <div className="flex-1 bg-slate-900/50 p-4 rounded-lg border border-slate-700 w-full">
                            <span className="text-xs font-bold text-emerald-400 uppercase mb-2 block">THEN (Action)</span>
                             <select className="bg-slate-800 border border-slate-600 text-white text-sm rounded p-2 w-full mb-2">
                                <option>Barn A Fan System</option>
                                <option>Water Pump</option>
                                <option>Perimeter Lights</option>
                                <option>Send Notification</option>
                            </select>
                             <select className="bg-slate-800 border border-slate-600 text-white text-sm rounded p-2 w-full">
                                <option>Turn On</option>
                                <option>Turn Off</option>
                                <option>Set Speed High</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button 
                            onClick={() => setIsCreating(false)}
                            className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                setIsCreating(false);
                                // Mock add rule
                                setRules([...rules, {
                                    id: Date.now().toString(),
                                    name: 'New Custom Rule',
                                    isEnabled: true,
                                    trigger: { type: 'Temperature', operator: '>', value: '35', source: 'Barn A' },
                                    action: { type: 'Device', target: 'Water Pump', state: 'On' }
                                }]);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg"
                        >
                            Save Rule
                        </button>
                    </div>
                </div>
            )}

            {/* Rules Grid */}
            <div className="grid grid-cols-1 gap-4">
                {rules.map((rule) => (
                    <div 
                        key={rule.id} 
                        className={`bg-slate-800 border rounded-xl p-5 transition-all ${rule.isEnabled ? 'border-slate-600 shadow-md' : 'border-slate-800 opacity-60'}`}
                    >
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Toggle */}
                            <button 
                                onClick={() => toggleRule(rule.id)}
                                className={`w-12 h-6 rounded-full relative transition-colors ${rule.isEnabled ? 'bg-emerald-500' : 'bg-slate-600'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${rule.isEnabled ? 'left-7' : 'left-1'}`}></span>
                            </button>

                            {/* Info */}
                            <div className="flex-1 w-full md:w-auto text-center md:text-left">
                                <h4 className={`font-bold text-lg ${rule.isEnabled ? 'text-white' : 'text-slate-500'}`}>{rule.name}</h4>
                                <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                                    {rule.lastTriggered && (
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Check className="w-3 h-3 text-emerald-500" />
                                            Last run: {rule.lastTriggered}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Visual Logic Flow */}
                            <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 w-full md:w-auto justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600">
                                        {getIconForType(rule.trigger.type)}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-[10px] text-slate-500 font-bold uppercase">IF</div>
                                        <div className="text-xs text-slate-300 font-mono">
                                            {rule.trigger.type} {rule.trigger.operator} {rule.trigger.value}
                                        </div>
                                    </div>
                                </div>
                                
                                <ArrowRight className="w-4 h-4 text-slate-600" />
                                
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600">
                                        {getActionIcon(rule.action.target)}
                                    </div>
                                     <div className="text-left">
                                        <div className="text-[10px] text-slate-500 font-bold uppercase">THEN</div>
                                        <div className="text-xs text-slate-300 font-medium">
                                            {rule.action.target}
                                        </div>
                                        <div className="text-[10px] text-emerald-400 font-bold">
                                            {rule.action.state}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <button 
                                onClick={() => deleteRule(rule.id)}
                                className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                 <div className="p-4 border border-slate-700 border-dashed rounded-xl flex flex-col items-center text-center hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                        <Thermometer className="w-5 h-5 text-slate-400" />
                    </div>
                    <h5 className="text-sm font-bold text-white">Climate Control</h5>
                    <p className="text-xs text-slate-500 mt-1">Preset rules for fans & misters</p>
                 </div>
                 
                 <div className="p-4 border border-slate-700 border-dashed rounded-xl flex flex-col items-center text-center hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-colors">
                        <Smartphone className="w-5 h-5 text-slate-400" />
                    </div>
                    <h5 className="text-sm font-bold text-white">Security Alerts</h5>
                    <p className="text-xs text-slate-500 mt-1">Notify on gate motion detection</p>
                 </div>

                 <div className="p-4 border border-slate-700 border-dashed rounded-xl flex flex-col items-center text-center hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                        <Clock className="w-5 h-5 text-slate-400" />
                    </div>
                    <h5 className="text-sm font-bold text-white">Feed Scheduling</h5>
                    <p className="text-xs text-slate-500 mt-1">Auto-dispense at set times</p>
                 </div>
            </div>
        </div>
    );
};

export default AutomationView;