import React from 'react';
import { motion } from 'framer-motion';

const ContactMap = () => {
  return (
    <section className="w-full h-[500px] md:h-[650px] bg-gray-100 relative overflow-hidden px-6 md:px-12 mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 border-4 border-white"
      >
        <iframe 
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.328233583628!2d90.3665091!3d23.8069245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d6f6b8c2ff%3A0x3b135863e0809cc9!2sMirpur%2010%20Roundabout!5e0!3m2!1sen!2sbd!4v1711550000000!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
        ></iframe>
      </motion.div>
    </section>
  );
};

export default ContactMap;
