import React, { useEffect, useState } from 'react';
import PageHero from './components/PageHero';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const doctors = [
  {
    id: 1,
    name: 'Dr. Alvin Eclair',
    expertise: 'Neurology Expert',
    description: 'Medical care encompasses a range of services aimed at promoting health, preventing disease',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Dr. Alan Jellybean',
    expertise: 'Dental Care',
    description: 'Medical care encompasses a range of services aimed at promoting health, preventing disease',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Dr. Dean R. Chassay',
    expertise: 'Eye Expert',
    description: 'Medical care encompasses a range of services aimed at promoting health, preventing disease',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1928&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Dr. Alan Jellybean',
    expertise: 'Heart Specialist',
    description: 'Medical care encompasses a range of services aimed at promoting health, preventing disease',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Dr. Nikol Jons',
    expertise: 'Heart Specialist',
    description: 'Medical care encompasses a range of services aimed at promoting health, preventing disease',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Dr. Harry Kane',
    expertise: 'Eye Specialist',
    description: 'Medical care encompasses a range of services aimed at promoting health, preventing disease',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop'
  }
];

const DoctorsPage = () => {
  const [hoveredDoctor, setHoveredDoctor] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <PageHero title="Our Doctors" breadcrumb="Doctors" />

      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col border-t border-gray-100">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="relative py-12 border-b border-gray-100 flex flex-col md:flex-row items-center group cursor-pointer transition-all duration-300 hover:bg-gray-50/50 px-4"
              onMouseEnter={() => setHoveredDoctor(doc.id)}
              onMouseLeave={() => setHoveredDoctor(null)}
              onClick={() => navigate('/doctor-details')}
            >
              {/* Doctor Name */}
              <div className="md:w-[25%] mb-4 md:mb-0">
                <h3 className="text-[24px] font-black text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors">
                  {doc.name}
                </h3>
              </div>

              {/* Expertise */}
              <div className="md:w-[20%] mb-4 md:mb-0">
                <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">
                  {doc.expertise}
                </span>
              </div>

              {/* Description */}
              <div className="md:w-[45%] mb-6 md:mb-0 pr-8">
                <p className="text-gray-500 font-medium text-lg leading-relaxed">
                  {doc.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="md:w-[10%] flex justify-end">
                <div className={`w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center transition-all duration-300 ${hoveredDoctor === doc.id ? 'bg-[#C1FF72] border-[#C1FF72]' : 'bg-white'}`}>
                  <ArrowRight className={`w-6 h-6 transition-colors ${hoveredDoctor === doc.id ? 'text-[#1A1A1A]' : 'text-gray-400'}`} />
                </div>
              </div>

              {/* Floating Image Reveal on Hover - Positioned on the Right Side (as per image) */}
              <AnimatePresence>
                {hoveredDoctor === doc.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 50, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      rotate: 8
                    }}
                    exit={{ opacity: 0, scale: 0.8, x: 50, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-[10%] md:right-[12%] top-1/2 -translate-y-1/2 pointer-events-none z-[100] w-48 h-56 rounded-[30px] overflow-hidden shadow-2xl border-4 border-white"
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DoctorsPage;
