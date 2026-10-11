import React, { useState } from 'react';
import {
  Mail,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Reply,
  Building2,
  Phone,
  User,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ContactMessage, saveContactMessages, logAdminActivity } from '../../data/adminStore';

interface AdminMessagesManagerProps {
  messages: ContactMessage[];
  onMessagesUpdated: (updated: ContactMessage[]) => void;
}

export const AdminMessagesManager: React.FC<AdminMessagesManagerProps> = ({
  messages,
  onMessagesUpdated,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(messages[0] || null);
  const [replyNote, setReplyNote] = useState('');

  const handleUpdateStatus = (id: string, status: ContactMessage['status']) => {
    const updated = messages.map(m => (m.id === id ? { ...m, status } : m));
    saveContactMessages(updated);
    onMessagesUpdated(updated);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleSaveNotes = (id: string) => {
    const updated = messages.map(m => (m.id === id ? { ...m, adminNotes: replyNote } : m));
    saveContactMessages(updated);
    onMessagesUpdated(updated);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(prev => prev ? { ...prev, adminNotes: replyNote } : null);
    }
    logAdminActivity('Added Follow-up Note to Inquiry', 'message', selectedMessage?.subject || 'Inquiry', 'Administrator');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this message?')) {
      const updated = messages.filter(m => m.id !== id);
      saveContactMessages(updated);
      onMessagesUpdated(updated);
      if (selectedMessage?.id === id) {
        setSelectedMessage(updated[0] || null);
      }
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.organization && m.organization.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'All' || m.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#164E33]">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>Community &amp; Institutional Inquiries</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Contact Messages &amp; Partnership Inquiries
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Review incoming requests from donors, churches, agricultural foundations, and volunteers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500 font-medium">Filter Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
          >
            <option value="All">All Inquiries ({messages.length})</option>
            <option value="New">New ({messages.filter(m => m.status === 'New').length})</option>
            <option value="Read">Read ({messages.filter(m => m.status === 'Read').length})</option>
            <option value="Replied">Replied ({messages.filter(m => m.status === 'Replied').length})</option>
            <option value="Archived">Archived ({messages.filter(m => m.status === 'Archived').length})</option>
          </select>
        </div>
      </div>

      {/* Two-Column Master / Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-4 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sender, subject or organization..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  setReplyNote(msg.adminNotes || '');
                  if (msg.status === 'New') {
                    handleUpdateStatus(msg.id, 'Read');
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                  selectedMessage?.id === msg.id
                    ? 'bg-emerald-50/70 border-emerald-400 shadow-2xs'
                    : 'bg-white hover:bg-stone-50 border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 truncate max-w-[180px]">
                    {msg.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      msg.status === 'New'
                        ? 'bg-red-100 text-red-800'
                        : msg.status === 'Replied'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-stone-800 line-clamp-1">
                  {msg.subject}
                </div>
                <div className="text-[11px] text-stone-500 line-clamp-2">
                  {msg.message}
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 font-mono">
                  <span>{msg.category}</span>
                  <span>{msg.date}</span>
                </div>
              </div>
            ))}

            {filteredMessages.length === 0 && (
              <div className="p-8 text-center text-xs text-stone-400">
                No inquiries matching the selected criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    {selectedMessage.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-2">
                    {selectedMessage.subject}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleUpdateStatus(selectedMessage.id, e.target.value as any)}
                    className="px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-xl font-semibold"
                  >
                    <option value="New">Mark New</option>
                    <option value="Read">Mark Read</option>
                    <option value="Replied">Mark Replied</option>
                    <option value="Archived">Mark Archived</option>
                  </select>

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                <div className="space-y-1">
                  <div className="text-stone-400 text-[10px] uppercase font-semibold">Sender Name</div>
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{selectedMessage.name}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-stone-400 text-[10px] uppercase font-semibold">Email Address</div>
                  <div className="font-mono text-emerald-900">
                    <a href={`mailto:${selectedMessage.email}`} className="hover:underline">
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                {selectedMessage.phone && (
                  <div className="space-y-1">
                    <div className="text-stone-400 text-[10px] uppercase font-semibold">Phone</div>
                    <div className="font-mono text-stone-800 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{selectedMessage.phone}</span>
                    </div>
                  </div>
                )}

                {selectedMessage.organization && (
                  <div className="space-y-1">
                    <div className="text-stone-400 text-[10px] uppercase font-semibold">Organization / Affiliation</div>
                    <div className="text-stone-800 font-medium flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{selectedMessage.organization}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Body */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Message Content
                </div>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-2xs">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Internal Admin Follow-up Notes */}
              <div className="space-y-2 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs">
                <div className="font-bold text-[#164E33] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Internal Staff Follow-up Notes</span>
                </div>
                <textarea
                  rows={2}
                  value={replyNote}
                  onChange={(e) => setReplyNote(e.target.value)}
                  placeholder="Record staff assignments, phone call outcomes, or meeting notes..."
                  className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-xs focus:outline-none"
                />
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleSaveNotes(selectedMessage.id)}
                    className="px-4 py-1.5 bg-[#164E33] hover:bg-[#0D281A] text-white rounded-lg font-bold cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-stone-400">
              Select an inquiry on the left to read full message details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
