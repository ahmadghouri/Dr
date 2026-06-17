import React from 'react';
import { ArrowRight, MessageCircle, ArrowLeft, ArrowRight as ArrowRightIcon, Plus, Quote } from 'lucide-react';

const TestimonialsPriority = () => {
  return (
    <section className="bg-white py-10 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top Part */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 sm:mb-24">

          {/* Left Side */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <div className="inline-block">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest shadow-sm shadow-[#C1FF72]/30">
                Special Care
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-[1.15] tracking-tight">
              Your health, our priority <br />
              <span className="relative inline-block px-1">
                <span className="relative z-10">The Healing</span>
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span>{" "}with heart
            </h2>

            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment, focusing on promoting health and wellness.
            </p>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-2">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#C1FF72] text-BLACK] px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#00A78E] hover:text-[white] transition-all duration-300 group shadow-lg shadow-black/10">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F0FAF8] rounded-full relative shadow-sm">
                  <MessageCircle className="w-5 h-5 text-[#00A78E]" />
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#C1FF72] rounded-full border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Need help?</p>
                  <p className="text-base sm:text-lg font-semibold text-[#1A1A1A] tracking-tight">(+92) 300 3968500</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Feature Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">

            {/* List Item 1 */}
            <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4 group cursor-pointer hover:border-[#00A78E] hover:shadow-md hover:shadow-[#00A78E]/5 transition-all duration-300">
              <div className="w-10 h-10 bg-[#F9F9F9] border border-gray-100 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#C1FF72] group-hover:border-transparent transition-all duration-300">
                <ArrowRightIcon className="w-4 h-4 text-[#1A1A1A] group-hover:text-[#1A1A1A] transition-colors" />
              </div>
              <span className="text-sm font-semibold text-[#1A1A1A]">Caring for you every step of the way</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-[#C1FF72] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* List Item 2 */}
            <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4 group cursor-pointer hover:border-[#00A78E] hover:shadow-md hover:shadow-[#00A78E]/5 transition-all duration-300">
              <div className="w-10 h-10 bg-[#F9F9F9] border border-gray-100 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#C1FF72] group-hover:border-transparent transition-all duration-300">
                <ArrowRightIcon className="w-4 h-4 text-[#1A1A1A] group-hover:text-[#1A1A1A] transition-colors" />
              </div>
              <span className="text-sm font-semibold text-[#1A1A1A]">Expert doctors available 24/7 for your care</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-[#C1FF72] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Image Card */}
            <div className="relative rounded-[28px] overflow-hidden h-[240px] sm:h-[260px] group mt-1 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop"
                alt="Doctor working"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00A78E]/98 via-[#00A78E]/80 to-transparent flex flex-col justify-end p-6 space-y-2">
                <span className="text-[#C1FF72] text-[10px] font-semibold uppercase tracking-widest">Community</span>
                <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">Building healthier communities</h3>
                <p className="text-white/70 text-xs max-w-xs leading-relaxed">
                  Health care is a vital aspect of maintaining overall well-being, encompassing services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Testimonial */}
        <div className="bg-[#1A1A1A] rounded-[36px] sm:rounded-[48px] py-12 sm:py-16 px-6 sm:px-12 md:px-16 relative overflow-hidden">

          {/* Background decoration */}
          <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] bg-[#C1FF72]/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-40px] left-[-40px] w-[200px] h-[200px] bg-[#00A78E]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">

            {/* Quote Icon */}
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-[#C1FF72] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C1FF72]/20">
                <Quote className="w-5 h-5 text-[#1A1A1A] fill-[#1A1A1A]" />
              </div>
            </div>

          
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C1FF72]">Clients Testimonial</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#C1FF72] tracking-tight">
                What Our Users Are{" "}
                <span className="relative inline-block">
                  Saying
                  <div className="absolute -bottom-1 left-0 w-full h-2.5 bg-[#C1FF72]/40 -rotate-1 rounded-full"></div>
                </span>
              </h2>
            </div>

            <p className="text-base md:text-lg text-[#C1FF72] leading-relaxed tracking-tight italic px-2 sm:px-6">
              "Health is wealth, and in the realm of medical health, every life matters. It encompasses a wide range of specialties aimed at diagnosing, treating, and preventing diseases and maintaining overall well-being."
            </p>

            {/* Author */}
            <div className="flex flex-col items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#C1FF72] flex items-center justify-center font-black text-[#A1A1A1] text-sm">
                MK
              </div>
              <div>
                <p className="text-sm font-SEMIBOLD text-[#C1FF72]">Mukesh Kumar</p>
                <p className="text-[11px] text-[#C1FF72] uppercase tracking-widest font-SEMIBOLD">Verified Patient</p>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-1.5 bg-[#C1FF72] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#C1FF72] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#C1FF72] rounded-full"></div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <button className="w-11 h-11 bg-white/10 hover:bg-[#C1FF72] hover:text-[#1A1A1A] text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button className="w-11 h-11 bg-white/10 hover:bg-[#C1FF72] hover:text-[#1A1A1A] text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent">
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsPriority;