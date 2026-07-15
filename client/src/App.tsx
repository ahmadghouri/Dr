import { useEffect, useState } from "react";
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
import WhyChooseUs from "./components/WhyChooseUs";
import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";
import AdminDashboard from "./features/admin/components/AdminDashboard";
import WelcomePopup from "./components/WelcomePopup";
import BookingPopup from "./components/BookingPopup";
import { useDoctors } from "./features/doctors/hooks/useDoctors";
import { WhatsAppWidget } from './components/WhatsAppWidget';
const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  const { data: doctors } = useDoctors();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const doctorId = doctors?.[0]?._id || "";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <WelcomePopup />
      <CustomCursor />
      {!isAdminPath && <Navbar onBookClick={() => setIsBookingOpen(true)} />}

      {/* Floating Booking Button */}
      {!isAdminPath && (
        <div className="fixed bottom-5 right-5 z-[999]">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-[#059781] hover:bg-[#047d6b] text-white p-3.5 md:px-5 md:py-3 rounded-full font-semibold shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg
              className="w-6 h-6 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="hidden md:inline">Book Appointment</span>
          </button>
        </div>
      )}
    {!isAdminPath && <WhatsAppWidget />}
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
        <Route path="why-choose-us" element={<WhyChooseUs />} />
      </Routes>

      {!isAdminPath && <Footer />}

      {/* Booking Popup Component */}
      <BookingPopup
        isVisible={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        doctorId={doctorId}
      />
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
