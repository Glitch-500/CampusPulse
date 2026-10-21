import React, { useState, useEffect } from 'react';
import { Search, Users, CreditCard, BookOpen, CalendarCheck2, Settings, ArrowRight, X } from 'lucide-react';

export default function GlobalSearchModal({ isOpen, onClose, onNavigate, onTakeFees, students = [], classes = [] }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle open/close
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'Take Student Fees', tab: 'dashboard', action: onTakeFees, icon: CreditCard, badge: 'Action' },
    { label: 'Manage All Students', tab: 'students', icon: Users, badge: 'Page' },
    { label: 'Daily Attendance Register', tab: 'attendance', icon: CalendarCheck2, badge: 'Page' },
    { label: 'Class & Subjects Configuration', tab: 'classes', icon: BookOpen, badge: 'Page' },
    { label: 'School Settings', tab: 'settings', icon: Settings, badge: 'Page' },
  ];

  const matchedStudents = query.trim()
    ? students.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.srNo.toLowerCase().includes(query.toLowerCase()) ||
        s.className.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const matchedClasses = query.trim()
    ? classes.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.teacher.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#F0EBFA] rounded-2xl shadow-2xl border border-[#DCD4FD] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#DCD4FD]/60 bg-[#ECE7FE]/40">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Search students, classes, modules, or actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results / Quick Actions */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {/* Matched Students */}
          {matchedStudents.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Students
              </p>
              <div className="space-y-1">
                {matchedStudents.map(st => (
                  <div
                    key={st.id}
                    onClick={() => {
                      onNavigate('students');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ECE7FE] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#ECE7FE] text-[#130070] font-bold text-xs flex items-center justify-center border border-[#DCD4FD]">
                        {st.name[0]}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block group-hover:text-[#130070]">
                          {st.name}
                        </span>
                        <span className="text-[10px] text-[#808080]">{st.className} • {st.srNo}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#130070]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Classes */}
          {matchedClasses.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-[#808080] uppercase tracking-wider mb-2">
                Classes
              </p>
              <div className="space-y-1">
                {matchedClasses.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onNavigate('classes');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ECE7FE] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded border border-[#DCD4FD]">
                        {c.name}
                      </span>
                      <span className="text-xs text-slate-600">Teacher: {c.teacher}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#130070]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Module Navigation */}
          <div>
            <p className="text-[11px] font-bold text-[#808080] uppercase tracking-wider mb-2">
              Quick Actions & Navigation
            </p>
            <div className="space-y-1">
              {quickLinks.map(link => {
                const Icon = link.icon;
                return (
                  <div
                    key={link.label}
                    onClick={() => {
                      if (link.action) {
                        link.action();
                      } else {
                        onNavigate(link.tab);
                      }
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ECE7FE] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#ECE7FE]/70 group-hover:bg-[#ECE7FE] text-slate-600 group-hover:text-[#130070] flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-[#130070]">
                        {link.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#130070] bg-[#ECE7FE]/70 px-2 py-0.5 rounded border border-[#DCD4FD]/60">
                      {link.badge}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press ESC or click outside to dismiss</span>
          <span>Tip: Jump directly to student records</span>
        </div>
      </div>
    </div>
  );
}
