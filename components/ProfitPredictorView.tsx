import React, { useState, useMemo } from 'react';
import { 
    TrendingUp, 
    PiggyBank, 
    Calculator,
    Info,
    Scale
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, ReferenceLine } from 'recharts';

const ProfitPredictorView: React.FC = () => {
    // Simulation States
    const [marketPrice, setMarketPrice] = useState(62000); // VND/kg
    const [feedCost, setFeedCost] = useState(12500); // VND/kg
    const [currentWeight, setCurrentWeight] = useState(85); // kg
    const [growthRate, setGrowthRate] = useState(0.85); // kg/day
    const [feedConversion, setFeedConversion] = useState(2.4); // kg feed / kg gain

    // Generate Forecast Data
    const forecastData = useMemo(() => {
        const data = [];
        const today = new Date();
        
        let weight = currentWeight;
        let cumulativeFeedCost = 0;
        
        // Simulate next 60 days
        for (let i = 0; i <= 60; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Logic: Growth rate slows down as they get heavier, FCR increases
            const adjustedGrowth = growthRate * (1 - (weight > 100 ? (weight - 100) * 0.015 : 0)); 
            const adjustedFCR = feedConversion * (1 + (weight > 90 ? (weight - 90) * 0.02 : 0));
            
            const dailyFeed = adjustedGrowth * adjustedFCR;
            const dailyCost = dailyFeed * feedCost;
            
            weight += adjustedGrowth;
            cumulativeFeedCost += dailyCost;
            
            const revenue = weight * marketPrice;
            const profit = revenue - (cumulativeFeedCost + 2000000); // 2M fixed cost base (piglet, vaccines, labor)

            data.push({
                day: `Day ${i}`,
                date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
                weight: Number(weight.toFixed(1)), // FIX: Ensure this is a Number, not a String
                profit: Math.round(profit), // Clean up decimals
                isOptimal: false
            });
        }
        
        // Find Peak Profit
        let maxProfit = -Infinity;
        let maxIndex = -1;
        data.forEach((d, idx) => {
            if (d.profit > maxProfit) {
                maxProfit = d.profit;
                maxIndex = idx;
            }
        });
        
        if (maxIndex !== -1 && data[maxIndex]) {
            data[maxIndex].isOptimal = true;
        }

        return { data, maxIndex, maxProfit };
    }, [marketPrice, feedCost, currentWeight, growthRate, feedConversion]);

    // Safety Check: Ensure data exists before rendering
    if (!forecastData || !forecastData.data || forecastData.data.length === 0 || forecastData.maxIndex === -1) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400">
                <span className="animate-pulse">Analyzing market data...</span>
            </div>
        );
    }

    const optimalPoint = forecastData.data[forecastData.maxIndex];
    // Double check optimalPoint
    if (!optimalPoint) {
        return null;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-7 h-7 text-emerald-500" />
                        AI Profit & Yield Predictor
                    </h2>
                    <p className="text-slate-400 mt-1">Optimize harvest timing based on real-time growth data and market economics.</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AI Confidence</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-900 rounded-full"></div>
                    </div>
                    <span className="text-white font-bold text-sm">88%</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Configuration Panel */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg h-fit">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-500" />
                        Simulation Parameters
                    </h3>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                                Market Price (VND/kg)
                                <span className="text-white font-mono">{marketPrice.toLocaleString()}</span>
                            </label>
                            <input 
                                type="range" 
                                min="45000" 
                                max="80000" 
                                step="500" 
                                value={marketPrice}
                                onChange={(e) => setMarketPrice(Number(e.target.value))}
                                className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500">
                                <span>45k</span>
                                <span>Current Avg: 62k</span>
                                <span>80k</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                                Feed Cost (VND/kg)
                                <span className="text-white font-mono">{feedCost.toLocaleString()}</span>
                            </label>
                            <input 
                                type="range" 
                                min="10000" 
                                max="18000" 
                                step="100" 
                                value={feedCost}
                                onChange={(e) => setFeedCost(Number(e.target.value))}
                                className="w-full accent-orange-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                             <div className="space-y-1">
                                <label className="text-[10px] text-slate-500 font-bold uppercase">Avg Weight (kg)</label>
                                <div className="bg-slate-900 border border-slate-600 rounded p-2 flex items-center gap-2">
                                    <Scale className="w-4 h-4 text-slate-400" />
                                    <input 
                                        type="number" 
                                        value={currentWeight}
                                        onChange={(e) => setCurrentWeight(Number(e.target.value))}
                                        className="bg-transparent border-none w-full text-white text-sm focus:outline-none font-mono"
                                    />
                                </div>
                             </div>
                             <div className="space-y-1">
                                <label className="text-[10px] text-slate-500 font-bold uppercase">Growth (kg/day)</label>
                                <div className="bg-slate-900 border border-slate-600 rounded p-2 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                    <input 
                                        type="number" 
                                        value={growthRate}
                                        onChange={(e) => setGrowthRate(Number(e.target.value))}
                                        step="0.01"
                                        className="bg-transparent border-none w-full text-white text-sm focus:outline-none font-mono"
                                    />
                                </div>
                             </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                        <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                            <p className="text-xs text-blue-200">
                                <strong className="block mb-1 text-blue-400">Market Insight</strong>
                                Local prices are trending up (+2% this week). Consider holding if weight is under 100kg.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chart & Result */}
                <div className="lg:col-span-2 space-y-6">
                    {/* The "Money Shot" Card */}
                    <div className="bg-gradient-to-r from-emerald-900 to-slate-900 border border-emerald-500/30 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <PiggyBank className="w-40 h-40 text-emerald-400" />
                        </div>
                        
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            <div className="col-span-2">
                                <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-2">Optimal Harvest Window</h4>
                                <div className="flex items-baseline gap-4 mb-1">
                                    <span className="text-4xl md:text-5xl font-bold text-white">{optimalPoint.date}</span>
                                    <span className="text-xl text-slate-300 font-mono">({forecastData.maxIndex} days left)</span>
                                </div>
                                <p className="text-slate-400 text-sm max-w-md">
                                    Selling at this date maximizes profit margin vs. feed conversion efficiency loss.
                                </p>
                            </div>
                            
                            <div className="bg-emerald-500 text-slate-900 rounded-xl p-4 text-center shadow-lg transform scale-105">
                                <div className="text-xs font-bold uppercase opacity-80 mb-1">Projected Net Profit</div>
                                <div className="text-2xl font-black font-mono">{(forecastData.maxProfit / 1000000).toFixed(2)}M VND</div>
                                <div className="text-xs font-bold mt-1 opacity-80">per head</div>
                            </div>
                        </div>
                    </div>

                    {/* Projections Chart */}
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
                        <h4 className="font-bold text-white mb-4">Profit vs. Weight Trajectory</h4>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={forecastData.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} minTickGap={30} />
                                    <YAxis 
                                        yAxisId="left" 
                                        stroke="#10b981" 
                                        fontSize={12} 
                                        tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} 
                                        axisLine={false} 
                                        tickLine={false}
                                        domain={['auto', 'auto']}
                                    />
                                    <YAxis 
                                        yAxisId="right" 
                                        orientation="right" 
                                        stroke="#3b82f6" 
                                        fontSize={12} 
                                        unit="kg" 
                                        axisLine={false} 
                                        tickLine={false}
                                        domain={['auto', 'auto']}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                                        formatter={(value: any, name: string) => {
                                            if (name === 'Projected Profit') return [`${value.toLocaleString()} VND`, name];
                                            return [`${value} kg`, name];
                                        }}
                                        labelStyle={{ color: '#e2e8f0' }}
                                    />
                                    <ReferenceLine x={optimalPoint.date} stroke="#fbbf24" strokeDasharray="3 3" label={{ position: 'top', value: 'OPTIMAL', fill: '#fbbf24', fontSize: 10 }} />
                                    
                                    <Area 
                                        yAxisId="left"
                                        type="monotone" 
                                        dataKey="profit" 
                                        name="Projected Profit" 
                                        stroke="#10b981" 
                                        fillOpacity={1} 
                                        fill="url(#colorProfit)" 
                                        strokeWidth={3}
                                    />
                                    <Line 
                                        yAxisId="right"
                                        type="monotone" 
                                        dataKey="weight" 
                                        name="Projected Weight" 
                                        stroke="#3b82f6" 
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfitPredictorView;