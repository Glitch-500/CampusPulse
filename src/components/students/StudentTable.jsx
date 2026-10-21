import React, { useState } from 'react';
import {
  Search,
  Plus,
  Download,
  Image,
  Phone,
  FileCheck,
  BookOpen,
  Split,
  FileText,
  Filter,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Badge from '../common/Badge';

export default function StudentTable({
  students = [],
  classes = [],
  onOpenAddModal,
  onTakeFeesForStudent
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('All');
  const [activeActionPill, setActiveActionPill] = useState('all');
  const [selectedStudentForView, setSelectedStudentForView] = useState(null);

  const actionPills = [
    { id: 'psp', label: 'Load from PSP', icon: Download },
    { id: 'add', label: '+ Add Student', isPrimary: true },
    { id: 'photos', label: 'Student Photos', icon: Image },
    { id: 'contacts', label: 'Student Contacts', icon: Phone },
    { id: 'aadhaar', label: 'Student Aadhaar', icon: FileCheck },
    { id: 'subjects', label: 'Assign Subjects', icon: BookOpen },
    { id: 'stream', label: 'Assign Stream', icon: Split },
    { id: 'section', label: 'Assign Section', icon: Split },
    { id: 'tc', label: 'TC Students', icon: FileText },
    { id: 'reports', label: 'Student Reports', icon: FileText },
  ];

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.srNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.motherName && s.motherName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      String(s.rollNo) === searchTerm.trim();

    const matchClass = selectedClass === 'All' || s.className === selectedClass;
    const matchCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchFee =
      selectedFeeStatus === 'All' ||
      s.feeStatus.toLowerCase().includes(selectedFeeStatus.toLowerCase());

    return matchSearch && matchClass && matchCategory && matchFee;
  });

  return (
    <div className="space-y-4">
      {/* 1. Top Action Pills Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {actionPills.map((pill) => {
          const Icon = pill.icon;
          if (pill.isPrimary) {
            return (
              <button
                key={pill.id}
                onClick={onOpenAddModal}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#130070] hover:bg-[#1C0191] text-white rounded-xl text-xs font-bold shrink-0 shadow-sm shadow-[#130070]/20 transition-all hover:scale-[1.02]"
              >
                <span>{pill.label}</span>
              </button>
            );
          }
          return (
            <button
              key={pill.id}
              onClick={() => setActiveActionPill(pill.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium shrink-0 transition-colors border ${
                activeActionPill === pill.id
                  ? 'bg-[#ECE7FE] border-[#DCD4FD] text-[#130070] font-bold'
                  : 'bg-[#F0EBFA] border-[#DCD4FD] text-slate-700 hover:bg-[#ECE7FE]'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5 text-[#808080]" />}
              <span>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Universal Search Bar & Quick Filter Row */}
      <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#808080]" />
            <input
              type="text"
              placeholder="Search student by SR No., Roll No., Name, Father, Mother..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#130070]/20 focus:border-[#130070] transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-[#808080] hover:text-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Class Filter */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#130070]/20"
            >
              <option value="All">All Classes ({classes.length})</option>
              {classes.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#130070]/20"
            >
              <option value="All">All Categories</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>

            {/* Fee Status Filter */}
            <select
              value={selectedFeeStatus}
              onChange={(e) => setSelectedFeeStatus(e.target.value)}
              className="px-3 py-2 bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#130070]/20"
            >
              <option value="All">All Fee Status</option>
              <option value="Paid">Fully Paid</option>
              <option value="Partial">Partial Dues</option>
              <option value="Due">Pending Dues</option>
              <option value="RTE">RTE (Govt)</option>
            </select>
          </div>
        </div>

        {/* Student Records Table */}
        <div className="overflow-x-auto rounded-xl border border-[#DCD4FD]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#ECE7FE]/60 text-slate-700 font-bold uppercase tracking-wider border-b border-[#DCD4FD]/60">
              <tr>
                <th className="py-3 px-3.5">SR / Roll</th>
                <th className="py-3 px-3.5">Student Info</th>
                <th className="py-3 px-3.5">Father / Contact</th>
                <th className="py-3 px-3.5">Class & Sec</th>
                <th className="py-3 px-3.5">Category</th>
                <th className="py-3 px-3.5">Attendance</th>
                <th className="py-3 px-3.5">Fee Status</th>
                <th className="py-3 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No students found matching filters.</p>
                    <p className="text-xs mt-1">Try resetting your search query or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-emerald-50/20 transition-colors group">
                    <td className="py-3 px-3.5 whitespace-nowrap font-mono">
                      <span className="font-bold text-slate-900 block">{st.srNo}</span>
                      <span className="text-[10px] text-slate-400">Roll: #{st.rollNo}</span>
                    </td>

                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={st.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                          alt={st.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-emerald-800 transition-colors">
                            {st.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {st.gender} • Aadhaar: {st.aadhaar || 'Verified'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <span className="font-semibold text-slate-800 block">{st.fatherName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{st.mobile || '98290-XXXXX'}</span>
                    </td>

                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {st.className} - {st.section}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-slate-700">{st.category}</span>
                        {st.isRTE && (
                          <Badge variant="rte" size="sm">
                            RTE
                          </Badge>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-3.5 whitespace-nowrap font-mono font-bold">
                      <span className={st.attendancePercentage >= 90 ? 'text-[#130070] font-extrabold' : 'text-amber-600'}>
                        {st.attendancePercentage}%
                      </span>
                    </td>

                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <Badge
                        variant={
                          st.feeStatus === 'Paid'
                            ? 'paid'
                            : st.feeStatus.includes('RTE')
                            ? 'rte'
                            : st.feeStatus === 'Partial'
                            ? 'partial'
                            : 'due'
                        }
                        size="sm"
                      >
                        {st.feeStatus}
                      </Badge>
                    </td>

                    <td className="py-3 px-3.5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedStudentForView(st)}
                          className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="View Full Student Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onTakeFeesForStudent && onTakeFeesForStudent(st)}
                          className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                          title="Collect Fees"
                        >
                          Fees
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Count */}
        <div className="flex items-center justify-between text-xs text-[#808080] pt-2">
          <span>Showing {filteredStudents.length} of {students.length} enrolled students</span>
          <span className="text-[11px] bg-[#ECE7FE] border border-[#DCD4FD] px-2 py-0.5 rounded text-[#130070] font-mono">
            Page 1 of 1
          </span>
        </div>
      </div>

      {/* Student Dossier Modal */}
      {selectedStudentForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-[#F0EBFA] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#DCD4FD] space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#DCD4FD]/60">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudentForView.photo}
                  alt={selectedStudentForView.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#130070] shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedStudentForView.name}</h3>
                  <p className="text-xs text-[#130070] font-medium">
                    {selectedStudentForView.className} (Sec {selectedStudentForView.section}) • SR: {selectedStudentForView.srNo}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentForView(null)}
                className="text-[#808080] hover:text-slate-900 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#ECE7FE]/50 rounded-xl border border-[#DCD4FD]/50">
                <span className="text-[#808080] block">Father's Name</span>
                <span className="font-bold text-slate-800">{selectedStudentForView.fatherName}</span>
              </div>
              <div className="p-3 bg-[#ECE7FE]/50 rounded-xl border border-[#DCD4FD]/50">
                <span className="text-[#808080] block">Mother's Name</span>
                <span className="font-bold text-slate-800">{selectedStudentForView.motherName || 'N/A'}</span>
              </div>
              <div className="p-3 bg-[#ECE7FE]/50 rounded-xl border border-[#DCD4FD]/50">
                <span className="text-[#808080] block">Category & Gender</span>
                <span className="font-bold text-slate-800">{selectedStudentForView.category} ({selectedStudentForView.gender})</span>
              </div>
              <div className="p-3 bg-[#ECE7FE]/50 rounded-xl border border-[#DCD4FD]/50">
                <span className="text-[#808080] block">RTE Quota Status</span>
                <span className="font-bold text-emerald-700">
                  {selectedStudentForView.isRTE ? 'RTE 25% Free Seat' : 'Regular Admission'}
                </span>
              </div>
              <div className="p-3 bg-[#ECE7FE]/50 rounded-xl border border-[#DCD4FD]/50">
                <span className="text-[#808080] block">Attendance Record</span>
                <span className="font-bold text-slate-800">{selectedStudentForView.attendancePercentage}% (Present)</span>
              </div>
              <div className="p-3 bg-[#ECE7FE]/50 rounded-xl border border-[#DCD4FD]/50">
                <span className="text-[#808080] block">Fee Account</span>
                <span className="font-bold text-slate-800">
                  ₹{selectedStudentForView.feePaid?.toLocaleString('en-IN')} / ₹{selectedStudentForView.feeTotal?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedStudentForView(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-[#ECE7FE] rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const st = selectedStudentForView;
                  setSelectedStudentForView(null);
                  if (onTakeFeesForStudent) onTakeFeesForStudent(st);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl"
              >
                Collect Fee Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
