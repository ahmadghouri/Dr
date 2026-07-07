import React from 'react';
import { 
  Users, 
  Stethoscope, 
  Briefcase, 
  FileText, 
  UserPlus, 
  Info, 
  MessageSquare,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Calendar,
  Clock
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  logout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, logout }) => {
  // ❌ REMOVED: isMobileMenuOpen state ko yahan se khatam kar diya kyunki yeh parent dashboard control kar raha hai.
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'services', label: 'Services', icon: Stethoscope },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'doctors', label: 'Doctors', icon: UserPlus },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Messages', icon: MessageSquare },
  ];

  return (
    // ❌ REMOVED: fixed overlay/hamburger structures from here to let AdminDashboard manage the sliding drawer
    <div className="w-72 bg-white border-r border-gray-100 flex flex-col h-full select-none">
      
      {/* Logo Section */}
      <div className="p-6 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A78E] to-[#008F7A] flex items-center justify-center shadow-lg shadow-[#00A78E]/20">
            <Stethoscope className="text-white" size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#1A1A1A]">MediZen</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>
      </div>
      
      {/* Navigation - Custom scroll bounds area */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 max-h-[calc(100vh-240px)] scrollbar-none">
        <div className="mb-4 px-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Main Menu</p>
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-[#00A78E] text-white shadow-lg shadow-[#00A78E]/20' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#00A78E]'} transition-colors`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={16} className="opacity-70" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Bottom Section - Profile & Actions Footer */}
      <div className="p-4 border-t border-gray-100 shrink-0 mt-auto">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-2xl p-4 mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#C1FF72] flex items-center justify-center shrink-0">
              <span className="text-[#1A1A1A] font-black text-sm">A</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-white font-bold text-sm truncate">Admin User</p>
              <p className="text-gray-400 text-xs truncate">admin@medizen.com</p>
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 font-bold text-sm"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;