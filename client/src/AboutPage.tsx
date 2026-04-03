import { useEffect } from 'react';
import PageHero from './components/PageHero';
import AboutSection from './components/AboutSection';
import SpecialFeatures from './components/SpecialFeatures';
import StatsSection from './components/StatsSection';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsPriority from './components/TestimonialsPriority';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <PageHero title="About Us" breadcrumb="About Us" />

      <AboutSection />

      <SpecialFeatures />

      <StatsSection />

      <WhyChooseUs />

      <TestimonialsPriority />

    </div>
  );
};

export default AboutPage;
