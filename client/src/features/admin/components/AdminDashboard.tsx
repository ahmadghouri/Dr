import React, { useState } from 'react';
import { useUser, useLogout } from '../../auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UsersTable from './UsersTable';
import ServicesManager from './ServicesManager';
import ProjectsManager from './ProjectsManager';
import BlogsManager from './BlogsManager';
import DoctorsManager from './DoctorsManager';
import AboutManager from './AboutManager';
import MessagesTable from './MessagesTable';
import DashboardOverview from './DashboardOverview';

const AdminDashboard: React.FC = () => {
  const { data: currentUser, isLoading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const logout = useLogout();

  if (userLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin"></div>
    </div>
  );

  if (!currentUser?.isAdmin) return <Navigate to="/" />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'users': return <UsersTable />;
      case 'services': return <ServicesManager />;
      case 'projects': return <ProjectsManager />;
      case 'blogs': return <BlogsManager />;
      case 'doctors': return <DoctorsManager />;
      case 'about': return <AboutManager />;
      case 'contact': return <MessagesTable />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden pt-20">
      {/* Fixed Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-4 sm:p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header */}
          <header className="mb-6 lg:mb-8 pl-12 lg:pl-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
                  {activeTab === 'dashboard' ? 'Dashboard Overview' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management`}
                </h1>
                <p className="text-gray-500 mt-1 font-semibold text-sm sm:text-base">
                  {activeTab === 'dashboard' 
                    ? 'Welcome back! Here\'s what\'s happening with your platform.' 
                    : 'Manage your website content and data effortlessly.'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-[#1A1A1A]">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-xs text-gray-400 font-semibold">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            </div>
          </header>
          
          {/* Content */}
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
