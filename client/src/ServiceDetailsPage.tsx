import React, { useEffect } from 'react';
import PageHero from './components/PageHero';
import { ChevronRight, Phone, Facebook, Twitter, Instagram, Linkedin, FileText, Download, Stethoscope, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Main Content */}
          <div className="lg:w-[65%] space-y-12">
            {/* Header Text */}
            <div className="space-y-6">
              <h2 className="text-[42px] font-black text-[#1A1A1A] leading-tight">
                A healthy tomorrow starts today
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services encompass a wide range of specialties, including primary care, pediatrics, cardiology.
              </p>
            </div>

            {/* Main Image */}
            <div className="rounded-[40px] overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
                alt="Medical Care" 
                className="w-full h-[450px] object-cover"
              />
            </div>

            {/* Senior Care Section */}
            <div className="space-y-8">
              <h3 className="text-[32px] font-black text-[#1A1A1A]">
                Senior Care Coordination
              </h3>
              <ul className="space-y-4">
                {[
                  'Dental operations involve various procedures performed by dentists',
                  'Medical services are an essential part of our lives, offering care',
                  'These services encompass a wide range of specialties, including primary care, pediatrics, cardiology',
                  'Empowering Health, Empowering Lives Expert Care, Trusted Results'
                ].map((point, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-500 font-medium text-lg">
                    <ChevronRight className="w-6 h-6 text-[#00A78E] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Holistic Health Section */}
            <div className="space-y-6">
              <h3 className="text-[32px] font-black text-[#1A1A1A]">
                Holistic Health Consultations
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services encompass a wide range of specialties, including primary care, pediatrics, cardiology.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services are an essential part of our lives, offering care and treatment for various health conditions.
              </p>
            </div>

            {/* Health Matters Section */}
            <div className="space-y-8">
              <h3 className="text-[32px] font-black text-[#1A1A1A]">
                Health Matters We Care
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services are an essential part of our lives, offering care and treatment for various health conditions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <Stethoscope className="w-7 h-7 text-[#1A1A1A]" />
                  </div>
                  <h4 className="text-[20px] font-black text-[#1A1A1A]">Wellness Oasis CarePoint Health the Institute Thrive Wellness Hub</h4>
                  <p className="text-gray-500">Health care is a vital aspect maintaining overall well-being, encompassing a range</p>
                </div>
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <Droplets className="w-7 h-7 text-[#1A1A1A]" />
                  </div>
                  <h4 className="text-[20px] font-black text-[#1A1A1A]">Where health meets hope Your health partner in wellness</h4>
                  <p className="text-gray-500">Health care is a vital aspect maintaining overall well-being, encompassing a range</p>
                </div>
              </div>
            </div>

            {/* Partnering Section */}
            <div className="space-y-6">
              <h3 className="text-[32px] font-black text-[#1A1A1A]">
                Partnering for Better Health
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Medical services are an essential part of our lives, offering care and treatment for various health conditions. These services are an essential part of our lives, offering care and treatment for various health conditions.
              </p>
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <div className="lg:w-[35%] space-y-10">
            
            {/* Services Category List */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-50">
              <h3 className="text-[24px] font-black text-[#1A1A1A] mb-8">Services</h3>
              <div className="space-y-4">
                {categories.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-[#F9FAFB] rounded-2xl hover:bg-[#00A78E] group cursor-pointer transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <ChevronRight className="w-5 h-5 text-[#00A78E] group-hover:text-white" />
                      <span className="font-bold text-[#1A1A1A] group-hover:text-white">{cat.name}</span>
                    </div>
                    <span className="text-gray-400 group-hover:text-white/80 font-bold">({cat.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-white p-10 rounded-[30px] shadow-sm border border-gray-50 text-center space-y-8">
              <h3 className="text-[24px] font-black text-[#1A1A1A]">Need Help? Call Us</h3>
              <div className="w-20 h-20 bg-[#00A78E] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#00A78E]/20">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-500 font-medium">Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care</p>
              <h2 className="text-[28px] font-black text-[#1A1A1A]">(+888) 178 456 765</h2>
            </div>

            {/* Doctor Profile Card */}
            <div className="bg-white p-10 rounded-[30px] shadow-sm border border-gray-50 text-center space-y-6">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-8 border-[#E0F2F1]">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dr. Chira Bekham" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-[24px] font-black text-[#1A1A1A]">Dr. Chira Bekham</h3>
                <p className="text-gray-400 font-bold text-sm uppercase tracking-wider mt-1">Cardiac Surgeon</p>
              </div>
              <div className="flex items-center justify-center space-x-4 pt-2">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 bg-[#F9FAFB] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#00A78E] hover:text-white transition-all cursor-pointer">
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Download Files */}
            <div className="space-y-4">
              {[1, 2].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-[25px] flex items-center justify-between border border-gray-50 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#F9FAFB] rounded-full flex items-center justify-center group-hover:bg-[#00A78E] transition-colors">
                      <Download className="w-6 h-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-bold">(1.5Mb)</p>
                      <h4 className="text-[#1A1A1A] font-black">Company File</h4>
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
