import React, { useState } from 'react';
import { useContactMessages } from '../../contact/hooks/useContact';
import { Mail, Calendar, MessageSquare, CheckCircle2, Inbox, X, Eye, Trash2 } from 'lucide-react';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const MessagesTable: React.FC = () => {
  const { data: messages, isLoading } = useContactMessages();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  if (isLoading) return (
    <div className="p-12 text-center">
      <div className="w-12 h-12 border-4 border-[#00A78E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400 font-medium">Loading messages...</p>
    </div>
  );

  const unreadCount = messages?.filter((m: Message) => !m.isRead).length || 0;

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-pink-50 flex items-center justify-center">
            <Inbox className="text-pink-500" size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#1A1A1A]">Contact Messages</h3>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              {messages?.length || 0} total · {unreadCount} unread
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {messages?.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-400 font-medium">No messages yet</p>
        </div>
      )}

      {/* Table */}
      {messages && messages.length > 0 && (
        <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-l-xl">Sender</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {messages?.map((message: Message) => (
                <tr key={message._id} className={`hover:bg-gray-50/50 transition-colors group ${!message.isRead ? 'bg-orange-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${!message.isRead ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-blue-50 text-blue-500'}`}>
                        <Mail size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] text-sm">{message.name}</h4>
                        <p className="text-xs text-gray-400 font-medium">{message.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-sm">
                    <div className="space-y-1">
                      <h5 className="font-black text-xs text-[#00A78E] uppercase tracking-wider">{message.subject || 'No Subject'}</h5>
                      <p className="text-gray-400 font-medium text-xs line-clamp-2">{message.message}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-400 text-xs font-medium">
                      <Calendar size={12} className="mr-1.5" />
                      {new Date(message.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="p-2 text-[#00A78E] hover:bg-[#00A78E]/10 rounded-lg transition-all"
                        title="View Message"
                      >
                        <Eye size={16} />
                      </button>
                      {message.isRead ? (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-green-50 text-green-500">
                          <CheckCircle2 size={10} className="mr-1" />
                          Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-600">
                          <MessageSquare size={10} className="mr-1" />
                          New
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-[#1A1A1A]">Message Details</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 hover:bg-gray-200 rounded-xl transition-all text-gray-400 hover:text-[#1A1A1A]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${!selectedMessage.isRead ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' : 'bg-blue-50 text-blue-500'}`}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A]">{selectedMessage.name}</h4>
                  <p className="text-sm text-gray-400">{selectedMessage.email}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Subject</p>
                <p className="font-bold text-[#1A1A1A]">{selectedMessage.subject || 'No Subject'}</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Message</p>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar size={14} className="mr-2" />
                {new Date(selectedMessage.createdAt).toLocaleString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex space-x-3">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your Message'}`}
                className="flex-1 bg-[#00A78E] text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-[#008F7A] transition-all"
              >
                Reply via Email
              </a>
              <button
                onClick={() => setSelectedMessage(null)}
                className="flex-1 bg-gray-100 text-gray-500 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesTable;
