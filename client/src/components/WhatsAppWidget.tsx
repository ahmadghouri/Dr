import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { IoClose, IoSend } from 'react-icons/io5';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);


  const doctorPhone = "9230003968500"; 

  const quickMessages = [
    'I want to book an appointment',
    'I need information about weight loss surgery',
    'What are the consultation timings?',
    'I want to discuss my medical condition',
  ];


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleOpenWidget = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const encodedMsg = encodeURIComponent(textToSend);
      // Direct redirect to WhatsApp API with your number
      window.open(`https://wa.me/${doctorPhone}?text=${encodedMsg}`, '_blank', 'noopener,noreferrer');
      setInputValue('');
    }, 800);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans" ref={popupRef}>
      
      {/* 1. Floating Button with Pulse effect */}
      <div className="relative inline-block">
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <button
          onClick={handleOpenWidget}
          aria-label="Open WhatsApp Chat"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all hover:scale-110 focus:outline-none"
        >
          <FaWhatsapp className="text-3xl" />
          
          <AnimatePresence>
            {!isOpen && unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* 2. Chat Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-18 left-0 w-[calc(100vw-32px)] sm:w-[330px] md:w-[360px] bg-[#F8F8F8] rounded-[24px] shadow-2xl border border-gray-200/60 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0E6B5B] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src="/src/assets/imm.jpg"
                    alt="Dr. Shahzad"
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/20"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120&h=120";
                    }}
                  />
                  <span className="absolute bottom-0 right-0 flex h-3 w-3 rounded-full border-2 border-[#0E6B5B] bg-emerald-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold leading-tight">Dr. Awais Malik</h3>
                  <p className="text-[11px] text-white/80">Bariatric & Laparoscopic Surgeon</p>
                  <p className="text-[10px] text-emerald-300 font-medium flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Online - Typically replies instantly
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
                <IoClose className="text-2xl" />
              </button>
            </div>

            {/* Chat Messages Body (Compact Height Adjusted) */}
            <div className="flex-1 overflow-y-auto p-4 min-h-[140px] max-h-[220px] bg-slate-50/50">
              {/* Doctor's Welcome Bubble */}
              <div className="flex justify-start mb-3">
                <div className="max-w-[85%] bg-white text-gray-800 rounded-[18px] rounded-tl-sm px-4 py-2.5 text-sm shadow-sm border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-1">Assalam o Alaikum! 👋</p>
                  <p className="leading-relaxed">I'm Dr. Awais Malik. How can I help you today?</p>
                  <span className="text-[9px] text-gray-400 block text-right mt-1.5">Just now</span>
                </div>
              </div>

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm border border-gray-100 flex items-center space-x-1">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Quick Messages */}
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 px-1">Quick Messages</span>
              <div className="flex flex-wrap gap-1.5">
                {quickMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(msg)}
                    className="text-[11px] bg-white text-[#0E6B5B] border border-gray-200 rounded-full px-3 py-1.5 hover:border-[#0E6B5B] hover:bg-[#0E6B5B]/5 transition-all text-left font-medium active:scale-95"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0E6B5B] text-gray-800"
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-full bg-[#0E6B5B] hover:bg-[#0c594c] text-white flex items-center justify-center disabled:opacity-50 transition-colors shadow-sm"
              >
                <IoSend className="text-sm ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};