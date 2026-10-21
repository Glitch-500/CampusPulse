import React from 'react';
import { GraduationCap, ArrowRight, Calendar, Sparkles, Trophy } from 'lucide-react';

export default function ExamBanner({ onOpenTimetable }) {
  return (
    <div className="space-y-4">
      {/* 1. Royal Indigo hero banner (#130070) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A0042] via-[#130070] to-[#2C07BD] text-white p-6 sm:p-8 shadow-md shadow-[#130070]/20">
        {/* Decorative background shapes */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#2C07BD]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-20 top-2 w-32 h-32 bg-[#9680F7]/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C0191]/80 border border-[#9680F7]/40 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ECE7FE]" />
            <span>Academic Session 2026-27 Examination Suite</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
            Exam & Result Dashboard
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
            Schedule exams, enter marks, generate automated report cards, compute merit ranks, and print RBSE/CBSE compliant marksheets in one click.
          </p>
        </div>
      </div>

      {/* 2. Quick CTA Card */}
      <div
        onClick={onOpenTimetable}
        className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-[#130070]/50 hover:shadow-md transition-all group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#ECE7FE] text-[#130070] flex items-center justify-center shrink-0 border border-[#DCD4FD] group-hover:bg-[#130070] group-hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#130070] transition-colors">
              Create Exam Timetable
            </h4>
            <p className="text-xs text-[#808080] mt-0.5">
              Five regular exams are ready (Quarterly, Half-Yearly, Pre-Board, Annual). You can also create any custom test.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-[#130070] group-hover:translate-x-1 transition-transform shrink-0 self-end sm:self-center">
          <span>Configure Schedule</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
