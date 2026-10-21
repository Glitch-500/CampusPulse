import React from 'react';
import { Users, User, ShieldCheck, TrendingUp } from 'lucide-react';

export default function StudentAnalyticsCards({
  total = 518,
  boys = 284,
  girls = 234,
  rte = 86
}) {
  const boysPct = Math.round((boys / (total || 1)) * 100);
  const girlsPct = Math.round((girls / (total || 1)) * 100);
  const rtePct = Math.round((rte / (total || 1)) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Students */}
      <div className="relative overflow-hidden rounded-2xl border border-[#DCD4FD] bg-gradient-to-br from-[#ECE7FE] via-[#F0EBFA] to-[#ECE7FE]/60 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#130070]">
              Total Students
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1 font-sans">
              {total}
            </h3>
            <p className="text-xs text-[#808080] mt-1 flex items-center gap-1.5 font-medium">
              <span>{boys} Boys</span>
              <span className="w-1 h-1 rounded-full bg-[#808080]" />
              <span>{girls} Girls</span>
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#130070] text-white flex items-center justify-center shadow-sm shadow-[#130070]/25">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Sparkline wave SVG */}
        <div className="mt-3 pt-2 border-t border-[#DCD4FD]/60">
          <svg className="w-full h-8 text-[#130070]" viewBox="0 0 100 25" preserveAspectRatio="none">
            <path
              d="M0 18 Q 20 6, 40 14 T 70 8 T 100 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 2. Boys */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-[#E0F2FE] via-white to-[#F0F9FF] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Boys
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1 font-sans">
              {boys}
            </h3>
            <p className="text-xs text-sky-700 font-semibold mt-1">
              {boysPct}% of total enrollment
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm shadow-sky-200">
            <User className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-2 border-t border-sky-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Gender Ratio</span>
          <span className="font-bold text-sky-800 font-mono">1.21 : 1</span>
        </div>
      </div>

      {/* 3. Girls */}
      <div className="relative overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-br from-[#FCE7F3] via-[#F0EBFA] to-[#FDF2F8] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-pink-800">
              Girls
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1 font-sans">
              {girls}
            </h3>
            <p className="text-xs text-pink-700 font-semibold mt-1">
              {girlsPct}% of total enrollment
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-sm shadow-pink-200">
            <User className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-2 border-t border-pink-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Beti Bachao Initiative</span>
          <span className="font-bold text-pink-700">100% Retained</span>
        </div>
      </div>

      {/* 4. RTE Students */}
      <div className="relative overflow-hidden rounded-2xl border border-[#DCD4FD] bg-gradient-to-br from-[#ECE7FE] via-[#F0EBFA] to-[#ECE7FE] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#130070]">
              RTE Students
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1 font-sans">
              {rte}
            </h3>
            <p className="text-xs text-[#808080] font-semibold mt-1">
              {rtePct}% quota fulfilled (25% mandate)
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#130070] text-white flex items-center justify-center shadow-sm shadow-[#130070]/25">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-2 border-t border-[#DCD4FD] flex items-center justify-between text-xs">
          <span className="text-[#808080]">Shala Darpan Synced</span>
          <span className="font-bold text-[#130070]">Verified ✓</span>
        </div>
      </div>
    </div>
  );
}
