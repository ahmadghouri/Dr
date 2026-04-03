import React, { useEffect } from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import TeamImageSection from './components/TeamImageSection';
import FeaturesSection from './components/FeaturesSection';
import AppointmentSection from './components/AppointmentSection';
import SpecialFeatures from './components/SpecialFeatures';
import WhyChooseUs from './components/WhyChooseUs';
import ScrollingBanner from './components/ScrollingBanner';
import StatsSection from './components/StatsSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsPriority from './components/TestimonialsPriority';
import BlogSection from './components/BlogSection';

const HomePage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="grow">
      <Hero />
      <TeamImageSection />
      <FeaturesSection />
      <AboutSection />
      <AppointmentSection />
      <SpecialFeatures />
      <WhyChooseUs />
      <StatsSection />
      <ScrollingBanner />
      <ProjectsSection />
      <TestimonialsPriority />
      <BlogSection />
    </main>
  );
};

export default HomePage;
