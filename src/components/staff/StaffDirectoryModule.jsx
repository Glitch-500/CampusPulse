import React from 'react';
import { UserCheck, Phone, Mail, Award, Plus, Search } from 'lucide-react';
import StatCard from '../common/StatCard';

export default function StaffDirectoryModule({ staff = [] }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Staff & Faculty Directory</h2>
          <p className="text-xs text-slate-400">Manage teaching and non-teaching personnel, class teachers, and payroll links</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#130070] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#1C0191] transition-colors">
          <Plus className="w-4 h-4" />
          <span>+ Add Faculty Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Staff"
          value="24 Members"
          subtitle="18 Teaching • 6 Non-teaching"
          icon={UserCheck}
          variant="emerald"
        />
        <StatCard
          title="Average Experience"
          value="8.5 Years"
          subtitle="B.Ed / M.Sc Qualified"
          icon={Award}
          variant="royal"
        />
        <StatCard
          title="Today's Attendance"
          value="23 / 24 Present"
          subtitle="95.8% Faculty presence"
          icon={UserCheck}
          variant="royal"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((member) => (
          <div key={member.id} className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-5 shadow-sm space-y-4 hover:border-[#130070]/40 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#ECE7FE] text-[#130070] font-bold text-sm flex items-center justify-center border border-[#DCD4FD]">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                  <p className="text-xs text-[#130070] font-semibold">{member.role}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded-full border border-[#DCD4FD]">
                {member.status}
              </span>
            </div>

            <div className="p-3 bg-[#ECE7FE]/40 rounded-xl border border-[#DCD4FD] text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#808080]">Class Assigned:</span>
                <span className="font-bold text-slate-800">{member.classAssigned}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#808080]">Experience:</span>
                <span className="font-medium text-slate-700">{member.experience}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-[#DCD4FD]/60">
                <span className="text-[#808080] flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#808080]" />
                  <span>{member.mobile}</span>
                </span>
                <span className="text-[#808080] flex items-center gap-1 font-mono text-[10px]">
                  <Mail className="w-3 h-3 text-[#808080]" />
                  <span>{member.email.split('@')[0]}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
