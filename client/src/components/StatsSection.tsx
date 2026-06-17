import React, { useState, useEffect, useRef } from 'react';
import { useAbout } from '../features/about/hooks/useAbout';

// Inner component to handle animation whenever section enters the screen
const AnimatedCounter = ({ targetValue }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  // Extract digits and non-digits symbols (like +, k)
  const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = targetValue.replace(/[0-9]/g, '');

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2000; // Animation 2 seconds tak chalegi
    let animationFrameId = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * numericValue));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(numericValue);
      }
    };

    // Intersection Observer to detect when section comes into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Jab stat section screen par aaye, animation chalao
          startTimestamp = null;
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          // Jab section screen se bahar chala jaye, wapas 0 kar do taake agli baar phir chale
          setCount(0);
          if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 } // 10% section nazar aate hi trigger ho jayega
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [numericValue]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const { data: about } = useAbout();
  const stats = about?.stats || [
    { value: "600+", label: "Complete Project" },
    { value: "200+", label: "Team Member" },
    { value: "500k+", label: "Clients Reviews" }
  ];

  return (
 <section className="py-10 sm:py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="bg-[#1A1A1A] rounded-[30px] sm:rounded-[40px] p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

      {/* Left Side Title */}
      <div className="text-center lg:text-left max-w-xs lg:max-w-sm shrink-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C1FF72]/50 mb-3">Our Achievements</p>
        <h2 className="text-3xl sm:text-4xl font-semibold  text-[#C1FF72] leading-tight tracking-tight">
          Tomorrow's Health <br />
          <span className="relative inline-block">
            Today's Care
            <div className="absolute -bottom-1 left-0 w-full h-2.5 bg-black/10 -rotate-1 rounded-full"></div>
          </span>
        </h2>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px h-24 bg-[#C1FF72]/15 shrink-0"></div>
      <div className="block lg:hidden w-24 h-px bg-[#C1FF72]/15 shrink-0"></div>

      {/* Right Side Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 w-full lg:w-auto">
        {stats.map((stat, index) => (
          <div key={index} className="text-center space-y-2 group">
            <div className="text-3xl sm:text-4xl font-semibold  text-[#C1FF72] tracking-tighter group-hover:scale-110 transition-transform duration-300">
              <AnimatedCounter targetValue={stat.value} />
            </div>
            <div className="w-8 h-0.5 bg-[#C1FF72]/20 mx-auto rounded-full"></div>
            <p className="text-[#C1FF72] font-bold text-xs sm:text-sm opacity-70 uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>
  );
};

export default StatsSection;