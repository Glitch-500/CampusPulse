import React from 'react';
import { Calendar, UserCheck, Users, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function ClassRegisterCard({
  classItem,
  session = "2026-27",
  date = "20 Oct 2026",
  isMarked = true,
  presentCount = 38,
  onClick
}) {
  const rings = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div
      onClick={onClick}
      className="register-notebook group cursor-pointer overflow-hidden flex border border-amber-900/10 hover:border-[#130070]/40 transition-all duration-300"
    >
      {/* Royal Indigo Leather-style binding spine with rings */}
      <div className="register-spine w-12 sm:w-14 flex flex-col justify-between items-center py-4 relative shrink-0">
        {/* Embossed silver/grey border line along spine */}
        <div className="absolute right-1 top-0 bottom-0 w-[1px] bg-[#808080]/30" />

        {/* Ring holes and metallic rings */}
        <div className="flex flex-col justify-around h-full w-full items-center py-2 space-y-3">
          {rings.map((r) => (
            <div key={r} className="relative flex items-center justify-center w-full">
              {/* Spine hole punch */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#0A0042]/80 shadow-inner" />
              {/* Metallic Ring */}
              <div className="spiral-ring absolute -right-2 w-5 h-2 rounded-full border border-slate-400/40 transform -rotate-6" />
            </div>
          ))}
        </div>
      </div>

      {/* Lavender-white center page */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-[#F0EBFA] relative">
        {/* Subtle lined paper watermark / rule */}
        <div className="absolute inset-0 bg-[linear-gradient(#DCD4FD_1px,transparent_1px)] bg-[size:100%_28px] pointer-events-none opacity-40" />

        <div className="relative z-10">
          {/* Header Seal / Badge */}
          <div className="flex items-center justify-between pb-2 border-b border-[#DCD4FD]/60">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#130070] font-serif">
              ATTENDANCE REGISTER
            </span>
            <span className="text-[10px] font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded border border-[#DCD4FD]">
              {session}
            </span>
          </div>

          {/* Class Title */}
          <div className="mt-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif group-hover:text-[#130070] transition-colors">
              {classItem.name}
            </h3>
            <p className="text-xs font-semibold text-[#808080] mt-0.5">
              Section - {classItem.section} • {classItem.studentCount} Students
            </p>
          </div>
        </div>

        {/* Attendance status banner */}
        <div className="relative z-10 mt-5 pt-3 border-t border-[#DCD4FD]/60 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium text-[#808080] uppercase tracking-wider">
              Class Teacher
            </p>
            <p className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
              {classItem.teacher}
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#ECE7FE] text-[#130070] px-2.5 py-1 rounded-lg border border-[#DCD4FD] text-xs font-bold shadow-xs">
            <UserCheck className="w-3.5 h-3.5 text-[#130070]" />
            <span>Mark / View</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#130070] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
