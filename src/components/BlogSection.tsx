import React from 'react';
import { ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
      title: "Quality Care Exceptional Best Service",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1559839734-2b71f1e598c6?q=80&w=2070&auto=format&fit=crop",
      title: "Medical care encompasses a range of services",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
      title: "Tomorrow's Health is a for Better Health",
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-6 lg:max-w-2xl">
            <div className="inline-block">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Latest Blog and news
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight">
              Caring for You, Caring for <br />
              Health <span className="relative inline-block">
                Guardians
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span>
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-gray-400 text-sm leading-relaxed">
              Medical care encompasses a range of services aimed at promoting health, preventing disease Medical care encompasses Medical care encompasses a range of services aimed at promoting health, preventing disease Medical care encompasses
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left: Large Feature Blog */}
          <div className="lg:w-1/2 relative group cursor-pointer overflow-hidden rounded-[30px] h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dad99901?q=80&w=2070&auto=format&fit=crop" 
              alt="Medical Team" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Teal Overlay */}
            <div className="absolute inset-0 bg-[#00A78E]/60 group-hover:bg-[#00A78E]/70 transition-colors duration-300"></div>
            
            {/* Overlay Text */}
            <div className="absolute bottom-10 left-10 right-10">
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight max-w-sm">
                Health Matters, We Care <br />
                Wellness Begins with Us
              </h3>
            </div>
          </div>

          {/* Right: Blog List */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            {blogs.map((blog, index) => (
              <div 
                key={blog.id} 
                className={`flex items-center gap-6 py-8 group cursor-pointer ${
                  index !== blogs.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-xl font-black text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h4>
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors">
                  <span className="hidden sm:inline">Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default BlogSection;
