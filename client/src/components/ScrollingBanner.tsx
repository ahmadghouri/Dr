// import { Sparkles } from 'lucide-react';

// const ScrollingBanner = () => {
//     const items = [
//         "Quality Care Service",
//         "Quality Care Service",
//         "Your Wellness Priority",
//         "Caring for You Always",
//         "Best Medical Support",
//     ];

//     return (
//         <div className="bg-white border-y border-gray-100 py-6 overflow-hidden flex whitespace-nowrap relative">
//             {/* Container for the scrolling animation */}
//             <div className="flex animate-scroll hover:pause">
//                 {/* First set of items */}
//                 {[...Array(4)].map((_, setIdx) => (
//                     <div key={setIdx} className="flex items-center">
//                         {items.map((text, idx) => (
//                             <div key={idx} className="flex items-center mx-8">
//                                 <Sparkles className="w-5 h-5 text-[#1A1A1A] mr-4 fill-current" />
//                                 <span className="text-2xl font-semibold text-[#1A1A1A] uppercase tracking-tight">
//                                     {text}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>

//             <style dangerouslySetInnerHTML={{
//                 __html: `
//         @keyframes scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-scroll {
//           display: flex;
//           width: fit-content;
//           animation: scroll 40s linear infinite;
//         }
//         .pause:hover {
//           animation-play-state: paused;
//         }
//       `}} />
//         </div>
//     );
// };

// export default ScrollingBanner;
import React from 'react';
import { Sparkles } from 'lucide-react';

const ScrollingBanner = () => {
  const items = [
    "Advanced Healthcare, Closer to You",
    "Empowering Your Wellness Journey",
    "Precision Care, Compassionate Hearts",
    "Your Health, Our Sacred Mission",
    "Innovative Treatments, Reliable Results",
  ];

  return (
    // Parent background white/transparent rakha hai
    <div className="bg-white py-8 overflow-hidden flex whitespace-nowrap relative select-none">
      
      {/* Container for the scrolling animation */}
      <div className="flex animate-scroll hover:pause gap-6">
        
        {/* Original Set */}
        <div className="flex items-center gap-6 shrink-0">
          {items.map((text, idx) => (
            <div 
              key={`set1-${idx}`} 
              className="flex items-center whitespace-nowrap bg-[#00A78E] px-6 py-3 rounded-full text-white shadow-lg shadow-[#00A78E]/20"
            >
              <Sparkles className="w-5 h-5 text-[#C1FF72] mr-3 fill-[#C1FF72]/20" strokeWidth={2.5} />
              <span className="text-lg font-semibold uppercase tracking-wide">
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate Set for flawless seamless looping */}
        <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
          {items.map((text, idx) => (
            <div 
              key={`set2-${idx}`} 
              className="flex items-center whitespace-nowrap bg-[#00A78E] px-6 py-3 rounded-full text-white shadow-lg shadow-[#00A78E]/20"
            >
              <Sparkles className="w-5 h-5 text-[#C1FF72] mr-3 fill-[#C1FF72]/20" strokeWidth={2.5} />
              <span className="text-lg font-semibold uppercase tracking-wide">
                {text}
              </span>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 1.5rem)); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
};

export default ScrollingBanner;