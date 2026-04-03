import React from 'react';
import { ArrowRight, ClipboardPlus, Activity, Heart } from 'lucide-react';

const SpecialFeatures = () => {
  const featureList = [
    {
      icon: <ClipboardPlus className="w-6 h-6 text-[#1A1A1A]" />,
      title: "Quality Care Exceptional Service",
      points: ["Your Health, Our Priority", "Harmony Health"]
    },
    {
      icon: <Activity className="w-6 h-6 text-[#1A1A1A]" />,
      title: "Healing Lives One Patient at a Time",
      points: ["Your Health, Our Priority", "Harmony Health"]
    },
    {
      icon: <Heart className="w-6 h-6 text-[#1A1A1A]" />,
      title: "Caring for You Caring for Tomorrow",
      points: ["Your Health, Our Priority", "Harmony Health"]
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Card Container */}
        <div className="bg-[#FAFAFA] rounded-[40px] p-8 md:p-16 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E0F2EF] opacity-40 rounded-full blur-[100px] -mr-32 -mt-32"></div>

          {/* Section Header */}
          <div className="mb-16">
            <div className="inline-block mb-6">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Our Feature
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight max-w-2xl">
              Compassionate Care <br />
              Health <span className="relative inline-block">
                Exceptional Results
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span>
            </h2>
          </div>

          {/* Features List */}
          <div className="space-y-0">
            {featureList.map((item, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-start md:items-center justify-between py-10 ${
                  index !== featureList.length - 1 ? 'border-b border-gray-200' : ''
                } group hover:bg-white/50 transition-colors duration-300 rounded-xl px-4 -mx-4`}
              >
                {/* Left: Icon and Title */}
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="w-14 h-14 bg-[#C1FF72] rounded-full flex items-center justify-center shadow-lg shadow-[#C1FF72]/20">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#1A1A1A] max-w-[250px]">
                    {item.title}
                  </h3>
                </div>

                {/* Middle: Bullet Points */}
                <div className="flex flex-col space-y-2 mb-6 md:mb-0">
                  {item.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center space-x-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                      <span className="text-sm font-medium">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Right: Read More Button */}
                <button className="flex items-center space-x-3 bg-white border border-gray-100 px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 group/btn">
                  <span className="text-sm font-bold">Read More</span>
                  <div className="w-6 h-6 flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialFeatures;
