import React, { useEffect, useState } from "react";
import PageHero from "./components/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDoctors } from "./features/doctors/hooks/useDoctors";

const DoctorsPage = () => {
  const [hoveredDoctor, setHoveredDoctor] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: doctors, isLoading } = useDoctors();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <PageHero title="Our Doctors" breadcrumb="Doctors" />

      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col border-t border-gray-100">
          {doctors?.map((doc) => (
            <div
              key={doc._id}
              className="relative py-12 border-b border-gray-100 flex flex-col md:flex-row items-center group cursor-pointer transition-all duration-300 hover:bg-gray-50/50 px-4"
              onMouseEnter={() => setHoveredDoctor(doc._id)}
              onMouseLeave={() => setHoveredDoctor(null)}
              onClick={() => navigate(`/doctor-details/${doc._id}`)}
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
                <div
                  className={`w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center transition-all duration-300 ${hoveredDoctor === doc._id ? "bg-[#C1FF72] border-[#C1FF72]" : "bg-white"}`}
                >
                  <ArrowRight
                    className={`w-6 h-6 transition-colors ${hoveredDoctor === doc._id ? "text-[#1A1A1A]" : "text-gray-400"}`}
                  />
                </div>
              </div>

              {/* Hover Image Tooltip */}
              <AnimatePresence>
                {hoveredDoctor === doc._id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    className="absolute right-[15%] top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:block"
                  >
                    <div className="w-64 h-80 rounded-[40px] overflow-hidden border-[10px] border-white shadow-2xl shadow-black/10 rotate-3">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
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
