import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, Pill, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesGrid = () => {
    const navigate = useNavigate();
    const services = [
        {
            title: 'Quality Care Service',
            description: 'Health care is a vital aspect maintaining overall well-being, encompassing a range',
            icon: <Stethoscope className="w-8 h-8 text-[#1A1A1A]" />,
            iconBg: 'bg-[#C1FF72]',
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop',
            buttonBg: 'bg-[#00A78E]',
            buttonText: 'text-white'
        },
        {
            title: 'Your Wellness Priority',
            description: 'Health care is a vital aspect maintaining overall well-being, encompassing a range',
            icon: <Pill className="w-8 h-8 text-[#1A1A1A]" />,
            iconBg: 'bg-white border border-gray-100',
            image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop',
            buttonBg: 'bg-white',
            buttonText: 'text-[#1A1A1A] border border-gray-100'
        },
        {
            title: 'Caring for You Always',
            description: 'Health care is a vital aspect maintaining overall well-being, encompassing a range',
            icon: <ClipboardList className="w-8 h-8 text-[#1A1A1A]" />,
            iconBg: 'bg-white border border-gray-100',
            image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
            buttonBg: 'bg-white',
            buttonText: 'text-[#1A1A1A] border border-gray-100'
        }
    ];

    return (
        <section className="py-24 bg-[#F9FAFB]">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-[30px] p-10 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Header: Icon + Title */}
                            <div className="flex items-center space-x-5 mb-8">
                                <div className={`w-16 h-16 ${service.iconBg || 'bg-white'} rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                                    {service.icon}
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
                                            onClick={() => navigate('/service-details')}
                                            className={`${service.buttonBg === 'bg-[#00A78E]' ? 'bg-[#00A78E] hover:bg-[#1A1A1A]' : 'bg-white hover:bg-[#00A78E] hover:text-white'} ${service.buttonText} px-10 py-4 rounded-full font-bold text-[16px] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 w-fit whitespace-nowrap cursor-pointer`}
                                        >
                                            Read More
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-auto">
                                    {/* Placeholder for cards without images if needed, but the image shows empty space */}
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
