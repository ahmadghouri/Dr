import React, { useEffect } from 'react';
// import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import SpecialFeatures from './components/SpecialFeatures';
import WhyChooseUs from './components/WhyChooseUs';
import TeamImageSection from './components/TeamImageSection';
import ProjectsSection from './components/ProjectsSection';
import GoogleReviews from "./components/GoogleReviews";
import BlogSection from './components/BlogSection';
import AppointmentSection from './components/AppointmentSection';
import ScrollingBanner from './components/ScrollingBanner';
//  import TestimonialsPriority from './components/TestimonialsPriority';
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* <Hero /> */}       
      <AboutSection />
      <StatsSection />
      <FeaturesSection />
      <SpecialFeatures />
      <WhyChooseUs />
      <TeamImageSection />
      <ProjectsSection />
        <GoogleReviews />
        <BlogSection />
         
         <AppointmentSection />
          {/* <TestimonialsPriority /> */}
          <ScrollingBanner />
         </main>
  );
};

export default HomePage;