import React, { useState } from 'react';
import Modal from '../common/Modal';
import { UserPlus, Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AddStudentModal({ isOpen, onClose, onAddStudent, classes = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    className: classes[0]?.name || 'Class 1st',
    section: 'A',
    gender: 'Male',
    category: 'General',
    isRTE: false,
    dob: '2016-01-01',
    mobile: '',
    aadhaar: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.fatherName.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddStudent(formData);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enroll New Student (Admission Form)" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Student Full Name *
            </label>
            <input
              type="text"
              required
              name="name"
              placeholder="e.g. Yashvardhan Shekhawat"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Father's Name *
            </label>
            <input
              type="text"
              required
              name="fatherName"
              placeholder="e.g. Narendra Singh"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Mother's Name
            </label>
            <input
              type="text"
              name="motherName"
              placeholder="e.g. Chandra Kanwar"
              value={formData.motherName}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Class
            </label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} (Sec {c.section})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="e.g. 9829012345"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaar"
              placeholder="XXXX-XXXX-XXXX"
              value={formData.aadhaar}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="isRTE"
              name="isRTE"
              checked={formData.isRTE}
              onChange={handleChange}
              className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="isRTE" className="text-xs font-bold text-slate-800 cursor-pointer">
              Right to Education (RTE) Quota Beneficiary (25% free seat)
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#130070] hover:bg-[#1C0191] rounded-xl transition-all shadow-md shadow-[#130070]/25"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isSubmitting ? 'Enrolling...' : 'Save & Generate SR No.'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
