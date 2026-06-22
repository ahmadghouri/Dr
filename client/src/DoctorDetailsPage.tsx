import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHero from "./components/PageHero";
import { useDoctor } from "./features/doctors/hooks/useDoctors";
import {
  Facebook, Instagram, Twitter, Linkedin,
  Mail, ArrowRight, ChevronDown, CalendarCheck,
  HeartPulse,
} from "lucide-react";
const DoctorDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: doctor, isLoading, error } = useDoctor(id || "");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5] pt-20">
        <div className="w-10 h-10 border-[3px] border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin" />
      </div>
    );

  if (error || !doctor)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5] pt-20">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-semibold text-[#0A0A0A]">Doctor not found</h2>
          <p className="text-gray-400 text-sm">
            The doctor you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );

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

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F7F7F5]">
      <PageHero title="Doctor Details" breadcrumb="Doctor Details" />

      <section className="py-16 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── Left Column ── */}
          <div className="lg:w-[65%] space-y-8">

            {/* Name & Bio */}
            <div>
              <h2
                className="text-[38px] font-semibold text-[#0A0A0A] leading-tight mb-3"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {doctor.name}
              </h2>
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-[#00A78E] bg-[#E8FAF5] px-3 py-1.5 rounded-full mb-4">
                <HeartPulse className="w-3 h-3" />
                {doctor.expertise}
              </span>
              <p className="text-gray-500 text-[15px] leading-[1.8]">
                {doctor.biography || doctor.description}
              </p>
            </div>

            {/* Info Table */}
            <div className="bg-white border border-[#E8E8E4] rounded-2xl overflow-hidden">
              {infoItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-stretch border-b border-[#F0F0EE] last:border-b-0"
                >
                  <div className="w-[140px] shrink-0 border-r border-[#F0F0EE] px-4 py-4 flex items-center">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#]">
                      {item.label}
                    </span>
                  </div>
                  <div className="px-4 py-4 flex items-center">
                    <span className="text-[13px] font-medium text-[#B0B0A8]">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-white border border-[#E8E8E4] rounded-2xl p-8 space-y-6">
              <h3
                className="text-[26px] font-semibold text-[#0A0A0A]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Write your message
              </h3>

               <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <textarea
                  placeholder="Describe your concern or question…"
                  className="w-full h-[100px] bg-[#F7F7F5] border border-[#E8E8E4] rounded-xl p-4 text-[13px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors resize-none"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="bg-[#F7F7F5] border border-[#E8E8E4] rounded-full px-5 py-3 text-[13px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors"
                  />
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full bg-[#F7F7F5] border border-[#E8E8E4] rounded-full px-5 py-3 pr-10 text-[13px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00A78E]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="bg-[#F7F7F5] border border-[#E8E8E4] rounded-full px-5 py-3 text-[13px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors"
                  />
                  <div className="relative">
                    <select className="w-full bg-[#F7F7F5] border border-[#E8E8E4] rounded-full px-5 py-3 text-[13px] text-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors appearance-none">
                      <option>Choose department</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Pediatrics</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 bg-[#008F7A] text-[#ffff] text-[13px] font-semibold px-6 py-3 rounded-full cursor-pointer hover:bg-[#00A78E] hover:text-white transition-all group">
                  <CalendarCheck className="w-4 h-4" />
                  Book an Appointment
                </button>
              </form> 
              
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="lg:w-[35%] space-y-4 lg:sticky lg:top-24">

            {/* Profile Card */}
            <div className="bg-white border border-[#E8E8E4] rounded-2xl overflow-hidden">
              <div className="relative  bg-[#0A0A0A]">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-3 left-3 bg-[#00A78E] text-[#F7F7F5] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                  Available
                </span>
              </div>
              <div className="p-5">
                <h3
                  className="text-[20px] font-semibold text-[#0A0A0A] mb-1"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {doctor.name}
                </h3>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-[#00A78E] mb-4">
                  {doctor.expertise}
                </p>
                <div className="flex gap-2">
                  {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-full border border-[#E8E8E4] bg-[#F7F7F5] flex items-center justify-center text-gray-400 hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "10+", label: "Years exp." },
                { num: "2.4k", label: "Patients" },
                { num: "4.9", label: "Rating" },
                { num: "98%", label: "Success rate" },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-[#E8E8E4] rounded-xl p-4 text-center">
                  <div
                    className="text-[26px] font-semibold text-[#0A0A0A] leading-none"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-[#B0B0A8] mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule Card */}
            <div className="bg-white border border-[#E8E8E4] rounded-2xl p-5 space-y-4">
              <div>
                <h3
                  className="text-[20px] font-semibold text-[#0A0A0A] mb-1"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Schedule
                </h3>
                <p className="text-[12px] text-gray-400 leading-relaxed">
                  Availability for in-person consultations
                </p>
              </div>
              <div className="space-y-2">
                {[
                  { day: doctor.workingHours || "Working hours", time: "Contact for schedule" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-[#F7F7F5] rounded-lg px-4 py-3"
                  >
                    <span className="text-[12px] font-medium text-gray-500">{item.day}</span>
                    <span className="text-[12px] font-semibold text-[#0A0A0A]">{item.time}</span>
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
