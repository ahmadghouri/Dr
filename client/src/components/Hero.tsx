import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen sm:min-h-[750px] lg:min-h-[750px] flex items-center justify-center overflow-hidden bg-white px-4 sm:px-6"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-[#F0FAF8] opacity-70 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-[#F4F9F8] opacity-70 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Background Circles */}
      <div className="absolute top-[12%] right-[12%] w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] border border-emerald-50 rounded-full opacity-40"></div>
      <div className="absolute bottom-[5%] left-[5%] w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] border border-emerald-50 rounded-full opacity-40"></div>

      <div className="max-w-[1200px] mx-auto mt-0 sm:mt-[-60px] lg:mt-[-100px] md:pt-0 text-center relative z-10">

        {/* Badge */}
        <div className="inline-block mb-4">
          <div className="bg-[#C1FF72] text-[#1A1A1A] px-7 py-2.5 rounded-full text-sm font-semibold tracking-tight shadow-sm shadow-[#C1FF72]/30">
            Medical Care
          </div>
        </div>

        {/* Heading Container with Spotlight Effect */}
        <div className="relative select-none group py-4 flex justify-center">
          {/* Base Text */}
          <h1 className="text-[32px] sm:text-[48px] md:text-[72px] font-semibold text-[#1A1A1A] leading-[1.1] tracking-[-0.03em] text-center max-w-[1000px]">
            Quality <span className="relative inline-block px-1">
              <span className="relative z-10">Health</span>
              <div className="absolute -bottom-2 left-0 w-full h-2.5 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
            </span> close to <br />
            home Caring you every <br />
            step
          </h1>

          {/* Spotlight Reveal Layer */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center"
            style={{
              clipPath: isHovered
                ? `circle(120px at ${springX}px ${springY}px)`
                : 'circle(0px at 0px 0px)',
              WebkitClipPath: isHovered
                ? `circle(120px at ${springX}px ${springY}px)`
                : 'circle(0px at 0px 0px)',
            }}
          >
            <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
              <h1 className="text-[32px] sm:text-[48px] md:text-[72px] font-black text-white leading-[1.1] tracking-[-0.03em] text-center max-w-[1000px]">
                Quality <span className="relative inline-block px-1">
                  <span className="relative z-10 text-white">Health</span>
                  <div className="absolute -bottom-2 left-0 w-full h-2.5 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
                </span> close to <br />
                home Caring you every <br />
                step
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-10 mt-10 sm:mt-16">
          <button className="w-full sm:w-auto bg-[#1A1A1A] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center group hover:bg-[#00A78E] transition-all duration-500 shadow-2xl shadow-black/10">
            Make Appointment
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>

          <button className="flex items-center space-x-4 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#00A78E] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#00A78E]/30 group-hover:scale-110 transition-transform duration-500">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors duration-300">Play Now</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;