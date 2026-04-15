import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Pill, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useServices } from "../features/services/hooks/useServices";

const iconMap: { [key: string]: any } = {
  Stethoscope: <Stethoscope className="w-8 h-8 text-[#1A1A1A]" />,
  Pill: <Pill className="w-8 h-8 text-[#1A1A1A]" />,
  ClipboardList: <ClipboardList className="w-8 h-8 text-[#1A1A1A]" />,
};

const ServicesGrid = () => {
  const navigate = useNavigate();
  const { data: services, isLoading } = useServices();

  if (isLoading)
    return (
      <div className="py-24 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[30px] p-10 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              {/* Header: Icon + Title */}
              <div className="flex items-center space-x-5 mb-8">
                <div
                  className={`w-16 h-16 ${service.iconBg || "bg-white"} rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110`}
                >
                  {service.icon && iconMap[service.icon] ? (
                    iconMap[service.icon]
                  ) : (
                    <Stethoscope className="w-8 h-8 text-[#1A1A1A]" />
                  )}
                </div>
                <h3 className="text-[22px] font-black text-[#1A1A1A] leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-500 font-medium text-[16px] leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Image with Overlapping Button (Only for top row) */}
              {service.image ? (
                <div className="relative mt-auto pt-4">
                  <div className="rounded-[25px] overflow-hidden h-[240px]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Overlapping "Read More" Button */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center px-6">
                    <button
                      onClick={() =>
                        navigate(`/service-details/${service._id}`)
                      }
                      className={`${service.buttonBg === "bg-[#00A78E]" ? "bg-[#00A78E] hover:bg-[#1A1A1A]" : "bg-white hover:bg-[#00A78E] hover:text-white"} ${service.buttonText || "text-[#1A1A1A] border border-gray-100"} px-10 py-4 rounded-full font-bold text-[16px] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 w-fit whitespace-nowrap cursor-pointer`}
                    >
                      Read More
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-auto">
                  {/* Placeholder for cards without images if needed */}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
