import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  PhoneCall,
  ChevronDown,
  Globe,
  Check,
  LifeBuoy,
  LogOut,
  User,
  Settings,
  X
} from 'lucide-react';

export default function Header({
  schoolName = "DEEPTI MONTESSORI SCHOOL",
  userName = "Sudarshan Maurya",
  userRole = "Owner",
  language = "en",
  setLanguage,
  onOpenSearch,
  onOpenTakeFees
}) {
  const [greeting, setGreeting] = useState("Good evening,");
  const [currentDateFormatted, setCurrentDateFormatted] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    // Dynamic greeting calculation
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning,");
    else if (hour < 17) setGreeting("Good afternoon,");
    else setGreeting("Good evening,");

    // Dynamic date format e.g. "Tuesday, 20 Oct 2026"
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    setCurrentDateFormatted(now.toLocaleDateString('en-IN', options));
  }, []);

  const notifications = [
    { id: 1, title: 'Fee payment received', desc: '₹28,000 from Divyanshi Sharma (10th-A)', time: '10m ago', unread: true },
    { id: 2, title: 'Attendance Marked', desc: 'Class 8th-A attendance synced: 50/52 present', time: '1h ago', unread: true },
    { id: 3, title: 'Shala Darpan Notice', desc: 'Quarterly compliance submission due in 4 days', time: '3h ago', unread: false },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-[#F0EBFA]/95 backdrop-blur-md border-b border-[#DCD4FD]/80 px-4 sm:px-6 flex items-center justify-between transition-all">
        {/* Left: Greeting + School Name + Date */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#808080] hidden md:inline">
              {greeting}
            </span>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 truncate uppercase font-sans">
              {language === 'hi' ? 'दीप्ति मोंटेसरी स्कूल' : schoolName}
            </h1>
          </div>
          <span className="text-[11px] font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded-md border border-[#DCD4FD]/80 w-fit">
            {currentDateFormatted || '20 Oct 2026'}
          </span>
        </div>

        {/* Right: Actions & User Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Pill */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-colors"
            title="Toggle Language (Hindi / English)"
          >
            <Globe className="w-3.5 h-3.5 text-[#130070]" />
            <span className={language === 'hi' ? 'text-[#130070] font-extrabold' : ''}>अ</span>
            <span className="text-slate-300">/</span>
            <span className={language === 'en' ? 'text-[#130070] font-extrabold' : ''}>A</span>
          </button>

          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl border border-[#DCD4FD] text-slate-600 bg-[#ECE7FE]/40 hover:bg-[#ECE7FE] transition-colors"
            title="Search anything (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-[#808080]" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden lg:inline text-[10px] bg-[#F0EBFA] px-1.5 py-0.5 rounded border border-[#DCD4FD] text-[#808080] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Support Phone Icon Button */}
          <button
            onClick={() => setShowSupportModal(true)}
            className="p-2 text-slate-600 hover:text-[#130070] hover:bg-[#ECE7FE] rounded-xl border border-[#DCD4FD] transition-colors"
            title="Helpdesk & Support"
          >
            <PhoneCall className="w-4 h-4" />
          </button>

          {/* Notification Bell Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-[#130070] hover:bg-[#ECE7FE] rounded-xl border border-[#DCD4FD] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#130070] ring-2 ring-[#F0EBFA]" />
            </button>

            {/* Notification Flyout */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#F0EBFA] rounded-2xl shadow-xl border border-[#DCD4FD] p-3 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#DCD4FD]/60">
                  <span className="text-xs font-bold text-slate-800">Notifications</span>
                  <span className="text-[10px] font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded-full border border-[#DCD4FD]">
                    2 New
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        n.unread ? 'bg-[#ECE7FE]/70 hover:bg-[#ECE7FE]' : 'hover:bg-[#ECE7FE]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-800">{n.title}</p>
                        <span className="text-[10px] text-[#808080]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#808080] mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-full border border-[#DCD4FD] bg-[#F0EBFA] hover:bg-[#ECE7FE] transition-colors shadow-xs"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#130070] to-[#2C07BD] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                SM
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-xs font-bold text-slate-800">{userName}</span>
                <span className="text-[10px] font-bold text-[#130070] mt-0.5">{userRole}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#F0EBFA] rounded-2xl shadow-xl border border-[#DCD4FD] p-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-[#DCD4FD]/60">
                  <p className="text-xs font-bold text-slate-900">{userName}</p>
                  <p className="text-[11px] text-[#808080]">admin@deeptischool.edu.in</p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#ECE7FE] hover:text-[#130070] rounded-lg transition-colors">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#ECE7FE] hover:text-[#130070] rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>School Configuration</span>
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Support & Help Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-[#F0EBFA] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#DCD4FD]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCD4FD]/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ECE7FE] text-[#130070] flex items-center justify-center border border-[#DCD4FD]">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900">CampusPulse Helpdesk</h3>
              </div>
              <button
                onClick={() => setShowSupportModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-sm text-slate-600">
              <p>Need assistance with RTE verification, Fee receipts, or Portal sync?</p>
              <div className="p-3 bg-[#ECE7FE] rounded-xl border border-[#DCD4FD] space-y-1">
                <p className="text-xs font-semibold text-[#130070]">Toll-Free ERP Hotline:</p>
                <p className="text-lg font-black text-[#130070] font-mono">1800-267-3456</p>
                <p className="text-xs text-[#808080]">Available Mon-Sat: 8:00 AM - 8:00 PM</p>
              </div>
              <div className="p-3 bg-[#ECE7FE]/40 rounded-xl border border-[#DCD4FD] space-y-1">
                <p className="text-xs font-semibold text-slate-700">Dedicated Support Officer:</p>
                <p className="text-sm font-bold text-slate-900">Mr. Rakesh Sharma (+91 94140 55432)</p>
                <p className="text-xs text-[#808080]">support@campuspulse.in</p>
              </div>
            </div>
            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full mt-2 py-2.5 bg-[#130070] hover:bg-[#1C0191] text-white font-semibold rounded-xl transition-colors shadow-sm shadow-[#130070]/20"
            >
              Close Helpdesk
            </button>
          </div>
        </div>
      )}
    </>
  );
}
