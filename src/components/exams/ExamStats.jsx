import React from 'react';
import { Users, School, AlertCircle, FileX, Clock } from 'lucide-react';

export default function ExamStats({
  students = 518,
  classes = 13,
  incomplete = 24,
  nso = 12,
  lowAttendance = 18
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {/* 1. Students */}
      <div className="p-3.5 bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] shadow-sm">
        <div className="flex items-center justify-between text-[#808080]">
          <span className="text-[11px] font-bold uppercase text-[#808080]">Examinees</span>
          <Users className="w-4 h-4 text-[#130070]" />
        </div>
        <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{students}</p>
        <span className="text-[10px] text-[#808080]">All registered students</span>
      </div>

      {/* 2. Classes */}
      <div className="p-3.5 bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] shadow-sm">
        <div className="flex items-center justify-between text-[#808080]">
          <span className="text-[11px] font-bold uppercase text-[#808080]">Classes</span>
          <School className="w-4 h-4 text-sky-600" />
        </div>
        <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{classes}</p>
        <span className="text-[10px] text-[#808080]">Nursery to Class 10th</span>
      </div>

      {/* 3. Incomplete Marks */}
      <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100 shadow-sm">
        <div className="flex items-center justify-between text-amber-600">
          <span className="text-[11px] font-bold uppercase text-amber-800">Incomplete</span>
          <AlertCircle className="w-4 h-4" />
        </div>
        <p className="text-2xl font-black text-amber-900 mt-1 font-mono">{incomplete}</p>
        <span className="text-[10px] text-amber-700 font-semibold">Pending entries</span>
      </div>

      {/* 4. NSO Students */}
      <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-100 shadow-sm">
        <div className="flex items-center justify-between text-rose-600">
          <span className="text-[11px] font-bold uppercase text-rose-800">NSO Students</span>
          <FileX className="w-4 h-4" />
        </div>
        <p className="text-2xl font-black text-rose-900 mt-1 font-mono">{nso}</p>
        <span className="text-[10px] text-rose-700 font-medium">Name Struck Off</span>
      </div>

      {/* 5. Low Attendance */}
      <div className="p-3.5 bg-[#ECE7FE]/40 rounded-2xl border border-[#DCD4FD] shadow-sm col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase text-slate-600">&lt; 75% Att.</span>
          <Clock className="w-4 h-4" />
        </div>
        <p className="text-2xl font-black text-slate-800 mt-1 font-mono">{lowAttendance}</p>
        <span className="text-[10px] text-rose-600 font-medium">Admit Card Hold</span>
      </div>
    </div>
  );
}
