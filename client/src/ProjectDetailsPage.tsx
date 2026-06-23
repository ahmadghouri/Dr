import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHero from "./components/PageHero";
import { useProject } from "./features/projects/hooks/useProjects";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProject(id || "");

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

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center space-y-4 px-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A]">
            Project not found
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
            The project you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const infoBar = [
    { label: "Location", value: project.location || "N/A" },
    { label: "Clients", value: project.client || "N/A" },
    { label: "Website", value: project.website || "N/A" },
    { label: "Date", value: new Date(project.createdAt).toLocaleDateString() },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-sans overflow-x-hidden">
      {/* <PageHero title="Project Details" breadcrumb="Project Details" /> */}

      {/* Main Section - Adjusted padding dynamically */}
      <section className="py-12 sm:py-20 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col items-center text-center space-y-8 sm:space-y-12 w-full">
          
          {/* Main Title - Fully Fluid Typography */}
          <h1 className="text-3xl sm:text-5xl md:text-[64px] font-semibold text-[#1A1A1A] max-w-[900px] leading-tight tracking-tight px-2">
            {project.title}
          </h1>

          {/* Info Bar - Dynamic Grid Shifts from 1 to 2 to 4 columns */}
          <div className="w-full bg-gray-50/50 rounded-2xl sm:rounded-[20px] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border border-gray-100 shadow-sm text-center">
            {infoBar.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center sm:items-start space-y-1 sm:space-y-2 border-b border-gray-100/70 last:border-none sm:border-none pb-4 sm:pb-0"
              >
                <span className="text-[#1A1A1A] font-semibold text-base sm:text-lg">
                  {item.label}
                </span>
                <span className="text-gray-400 font-semibold text-xs sm:text-sm truncate w-full sm:text-left">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Large Hero Image - Dynamic Aspect Ratio Scaling */}
          <div className="w-full h-[280px] sm:h-[450px] lg:h-[600px] rounded-2xl sm:rounded-[30px] lg:rounded-[40px] overflow-hidden shadow-xl sm:shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Description Block */}
          <div className="text-left w-full space-y-6 sm:space-y-8">
            <p className="text-gray-500 text-sm sm:text-lg leading-relaxed whitespace-pre-wrap">
              {project.fullContent || project.description}
            </p>
          </div>

          {/* Top Filler Description */}
          <p className="text-gray-500 text-sm sm:text-lg leading-relaxed text-left max-w-full">
            Medical care encompasses a range of services aimed at promoting
            health, preventing disease, and treating illnesses. From routine
            check-ups to life-saving surgeries, medical care plays a crucial
            role in ensuring the well-being of individuals and communities.
          </p>

          {/* Two-Image Split Layout - Grid to stack seamlessly on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full pt-4">
            
            {/* Feature Left Column */}
            <div className="space-y-4 sm:space-y-6 text-left">
              <div className="h-[220px] sm:h-[350px] rounded-2xl sm:rounded-[30px] overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop"
                  alt="Feature 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-[28px] font-semibold text-[#1A1A1A]">
                Health Guardians
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Medical care encompasses a range of services aimed at promoting
                health, preventing disease, and treating illnesses.
              </p>
              <ul className="space-y-2.5 sm:space-y-3">
                {[
                  "Your Health, Our Priority",
                  "Compassionate Care, Exceptional Results",
                  "Healing Lives, One Patient at a Time",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[#1A1A1A] font-semibold text-sm sm:text-base group cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 text-[#00A78E] group-hover:translate-x-1 transition-transform shrink-0 mt-0.5" />
                    <span className="leading-tight">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature Right Column */}
            <div className="space-y-4 sm:space-y-6 text-left">
              <div className="h-[220px] sm:h-[350px] rounded-2xl sm:rounded-[30px] overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1584515868428-f20ad767f7ca?q=80&w=2070&auto=format&fit=crop"
                  alt="Feature 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-[28px] font-semibold text-[#1A1A1A]">
                Harmony Health
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Medical care encompasses a range of services aimed at promoting
                health, preventing disease, and treating illnesses.
              </p>
              <ul className="space-y-2.5 sm:space-y-3">
                {[
                  "Partnering for Better Health",
                  "Tomorrow's Health, Today's Care",
                  "Caring for You, Caring for Tomorrow",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[#1A1A1A] font-semibold text-sm sm:text-base group cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 text-[#00A78E] group-hover:translate-x-1 transition-transform shrink-0 mt-0.5" />
                    <span className="leading-tight">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Summary Section */}
          <div className="text-left space-y-4 sm:space-y-6 w-full pt-8 sm:pt-12">
            <h3 className="text-2xl sm:text-[32px] font-semibold text-[#1A1A1A]">
              Health Matters We Care
            </h3>
            <p className="text-gray-500 text-sm sm:text-lg leading-relaxed">
              Medical services are an essential part of our lives, offering care
              and treatment for various health conditions. These services encompass a wide range of specialties.
            </p>
          </div>

          {/* Pagination Buttons - Converted to icon layout on extra small mobile */}
          <div className="w-full pt-8 sm:pt-16 flex items-center justify-between border-t border-gray-100 mt-6">
            <button className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 border border-gray-100 rounded-full text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:bg-gray-50 transition-all group">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Previous post</span>
            </button>
            <button className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 border border-gray-100 rounded-full text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:bg-gray-50 transition-all group">
              <span>Next post</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;