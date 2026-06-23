import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, User, BookOpen } from 'lucide-react';
import { useSendContact } from '../features/contact/hooks/useContact';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const sendContactMutation = useSendContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendContactMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-6 lg:py-6 bg-gradient-to-br from-slate-50 via-zinc-50 to-emerald-50/10 overflow-hidden select-none">    
      {/* Grid container with items-stretch keeps both sides exactly equal in height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 items-stretch gap-8 lg:gap-0">
        
        {/* Left Side: Modern Operation Theater Image Container */}
        <div className="lg:col-span-6 relative z-0 flex rounded-[2.5rem] bg-white p-3 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden h-full min-h-[450px] lg:min-h-full">
          <img 
            src="https://images.unsplash.com/photo-1734094546615-045bf5f7ea0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN1cmdlcnl8ZW58MHx8MHx8fDA%3D" 
            alt="Modern Operation Theater Surgical Suite" 
            className="w-full h-full object-cover rounded-[2.2rem]"
          />
          
          {/* Subtle Graphic Accents */}
          <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute bottom-[20%] right-[10%] w-4 h-4 bg-[#00A78E]/30 rounded-full blur-sm pointer-events-none"></div>
        </div> 

        {/* Right Side: Form Card Layout */}
        <div className="lg:col-span-6 lg:-ml-[4%] relative z-10 flex">
          <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100/80 flex flex-col justify-center">
            
            {/* Modern Clean Badge */}
            <div className="inline-block mb-5">
              <span className="bg-emerald-50 text-[#00A78E] border border-emerald-100/50 px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider">
                Direct Appointment
              </span>
            </div>

            {/* Sharp Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-8 tracking-tight leading-[1.15]">
              Get an {' '}
              <span className="relative inline-block text-[#00A78E] bg-gradient-to-r from-[#00A78E] to-[#00A78E] bg-clip-text text-transparent">
                Appointment
              </span>
            </h2> 

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Name Input */}
                <div className="relative group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A78E] transition-colors" />
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A78E] transition-colors" />
                </div>

                {/* Phone Input */}
                <div className="relative group">
                  <input 
                    type="text"
                    inputMode="numeric" 
                    pattern="[0-9]*"
                    name="phone"
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                      e.target.value = onlyNums;
                      handleChange(e); 
                    }}
                    required
                    className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A78E] transition-colors" />
                </div>

                {/* Subject Input */}
                <div className="relative group">
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="Subject Case" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                  />
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A78E] transition-colors" />
                </div>
              </div>
              
              {/* Message Textarea */}
              <textarea 
                name="message"
                placeholder="Write your medical concerns or messages here..." 
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl px-5 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all resize-none font-semibold text-slate-800 placeholder:text-slate-400"
              ></textarea>

              {/* Action Button */}
              <button 
                type="submit" 
                disabled={sendContactMutation.isPending}
                className="w-full bg-[#00A78E] text-white py-4.5 rounded-2xl cursor-pointer font-semibold text-base flex items-center justify-center group hover:bg-[#008f7a] shadow-lg shadow-[#00A78E]/20 hover:shadow-xl hover:shadow-[#00A78E]/30 active:scale-[0.99] disabled:scale-100 transition-all duration-300 disabled:opacity-50 select-none"
              >
                <span>{sendContactMutation.isPending ? 'Processing Secure Request...' : 'Book An Appointment Now'}</span>
                {!sendContactMutation.isPending && (
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </button>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactFormSection;