import React from 'react';
import { useUsers, useDeleteUser } from '../hooks/useAdmin';
import { Trash2, User as UserIcon, Shield, Users } from 'lucide-react';

const UsersTable: React.FC = () => {
  const { data: users, isLoading } = useUsers();
  const deleteMutation = useDeleteUser();

  if (isLoading) return (
    <div className="p-12 text-center">
      <div className="w-12 h-12 border-4 border-[#00A78E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400 font-semibold">Loading users...</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Users className="text-blue-500" size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A]">All Users</h3>
            <p className="text-xs sm:text-sm text-gray-400 font-semibold">{users?.length || 0} total users</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest rounded-l-xl">User</th>
              <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-right rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users?.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${user.isAdmin ? 'bg-gradient-to-br from-[#00A78E] to-[#008F7A] text-white shadow-lg shadow-[#00A78E]/20' : 'bg-gray-100 text-gray-400'}`}>
                      {user.isAdmin ? <Shield size={18} /> : <UserIcon size={18} />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] text-sm">{user.name}</h4>
                      <p className="text-xs text-gray-400 font-semibold">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider ${
                    user.isAdmin 
                      ? 'bg-[#C1FF72]/20 text-[#1A1A1A]' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {user.isAdmin ? 'Administrator' : 'Member'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-gray-500">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  {!user.isAdmin && (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this user?')) {
                          deleteMutation.mutate(user._id);
                        }
                      }}
                      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all duration-200"
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
