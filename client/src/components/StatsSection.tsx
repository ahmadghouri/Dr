import React from 'react';
import { useAbout } from '../features/about/hooks/useAbout';

const StatsSection = () => {
  const { data: about } = useAbout();
  const stats = about?.stats || [
    { value: "600+", label: "Complete Project" },
    { value: "200+", label: "Team Member" },
    { value: "500k+", label: "Clients Reviews" }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#C1FF72] rounded-[40px] p-10 md:p-16 flex flex-col items-center justify-between gap-12">
          
          {/* Left Side Title */}
          <div className="">
            <h2 className="text-3xl font-black text-[#1A1A1A] leading-tight tracking-tight">
              Tomorrow's Health Today's Care
            </h2>
          </div>

          {/* Right Side Stats */}
          <div className="flex justify-center w-full gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl font-black text-[#1A1A1A] tracking-tighter">
                  {stat.value}
                </div>
                <p className="text-[#1A1A1A] font-bold text-sm md:text-base opacity-80 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;
