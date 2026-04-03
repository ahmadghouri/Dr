import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      category: "Care Plus",
      title: "Wellness Begins with Us",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      category: "Renew Health Center",
      title: "Quality health close to home",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1e598c6?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      category: "Medical Care",
      title: "Your Journey to Better Health",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop"
    },
    {
      id: 4,
      category: "Health First",
      title: "Expert Care, Exceptional Results",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="bg-[#C1FF72] text-[#1A1A1A] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Latest Project
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight">
            Healing Lives One Patient <br />
            at Time Trusted <span className="relative inline-block">
              Results
              <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
            </span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              {/* Image Container with Hover Effect */}
              <div className="relative rounded-[30px] overflow-hidden aspect-[4/3] mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-[#00A78E]/80 flex items-center justify-center"
                >
                  <div className="w-16 h-16 bg-[#C1FF72] rounded-full flex items-center justify-center shadow-xl">
                    <ArrowRight className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="space-y-2">
                <p className="text-gray-400 text-sm font-medium">{project.category}</p>
                <h3 className="text-2xl font-black text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
