import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import ServicesPage from "./ServicesPage";
import ServiceDetailsPage from "./ServiceDetailsPage";
import BlogPage from "./BlogPage";
import BlogDetailsPage from "./BlogDetailsPage";
import AboutPage from "./AboutPage";
import DoctorsPage from "./DoctorsPage";
import DoctorDetailsPage from "./DoctorDetailsPage";
import ProjectsPage from "./ProjectsPage";
import ProjectDetailsPage from "./ProjectDetailsPage";

import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";
import AdminDashboard from "./features/admin/components/AdminDashboard";

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CustomCursor />
      {!isAdminPath && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service-details/:id" element={<ServiceDetailsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-details/:id" element={<BlogDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor-details/:id" element={<DoctorDetailsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project-details/:id" element={<ProjectDetailsPage />} />
      </Routes>

      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
