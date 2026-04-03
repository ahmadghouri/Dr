import { useEffect } from 'react';
import PageHero from './components/PageHero';
import { Facebook, Instagram, Twitter, Linkedin, Mail, ArrowRight, ChevronDown } from 'lucide-react';

const DoctorDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const infoItems = [
    { label: 'Expertise', value: 'Cardiac Surgeon' },
    { label: 'Education', value: 'Dhaka Medical College, 2018' },
    { label: 'Experience', value: '5 Years Of Experience In Medicine' },
    { label: 'Profession', value: 'Doctor At Dhaka Medical College, Head OF Biology Department Du' },
    { label: 'Address', value: 'Mirpur 10 Road 14 House 2, Dhaka' },
    { label: 'Phone', value: '017458624863' },
    { label: 'Email', value: 'chirsbekham12@gmail.com' },
    { label: 'Website', value: 'www.Medizen.com' },
  ];

  const scheduleItems = [
    { day: 'Saturday-Sunday', time: '9 Am To 5 Pm' },
    { day: 'Monday-Tuesday', time: '1 Pm To 7 Pm' },
    { day: 'Wednesday-Thursday', time: '2 Am To 6 Pm' },
    { day: 'Friday', time: 'Off Day' },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <PageHero title="Doctor Details" breadcrumb="Doctor Details" />

      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column: Bio, Info Table, Form */}
          <div className="lg:w-[65%] space-y-12">

            {/* Name & Bio */}
            <div className="space-y-4">
              <h2 className="text-[42px] font-black text-[#1A1A1A]">Dr. Chirs Bekham</h2>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">Cardiac Surgeon</p>
              <div className="space-y-6">
                <p className="text-gray-500 text-lg leading-relaxed">
                  Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services encompass a wide range of specialties, including primary care, pediatrics, cardiology, dermatology, and more. Whether it's a routine check-up or a complex surgical procedure, medical professionals work tirelessly to ensure the well-being of their patients.
                </p>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Medical services are an essential part of our lives, offering care and treatment for various.
                </p>
              </div>
            </div>

            {/* Info Table Box */}
            <div className="bg-[#F9FAFB] border border-gray-100 rounded-[30px] p-8 md:p-12 space-y-6">
              {infoItems.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                  <div className="md:w-[150px] shrink-0">
                    <span className="text-[#1A1A1A] font-black text-lg">{item.label}</span>
                  </div>
                  <div className="hidden md:block text-[#1A1A1A] font-black text-lg">:</div>
                  <div>
                    <span className="text-gray-500 font-medium text-lg">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form: Write Your Message */}
            <div className="bg-[#F9FAFB] rounded-[40px] p-10 space-y-8">
              <h3 className="text-[32px] font-black text-[#1A1A1A]">Write Your Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <textarea
                  placeholder="Message here.."
                  className="w-full h-48 bg-white border border-gray-100 rounded-[20px] p-6 focus:outline-none focus:border-[#00A78E] transition-colors resize-none text-gray-600 font-medium"
                ></textarea>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-white border border-gray-100 rounded-full px-8 py-5 focus:outline-none focus:border-[#00A78E] transition-colors text-gray-600 font-medium"
                  />
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 focus:outline-none focus:border-[#00A78E] transition-colors text-gray-600 font-medium"
                    />
                    <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00A78E]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="bg-white border border-gray-100 rounded-full px-8 py-5 focus:outline-none focus:border-[#00A78E] transition-colors text-gray-600 font-medium"
                  />
                  <div className="relative">
                    <select className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 focus:outline-none focus:border-[#00A78E] transition-colors text-gray-400 font-medium appearance-none">
                      <option>Choose a Option</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Pediatrics</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <button className="bg-[#00A78E] text-white px-10 py-5 rounded-full font-black flex items-center gap-3 hover:bg-[#008f7a] transition-all group shadow-lg shadow-[#00A78E]/20">
                  Book An Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Profile Card & Schedule */}
          <div className="lg:w-[35%] space-y-8">

            {/* Profile Card */}
            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 p-10 text-center space-y-6 border border-gray-50">
              <div className="rounded-[30px] overflow-hidden shadow-lg border-4 border-white inline-block">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
                  alt="Doctor Profile"
                  className="w-64 h-64 object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-[28px] font-black text-[#1A1A1A]">Dr. Chirs Bekham</h3>
                <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">Cardiac Surgeon</p>
              </div>
              <div className="flex items-center justify-center space-x-3">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all cursor-pointer shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 p-10 space-y-8 border border-gray-50">
              <div className="space-y-2">
                <h3 className="text-[32px] font-black text-[#1A1A1A]">Schedule</h3>
                <p className="text-gray-500 font-medium">Health care is a vital aspect of maintaining overall well-being, encompassing a range</p>
              </div>

              <div className="space-y-4">
                {scheduleItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border border-gray-100 rounded-2xl px-6 py-4">
                    <span className="text-gray-400 font-bold text-sm">{item.day}</span>
                    <span className="text-gray-500 font-black text-sm">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default DoctorDetailsPage;
