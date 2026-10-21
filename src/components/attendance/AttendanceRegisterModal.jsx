import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { CheckCircle2, UserCheck, Calendar, Save, Check, X, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiService } from '../../api/apiService';

export default function AttendanceRegisterModal({
  isOpen,
  onClose,
  classItem,
  students = [],
  date = "2026-10-20"
}) {
  const [attendanceMap, setAttendanceMap] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filter students for this class or generate mock entries if empty
  const classStudents = students.filter(s => s.className === classItem?.name);
  const activeList = classStudents.length > 0 ? classStudents : [
    { id: 201, rollNo: 1, name: 'Aarav Sharma', gender: 'Male', srNo: 'SR-2024-010' },
    { id: 202, rollNo: 2, name: 'Ananya Patel', gender: 'Female', srNo: 'SR-2024-011' },
    { id: 203, rollNo: 3, name: 'Bhavya Rathore', gender: 'Female', srNo: 'SR-2024-012' },
    { id: 204, rollNo: 4, name: 'Chirag Shekhawat', gender: 'Male', srNo: 'SR-2024-013' },
    { id: 205, rollNo: 5, name: 'Divyansh Saini', gender: 'Male', srNo: 'SR-2024-014' },
    { id: 206, rollNo: 6, name: 'Garima Verma', gender: 'Female', srNo: 'SR-2024-015' },
    { id: 207, rollNo: 7, name: 'Harshit Kumawat', gender: 'Male', srNo: 'SR-2024-016' },
    { id: 208, rollNo: 8, name: 'Ishita Joshi', gender: 'Female', srNo: 'SR-2024-017' }
  ];

  useEffect(() => {
    // Default all students to 'P' (Present)
    const initial = {};
    activeList.forEach((s) => {
      initial[s.id] = 'P';
    });
    setAttendanceMap(initial);
    setSavedSuccess(false);
  }, [classItem, isOpen]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status) => {
    const updated = {};
    activeList.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiService.saveAttendance(classItem?.id, date, attendanceMap);
      setSavedSuccess(true);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const presentCount = Object.values(attendanceMap).filter((v) => v === 'P').length;
  const absentCount = Object.values(attendanceMap).filter((v) => v === 'A').length;
  const leaveCount = Object.values(attendanceMap).filter((v) => v === 'L').length;

  if (!classItem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Daily Register - ${classItem.name} (Sec ${classItem.section})`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        {/* Meta Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#ECE7FE]/40 rounded-xl border border-[#DCD4FD]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#130070]" />
            <span className="text-xs font-bold text-slate-800">Date: {date}</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-[#808080]">Teacher: {classItem.teacher}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMarkAll('P')}
              className="px-2.5 py-1 text-xs font-bold text-[#130070] bg-[#ECE7FE] hover:bg-[#DCD4FD] rounded-lg transition-colors border border-[#DCD4FD]"
            >
              Mark All Present
            </button>
            <button
              onClick={() => handleMarkAll('A')}
              className="px-2.5 py-1 text-xs font-bold text-[#808080] bg-[#ECE7FE]/60 hover:bg-[#ECE7FE] rounded-lg transition-colors border border-[#DCD4FD]"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="px-3 py-1 bg-[#ECE7FE] text-[#130070] rounded-lg border border-[#DCD4FD] font-black">
            Present: {presentCount}
          </span>
          <span className="px-3 py-1 bg-[#ECE7FE]/60 text-slate-700 rounded-lg border border-[#DCD4FD]">
            Absent: {absentCount}
          </span>
          <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
            Leave: {leaveCount}
          </span>
        </div>

        {/* Register Table */}
        <div className="max-h-72 overflow-y-auto rounded-xl border border-[#DCD4FD]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#ECE7FE]/70 sticky top-0 text-slate-700 font-bold uppercase border-b border-[#DCD4FD]/60">
              <tr>
                <th className="py-2.5 px-3">Roll</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Gender</th>
                <th className="py-2.5 px-3 text-right">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCD4FD]/50">
              {activeList.map((st) => {
                const currentStatus = attendanceMap[st.id] || 'P';
                return (
                  <tr key={st.id} className="hover:bg-[#ECE7FE]/40">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      #{st.rollNo}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-800 block">{st.name}</span>
                      <span className="text-[10px] text-[#808080] font-mono">{st.srNo}</span>
                    </td>
                    <td className="py-2.5 px-3 text-[#808080]">{st.gender}</td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="inline-flex items-center gap-1 bg-[#ECE7FE]/60 p-0.5 rounded-lg border border-[#DCD4FD]">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'P')}
                          className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center transition-all ${
                            currentStatus === 'P'
                              ? 'bg-[#130070] text-white shadow-xs'
                              : 'text-slate-600 hover:text-[#130070]'
                          }`}
                          title="Present"
                        >
                          P
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'A')}
                          className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center transition-all ${
                            currentStatus === 'A'
                              ? 'bg-slate-800 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                          title="Absent"
                        >
                          A
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'L')}
                          className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center transition-all ${
                            currentStatus === 'L'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'text-slate-600 hover:text-amber-700'
                          }`}
                          title="On Leave"
                        >
                          L
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action Bottom Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-[#DCD4FD]/60">
          <span className="text-[11px] text-[#808080]">
            Attendance will automatically trigger SMS notification to absentees' parents.
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-[#ECE7FE] rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-[#130070] hover:bg-[#1C0191] rounded-xl transition-all shadow-md shadow-[#130070]/25"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#ECE7FE]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Submitting...' : 'Save Register'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
