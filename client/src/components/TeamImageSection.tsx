import { motion } from 'framer-motion';
import hero1Thumb from '../assets/hero1-thumb.jpg';

const TeamImageSection = () => {
  return (
    <section className="relative w-full pb-20 overflow-visible bg-white">
      {/* Background Decorative Elements */}
      {/* Left Big Semi-circle */}
      <div className="absolute top-0 left-[-10%] w-[400px] h-[400px] border-[40px] border-[#C1FF72]/20 rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main Image Container */}
        <div className="relative rounded-[40px] overflow-visible shadow-2xl shadow-black/5">
          {/* Working Since Badge */}
          <div className="absolute top-0 left-[65%] -translate-y-1/2 z-30 w-48 h-48 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[#C1FF72] rounded-full shadow-2xl shadow-[#C1FF72]/40 flex items-center justify-center"
            >
              {/* Circular Text using SVG */}
              <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                <defs>
                  <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text className="text-[10px] font-black uppercase tracking-[0.2em] fill-[#1A1A1A]">
                  <textPath xlinkHref="#circlePath">
                    BEST MEDICAL CARE • WORKING SINCE 1988 •
                  </textPath>
                </text>
              </svg>
            </motion.div>
            {/* Static Center Icon - Matching the new screenshot */}
            <div className="relative z-20 w-16 h-16 bg-[#C1FF72] rounded-full flex items-center justify-center">
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Two overlapping squares with arrow */}
                <div className="absolute top-0 left-0 w-5 h-5 border-2 border-[#1A1A1A]/30 rounded-sm"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-2 border-[#1A1A1A] rounded-sm flex items-center justify-center bg-[#C1FF72]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-[#1A1A1A]">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* The Image */}
          <img
            src={hero1Thumb}
            alt="Medical Team Meeting"
            className="w-full h-auto object-cover rounded-[40px] min-h-[500px]"
          />

          {/* Bottom Left Small Circle */}
        </div>
      </div>

      {/* Bottom decorative wave or shadow */}
    </section>
  );
};

export default TeamImageSection;
