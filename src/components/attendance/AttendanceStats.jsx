import React from 'react';
import { Users, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

export default function AttendanceStats({
  total = 518,
  present = 472,
  absent = 34,
  onLeave = 12,
  notMarked = 0,
  percentage = 91.1
}) {
  return (
    <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-4 sm:p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base">Today's Attendance Overview</h4>
          <p className="text-xs text-[#808080]">Real-time attendance status across all classes</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#808080]">Overall Attendance:</span>
          <span className="text-sm font-black text-[#130070] bg-[#ECE7FE] px-3 py-1 rounded-xl border border-[#DCD4FD] font-mono shadow-xs">
            {percentage}% Present
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {/* Total Students */}
        <div className="p-3 bg-[#ECE7FE]/50 rounded-xl border border-[#DCD4FD]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#808080]">Total</span>
            <Users className="w-4 h-4 text-[#808080]" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{total}</p>
          <span className="text-[10px] text-[#808080]">All registered</span>
        </div>

        {/* Present (Royal Indigo Styled) */}
        <div className="p-3 bg-[#ECE7FE] rounded-xl border border-[#DCD4FD] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#130070]">Present</span>
            <CheckCircle2 className="w-4 h-4 text-[#130070]" />
          </div>
          <p className="text-2xl font-black text-[#130070] mt-1 font-mono">{present}</p>
          <span className="text-[10px] text-[#808080] font-semibold">{percentage}% of total</span>
        </div>

        {/* Absent */}
        <div className="p-3 bg-[#ECE7FE]/40 rounded-xl border border-[#DCD4FD]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-700">Absent</span>
            <XCircle className="w-4 h-4 text-[#808080]" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{absent}</p>
          <span className="text-[10px] text-[#808080] font-medium">SMS alerts sent</span>
        </div>

        {/* On Leave */}
        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-amber-800">On Leave</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-900 mt-1 font-mono">{onLeave}</p>
          <span className="text-[10px] text-amber-600 font-medium">Approved leaves</span>
        </div>

        {/* Not Marked */}
        <div className="p-3 bg-[#ECE7FE]/30 rounded-xl border border-[#DCD4FD] col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-600">Not Marked</span>
            <AlertTriangle className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-800 mt-1 font-mono">{notMarked}</p>
          <span className="text-[10px] text-[#130070] font-medium">100% completed</span>
        </div>
      </div>
    </div>
  );
}
