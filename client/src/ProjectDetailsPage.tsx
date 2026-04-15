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
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-black text-[#1A1A1A]">
            Project not found
          </h2>
          <p className="text-gray-500">
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
    <div className="flex flex-col w-full min-h-screen bg-white font-sans">
      <PageHero title="Project Details" breadcrumb="Project Details" />

      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Main Title */}
          <h1 className="text-[48px] md:text-[64px] font-black text-[#1A1A1A] max-w-[900px] leading-tight">
            {project.title}
          </h1>

          {/* Info Bar */}
          <div className="w-full bg-gray-50/50 rounded-[20px] p-8 grid grid-cols-1 md:grid-cols-4 gap-8 border border-gray-100 shadow-sm">
            {infoBar.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center md:items-start space-y-2"
              >
                <span className="text-[#1A1A1A] font-black text-lg">
                  {item.label}
                </span>
                <span className="text-gray-400 font-medium text-sm">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Large Hero Image */}
          <div className="w-full h-[600px] rounded-[40px] overflow-hidden shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="text-left w-full space-y-8">
            <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-wrap">
              {project.fullContent || project.description}
            </p>
          </div>

          {/* Top Description */}
          <p className="text-gray-500 text-lg leading-relaxed text-left max-w-full">
            Medical care encompasses a range of services aimed at promoting
            health, preventing disease, and treating illnesses. From routine
            check-ups to life-saving surgeries, medical care plays a crucial
            role in ensuring the well-being of individuals and communities.
            Medical care encompasses a range of services aimed at promoting
            health, preventing disease, and treating illnesses. From routine
            check-ups to life-saving surgeries, medical care plays a crucial
            role in ensuring the well-being of individuals and communities.
          </p>

          {/* Two-Image Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="space-y-6 text-left">
              <div className="h-[350px] rounded-[30px] overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop"
                  alt="Feature 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[28px] font-black text-[#1A1A1A]">
                Health Guardians
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Medical care encompasses a range of services aimed at promoting
                health, preventing disease, and treating illnesses. From routine
                check-ups to life-saving surgeries.
              </p>
              <ul className="space-y-3">
                {[
                  "Your Health, Our Priority",
                  "Compassionate Care, Exceptional Results",
                  "Healing Lives, One Patient at a Time",
                  "Empowering Health, Empowering Lives",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[#1A1A1A] font-bold group cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 text-[#00A78E] group-hover:translate-x-1 transition-transform" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 text-left">
              <div className="h-[350px] rounded-[30px] overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1584515868428-f20ad767f7ca?q=80&w=2070&auto=format&fit=crop"
                  alt="Feature 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[28px] font-black text-[#1A1A1A]">
                Harmony Health
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Medical care encompasses a range of services aimed at promoting
                health, preventing disease, and treating illnesses. From routine
                check-ups to life-saving surgeries.
              </p>
              <ul className="space-y-3">
                {[
                  "Partnering for Better Health",
                  "Tomorrow's Health, Today's Care",
                  "Caring for You, Caring for Tomorrow",
                  "Expert Care, Trusted Results",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[#1A1A1A] font-bold group cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 text-[#00A78E] group-hover:translate-x-1 transition-transform" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Summary Section */}
          <div className="text-left space-y-6 w-full pt-12">
            <h3 className="text-[32px] font-black text-[#1A1A1A]">
              Health Matters We Care
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed">
              Medical services are an essential part of our lives, offering care
              and treatment for various health conditions. These are services
              encompass a wide range of specialties, including primary care,
              pediatrics, cardiology, dermatology, and more Medical services are
              an essential part of our lives, offering care and treatment for
              various health conditions. These services.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed">
              Medical care encompasses a range of services aimed at promoting
              health, preventing disease, and treating illnesses. From routine
              check-ups to life-saving surgeries, medical care plays a crucial
              role in ensuring the well-being of individuals and communities
              Medical care encompasses a range of services aimed at promoting
              health, preventing disease, and treating illnesses. From routine
              check-ups to life-saving surgeries, medical care plays a crucial
              role in ensuring the well-being of individuals and communities.
            </p>
          </div>

          {/* Pagination Buttons (as per screenshot) */}
          <div className="w-full pt-16 flex items-center justify-between border-t border-gray-100">
            <button className="flex items-center gap-3 px-8 py-4 border border-gray-100 rounded-full font-black text-[#1A1A1A] hover:bg-gray-50 transition-all group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Previous post
            </button>
            <button className="flex items-center gap-3 px-8 py-4 border border-gray-100 rounded-full font-black text-[#1A1A1A] hover:bg-gray-50 transition-all group">
              Next post
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;
