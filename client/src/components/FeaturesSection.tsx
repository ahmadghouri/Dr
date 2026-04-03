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
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start space-y-6 group">
              {/* Icon Container */}
              <div className="text-[#1A1A1A] transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold leading-tight ${feature.color} max-w-[280px]`}>
                {feature.title}
              </h3>

              {/* Link */}
              <div className="relative pt-2">
                <a 
                  href="#" 
                  className={`flex items-center font-bold text-sm tracking-wide transition-all duration-300 group/link ${feature.linkColor}`}
                >
                  {feature.link}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
