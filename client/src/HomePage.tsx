import React, { useEffect } from 'react';
// import Hero from './components/Hero';
// import ScrollingBanner from './components/ScrollingBanner';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import SpecialFeatures from './components/SpecialFeatures';
import WhyChooseUs from './components/WhyChooseUs';
import TeamImageSection from './components/TeamImageSection';
import ProjectsSection from './components/ProjectsSection';
import GoogleReviews from "./components/GoogleReviews";
import BlogSection from './components/BlogSection';
import TestimonialsPriority from './components/TestimonialsPriority';
import AppointmentSection from './components/AppointmentSection';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="grow bg-slate-50/50 flex flex-col min-h-screen antialiased selection:bg-[#80223A] selection:text-white">
      {/* <Hero /> */}
      {/* <ScrollingBanner /> */}
      <AboutSection />
      <StatsSection />
      <FeaturesSection />
      <SpecialFeatures />
      <WhyChooseUs />
      <TeamImageSection />
      <ProjectsSection />

      <div className="w-full bg-gradient-to-b from-transparent via-white to-transparent  space-y-2">
        <GoogleReviews />
        <BlogSection />
        <TestimonialsPriority />
      </div>

      <div id="contact" className="w-full scroll-mt-20">
        <AppointmentSection />
      </div>
    </main>
  );
};

export default HomePage;