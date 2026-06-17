import React from "react";
import Dr from "../assets/about/Dr.jpg";
import { useAbout } from "../features/about/hooks/useAbout";

const AboutSection = () => {
  const { data: about, isLoading } = useAbout();

  if (isLoading)
    return (
      <div className="py-24 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin"></div>
      </div>
    );

  return (
  <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-15 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content Column */}
        <div className="flex-1 space-y-3">
          {/* Badge */}
          <div className="inline-block">
            <span className="bg-[#C1FF72] text-[#1A1A1A] px-8 py-3 rounded-full text-[16px] font-semibold shadow-sm shadow-[#C1FF72]/20">
              About Us
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-[1.1] tracking-tight">
            {about?.title || "Compassionate Care Always There Health First"}
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            {about?.description ||
              "Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment of cuses on promoting"}
          </p>

          {/* Features List */}
          <div className="space-y-8 pt-4">
            {about?.features?.map((feature, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <span className="text-xl font-semibold text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors pt-0.5">
                  0{index + 1}
                </span>
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-[#1A1A1A]">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image Column */}
        <div className="flex-1 relative w-full max-w-[550px] lg:max-w-none">
          {/* Decorative Elements */}
          <div className="absolute top-[20%] left-[-10%] w-64 h-64 border-[30px] border-gray-50 rounded-full opacity-50 z-0 pointer-events-none"></div>
          <div className="absolute bottom-[10%] left-[0%] w-24 h-12 bg-[#00A78E] rounded-t-full z-10 pointer-events-none"></div>
          <div className="absolute top-[40%] right-[0%] w-24 h-12 bg-[#C1FF72] rounded-t-full z-10 pointer-events-none rotate-180"></div>

          {/* Doctor Image Container */}
          <div className="relative z-10">
            <img
              src={about?.image || Dr}
              alt="MediZen Healthcare"
              className="w-full max-h-[600px] object-cover rounded-[100px] shadow-2xl shadow-black/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
