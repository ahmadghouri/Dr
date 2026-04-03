import { Sparkles } from 'lucide-react';

const ScrollingBanner = () => {
    const items = [
        "Quality Care Service",
        "Quality Care Service",
        "Your Wellness Priority",
        "Caring for You Always",
        "Best Medical Support",
    ];

    return (
        <div className="bg-white border-y border-gray-100 py-6 overflow-hidden flex whitespace-nowrap relative">
            {/* Container for the scrolling animation */}
            <div className="flex animate-scroll hover:pause">
                {/* First set of items */}
                {[...Array(4)].map((_, setIdx) => (
                    <div key={setIdx} className="flex items-center">
                        {items.map((text, idx) => (
                            <div key={idx} className="flex items-center mx-8">
                                <Sparkles className="w-5 h-5 text-[#1A1A1A] mr-4 fill-current" />
                                <span className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">
                                    {text}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: fit-content;
          animation: scroll 40s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}} />
        </div>
    );
};

export default ScrollingBanner;
