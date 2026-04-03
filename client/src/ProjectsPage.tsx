import { useEffect } from 'react';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsPriority from './components/TestimonialsPriority';

const ProjectsPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProjectsSection />
      <TestimonialsPriority />
    </>
  );
};

export default ProjectsPage;