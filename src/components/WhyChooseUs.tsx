import React from 'react';
import { Play } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        
        {/* Left Content and Big Image */}
        <div className="lg:w-[50%] space-y-10">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Why Chose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight">
              Empower Health <br />
              Lives <span className="relative inline-block">
                Expert
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span> Care
            </h2>
          </div>

          {/* Big Horizontal Image */}
          <div className="rounded-[30px] overflow-hidden shadow-xl shadow-black/5">
            <img 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop" 
              alt="Medical Team Discussion" 
              className="w-full h-[350px] object-cover"
            />
          </div>
        </div>

        {/* Right Side: Grid of 2 Vertical Images */}
        <div className="lg:w-[50%] flex flex-col sm:flex-row gap-8">
          {/* Middle Column: Vertical Image with Text */}
          <div className="flex-1 space-y-6">
            <div className="rounded-[30px] overflow-hidden shadow-xl shadow-black/5 h-[350px]">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f1e598c6?q=80&w=2070&auto=format&fit=crop" 
                alt="Doctor with patient" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-black text-[#1A1A1A]">The Enhanc Lives care Through Care</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive
              </p>
            </div>
          </div>

          {/* Right Column: Tall Vertical Image with Play Button */}
          <div className="flex-1 relative">
            <div className="rounded-[30px] overflow-hidden shadow-xl shadow-black/5 h-full min-h-[450px]">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop" 
                alt="Doctors checking X-ray" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Play Button Overlay */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-16 h-16 bg-[#C1FF72] rounded-full flex items-center justify-center shadow-lg shadow-[#C1FF72]/40 cursor-pointer hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 fill-[#1A1A1A] text-[#1A1A1A] ml-1" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
