import React from 'react';
import { 
  Sprout, 
  Target, 
  Eye, 
  Cpu, 
  Camera, 
  Bell, 
  Database, 
  Users, 
  Handshake, 
  CheckCircle2,
  Globe,
  Smartphone,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05090d] text-slate-200 overflow-x-hidden font-sans selection:bg-emerald-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Navbar for Landing Page */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-8 z-50 flex justify-between items-center max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
                        <path d="M35 55 L65 30" stroke="white" strokeWidth="6" strokeLinecap="round" />
                        <path d="M35 55 L80 50" stroke="white" strokeWidth="6" strokeLinecap="round" />
                        <path d="M35 55 L70 75" stroke="white" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="35" cy="55" r="12" fill="#10b981" />
                        <circle cx="65" cy="30" r="7" fill="#3b82f6" />
                        <circle cx="80" cy="50" r="6" fill="#3b82f6" />
                        <circle cx="70" cy="75" r="7" fill="#3b82f6" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">AuraFarm</h1>
            </div>
             <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Solutions</a>
                <a href="#" className="hover:text-white transition-colors">Vision</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
        </div>

        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#05090d]/50 to-[#05090d] z-10"></div>
            {/* New Hero Image: Drone/AgTech */}
            <img 
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2000&auto=format&fit=crop" 
                alt="Smart Farm Aerial View" 
                className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
        </div>

        <div className="relative z-20 text-center max-w-5xl px-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 mt-24 md:mt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Sprout className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wider uppercase">Pioneering AgTech in Vietnam</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
                Cultivating Intelligence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
                    Naturally & Sustainably
                </span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
                Empowering farmers with "Make in Vietnam" AI & IoT solutions. 
                Early risk detection, optimized production, and a safer future for agriculture.
            </p>
            <div className="flex flex-col md:flex-row gap-5 justify-center">
                <button className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 flex items-center justify-center gap-2 group">
                    Partner With Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2 hover:scale-105">
                    Explore Solutions
                </button>
            </div>
        </div>
      </section>

      {/* 2. ABOUT US - THE STORY */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-4">
                    <span className="w-16 h-1.5 bg-emerald-500 rounded-full"></span>
                    Who We Are
                </h2>
                <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                    <p>
                        We are an AgTech startup developing <strong className="text-emerald-400">AI & IoT solutions</strong> for livestock farming in Vietnam. Our goal is to help farmers detect disease risks early, optimize production efficiency, and reduce operational costs.
                    </p>
                    <p>
                        Born from the real challenges of small-scale and large farms—lack of technical labor, disease control difficulties, and reliance on manual experience—we built an intelligent monitoring system based on AI cameras and environmental sensors.
                    </p>
                </div>
                <div className="p-8 bg-slate-800/40 border-l-4 border-emerald-500 rounded-r-2xl backdrop-blur-sm">
                    <p className="text-slate-200 italic text-xl font-light">
                        "We believe technology doesn't replace the farmer, but serves as an intelligent assistant, enabling more accurate, timely, and safer decision-making."
                    </p>
                </div>
            </div>
            <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:opacity-100 transition-opacity opacity-70"></div>
                {/* Updated Image: Farmer with Tablet in Field */}
                <img 
                    src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=1000&auto=format&fit=crop" 
                    alt="Modern Farmer with Tablet" 
                    className="relative rounded-3xl shadow-2xl border border-white/10 w-full object-cover h-[500px] md:h-[600px] transition-transform duration-700 group-hover:scale-[1.01]"
                />
                 {/* Floating Stats Card - Adjusted position to avoid overlap */}
                 <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-left-10 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-6 md:p-8 rounded-2xl shadow-2xl max-w-xs hidden md:block animate-in slide-in-from-bottom-5 duration-1000 delay-300 z-10">
                    <div className="flex items-center gap-5 mb-4">
                        <div className="p-4 bg-blue-500/20 rounded-2xl">
                            <Cpu className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">System Uptime</p>
                            <p className="text-2xl font-bold text-white">24/7 Monitoring</p>
                        </div>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-emerald-400 w-[99%] h-full"></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-32 bg-[#020406] relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#05090d] to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05090d] to-transparent"></div>
         
         <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                {/* Mission */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-12 rounded-[2rem] hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Target className="w-48 h-48 text-emerald-500" />
                    </div>
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 border border-emerald-500/20">
                        <Target className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-8">Our Mission</h3>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                            <span className="text-slate-300 text-lg">Reduce disease risks via "Make in Vietnam" AI.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                            <span className="text-slate-300 text-lg">Enhance livestock productivity & animal welfare.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                            <span className="text-slate-300 text-lg">Support practical, accessible, and sustainable digital transformation.</span>
                        </li>
                    </ul>
                </div>

                {/* Vision */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-12 rounded-[2rem] hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Eye className="w-48 h-48 text-blue-500" />
                    </div>
                    <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 border border-blue-500/20">
                        <Eye className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-8">Our Vision</h3>
                    <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                        To become the leading smart livestock monitoring platform in Vietnam, creating an ecosystem where <span className="text-white font-semibold">Data – Technology – People</span> connect to build a modern, safe, and sustainable agriculture sector.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {['Small Farms', 'Enterprises', 'Government', 'Co-ops'].map(tag => (
                            <span key={tag} className="px-4 py-2 bg-slate-800 rounded-full text-sm text-slate-300 border border-slate-700 hover:border-blue-500/50 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* 4. OUR SOLUTIONS (Bento Grid) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
             <span className="text-emerald-500 font-bold tracking-[0.2em] uppercase text-sm bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">Technology Core</span>
             <h2 className="text-5xl md:text-6xl font-bold text-white mt-6 mb-4">The AuraFarm Ecosystem</h2>
             <p className="text-slate-400 max-w-2xl mx-auto text-lg">Comprehensive monitoring from edge to cloud</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* Item 1: AI Camera - VIDEO ENABLED */}
            <div className="md:col-span-2 row-span-2 bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-full z-0">
                     <iframe
                        src="https://player.cloudinary.com/embed/?cloud_name=ddm2hzdhy&public_id=Tracker_Distance_Measure_2_fdmpw8&autoplay=true&autoplay_mode=on-scroll&muted=true&loop=true&controls=false&control_bar[volumePanel]=false&control_bar[fullscreenToggle]=false"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        allowFullScreen
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>
                </div>
                
                <div className="relative z-10 p-10 h-full flex flex-col justify-center max-w-lg pointer-events-none">
                    <div className="w-14 h-14 bg-emerald-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30">
                        <Camera className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-6">Computer Vision AI</h3>
                    <p className="text-slate-200 text-lg leading-relaxed mb-8 drop-shadow-md">
                        Advanced behavior tracking (eating, moving, abnormal lying posture) to detect early signs of illness before they spread. Our models run at the edge for real-time latency.
                    </p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-emerald-400 bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-white/10 text-sm font-mono">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live Detection
                        </div>
                        <div className="flex items-center gap-2 text-blue-400 bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-white/10 text-sm font-mono">
                            <Cpu className="w-3 h-3" />
                            YOLOv8 Model
                        </div>
                    </div>
                </div>
            </div>

            {/* Item 2: IoT Sensors */}
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 hover:border-slate-500 transition-all group relative overflow-hidden flex flex-col justify-between">
                {/* New Image: Circuit/Sensor */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563770094269-79cd4d106f56?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity mix-blend-luminosity"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-slate-600">
                        <Cpu className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">IoT Sensors</h3>
                    <p className="text-slate-400">
                        Real-time monitoring of temperature, humidity, CO2, and NH3 levels directly affecting herd health.
                    </p>
                </div>
                <div className="relative z-10 mt-6 pt-6 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
                    <span>LoRaWAN / 4G</span>
                    <span className="text-emerald-500">Connected</span>
                </div>
            </div>

            {/* Item 3: Alerts */}
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 hover:border-slate-500 transition-all group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
                <div>
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-slate-600">
                        <Bell className="w-6 h-6 text-rose-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Smart Alerts</h3>
                    <p className="text-slate-400">
                        Instant notifications via App/Zalo when anomalies occur, enabling immediate intervention to minimize loss.
                    </p>
                </div>
                 <div className="mt-6 flex gap-2">
                     <span className="bg-rose-500/10 text-rose-400 px-2 py-1 rounded text-xs border border-rose-500/20">Critical</span>
                     <span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs border border-yellow-500/20">Warning</span>
                 </div>
            </div>

             {/* Item 4: Data Platform */}
             <div className="md:col-span-3 bg-gradient-to-r from-slate-900 to-slate-800 p-10 rounded-3xl border border-slate-700 hover:border-slate-500 transition-all relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                 <div className="absolute top-0 right-0 w-[500px] h-full bg-blue-500/5 skew-x-12"></div>
                 <div className="flex-1 relative z-10">
                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 border border-slate-600">
                        <Database className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Data Platform & Reporting</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6">
                        Centralized dashboard for real-time farm management, traceability compliance, and historical analysis. Export reports for government compliance with one click.
                    </p>
                    <button className="text-purple-400 font-bold flex items-center gap-2 hover:text-purple-300 transition-colors">
                        View Sample Report <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex-1 w-full relative z-10">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-2xl opacity-90 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        {/* Mock Dashboard UI */}
                        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="h-2 w-20 bg-slate-800 rounded-full"></div>
                        </div>
                        <div className="flex items-end gap-3 h-32">
                            <div className="w-1/6 bg-slate-800 h-[40%] rounded-t-lg"></div>
                            <div className="w-1/6 bg-slate-800 h-[60%] rounded-t-lg"></div>
                            <div className="w-1/6 bg-slate-800 h-[30%] rounded-t-lg"></div>
                            <div className="w-1/6 bg-slate-800 h-[50%] rounded-t-lg"></div>
                            <div className="w-1/6 bg-indigo-500 h-[80%] rounded-t-lg shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                            <div className="w-1/6 bg-indigo-600 h-[95%] rounded-t-lg"></div>
                        </div>
                        <div className="mt-4 flex justify-between text-xs text-slate-500 font-mono">
                            <span>MON</span>
                            <span>TUE</span>
                            <span>WED</span>
                            <span>THU</span>
                            <span>FRI</span>
                            <span>SAT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 5. IMPLEMENTATION STRATEGY */}
      <section className="py-32 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-20">Ecosystem Implementation Strategy</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-slate-800 via-emerald-500/50 to-slate-800 z-0"></div>

                {/* Step 1 */}
                <div className="relative z-10 w-full md:w-1/3 group">
                    <div className="w-24 h-24 mx-auto bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-800 mb-8 group-hover:border-emerald-500 transition-colors shadow-xl">
                        <Handshake className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">1. Collaboration</h3>
                    <p className="text-slate-400 leading-relaxed px-4">
                        Partnering with Government, Banks, Feed Companies, and Vet Medicine Suppliers to build a support network.
                    </p>
                </div>

                 {/* Step 2 */}
                 <div className="relative z-10 w-full md:w-1/3 group">
                    <div className="w-24 h-24 mx-auto bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-800 mb-8 group-hover:border-blue-500 transition-colors shadow-xl">
                        <CheckCircle2 className="w-10 h-10 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">2. Pilot & Demo</h3>
                    <p className="text-slate-400 leading-relaxed px-4">
                        Testing via "Model Farms" to prove efficiency and ROI before mass scaling to the general public.
                    </p>
                </div>

                 {/* Step 3 */}
                 <div className="relative z-10 w-full md:w-1/3 group">
                    <div className="w-24 h-24 mx-auto bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-800 mb-8 group-hover:border-purple-500 transition-colors shadow-xl">
                        <Users className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">3. Scaling</h3>
                    <p className="text-slate-400 leading-relaxed px-4">
                        Integrating into existing production models of farmers, cooperatives, and large enterprises.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* 6. CORE VALUES */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">Core Values</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 transition-all group">
                <div className="text-emerald-500 font-bold text-2xl mb-2 group-hover:scale-110 transition-transform">Practical</div>
                <p className="text-sm text-slate-400">Solving real problems</p>
            </div>
            <div className="text-center p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 transition-all group">
                <div className="text-blue-500 font-bold text-2xl mb-2 group-hover:scale-110 transition-transform">Accessible</div>
                <p className="text-sm text-slate-400">Easy for all farmers</p>
            </div>
            <div className="text-center p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800 transition-all group">
                <div className="text-purple-500 font-bold text-2xl mb-2 group-hover:scale-110 transition-transform">Companion</div>
                <p className="text-sm text-slate-400">Walking with farmers</p>
            </div>
            <div className="text-center p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-yellow-500/50 hover:bg-slate-800 transition-all group">
                <div className="text-yellow-500 font-bold text-2xl mb-2 group-hover:scale-110 transition-transform">Sustainable</div>
                <p className="text-sm text-slate-400">Economic & Bio-safe</p>
            </div>
        </div>
      </section>

      {/* 7. CTA / CONTACT */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020406] z-0"></div>
        {/* New Image: Green Field */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Ready to Transform Your Farm?</h2>
            <p className="text-xl text-slate-300 mb-12 font-light">
                Whether you want to join our pilot program, partner on a model farm, or find a solution for your business.
            </p>
            
            <div className="bg-slate-950/80 backdrop-blur-xl p-10 rounded-[2rem] border border-slate-800 shadow-2xl inline-block w-full max-w-3xl text-left">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-6">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                        <Globe className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Contact AuraFarm</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div>
                            <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Hotline / Zalo</p>
                            <p className="text-white text-2xl font-mono font-medium hover:text-emerald-400 transition-colors cursor-pointer">+84 912 345 678</p>
                        </div>
                        <div>
                             <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Email</p>
                            <p className="text-white text-xl font-mono hover:text-blue-400 transition-colors cursor-pointer">contact@aurafarm.ai</p>
                        </div>
                         <div>
                             <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Headquarters</p>
                            <p className="text-slate-300 text-sm">TechnoPark Tower, Vinhomes Ocean Park, Hanoi, Vietnam</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end">
                        <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-5 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 text-lg group">
                            <Smartphone className="w-6 h-6" /> 
                            Request a Demo
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-center text-slate-500 text-xs mt-4">We usually reply within 24 hours.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="py-10 bg-[#020406] text-center text-slate-600 text-sm border-t border-slate-900">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
             <div className="w-6 h-6">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="35" cy="55" r="14" fill="#334155" />
                    <circle cx="65" cy="30" r="8" fill="#334155" />
                </svg>
             </div>
             <span className="font-bold">AuraFarm</span>
        </div>
        <p>© 2025 AuraFarm AI Systems. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;