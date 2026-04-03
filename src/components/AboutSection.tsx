import React from 'react';
import Dr from '../assets/about/Dr.jpg';

const AboutSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content Column */}
        <div className="flex-1 space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="bg-[#C1FF72] text-[#1A1A1A] px-6 py-2 rounded-full text-sm font-bold shadow-sm shadow-[#C1FF72]/20">
              About Us
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-tight tracking-tight">
            Compassionate Care <br />
            Always There <span className="relative inline-block">
              Health
              <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
            </span> First
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment of cuses on promoting
          </p>

          {/* Features List */}
          <div className="space-y-8 pt-4">
            {/* Point 01 */}
            <div className="flex items-start space-x-6 group">
              <span className="text-2xl font-black text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors">01</span>
              <div className="space-y-2">
                <h4 className="text-xl font-extrabold text-[#1A1A1A]">Enhancing Lives Through Care</h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                  Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment of cuses on promoting
                </p>
              </div>
            </div>

            {/* Point 02 */}
            <div className="flex items-start space-x-6 group">
              <span className="text-2xl font-black text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors">02</span>
              <div className="space-y-2">
                <h4 className="text-xl font-extrabold text-[#1A1A1A]">Tomorrow's Health, Today's Care</h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                  Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment of cuses on promoting
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="flex-1 relative">
          {/* Decorative Elements */}
          <div className="absolute top-[20%] left-[-10%] w-64 h-64 border-[30px] border-gray-50 rounded-full opacity-50 z-0 pointer-events-none"></div>
          <div className="absolute bottom-[10%] left-[0%] w-24 h-12 bg-[#00A78E] rounded-t-full z-10 pointer-events-none"></div>
          <div className="absolute top-[40%] right-[0%] w-24 h-12 bg-[#C1FF72] rounded-t-full z-10 pointer-events-none rotate-180"></div>
          

          {/* Doctor Image Container */}
          <div className="relative z-10">
            {/* Outline SVG behind doctor */}
            {/* <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 500">
              <path d="M50,100 Q200,50 350,100 L350,400 Q200,450 50,400 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg> */}
            <img 
              src={Dr}
              alt="Dr. Awais Malik" 
              className="w-full h-auto object-cover rounded-[100px] shadow-2xl shadow-black/5"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
