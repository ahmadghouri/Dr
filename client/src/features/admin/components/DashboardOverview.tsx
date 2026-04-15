import React from 'react';
import { useUsers } from '../hooks/useAdmin';
import { useServices } from '../../services/hooks/useServices';
import { useProjects } from '../../projects/hooks/useProjects';
import { useBlogs } from '../../blogs/hooks/useBlogs';
import { useDoctors } from '../../doctors/hooks/useDoctors';
import { useContactMessages } from '../../contact/hooks/useContact';
import { 
  Users, 
  Stethoscope, 
  Briefcase, 
  FileText, 
  UserPlus, 
  MessageSquare,
  TrendingUp,
  Activity,
  ArrowRight,
  Zap,
  Clock,
  MoreHorizontal
} from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const { data: users } = useUsers();
  const { data: services } = useServices();
  const { data: projects } = useProjects();
  const { data: blogs } = useBlogs();
  const { data: doctors } = useDoctors();
  const { data: messages } = useContactMessages();

  const stats = [
    { label: 'Total Users', count: users?.length || 0, icon: Users, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-500' },
    { label: 'Services', count: services?.length || 0, icon: Stethoscope, color: 'from-[#00A78E] to-[#008F7A]', bgColor: 'bg-[#00A78E]/10', textColor: 'text-[#00A78E]' },
    { label: 'Projects', count: projects?.length || 0, icon: Briefcase, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-500' },
    { label: 'Blogs', count: blogs?.length || 0, icon: FileText, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-500' },
    { label: 'Doctors', count: doctors?.length || 0, icon: UserPlus, color: 'from-[#C1FF72] to-[#A8E063]', bgColor: 'bg-[#C1FF72]/20', textColor: 'text-[#1A1A1A]' },
    { label: 'Messages', count: messages?.length || 0, icon: MessageSquare, color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50', textColor: 'text-pink-500' },
  ];

  const activities = [
    { title: 'New user registration', time: '2 hours ago', status: 'Active', icon: Users, color: 'bg-blue-500' },
    { title: 'Service updated', time: '4 hours ago', status: 'Completed', icon: Stethoscope, color: 'bg-[#00A78E]' },
    { title: 'New blog post published', time: '6 hours ago', status: 'Published', icon: FileText, color: 'bg-orange-500' },
    { title: 'Doctor profile added', time: '1 day ago', status: 'Active', icon: UserPlus, color: 'bg-[#C1FF72]' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] rounded-2xl lg:rounded-3xl p-6 sm:p-8 text-white">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#00A78E]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#C1FF72]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#C1FF72] animate-pulse"></div>
              <span className="text-[#C1FF72] text-[10px] sm:text-xs font-black uppercase tracking-widest">System Online</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">Welcome back, Admin!</h2>
            <p className="text-gray-400 font-medium text-sm sm:text-base max-w-lg">Everything is running smoothly. You have <span className="text-white font-bold">{messages?.length || 0} unread messages</span> waiting for your attention.</p>
          </div>
          <button className="bg-[#C1FF72] text-[#1A1A1A] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold flex items-center group transition-all duration-300 hover:scale-105 shadow-lg shadow-[#C1FF72]/20 text-sm sm:text-base whitespace-nowrap">
            <Zap className="mr-2 w-4 h-4" />
            Quick Actions
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform hidden sm:block" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                </div>
                <div className="flex items-center space-x-1 text-green-500 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp size={12} />
                  <span className="text-xs font-bold">+12%</span>
                </div>
              </div>
              <h4 className="text-gray-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1">{stat.label}</h4>
              <span className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">{stat.count}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#00A78E]/10 flex items-center justify-center">
                <Activity className="text-[#00A78E]" size={18} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#1A1A1A]">Recent Activity</h3>
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Latest updates from your platform</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-[#1A1A1A]">
              <MoreHorizontal size={18} />
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {activities.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${activity.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1A1A1A] font-bold text-sm truncate">{activity.title}</p>
                    <div className="flex items-center text-gray-400 text-xs mt-0.5">
                      <Clock size={12} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{activity.time}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#C1FF72]/20 text-[#1A1A1A] flex-shrink-0">
                    {activity.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-[#00A78E] to-[#008F7A] rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#C1FF72]/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <Zap size={16} className="sm:w-[18px] sm:h-[18px] text-[#C1FF72]" />
              <h3 className="font-black text-base sm:text-lg">Performance</h3>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-white/70 text-xs sm:text-sm font-medium">Server Uptime</span>
                  <span className="font-bold text-sm">99.9%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C1FF72] rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-white/70 text-xs sm:text-sm font-medium">API Health</span>
                  <span className="font-bold text-sm">100%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C1FF72] rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-white/70 text-xs sm:text-sm font-medium">Database Load</span>
                  <span className="font-bold text-sm">42%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white/60 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs sm:text-sm">Last backup</span>
                <span className="font-bold text-xs sm:text-sm">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
