import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: "600+", label: "Complte Project" },
    { value: "200+", label: "Team Member" },
    { value: "500k+", label: "Clients Reviews" }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#C1FF72] rounded-[40px] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Side Title */}
          <div className="lg:max-w-[300px]">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] leading-tight tracking-tight">
              Tomorrow's Health <br />
              Today's Care
            </h2>
          </div>

          {/* Right Side Stats */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left space-y-2">
                <div className="text-5xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter">
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
