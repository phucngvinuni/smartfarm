import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, ChevronDown, ShoppingBag } from 'lucide-react';
import { EnvironmentData, LivestockData, Expert, HealthStatus } from '../types';

// CONFIGURATION: Product Images
// Using public Unsplash images so they load immediately without local file setup
const PRODUCT_IMAGES = {
  NUTRIMIX: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=600&auto=format&fit=crop", // Cattle/Farm background
  PHARMAVET: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop" // Medicine/Healthcare
};

interface AIChatBotProps {
  envData: EnvironmentData[];
  livestockData: LivestockData[];
  experts: Expert[];
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ envData, livestockData, experts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: "Hello! I'm Aura, your farm AI assistant. I can help you with herd health status or recommend feed and medicine products.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Simulated AI Logic (Rule-based) with Product Recommendations
  const generateSimulatedResponse = (inputText: string): string => {
    const text = inputText.toLowerCase();
    const sickAnimals = livestockData.filter(a => a.status !== HealthStatus.HEALTHY);
    const latestEnv = envData[envData.length - 1];

    // FOOD/FEED Recommendation -> Triggers display of NUTRIMIX image
    if (text.match(/\b(food|feed|nutrition|diet|eat|hungry|grain)\b/)) {
        return "Based on the current weight gain analysis of your herd, I highly recommend **NutriMix™ Gold Performance Feed**.\n\nWhy this choice?\n1. Optimized protein content for this season.\n2. Contains probiotics that reduce ammonia emissions.\n3. Rated #1 by AuraFarm network users.\n\nYou can view the product details below.";
    }

    // MEDICINE/TREATMENT Recommendation -> Triggers display of PHARMAVET image
    if (text.match(/\b(medicine|med|drug|treatment|cure|antibiotic|vaccine|prescription)\b/)) {
         return "For general immunity boosting and symptom management, the top recommended product is **PharmaVet™ Bio-Shield Plus**.\n\nIt is specifically formulated to combat respiratory symptoms. \n\n⚠️ Note: Please consult Dr. Sarah Nguyen (Available) before administering any prescription-grade antibiotics.";
    }

    // Greeting
    if (text.match(/\b(hi|hello|hey|greetings)\b/)) {
      return "Hello! I am monitoring " + livestockData.length + " animals and " + envData.length + " sensors. \n\nTry asking me about:\n- 'Recommended Feed'\n- 'Medicine for sick animals'\n- 'Barn temperature'";
    }

    // Health / Sick Animals
    if (text.includes('sick') || text.includes('health') || text.includes('ill') || text.includes('warning') || text.includes('critical')) {
        if (sickAnimals.length === 0) {
            return "Good news! All livestock are currently healthy based on the latest sensor readings.";
        }
        const summary = sickAnimals.map(a => 
            `- ${a.type} #${a.tagId}: ${a.status} (Temp: ${a.temperature.toFixed(1)}°C)`
        ).join('\n');
        
        return `⚠️ I found ${sickAnimals.length} animals requiring attention:\n\n${summary}\n\nI recommend isolating these animals immediately.`;
    }

    // Environment / Temperature
    if (text.includes('env') || text.includes('temp') || text.includes('humid') || text.includes('air') || text.includes('co2')) {
        if (!latestEnv) return "I'm waiting for the latest environmental sensor update...";
        
        let status = "✅ Optimal";
        if (latestEnv.temperature > 30 || latestEnv.nh3 > 20) status = "⚠️ Warning";

        return `Current Barn Conditions (${status}):\n` +
               `- Temperature: ${latestEnv.temperature.toFixed(1)}°C\n` +
               `- Humidity: ${latestEnv.humidity.toFixed(0)}%\n` +
               `- CO2: ${latestEnv.co2.toFixed(0)} ppm\n` +
               `- NH3: ${latestEnv.nh3.toFixed(1)} ppm`;
    }

    // Experts
    if (text.includes('expert') || text.includes('vet') || text.includes('doctor') || text.includes('contact')) {
        const onlineExperts = experts.filter(e => e.status === 'Online');
        if (onlineExperts.length > 0) {
            return `I recommend contacting the following online experts:\n` +
                   onlineExperts.map(e => `- ${e.name} (${e.role})`).join('\n');
        }
        return "No experts are currently online, but you can leave a message for Dr. Sarah Nguyen (Veterinarian).";
    }

    // Default fallback
    return "I'm analyzing the real-time stream. I can help you with: \n- Sick animals report \n- Barn temperature \n- Feed & Medicine recommendations \n\nWhat would you like to know?";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
        const responseText = generateSimulatedResponse(userText);
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 
          rounded-2xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none h-0'}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B7D35] to-[#0D577C] p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Aura AI Assistant</h3>
              <p className="text-[10px] text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Connected
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-lg transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950/50 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[85%] rounded-2xl p-3 text-sm shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'}
              `}>
                <div className="flex items-center gap-2 mb-1 opacity-70">
                    {msg.role === 'model' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    <span className="text-[10px]">{msg.timestamp}</span>
                </div>
                
                {/* Text Content */}
                <div className="whitespace-pre-wrap leading-relaxed">
                   {msg.text.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-blue-600 dark:text-blue-400 font-bold">{part}</strong> : part
                   )}
                </div>

                {/* Simulated Product Action Link (Static Images) */}
                {msg.role === 'model' && (msg.text.includes('NutriMix') || msg.text.includes('PharmaVet')) && (
                    <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div className="mb-3 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 relative group cursor-pointer h-32 bg-slate-100 dark:bg-slate-800">
                            <img 
                                src={msg.text.includes('NutriMix') 
                                    ? PRODUCT_IMAGES.NUTRIMIX
                                    : PRODUCT_IMAGES.PHARMAVET
                                }
                                alt="Product Recommendation"
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                <span className="text-white text-xs font-bold">
                                    {msg.text.includes('NutriMix') ? 'Organic Livestock Feed' : 'Veterinary Medicine'}
                                </span>
                            </div>
                        </div>

                        <button className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                            <ShoppingBag className="w-3 h-3" />
                            View Product Details
                        </button>
                    </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-none p-4 shadow-sm">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about feed or medicine..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-500"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all shadow-lg shadow-blue-500/20"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto group flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95
          ${isOpen ? 'bg-slate-700 text-white rotate-90' : 'bg-gradient-to-r from-[#0B7D35] to-[#0D577C] text-white'}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-7 h-7" />}
        
        {/* Notification Badge (Mock) */}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-slate-50 dark:border-slate-900"></span>
        )}
      </button>
    </div>
  );
};

export default AIChatBot;