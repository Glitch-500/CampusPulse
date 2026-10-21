import React, { useState } from 'react';
import Modal from '../common/Modal';
import { School } from 'lucide-react';

export default function AddClassModal({ isOpen, onClose, onAddClass }) {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('A');
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!className.trim()) return;

    onAddClass({
      name: className,
      section,
      teacher: teacher || 'Assigned Soon',
      room: room || 'Room TBA'
    });

    setClassName('');
    setTeacher('');
    setRoom('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Class & Section">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
            Class Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Class 11th (Commerce), Playgroup..."
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Section
            </label>
            <input
              type="text"
              placeholder="e.g. A, B, C"
              value={section}
              onChange={(e) => setSection(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Room / Block
            </label>
            <input
              type="text"
              placeholder="e.g. Room 205"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
            Assigned Class Teacher
          </label>
          <input
            type="text"
            placeholder="e.g. Mrs. Anjali Saxena"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#130070]/20 focus:border-[#130070]"
          />
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
            <School className="w-4 h-4" />
            <span>Create Class</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
