import React, { useState } from 'react';
import Modal from '../common/Modal';
import { BookPlus } from 'lucide-react';

export default function NewSubjectModal({ isOpen, onClose, onAddSubject, className }) {
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectType, setSubjectType] = useState('COMPULSORY');
  const [maxMarks, setMaxMarks] = useState('100');
  const [passMarks, setPassMarks] = useState('33');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectName.trim()) return;

    onAddSubject({
      name: subjectName,
      code: subjectCode.toUpperCase() || subjectName.slice(0, 2).toUpperCase(),
      type: subjectType,
      maxMarks: Number(maxMarks) || 100,
      passMarks: Number(passMarks) || 33
    });

    setSubjectName('');
    setSubjectCode('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Add New Subject (${className})`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
            Subject Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Sanskrit, Environmental Studies, Computer..."
            value={subjectName}
            onChange={(e) => {
              setSubjectName(e.target.value);
              if (!subjectCode) setSubjectCode(e.target.value.slice(0, 2).toUpperCase());
            }}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Subject Code / Short Initial
            </label>
            <input
              type="text"
              maxLength="3"
              placeholder="e.g. EN, MA, CS"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Curriculum Type
            </label>
            <select
              value={subjectType}
              onChange={(e) => setSubjectType(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            >
              <option value="COMPULSORY">COMPULSORY (Scholastic)</option>
              <option value="CO_SCHOLASTIC">CO_SCHOLASTIC (Activity / Grade)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Max Theory + Practical Marks
            </label>
            <input
              type="number"
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Passing Minimum Marks
            </label>
            <input
              type="number"
              value={passMarks}
              onChange={(e) => setPassMarks(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#130070] hover:bg-[#1C0191] rounded-xl shadow-sm"
          >
            <BookPlus className="w-4 h-4" />
            <span>Add Subject</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
