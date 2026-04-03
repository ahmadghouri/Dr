import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  breadcrumb: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, breadcrumb }) => {
  return (
    <section className="relative w-full bg-[#FFFFFF] pt-28 pb-20 overflow-hidden border-b border-gray-100/50">

      {/* Centered Medical Illustration (Outline Sketchy Style) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-[600px] h-full opacity-[0.12] -translate-y-4 translate-x-10">
          <svg
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#00A78E]"
          >
            {/* Outline Sketchy Doctor and Patient (Simplified paths) */}
            <path
              d="M340 120c0 33-27 60-60 60s-60-27-60-60 27-60 60-60 60 27 60 60z"
              stroke="currentColor" strokeWidth="8" strokeLinecap="round"
            />
            <path
              d="M220 280v140c0 22 18 40 40 40h40c22 0 40-18 40-40V280M180 200h200c33 0 60 27 60 60v40"
              stroke="currentColor" strokeWidth="8" strokeLinecap="round"
            />
            <path
              d="M120 320c0-22 18-40 40-40h20M100 420c0-33 27-60 60-60h60M80 340v120"
              stroke="currentColor" strokeWidth="8" strokeLinecap="round"
            />
            <path
              d="M160 220c0-22-18-40-40-40s-40 18-40 40 18 40 40 40 40-18 40-40z"
              stroke="currentColor" strokeWidth="8" strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-24 lg:px-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">

          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:flex-1"
          >
            <h1 className="text-[48px] md:text-[68px] font-black text-[#1A1A1A] leading-tight tracking-tight">
              {title}
            </h1>
          </motion.div>

          {/* Right: Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex items-center space-x-3 text-[18px] font-bold mt-6 md:mt-0"
          >
            <span className="text-[#1A1A1A] hover:text-[#00A78E] cursor-pointer transition-colors duration-300">
              Home
            </span>
            <span className="text-gray-300 font-light">/</span>
            <span className="text-[#1A1A1A] opacity-90">
              {breadcrumb}
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PageHero;
