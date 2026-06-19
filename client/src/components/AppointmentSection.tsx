import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import imgjfif from '../assets/img.jfif';

const AppointmentSection = () => {
  return (
    // Section par overflow-hidden rakha hai taake floating elements page se bahar na niklein
    <section className="py-10 lg:py-10 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative flex flex-col lg:flex-row items-center">
        
        {/* Left Side: Image Container (Fixed & Closed properly) */}
        <div className="w-full lg:w-[70%] relative z-0 flex items-center justify-center rounded-[30px] bg-[#FFFFFF] p-4  overflow-hidden">
          <img 
            src={imgjfif} 
            alt="Dr. Awais Malik - Advanced Laparoscopic & Bariatric Surgeon" 
            className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain rounded-[30px]"
          />
          
          {/* Floating decorative circles */}
          <div className="absolute top-[40%] right-[10%] w-4 h-4 bg-[#00A78E]/40 rounded-full blur-sm pointer-events-none"></div>
          <div className="absolute top-[50%] right-[15%] w-8 h-8 border border-[#00A78E]/20 rounded-full pointer-events-none"></div>
        </div> {/* <-- Yeh closing div missing tha pehle */}

        {/* Right Side: Floating Form Container */}
        <div className="w-full lg:w-[50%] lg:-ml-[10%] mt-8 lg:mt-0 relative z-10">
          <div className="bg-white rounded-[30px] p-6 md:p-12 shadow-2xl shadow-black/5 border border-gray-100">
            
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

            {/* Form Fields */}
            <form className="space-y-4 sm:space-y-6">
              {/* Cleaned up duplicate layout classes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all"
                />
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all"
                  />
                  <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00A78E]" />
                </div>
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all"
                />
              </div>
              
              <textarea 
                placeholder="Message" 
                rows={4}
                className="w-full bg-[#F4F9F8] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#00A78E] outline-none transition-all resize-none"
              ></textarea>

              <button type="button" className="w-full bg-[#00A78E] text-white py-4 sm:py-5 rounded-2xl font-semibold text-base sm:text-lg flex items-center justify-center group hover:bg-[#008f7a] transition-all shadow-lg shadow-[#00A78E]/20">
                <span>Book An Appointment</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AppointmentSection;