import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHero from "./components/PageHero";
import { useDoctor } from "./features/doctors/hooks/useDoctors";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  ChevronDown,
  Star,
} from "lucide-react";

const DoctorDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: doctor, isLoading, error } = useDoctor(id || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-black text-[#1A1A1A]">
            Doctor not found
          </h2>
          <p className="text-gray-500">
            The doctor you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const infoItems = [
    { label: "Expertise", value: doctor.expertise },
    {
      label: "Education",
      value: Array.isArray(doctor.education)
        ? doctor.education.join(", ")
        : doctor.education || "N/A",
    },
    {
      label: "Experience",
      value: Array.isArray(doctor.experience)
        ? doctor.experience.join(", ")
        : doctor.experience || "N/A",
    },
    {
      label: "Specialization",
      value: Array.isArray(doctor.specialization)
        ? doctor.specialization.join(", ")
        : doctor.specialization || "N/A",
    },
    { label: "Working Hours", value: doctor.workingHours || "N/A" },
  ];

  const scheduleItems = [
    {
      day: "Working Hours",
      time: doctor.workingHours || "Contact for schedule",
    },
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
              <h2 className="text-[42px] font-black text-[#1A1A1A]">
                {doctor.name}
              </h2>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">
                {doctor.expertise}
              </p>
              <div className="space-y-6">
                <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-wrap">
                  {doctor.biography || doctor.description}
                </p>
              </div>
            </div>

            {/* Info Table Box */}
            <div className="bg-[#F9FAFB] border border-gray-100 rounded-[30px] p-8 md:p-12 space-y-6">
              {infoItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8"
                >
                  <div className="md:w-[150px] shrink-0">
                    <span className="text-[#1A1A1A] font-black text-lg">
                      {item.label}
                    </span>
                  </div>
                  <div className="hidden md:block text-[#1A1A1A] font-black text-lg">
                    :
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium text-lg">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form: Write Your Message */}
            <div className="bg-[#F9FAFB] rounded-[40px] p-10 space-y-8">
              <h3 className="text-[32px] font-black text-[#1A1A1A]">
                Write Your Message
              </h3>
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
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-64 h-64 object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-[28px] font-black text-[#1A1A1A]">
                  {doctor.name}
                </h3>
                <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">
                  {doctor.expertise}
                </p>
              </div>
              <div className="flex items-center justify-center space-x-3">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all cursor-pointer shadow-sm"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 p-10 space-y-8 border border-gray-50">
              <div className="space-y-2">
                <h3 className="text-[32px] font-black text-[#1A1A1A]">
                  Schedule
                </h3>
                <p className="text-gray-500 font-medium">
                  Health care is a vital aspect of maintaining overall
                  well-being, encompassing a range
                </p>
              </div>

              <div className="space-y-4">
                {scheduleItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border border-gray-100 rounded-2xl px-6 py-4"
                  >
                    <span className="text-gray-400 font-bold text-sm">
                      {item.day}
                    </span>
                    <span className="text-gray-500 font-black text-sm">
                      {item.time}
                    </span>
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
