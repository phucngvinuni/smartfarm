import React, { useState, useEffect, useRef } from 'react';
import { Expert } from '../types';
import { X, Send, Paperclip, Phone, Video } from 'lucide-react';

interface ChatWindowProps {
  expert: Expert;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'expert';
  text: string;
  timestamp: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ expert, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'expert', text: `Hello! I'm ${expert.name}. How can I help you with your livestock today?`, timestamp: 'Just now' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'expert',
        text: "I see. Could you upload a photo or video of the animal so I can assess the situation better?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={expert.imageUrl} alt={expert.name} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-800 rounded-full"></span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-none">{expert.name}</h4>
            <span className="text-xs text-blue-400">{expert.role}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
             <button className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors" title="Video Call">
                <Video className="w-4 h-4" />
            </button>
             <button className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors" title="Voice Call">
                <Phone className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors" title="Close">
                <X className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 bg-slate-900/95 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
            }`}>
              <p>{msg.text}</p>
              <span className={`text-[10px] block mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-800 border-t border-slate-700">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 focus-within:border-blue-500 transition-colors">
          <button className="p-1.5 text-slate-400 hover:text-white transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-slate-500"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;