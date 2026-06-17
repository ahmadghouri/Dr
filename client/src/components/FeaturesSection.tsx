import React from 'react';
import { ArrowRight, Leaf, FolderHeart, HeartPulse } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Leaf className="w-10 h-10" />,
      title: "Your health our priority wellness Healing with heart",
      link: "Read More",
      color: "text-[#1A1A1A]",
      linkColor: "text-[#1A1A1A]"
    },
    {
      icon: <FolderHeart className="w-10 h-10" />,
      title: "A healthy tomorrow starts today Where health meets hope",
      link: "Read More",
      color: "text-[#1A1A1A]",
      linkColor: "text-[#00A78E]"
    },
    {
      icon: <HeartPulse className="w-10 h-10" />,
      title: "Your health our priority wellness Healing with heart",
      link: "Read More",
      color: "text-[#1A1A1A]",
      linkColor: "text-[#1A1A1A]"
    }
  ];

  return (
<section className="py-10 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-6 group">
              {/* Icon Container */}
              <div className="text-[#1A1A1A] bg-gray-50 p-4  rounded-2xl transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-semibold leading-tight ${feature.color} max-w-[280px]`}>
                {feature.title}
              </h3>

             {/* Link */}
              <div className="relative pt-2 w-full mt-auto">
                <a 
                  href="#" 
                  className={`inline-flex items-center font-semibold text-sm tracking-wide transition-all duration-300 group/link relative pb-1 ${feature.linkColor}`}
                >
                  {feature.link}
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1.5 transition-transform duration-300" />
                  
                  {/* Simple underline like in the image */}
                  <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-current opacity-30 group-hover/link:w-full group-hover/link:opacity-100 transition-all duration-300 ease-out"></span>
                </a>
                {/* Simple underline like in the image */}
                <div className={`mt-1 h-[1px] w-12 bg-current opacity-20`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
