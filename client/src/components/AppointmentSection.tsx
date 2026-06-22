import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { useSendContact } from '../features/contact/hooks/useContact';
import imgjfif from '../assets/img.jfif'; 
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
   <section className="py-10 lg:py-10 bg-[#FFFFFF] overflow-hidden">    
      <div className="max-w-[1280px] mx-auto px-6 relative flex flex-col lg:flex-row items-center">
        
        {/* Left Side: Image Container with Framer Motion entry effect */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-[70%] relative z-0 flex items-center justify-center rounded-[30px] bg-[#FFFFFF] p-4 overflow-hidden"
        >
          <img 
            src={imgjfif} 
            alt="Dr. Awais Malik - Advanced Laparoscopic & Bariatric Surgeon" 
            className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain rounded-[30px]"
          />
          
          {/* Floating decorative circles */}
          <div className="absolute top-[40%] right-[10%] w-4 h-4 bg-[#00A78E]/40 rounded-full blur-sm pointer-events-none"></div>
          <div className="absolute top-[50%] right-[15%] w-8 h-8 border border-[#00A78E]/20 rounded-full pointer-events-none"></div>
        </motion.div> 

        {/* Right Side: Floating Form Container overlaying on desktop layout */}
        <div className="w-full lg:w-[50%] lg:-ml-[10%] mt-8 lg:mt-0 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[30px] p-6 md:p-12 shadow-2xl shadow-black/5 border border-gray-100"
          >
            
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-[16px] font-semibold uppercase tracking-wider">
                Contact Us
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-semibold text-[#1A1A1A] mb-8 md:mb-10 leading-tight">
              Get an{' '}
              <span className="relative inline-block">
                Appointment
                <div className="absolute -bottom-1 left-0 w-full h-2.5 sm:h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span>
            </h2> 

            {/* Form Setup */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Name Input */}
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all font-medium text-[#1A1A1A]"
                />

                {/* Email Input with floating icon */}
                <div className="relative group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all pr-12 font-medium text-[#1A1A1A]"
                  />
                  <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00A78E] opacity-60 group-focus-within:opacity-100 transition-opacity" />
                </div>

                {/* Phone Input */}
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
                   className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all font-medium text-[#1A1A1A]"
                     />

                {/* Subject Input */}
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all font-medium text-[#1A1A1A]"
                />
              </div>
              
              {/* Message Textarea */}
              <textarea 
                name="message"
                placeholder="Message" 
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all resize-none font-medium text-[#1A1A1A]"
              ></textarea>

              {/* Submit Button with Dynamic Loading and Pending States */}
              <button 
                type="submit" 
                disabled={sendContactMutation.isPending}
                className="w-full bg-[#00A78E] text-white py-4 sm:py-5 rounded-2xl cursor-pointer font-semibold text-base sm:text-lg flex items-center justify-center group hover:bg-[#008f7a] transition-all shadow-lg shadow-[#00A78E]/20 disabled:opacity-50"
              >
                <span>{sendContactMutation.isPending ? 'Sending Request...' : 'Book An Appointment'}</span>
                {!sendContactMutation.isPending && (
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactFormSection;
