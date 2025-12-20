import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, ChevronDown } from 'lucide-react';
import { EnvironmentData, LivestockData, Expert, HealthStatus } from '../types';

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
      text: "Hello! I'm Aura, your farm AI assistant. I have access to real-time sensor data and livestock health records. How can I help you today?",
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

  const generateSystemContext = () => {
    const sickAnimals = livestockData.filter(a => a.status !== HealthStatus.HEALTHY);
    const latestEnv = envData[envData.length - 1];

    return `You are Aura, an advanced AI assistant for a smart livestock farm.
    
    CURRENT FARM STATUS (Real-time Data):
    
    1. ENVIRONMENT (Latest Reading):
       - Temperature: ${latestEnv?.temperature.toFixed(1)}°C
       - Humidity: ${latestEnv?.humidity.toFixed(0)}%
       - CO2: ${latestEnv?.co2.toFixed(0)} ppm
       - NH3: ${latestEnv?.nh3.toFixed(0)} ppm
    
    2. LIVESTOCK OVERVIEW:
       - Total Animals: ${livestockData.length}
       - Critical/Warning Status: ${sickAnimals.length} animals
       
    3. SICK ANIMAL DETAILS (Prioritize these):
       ${sickAnimals.map(a => `- ID ${a.tagId} (${a.type}): ${a.status} status, Temp ${a.temperature.toFixed(1)}°C`).join('\n       ')}
    
    4. AVAILABLE EXPERTS:
       ${experts.map(e => `- ${e.name} (${e.role}): Specializes in ${e.specialization}`).join('\n       ')}

    INSTRUCTIONS:
    - Answer questions concisely based on the data above.
    - If a user asks about sick animals, list them and their specific symptoms/vitals from the data.
    - If a health issue is detected, ALWAYS suggest contacting a specific expert from the list based on their specialization (e.g., Dr. Sarah for general/large animals, Dr. Michael for biosecurity/epidemiology).
    - If asked about the environment, analyze if the levels (CO2, NH3, Temp) are safe.
    - Keep tone professional but helpful.
    `;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Initialize the client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prepare history for the API (last 10 messages to keep context window manageable)
      // We don't send the system instruction in the history array for this specific call structure, 
      // instead we inject it into the generateContent config.
      const chatHistory = messages.slice(-10).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
            ...chatHistory,
            { role: 'user', parts: [{ text: userMessage.text }] }
        ],
        config: {
          systemInstruction: generateSystemContext(),
        },
      });

      const aiText = response.text || "I'm having trouble analyzing the farm data right now. Please try again.";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I encountered an error connecting to the AuraFarm intelligence core. Please check your connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
                Connected to Farm Sensors
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
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-none p-4 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
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
              placeholder="Ask about herd health, environment..."
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