import React from 'react';
import { PenSquare, FileCheck2, Users, ChevronRight } from 'lucide-react';

export default function ClassExamGrid({ classes = [], onEnterMarks, onViewResult }) {
  return (
    <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#DCD4FD]/60">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Class Examination & Marks Roster</h3>
          <p className="text-xs text-[#808080]">Current exam cycle: Half-Yearly Examination (2026-27)</p>
        </div>
        <span className="text-xs font-bold text-[#130070] bg-[#ECE7FE] px-2.5 py-1 rounded-lg border border-[#DCD4FD]">
          Evaluation Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="p-4 rounded-2xl border border-[#DCD4FD] bg-[#ECE7FE]/40 hover:bg-[#ECE7FE]/80 hover:border-[#130070]/40 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#808080] uppercase tracking-wider">
                  Class Room
                </span>
                <span className="text-[11px] font-bold text-[#808080] bg-[#F0EBFA] px-2 py-0.5 rounded border border-[#DCD4FD]">
                  Sec {cls.section}
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 mt-1 group-hover:text-[#130070] transition-colors">
                {cls.name}
              </h4>
              <p className="text-xs text-[#808080] mt-0.5">{cls.studentCount} Students Enrolled</p>
            </div>

            <div className="pt-3 mt-4 border-t border-[#DCD4FD]/60 flex items-center justify-between gap-2">
              <button
                onClick={() => onEnterMarks && onEnterMarks(cls)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 bg-[#130070] hover:bg-[#1C0191] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Enter Marks</span>
              </button>
              <button
                onClick={() => onViewResult && onViewResult(cls)}
                className="p-1.5 text-slate-500 hover:text-[#130070] hover:bg-[#ECE7FE] rounded-xl border border-[#DCD4FD] transition-colors"
                title="View Result Roster"
              >
                <FileCheck2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
