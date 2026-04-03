import React, { useEffect } from 'react';
import PageHero from './components/PageHero';
import ContactInfoCards from './components/ContactInfoCards';
import ContactFormSection from './components/ContactFormSection';
import ContactMap from './components/ContactMap';

const ContactPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Hero Section for Contact Page */}
      <PageHero
        title="Contact Us"
        breadcrumb="Contact Us"
      />

      {/* Contact Info Cards (Address, Email, Phone) */}
      <ContactInfoCards />

      {/* Appointment Form Section with Doctor Image */}
      <ContactFormSection />

      {/* Google Map Section */}
      <ContactMap />

    </div>
  );
};

export default ContactPage;
