import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import HomePage from './HomePage';
import ContactPage from './ContactPage';
import ServicesPage from './ServicesPage';
import ServiceDetailsPage from './ServiceDetailsPage';
import BlogPage from './BlogPage';
import BlogDetailsPage from './BlogDetailsPage';
import AboutPage from './AboutPage';
import DoctorsPage from './DoctorsPage';
import DoctorDetailsPage from './DoctorDetailsPage';
import ProjectsPage from './ProjectsPage';
import ProjectDetailsPage from './ProjectDetailsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <CustomCursor />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service-details" element={<ServiceDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog-details" element={<BlogDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctor-details" element={<DoctorDetailsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project-details" element={<ProjectDetailsPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
