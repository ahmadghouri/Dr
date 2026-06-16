import { ArrowRight, MessageCircle, ArrowLeft, ArrowRight as ArrowRightIcon, Plus } from 'lucide-react';

const TestimonialsPriority = () => {
  return (
    <section className="bg-white pb-0 overflow-visible relative">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Top Part: Priority Content and Feature Cards */}
        <div className="flex flex-col lg:flex-row gap-16 mb-20 relative z-10">
          
          {/* Left Side: Priority Content */}
          <div className="lg:w-[55%] space-y-10">
            <div className="inline-block">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm shadow-[#C1FF72]/20">
                Special Care
              </span>
            </div>
            <h2 className="text-5xl font-black text-[#1A1A1A] leading-[1.1] tracking-tight">
              Your health, our priority <br />
              <span className="relative inline-block">
                The Healing
                <div className="absolute -bottom-2 left-0 w-full h-[12px] bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span> with heart
            </h2>
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed font-medium">
              Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment of cuses on promoting Health care is a vital aspect of maintaining overall well-being.
            </p>
            
            <div className="flex flex-wrap items-center gap-10 pt-4">
              <button className="flex items-center space-x-3 bg-white border-2 border-gray-100 px-10 py-4 rounded-full font-black text-sm hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300 group shadow-sm">
                <span>Read More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 flex items-center justify-center bg-[#F4F9F8] rounded-full relative group cursor-pointer">
                  <MessageCircle className="w-7 h-7 text-[#00A78E] transition-transform group-hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00A78E] rounded-full border-2 border-white"></div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Need help?</p>
                  <p className="text-[20px] font-black text-[#1A1A1A]">(+92 300 3968500</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Feature Cards */}
          <div className="lg:w-[45%] flex flex-col gap-6 pt-4">
            {/* White Bars */}
            <div className="bg-white border-2 border-gray-50 p-7 rounded-[24px] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex items-center space-x-5">
                <div className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
                <span className="text-[19px] font-extrabold text-[#1A1A1A]">Caring for you every step of the way</span>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-50 p-7 rounded-[24px] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex items-center space-x-5">
                <div className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
                <span className="text-[19px] font-extrabold text-[#1A1A1A]">Caring for you every step of the way</span>
              </div>
            </div>
            
            {/* Teal Image Card */}
            <div className="relative rounded-[30px] overflow-hidden h-[320px] group shadow-2xl shadow-[#00A78E]/10 mt-2">
              <img 
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop" 
                alt="Doctor working" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#00A78E]/95 flex flex-col items-center justify-center p-10 text-center space-y-5">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                  <div className="relative">
                    <MessageCircle className="w-8 h-8 text-[#00A78E]" />
                    <Plus className="absolute -top-1 -right-1 w-4 h-4 text-[#00A78E] font-bold" />
                  </div>
                </div>
                <h3 className="text-[28px] font-black text-white leading-tight">Building healthier <br /> communities</h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-[300px]">
                  Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment
                </p>
                <button className="bg-white/10 hover:bg-white hover:text-[#00A78E] text-white px-8 py-3 rounded-full text-sm font-black transition-all border border-white/20">
                  Read More →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Part: Overlapping Testimonial Card */}
        <div className="relative z-20 pt-5">
          <div className="bg-[#C1FF72] rounded-[50px] pt-12 relative overflow-hidden shadow-2xl shadow-[#C1FF72]/20 border-4 border-white">
            {/* World Map Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-[length:1200px]"></div>

            <div className="relative z-10 text-center max-w-5xl mx-auto space-y-12">
              <div className="space-y-5">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-[#1A1A1A] opacity-50">Clients Testimonial</p>
                <h2 className="text-5xl font-black text-[#1A1A1A] leading-tight tracking-tighter">What Our Users <br /> Are Saying</h2>
              </div>
              
              <div className="relative px-10">
                <p className="text-xl font-black text-[#1A1A1A] leading-[1.4] tracking-tight italic">
                  "Health is wealth, and in the realm of medical health, every life matters. It is a encompasses a wide range of specialties aimed at diagnosing, treating, and preventing diseases and maintaining overall well-being. Medical health for a professionals dedicate their lives to providing care."
                </p>
              </div>
              
              <div className="pt-4 flex flex-col items-center">
                <div className="h-[3px] w-16 bg-[#1A1A1A] mb-6 rounded-full"></div>
                <p className="text-xl font-black text-[#1A1A1A]">Mukesh Kumar</p>
              </div>

              {/* Navigation Arrows on sides */}
              <div className="hidden md:flex items-center justify-between absolute top-1/2 left-[-20px] right-[-20px] -translate-y-1/2">
                <button className="w-16 h-16 bg-white/20 hover:bg-[#1A1A1A] hover:text-white rounded-full flex items-center justify-center transition-all group backdrop-blur-sm border border-[#1A1A1A]/5">
                  <ArrowLeft className="w-7 h-7 group-active:scale-90 transition-transform" />
                </button>
                <button className="w-16 h-16 bg-white/20 hover:bg-[#1A1A1A] hover:text-white rounded-full flex items-center justify-center transition-all group backdrop-blur-sm border border-[#1A1A1A]/5">
                  <ArrowRightIcon className="w-7 h-7 group-active:scale-90 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Spacer for overlapping effect with section below */}
    </section>
  );
};

export default TestimonialsPriority;
