import React, { useState, useEffect } from "react";
import { useUser, useLogout } from "../../auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import UsersTable from "./UsersTable";
import ServicesManager from "./ServicesManager";
import ProjectsManager from "./ProjectsManager";
import BlogsManager from "./BlogsManager";
import DoctorsManager from "./DoctorsManager";
import AboutManager from "./AboutManager";
import MessagesTable from "./MessagesTable";
import DashboardOverview from "./DashboardOverview";
import AppointmentManager from "./AppointmentManager";
import DoctorAvailabilityManager from "./DoctorAvailabilityManager";

const AdminDashboard: React.FC = () => {
  const { data: currentUser, isLoading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const logout = useLogout();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  if (userLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin"></div>
      </div>
    );

  if (!currentUser?.isAdmin) return <Navigate to="/" />;

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "users":
        return <UsersTable />;
      case "services":
        return <ServicesManager />;
      case "projects":
        return <ProjectsManager />;
      case "blogs":
        return <BlogsManager />;
      case "doctors":
        return <DoctorsManager />;
      case "appointments":
        return <AppointmentManager />;
      case "availability":
        return <DoctorAvailabilityManager />;
      case "about":
        return <AboutManager />;
      case "contact":
        return <MessagesTable />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative">
      {/* 1. Mobile Sidebar Overlay Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Sidebar Drawer Wrapper */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 transform lg:transform-none lg:relative lg:flex shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        transition-transform duration-300 ease-in-out h-full
      `}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          logout={logout}
        />
      </div>

      {/* 3. Main Content Container Block */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {/* Isolate Top Navigation Bar - Iss se menu icon hamesha safe aur top par rahega */}
        <div className="w-full bg-white lg:bg-transparent border-b border-gray-100 lg:border-none p-4 sm:p-6 lg:px-10 flex items-center justify-between shrink-0 z-30">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm text-[#1A1A1A] hover:bg-gray-50 transition-all shrink-0"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Time & Date Display */}
          <div className="text-right ml-auto">
            <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-[11px] text-gray-400 font-semibold">
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Dynamic Scrollable Body Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 pt-2 lg:pt-0">
          {/* Title Area */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
              {activeTab === "dashboard"
                ? "Dashboard Overview"
                : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management`}
            </h1>
            <p className="text-gray-400 mt-1 font-medium text-xs sm:text-base">
              {activeTab === "dashboard"
                ? "Welcome back! Here's what's happening with your platform."
                : "Manage your website content and data effortlessly."}
            </p>
          </div>

          {/* Main Table/Card Layout Element */}
          <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
