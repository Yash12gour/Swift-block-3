import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  MessageSquare,
  ShieldCheck,
  UserCheck,
  Truck,
  FileText
} from 'lucide-react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default target phone: Swift Industries Factory Booking (+91 94072 84515)
  const defaultPhone = '919407284515';

  // Toggle state
  const toggleChat = () => setIsOpen(!isOpen);

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Soft reminder tooltip shortly after arriving
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000); // 4 seconds delay before a gentle helper hint appears

    return () => clearTimeout(timer);
  }, []);

  // Format link and open
  const handleOpenWhatsApp = (text: string) => {
    const cleanText = encodeURIComponent(text.trim());
    const url = `https://wa.me/${defaultPhone}?text=${cleanText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    handleOpenWhatsApp(customMessage);
    setCustomMessage('');
  };

  // Predefined quick questions to expedite user queries
  const premiumPrompts = [
    {
      id: 'p1',
      label: 'AAC Pricing & Quote',
      message: 'Hello Swift Support, I am looking for a quick quote for standard sizes of AAC blocks. Can you share the latest catalog?',
      icon: FileText,
      color: 'text-blue-605 bg-blue-50 border-blue-150'
    },
    {
      id: 'p2',
      label: 'Dispatch & Delivery',
      message: 'Hello, I want to inquire about dispatch schedules, logistics, and delivery timelines in Madhya Pradesh.',
      icon: Truck,
      color: 'text-amber-600 bg-amber-50 border-amber-150'
    },
    {
      id: 'p3',
      label: 'Technical Help / Strength',
      message: 'Hi, I need assistance with jointing mortar ratios and structural strength recommendations for Eco Blox.',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-150'
    }
  ];

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end max-w-[calc(100vw-32px)]">
      
      {/* Tooltip hint above FAB */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-3 max-w-[200px] bg-[#1E293B] text-white px-3.5 py-2.5 rounded-2xl shadow-xl border border-stone-700/50 text-[11px] font-semibold leading-normal relative select-none cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
          >
            <div className="absolute right-5 bottom-[-5px] w-2.5 h-2.5 bg-[#1E293B] rotate-45 border-r border-b border-stone-700/50" />
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 font-black uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Direct Support
            </div>
            Need quick specifications or booking? Let's chat on WhatsApp!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Support Popover Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="mb-4 w-[calc(100vw-32px)] sm:w-[315px] max-w-[315px] bg-white rounded-[20px] border border-stone-250 shadow-[0_20px_40px_rgba(28,41,35,0.1),0_4px_10px_rgba(28,41,35,0.04)] overflow-hidden"
          >
            
            {/* Popover Header */}
            <div className="bg-[#128C7E] text-white px-4 py-3 flex items-center justify-between relative shadow-[0_3px_10px_rgba(18,140,126,0.12)]">
              <div className="flex items-center gap-2.5">
                {/* Simulated Avatar / Support Badge */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-md">
                    <MessageSquare className="w-4.5 h-4.5 text-white stroke-[1.8]" />
                  </div>
                  {/* Blinking actual online state dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#128C7E] shadow-xs" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-white leading-none">
                      Swift Desk Assistant
                    </h4>
                    <UserCheck className="w-3 h-3 text-emerald-300" />
                  </div>
                  <span className="text-[9px] font-mono text-emerald-50 tracking-wider block mt-0.5 opacity-90">
                    Online • Typically instant
                  </span>
                </div>
              </div>

              {/* Close Button Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/15 transition-all text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Conversation Area */}
            <div className="p-3 bg-[#E5DDD5] max-h-[300px] overflow-y-auto space-y-3 relative" style={{ backgroundImage: 'radial-gradient(rgba(18, 140, 126, 0.04) 1px, transparent 1px)', backgroundColor: '#E5DDD5', backgroundSize: '16px 16px' }}>
              
              {/* Automated initial support bubble */}
              <div className="flex flex-col gap-1 max-w-[88%] self-start bg-white p-2.5 rounded-xl rounded-tl-xs shadow-xs text-[11px]">
                <span className="font-sans font-bold text-[#128C7E] text-[9px] uppercase tracking-wide block mb-0.5">
                  Swift Desk Agent
                </span>
                <p className="text-stone-700 leading-normal font-semibold">
                  Welcome to Swift Eco Blox! 👋 We are central India's premier manufacturer based out of Raisen. 
                </p>
                <p className="text-stone-650 leading-normal font-medium mt-1">
                  How can we accelerate your structure specs? Choose a quick catalog topic below to text us:
                </p>
                <span className="text-[8px] font-mono text-stone-400 self-end mt-1 block">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Quick Actions (Preset prompts) */}
              <div className="space-y-1.5 pt-0.5">
                <span className="text-[8.5px] font-mono uppercase tracking-widest text-[#128C7E] font-black block pl-1.5 mb-1 opacity-90">
                  Select Quick Draft
                </span>
                {premiumPrompts.map((prompt) => {
                  const PromptIcon = prompt.icon;
                  return (
                    <button
                      key={prompt.id}
                      onClick={() => handleOpenWhatsApp(prompt.message)}
                      className="w-full text-left bg-white/95 backdrop-blur-xs hover:bg-white border hover:border-[#128C7E]/40 p-2 rounded-lg transition-all shadow-xs flex items-center gap-2 active:scale-98 cursor-pointer group"
                    >
                      <div className="bg-[#128C7E]/8 text-[#128C7E] p-1.5 rounded bg-[#128C7E]/10 shrink-0 group-hover:scale-105 transition-transform">
                        <PromptIcon className="w-3 h-3" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9.5px] font-bold text-stone-800 block truncate leading-none">
                          {prompt.label}
                        </span>
                        <span className="text-[8.5px] font-mono text-stone-500 block truncate mt-0.5 leading-none">
                          {prompt.message}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Popover Custom Message Form Input */}
            <form onSubmit={handleCustomSend} className="p-2 bg-white border-t border-stone-200 flex gap-1.5">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your query..."
                className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 text-[11px] focus:outline-none focus:bg-white focus:border-[#128C7E] font-medium placeholder:text-stone-400"
              />
              <button
                type="submit"
                disabled={!customMessage.trim()}
                className={`p-2 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  customMessage.trim() 
                    ? 'bg-[#128C7E] text-white hover:bg-[#075e54] shadow-sm shadow-[#128C7E]/20 active:scale-95' 
                    : 'bg-stone-100 text-stone-400 border border-stone-200 pointer-events-none'
                }`}
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
              </button>
            </form>

            <div className="bg-stone-50 px-3 py-1.5 border-t border-stone-150 text-[8px] font-mono text-stone-400 text-center tracking-wider font-bold">
              AUTHORIZED WHATSAPP GATEWAY // BIS CERTIFIED
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        id="whatsapp-chat-button"
        onClick={toggleChat}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35),0_2px_8px_rgba(37,211,102,0.15)] flex items-center justify-center cursor-pointer relative group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 select-none"
      >
        {/* Infinite pulsing glow concentric animation rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
        <span className="absolute md:group-hover:scale-110 inset-0 rounded-full border-2 border-white/35 transition-transform duration-300" />
        
        {/* Pure Vector Customized WhatsApp Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-white relative z-10" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403 0 9.797-4.364 9.8-9.735.003-2.596-.995-5.048-2.823-6.88C16.425 2.158 13.982 1.16 11.99 1.16c-5.409 0-9.809 4.364-9.813 9.735-.002 1.541.411 3.041 1.202 4.333l-.1.586L2.24 19.38l3.667-.954.58.358z" />
          <path d="M17.433 14.39c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.2-.569-.348z" />
        </svg>

      </motion.button>

    </div>
  );
}
