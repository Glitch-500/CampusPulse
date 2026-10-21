import React from 'react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Bus,
  ReceiptText,
  UserCheck,
  Wrench,
  Sparkles,
  BookOpen,
  CalendarCheck2,
  GraduationCap,
  Settings,
  Cloud,
  ChevronLeft,
  ChevronRight,
  School,
  CalendarDays
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  session = "2026-27"
}) {
  const mainModules = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Manage Students', icon: Users },
    { id: 'fees', label: 'Fees Management', icon: CreditCard },
    { id: 'transport', label: 'Transport Facility', icon: Bus },
    { id: 'accounts', label: 'Accounts', icon: ReceiptText },
    { id: 'staff', label: 'Staff', icon: UserCheck },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'automation', label: 'Automation', icon: Sparkles, badge: 'NEW' },
    { id: 'classes', label: 'Class & Subjects', icon: BookOpen, badge: 'NEW' },
    { id: 'attendance', label: 'Daily Attendance', icon: CalendarCheck2 },
  ];

  const examModules = [
    { id: 'exams', label: 'Exam & Results', icon: GraduationCap },
  ];

  const managementModules = [
    { id: 'settings', label: 'School Settings', icon: Settings },
    { id: 'backup', label: 'Cloud Backup', icon: Cloud },
  ];

  const renderNavButton = (item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;

    return (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        title={isCollapsed ? item.label : undefined}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
          isActive
            ? 'bg-[#ECE7FE] text-[#130070] font-bold shadow-xs border border-[#DCD4FD]'
            : 'text-slate-600 hover:text-slate-900 hover:bg-[#ECE7FE]/50'
        } ${isCollapsed ? 'justify-center px-2' : ''}`}
      >
        <Icon
          className={`w-5 h-5 shrink-0 transition-colors ${
            isActive ? 'text-[#130070]' : 'text-slate-500 group-hover:text-slate-700'
          }`}
          strokeWidth={isActive ? 2.2 : 1.75}
        />

        {!isCollapsed && (
          <span className="truncate flex-1 text-left">{item.label}</span>
        )}

        {!isCollapsed && item.badge && (
          <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase bg-amber-500 text-white rounded-md tracking-wider">
            {item.badge}
          </span>
        )}

        {/* Active Pill Bar */}
        {isActive && !isCollapsed && (
          <span className="w-1.5 h-4 bg-[#130070] rounded-full" />
        )}
      </button>
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-[#F0EBFA] border-r border-[#DCD4FD]/80 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#130070] to-[#2C07BD] flex items-center justify-center text-white shadow-md shadow-[#130070]/25 shrink-0">
            <BookOpen className="w-5 h-5 text-white" strokeWidth={2.2} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 font-sans leading-none">
                Campus<span className="text-[#130070]">Pulse</span>
              </span>
              <span className="text-[10px] font-bold text-[#808080] tracking-wider uppercase mt-1">
                School ERP
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors hidden md:flex items-center justify-center"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6">
        {/* Main Modules */}
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Main Modules
            </p>
          )}
          <nav className="space-y-1">
            {mainModules.map(renderNavButton)}
          </nav>
        </div>

        {/* Exam & Results */}
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Exam & Results
            </p>
          )}
          <nav className="space-y-1">
            {examModules.map(renderNavButton)}
          </nav>
        </div>

        {/* Management */}
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Management
            </p>
          )}
          <nav className="space-y-1">
            {managementModules.map(renderNavButton)}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-[#DCD4FD]/60 bg-[#ECE7FE]/30 space-y-2">
        {/* Academic Session Indicator */}
        {!isCollapsed ? (
          <div className="flex items-center justify-between px-3 py-2 bg-[#ECE7FE] border border-[#DCD4FD] rounded-xl text-xs font-semibold text-[#130070]">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#130070]" />
              <span>Session: {session}</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#130070] animate-pulse" />
          </div>
        ) : (
          <div className="flex justify-center p-2 text-[#130070] bg-[#ECE7FE] rounded-xl border border-[#DCD4FD]" title={`Session: ${session}`}>
            <CalendarDays className="w-4 h-4" />
          </div>
        )}

        {/* Switch School */}
        {!isCollapsed && (
          <button
            onClick={() => setActiveTab('settings')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-[#ECE7FE] rounded-xl transition-colors border border-dashed border-[#DCD4FD]"
          >
            <School className="w-3.5 h-3.5 text-slate-500" />
            <span>Switch School</span>
          </button>
        )}

        {/* Version Footer */}
        {!isCollapsed ? (
          <p className="text-[11px] text-center text-slate-400 font-medium pt-1">
            v2.3.115 • © 2026 CampusPulse
          </p>
        ) : (
          <p className="text-[9px] text-center text-slate-400 font-medium">
            v2.3
          </p>
        )}
      </div>
    </aside>
  );
}
