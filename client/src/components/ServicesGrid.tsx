import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Pill, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useServices } from "../features/services/hooks/useServices";

const iconMap: { [key: string]: any } = {
  Stethoscope: <Stethoscope className="w-8 h-8  text-[#1A1A1A]" />,
  Pill: <Pill className="w-8 h-8 text-[#1A1A1A]" />,
  ClipboardList: <ClipboardList className="w-8 h-8 text-[#1A1A1A]" />,
};

const ServicesGrid = () => {
  const navigate = useNavigate();
  const { data: services, isLoading } = useServices();

  if (isLoading)
    return (
      <div className="py-24 flex justify-center items-center border-2">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin"></div>
      </div>
    );

  return (
   <section className="py-20  bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Overlapping buttons ke liye gap-y-16 kiya hai taake card ek doosre ke upar na charhein */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services?.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // Cards par soft subte premium shadow aur borderline border-gray-50 lagayi hai
              className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer duration-300 group flex flex-col h-full border border-gray-50 relative"
            >
              {/* Header: Icon + Title */}
              <div className="flex items-center space-x-5 mb-6">
             <div
                 className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner transition-all duration-300 ${
                service.iconBg || "bg-[#F4F9F8]"
                  } group-hover:bg-[#C1FF72] group-hover:rotate-6`}
                >
                  {service.icon && iconMap[service.icon] ? (
                    iconMap[service.icon]
                  ) : (
                    <Stethoscope className="w-8 h-8 text-[#00A78E]" />
                  )}
                </div>
                <h3 className="text-2xl font-font-semibold text-[#1A1A1A] tracking-tight leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-500 font-font-semibold text-[15px] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Image with Overlapping Button (Only for top row) */}
              {service.image ? (
                // pb-6 se button layout perfectly secure ho jata hai
                <div className="relative mt-auto pt-4 pb-6">
                  <div className="rounded-[24px] overflow-hidden h-[240px] shadow-sm">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Overlapping "Read More" Button */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full flex justify-center px-6">
                    <button
                      onClick={() =>
                        navigate(`/service-details/${service._id}`)
                      }
                      className={`${
                        service.buttonBg === "bg-[#00A78E]"
                          ? "bg-[white] text-[#1A1A1A] hover:bg-[#00A78E]  hover:text-white"
                         :"bg-[white] text-[#1A1A1A] hover:bg-[#00A78E] hover:text-white"
                       
                      } px-8 py-4 rounded-full font-semibold text-sm flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 w-fit whitespace-nowrap cursor-pointer`}
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
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
