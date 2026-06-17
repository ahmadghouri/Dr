import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHero from './components/PageHero';
import { useService } from './features/services/hooks/useServices';
import { ChevronRight, Phone, Facebook, Twitter, Instagram, Linkedin, FileText, Download, Stethoscope, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, error } = useService(id || '');

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

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20 px-6">
        <div className="text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A]">Service not found</h2>
          <p className="text-gray-500">The service you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const categories = [
    { name: 'A Tradition of Healing', count: '02' },
    { name: 'Harmony Holistic Health', count: '02' },
    { name: 'Revive Medical Care', count: '02' },
    { name: 'Unity Health Services', count: '02' },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <PageHero title="Service Details" breadcrumb="Service Details" />

      <section className="py-12 sm:py-16 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12">

          {/* Left Side: Main Content */}
          <div className="w-full lg:w-[65%] space-y-10 sm:space-y-12">
            {/* Header Text */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-[42px] font-semibold text-[#1A1A1A] leading-tight">
                {service.title}
              </h2>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Main Image */}
            <div className="rounded-2xl sm:rounded-[40px] overflow-hidden shadow-xl">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-[220px] sm:h-[320px] md:h-[450px] object-cover"
              />
            </div>

            {/* Detailed Description */}
            {service.detailedDescription && (
              <div className="space-y-6">
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                  {service.detailedDescription}
                </p>
              </div>
            )}

            {/* Features Section */}
            {service.features && service.features.length > 0 && (
              <div className="space-y-6 sm:space-y-8">
                <h3 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A]">
                  Key Features
                </h3>
                <ul className="space-y-4">
                  {service.features.map((point: string, i: number) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-500 font-medium text-base sm:text-lg">
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#00A78E] flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits Section */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="space-y-6 sm:space-y-8">
                <h3 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A]">
                  Service Benefits
                </h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-500 font-medium text-base sm:text-lg">
                      <div className="w-6 h-6 bg-[#C1FF72] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <ChevronRight className="w-4 h-4 text-[#1A1A1A]" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Holistic Health Section */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A]">
                Holistic Health Consultations
              </h3>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services encompass a wide range of specialties, including primary care, pediatrics, cardiology.
              </p>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services are an essential part of our lives, offering care and treatment for various health conditions.
              </p>
            </div>

            {/* Health Matters Section */}
            <div className="space-y-6 sm:space-y-8">
              <h3 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A]">
                Health Matters We Care
              </h3>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services are an essential part of our lives, offering care and treatment for various health conditions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 text-[#1A1A1A]" />
                  </div>
                  <h4 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">Wellness Oasis CarePoint Health the Institute Thrive Wellness Hub</h4>
                  <p className="text-gray-500 text-sm sm:text-base">Health care is a vital aspect maintaining overall well-being, encompassing a range</p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <Droplets className="w-6 h-6 sm:w-7 sm:h-7 text-[#1A1A1A]" />
                  </div>
                  <h4 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">Where health meets hope Your health partner in wellness</h4>
                  <p className="text-gray-500 text-sm sm:text-base">Health care is a vital aspect maintaining overall well-being, encompassing a range</p>
                </div>
              </div>
            </div>

            {/* Partnering Section */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A]">
                Partnering for Better Health
              </h3>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services are an essential part of our lives, offering care and treatment for various health conditions.
              </p>
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <div className="w-full lg:w-[35%] space-y-8 sm:space-y-10">

            {/* Services Category List */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
              <h3 className="text-xl sm:text-[24px] font-semibold text-[#1A1A1A] mb-6 sm:mb-8">Services</h3>
              <div className="space-y-3 sm:space-y-4">
                {categories.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between p-4 sm:p-5 bg-[#F9FAFB] rounded-2xl hover:bg-[#00A78E] group cursor-pointer transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <ChevronRight className="w-5 h-5 text-[#00A78E] group-hover:text-white shrink-0" />
                      <span className="font-semibold text-[#1A1A1A] group-hover:text-white text-sm sm:text-base">{cat.name}</span>
                    </div>
                    <span className="text-gray-400 group-hover:text-white/80 font-semibold shrink-0">({cat.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50 text-center space-y-6 sm:space-y-8">
              <h3 className="text-xl sm:text-[24px] font-semibold text-[#1A1A1A]">Need Help? Call Us</h3>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00A78E] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#00A78E]/20">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <p className="text-gray-500 font-medium text-sm sm:text-base">Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care</p>
              <h2 className="text-xl sm:text-[28px] font-semibold text-[#1A1A1A]">(+888) 178 456 765</h2>
            </div>

            {/* Doctor Profile Card */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50 text-center space-y-5 sm:space-y-6">
              <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-4 sm:border-8 border-[#E0F2F1]">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dr. Chira Bekham" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-[24px] font-semibold text-[#1A1A1A]">Dr. Chira Bekham</h3>
                <p className="text-gray-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mt-1">Cardiac Surgeon</p>
              </div>
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 pt-2">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 sm:w-10 sm:h-10 bg-[#F9FAFB] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#00A78E] hover:text-white transition-all cursor-pointer">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Download Files */}
            <div className="space-y-4">
              {[1, 2].map((_, i) => (
                <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-[25px] flex items-center justify-between border border-gray-50 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F9FAFB] rounded-full flex items-center justify-center group-hover:bg-[#00A78E] transition-colors shrink-0">
                      <Download className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm font-semibold">(1.5Mb)</p>
                      <h4 className="text-[#1A1A1A] font-semibold text-sm sm:text-base">Company File</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailsPage;