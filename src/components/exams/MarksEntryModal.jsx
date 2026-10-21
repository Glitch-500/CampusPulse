import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Save, Check, Award, Calculator } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MarksEntryModal({ isOpen, onClose, classItem, students = [] }) {
  const [selectedSubject, setSelectedSubject] = useState('English');
  const [marks, setMarks] = useState({
    101: 94,
    102: 86,
    103: 78,
    104: 82,
    105: 65,
    106: 92,
  });
  const [saved, setSaved] = useState(false);

  const subjects = ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Sanskrit'];

  const classStudents = students.filter(s => s.className === classItem?.name);
  const activeStudents = classStudents.length > 0 ? classStudents : [
    { id: 101, rollNo: 1, name: 'Divyanshi Sharma', srNo: 'SR-2024-001' },
    { id: 102, rollNo: 2, name: 'Aditya Singh Rathore', srNo: 'SR-2024-002' },
    { id: 103, rollNo: 3, name: 'Rohit Meena', srNo: 'SR-2024-003' },
    { id: 104, rollNo: 4, name: 'Sneha Kumawat', srNo: 'SR-2024-004' },
    { id: 105, rollNo: 5, name: 'Manish Bairwa', srNo: 'SR-2024-005' },
  ];

  const handleMarkChange = (studentId, val) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: Number(val) || 0
    }));
  };

  const handleSaveMarks = () => {
    setSaved(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  if (!classItem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Marks Entry: ${classItem.name} (Sec ${classItem.section}) - Half Yearly 2026`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        {/* Subject Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Select Subject:
          </span>
          {subjects.map(subj => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedSubject === subj
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        {/* Max Marks info */}
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
          <span className="font-semibold">
            Entering marks for: <strong>{selectedSubject}</strong>
          </span>
          <span className="font-mono font-bold">Max Marks: 100 • Passing Marks: 33</span>
        </div>

        {/* Marks Entry Table */}
        <div className="max-h-72 overflow-y-auto rounded-xl border border-[#DCD4FD]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#ECE7FE]/70 sticky top-0 text-slate-700 font-bold uppercase border-b border-[#DCD4FD]/60">
              <tr>
                <th className="py-2.5 px-3">Roll</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Marks Obtained (out of 100)</th>
                <th className="py-2.5 px-3 text-right">Grade / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCD4FD]/50">
              {activeStudents.map(st => {
                const score = marks[st.id] ?? 75;
                const isPass = score >= 33;
                const grade = score >= 90 ? 'A+' : score >= 75 ? 'A' : score >= 60 ? 'B' : score >= 33 ? 'C' : 'F';

                return (
                  <tr key={st.id} className="hover:bg-[#ECE7FE]/40">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      #{st.rollNo}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-800 block">{st.name}</span>
                      <span className="text-[10px] text-[#808080] font-mono">{st.srNo}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={score}
                        onChange={e => handleMarkChange(st.id, e.target.value)}
                        className="w-24 px-2.5 py-1 text-sm font-bold font-mono bg-[#F0EBFA] border border-[#DCD4FD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#130070]/20 focus:border-[#130070]"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded text-[11px] font-mono ${
                          isPass ? 'bg-[#ECE7FE] text-[#130070] border border-[#DCD4FD]' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {grade} ({isPass ? 'PASS' : 'FAIL'})
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#DCD4FD]/60">
          <span className="text-[11px] text-[#808080]">
            Auto-calculates grand totals, CGPA, and rank positions.
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-[#ECE7FE] rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveMarks}
              className="flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-[#130070] hover:bg-[#1C0191] rounded-xl transition-all shadow-md shadow-[#130070]/25"
            >
              {saved ? <Check className="w-4 h-4 text-[#ECE7FE]" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Marks Saved!' : 'Save Marks'}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
