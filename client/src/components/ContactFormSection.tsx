import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Facebook, Youtube, MapPin, Clock, Award } from 'lucide-react';
import { useSendContact } from '../features/contact/hooks/useContact';
import imjfif from '../assets/im.jfif'; 

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
    <section className="py-12 bg-white select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-black/5 overflow-hidden flex flex-col lg:flex-row min-h-175 border border-gray-100 items-stretch">
          
          {/* Left Side: Contact Form */}
          <div className="flex-1 p-10 md:p-16 lg:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block">
                <span className="bg-[#C1FF72] text-[#1A1A1A] px-8 py-3 rounded-full text-[16px] font-semibold shadow-sm shadow-[#C1FF72]/20">
                  Contact Us
                </span>
              </div>
              <h2 className="text-[44px] md:text-[56px] font-semibold text-[#1A1A1A] leading-tight mt-5 mb-7">
                Get an <span className="relative inline-block">
                  Appointment
                  <div className="absolute -bottom-1 left-0 w-full h-[8px] bg-[#C1FF72] rounded-full z-[-1] opacity-80"></div>
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
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all"
                    />
                    <Mail className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-[#00A78E] opacity-40 group-focus-within:opacity-100 transition-opacity" />
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
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all"
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
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-8 py-6 bg-[#F9FAFB] rounded-[30px] border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={sendContactMutation.isPending}
                  className="bg-[#00A78E] hover:bg-[#1A1A1A] text-white px-12 py-5 rounded-full font-semibold text-lg flex items-center justify-center transition-all duration-500 group shadow-xl shadow-[#00A78E]/20 disabled:opacity-50 cursor-pointer"
                >
                  {sendContactMutation.isPending ? 'Sending...' : 'Book An Appointment'}
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Side: Doctor Profile Card with SOLID WHITE background & SEMIBOLD fonts */}
          <div className="lg:w-[45%] bg-white p-8 sm:p-12 flex flex-col justify-between text-[#1A1A1A] lg:rounded-r-[40px] rounded-b-[40px] lg:rounded-bl-none border-t lg:border-t-0 lg:border-l border-gray-100">
            
            {/* Profile Info Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-gray-100">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-white border border-gray-200 shrink-0 shadow-md">
                <img
                  src={imjfif}
                  alt="Dr. Awais Malik"
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                  Dr. Awais Malik
                </h3>
                <p className="text-gray-500 font-semibold text-base sm:text-lg">
                  Bariatric & Laparoscopic Surgeon
                </p>
                <p className="text-[#00A78E] text-xs font-semibold uppercase tracking-wider bg-[#00A78E]/10 px-3 py-1 rounded-full inline-block mt-1">
                  MBBS, FCPS
                </p>
              </div>
            </div>

            {/* Statistics Counters */}
            <div className="grid grid-cols-2 gap-8 py-8 text-center border-b border-gray-100">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A1A1A]">10+</div>
                <div className="text-gray-400 font-semibold text-sm sm:text-base">Years Experience</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#00A78E]">20000+</div>
                <div className="text-gray-400 font-semibold text-sm sm:text-base">Surgeries</div>
              </div>
            </div>

            {/* Quick Clinic Details & Availability */}
            <div className="py-6 border-b border-gray-100 space-y-5">
              {/* Hospital Location */}
              <div className="flex items-start gap-4 text-left">
                <span className="p-2.5 bg-gray-50 rounded-xl shrink-0 border border-gray-100 text-[#00A78E]">
                  <MapPin className="w-5 h-5" strokeWidth={2} />
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Clinic Location</h4>
                  <p className="text-sm font-semibold text-gray-700 leading-snug mt-0.5">Main Medical Complex, Operational Wing</p>
                </div>
              </div>

              {/* Availability Timings */}
              <div className="flex items-start gap-4 text-left">
                <span className="p-2.5 bg-gray-50 rounded-xl shrink-0 border border-gray-100 text-[#00A78E]">
                  <Clock className="w-5 h-5" strokeWidth={2} />
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Availability</h4>
                  <p className="text-sm font-semibold text-gray-700 leading-snug mt-0.5">Mon — Fri (05:00 PM - 09:00 PM)</p>
                </div>
              </div>
            </div>

            {/* Areas of Expertise Tags */}
            <div className="py-6 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-left">
                <Award className="w-4 h-4 text-gray-400" />
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Specialties</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold bg-gray-50 text-gray-600 px-4 py-2 rounded-xl border border-gray-100">Gastric Sleeve</span>
                <span className="text-xs font-semibold bg-gray-50 text-gray-600 px-4 py-2 rounded-xl border border-gray-100">Weight Loss</span>
                <span className="text-xs font-semibold bg-gray-50 text-gray-600 px-4 py-2 rounded-xl border border-gray-100">Laparoscopy</span>
              </div>
            </div>

            {/* Social Channels Segment */}
            <div className="pt-6 space-y-3">
              <p className="text-gray-400 font-semibold text-xs uppercase tracking-wider text-left">
                Follow us:
              </p>
              <div className="flex items-center gap-3 justify-start">
                <a 
                  href="#" 
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:text-[#00A78E] hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:text-[#00A78E] hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div> 

        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;