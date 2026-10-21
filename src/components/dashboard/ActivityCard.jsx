import React, { useState } from 'react';
import { Bell, Cake, Plus, CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react';

export default function ActivityCard({ reminders = [], birthdays = [], onAddReminder }) {
  const [activeTab, setActiveTab] = useState('reminders');
  const [newReminderText, setNewReminderText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateReminder = (e) => {
    e.preventDefault();
    if (!newReminderText.trim()) return;
    if (onAddReminder) {
      onAddReminder({
        title: newReminderText,
        time: 'Today',
        priority: 'normal',
        category: 'Quick Note'
      });
    }
    setNewReminderText('');
    setIsAdding(false);
  };

  return (
    <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-5 shadow-sm flex flex-col justify-between h-full">
      {/* Header Tabs */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#DCD4FD]/60">
          <div className="flex items-center gap-1 bg-[#ECE7FE]/70 p-1 rounded-xl border border-[#DCD4FD]/50">
            <button
              onClick={() => setActiveTab('reminders')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'reminders'
                  ? 'bg-[#F0EBFA] text-[#130070] shadow-xs'
                  : 'text-[#808080] hover:text-slate-800'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Reminders</span>
              <span className="text-[10px] bg-[#ECE7FE] text-[#130070] font-bold px-1.5 py-0.2 rounded-full border border-[#DCD4FD]">
                {reminders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('birthdays')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'birthdays'
                  ? 'bg-[#F0EBFA] text-pink-700 shadow-xs'
                  : 'text-[#808080] hover:text-slate-800'
              }`}
            >
              <Cake className="w-3.5 h-3.5 text-pink-500" />
              <span>Today's Birthday</span>
              <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.2 rounded-full">
                {birthdays.length}
              </span>
            </button>
          </div>

          {activeTab === 'reminders' && (
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="p-1.5 text-[#130070] hover:bg-[#ECE7FE] rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
              title="Add Reminder"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Add Form */}
        {isAdding && (
          <form onSubmit={handleCreateReminder} className="mt-3 p-2.5 bg-[#ECE7FE]/50 rounded-xl border border-[#DCD4FD] space-y-2">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#DCD4FD] bg-[#F0EBFA] focus:outline-none focus:ring-2 focus:ring-[#130070]/20"
              autoFocus
            />
            <div className="flex justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-[11px] px-2 py-1 text-[#808080] hover:bg-[#DCD4FD]/40 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-[11px] px-3 py-1 bg-[#130070] text-white font-semibold rounded-md hover:bg-[#1C0191]"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {/* Tab Content */}
        <div className="mt-3 space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {activeTab === 'reminders' ? (
            reminders.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-10 h-10 text-[#130070] mx-auto mb-2 opacity-60" />
                <p className="text-xs font-bold text-slate-700">All caught up!</p>
                <p className="text-[11px] text-[#808080]">No pending reminders for today</p>
              </div>
            ) : (
              reminders.map((r) => (
                <div
                  key={r.id}
                  className="p-3 bg-[#ECE7FE]/40 hover:bg-[#ECE7FE]/70 rounded-xl border border-[#DCD4FD]/60 transition-colors text-left"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-800 leading-snug">{r.title}</p>
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                        r.priority === 'high'
                          ? 'bg-[#ECE7FE] text-[#130070] border border-[#DCD4FD]'
                          : 'bg-[#DCD4FD]/50 text-[#808080]'
                      }`}
                    >
                      {r.category || 'Task'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#808080] mt-1.5">
                    <Clock className="w-3 h-3 text-[#808080]" />
                    <span>{r.time}</span>
                  </div>
                </div>
              ))
            )
          ) : (
            birthdays.length === 0 ? (
              <div className="text-center py-8">
                <Cake className="w-10 h-10 text-pink-300 mx-auto mb-2 opacity-60" />
                <p className="text-xs font-bold text-slate-700">No birthdays today</p>
                <p className="text-[11px] text-slate-400">Next student birthday is upcoming soon</p>
              </div>
            ) : (
              birthdays.map((b) => (
                <div
                  key={b.id}
                  className="p-3 bg-pink-50/60 rounded-xl border border-pink-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {b.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{b.name}</p>
                      <p className="text-[11px] text-pink-700 font-medium">{b.class}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-pink-600 bg-[#F0EBFA] px-2.5 py-1 rounded-full border border-pink-200">
                    Wish 🎉
                  </span>
                </div>
              ))
            )
          )}
        </div>
      </div>

      <div className="pt-3 mt-2 border-t border-[#DCD4FD]/60 text-center">
        <span className="text-[11px] text-[#808080]">
          Syncs with SMS notices and school WhatsApp alerts
        </span>
      </div>
    </div>
  );
}
