import React, { useState } from 'react';
import { Search, Users, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';

export default function ClassListSection({ classes = [], onSelectClass, onOpenAttendance }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-5 shadow-sm space-y-4">
      {/* Title & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">Your Classes</h3>
            <span className="text-xs font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded-full border border-[#DCD4FD]">
              {classes.length} Total
            </span>
          </div>
          <p className="text-xs text-[#808080] mt-0.5">
            Quick access to class enrollments, class teachers, and subject allocations
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#808080]" />
          <input
            type="text"
            placeholder="Search class or section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#130070]/20 focus:border-[#130070] transition-all"
          />
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectClass && onSelectClass(item)}
            className="group relative p-4 rounded-2xl border border-[#DCD4FD] bg-gradient-to-b from-[#F0EBFA] to-[#ECE7FE]/50 hover:to-[#ECE7FE] hover:border-[#130070]/40 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded-lg border border-[#DCD4FD]">
                Sec - {item.section}
              </span>
              <span className="text-[11px] font-bold text-[#130070] bg-[#ECE7FE]/70 px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#DCD4FD]/60">
                <Users className="w-3 h-3 text-[#130070]" />
                <span>{item.studentCount} Students</span>
              </span>
            </div>

            <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#130070] transition-colors">
              {item.name}
            </h4>

            <div className="mt-3 pt-2.5 border-t border-[#DCD4FD]/60 flex items-center justify-between text-xs text-[#808080]">
              <span className="truncate max-w-[120px]" title={item.teacher}>
                {item.teacher}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#130070] group-hover:translate-x-0.5 transition-transform">
                <span>View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
