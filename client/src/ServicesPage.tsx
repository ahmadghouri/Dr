import React, { useEffect } from 'react';
import PageHero from './components/PageHero';
import ServicesGrid from './components/ServicesGrid';
import AppointmentSection from './components/AppointmentSection';

const ServicesPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      {/* Hero Section for Services Page */}
      
    {/* <PageHero
      title="Our Services"
      breadcrumb="Services"
    /> */}
 
      {/* Services Grid Section (Image match) */}
      <ServicesGrid />

      {/* Additional Services Info (CTA) */}
      <AppointmentSection />
    </div>
    
  );
};

export default ServicesPage;
