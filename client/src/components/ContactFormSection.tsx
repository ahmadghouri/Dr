import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
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
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-black/5 overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-gray-50">
          
          {/* Left Side: Contact Form */}
          <div className="flex-1 p-10 md:p-16 lg:p-24 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[18px] font-bold text-[#1A1A1A] mb-4 block">
                Contact Us
              </span>
              <h2 className="text-[48px] md:text-[64px] font-black text-[#1A1A1A] leading-tight mb-12">
                Get an <span className="relative inline-block">
                  Appointment
                  <div className="absolute -bottom-2 left-0 w-full h-[10px] bg-[#C1FF72] rounded-full z-[-1] opacity-80"></div>
                </span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all"
                    />
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
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all"
                    />
                    <Mail className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-[#00A78E] opacity-40 group-focus-within:opacity-100 transition-opacity" />
                  </div>

                  {/* Phone Input */}
                  <div className="relative group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <textarea
                    rows={5}
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-8 py-6 bg-[#F9FAFB] rounded-[30px] border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={sendContactMutation.isPending}
                  className="bg-[#00A78E] hover:bg-[#1A1A1A] text-white px-12 py-5 rounded-full font-bold text-lg flex items-center justify-center transition-all duration-500 group shadow-xl shadow-[#00A78E]/20 disabled:opacity-50"
                >
                  {sendContactMutation.isPending ? 'Sending...' : 'Book An Appointment'}
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Side: Doctor Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-[45%] relative h-[500px] lg:h-auto"
          >
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop"
              alt="Medical Professional"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay gradient for a smoother look */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
