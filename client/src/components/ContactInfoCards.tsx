import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactInfoCards = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-[#1A1A1A]" />,
      title: 'Address',
      details: ['Mirpur, 10 Road 1 House 12 Mirpur Dhaka', 'Bangladesh'],
    },
    {
      icon: <Mail className="w-6 h-6 text-[#1A1A1A]" />,
      title: 'Email',
      details: ['chirsbekham12@gmail.com', 'simmons12@gmail.com'],
    },
    {
      icon: <Phone className="w-6 h-6 text-[#1A1A1A]" />,
      title: 'Phone',
      details: ['017 5552-0127', '017458632718'],
    },
  ];

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-10 rounded-[20px] shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Icon with Neon Green Background */}
              <div className="w-16 h-16 bg-[#C1FF72] rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                {info.icon}
              </div>

              {/* Title */}
              <h3 className="text-[24px] font-black text-[#1A1A1A] mb-4">
                {info.title}
              </h3>

              {/* Details */}
              <div className="space-y-1">
                {info.details.map((line, i) => (
                  <p key={i} className="text-gray-500 font-medium text-[16px] leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoCards;
