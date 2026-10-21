import React, { useState } from 'react';
import Modal from '../common/Modal';
import { IndianRupee, Search, CheckCircle, Receipt, User, CreditCard, Sparkles } from 'lucide-react';
import { apiService } from '../../api/apiService';
import confetti from 'canvas-confetti';

export default function TakeFeesModal({ isOpen, onClose, students = [], onSuccess }) {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [feeHead, setFeeHead] = useState('Quarter 2 Installment');
  const [remarks, setRemarks] = useState('');
  const [receiptGenerated, setReceiptGenerated] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredStudents = search.trim() === ''
    ? students.slice(0, 5)
    : students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.srNo.toLowerCase().includes(search.toLowerCase()) ||
        s.className.toLowerCase().includes(search.toLowerCase())
      );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !amount || Number(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      const receipt = await apiService.recordFeePayment({
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        srNo: selectedStudent.srNo,
        className: selectedStudent.className,
        amount: Number(amount),
        paymentMode,
        feeHead,
        remarks: remarks || 'Tuition Fee Payment',
        collectedBy: 'Sudarshan Maurya (Owner)'
      });

      setReceiptGenerated(receipt);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onSuccess) onSuccess(receipt);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setReceiptGenerated(null);
    setSelectedStudent(null);
    setAmount('');
    setRemarks('');
    setSearch('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Quick Fee Collection (Take Fees)">
      {receiptGenerated ? (
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 bg-[#ECE7FE] text-[#130070] rounded-full flex items-center justify-center mx-auto shadow-sm border border-[#DCD4FD]">
            <CheckCircle className="w-9 h-9" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900">Payment Recorded Successfully!</h4>
            <p className="text-xs text-[#808080] mt-1">
              Receipt No: <span className="font-mono font-bold text-[#130070]">{receiptGenerated.receiptNo}</span>
            </p>
          </div>

          <div className="bg-[#ECE7FE]/40 p-4 rounded-2xl border border-[#DCD4FD] text-left space-y-2 text-sm max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-[#808080]">Student:</span>
              <span className="font-bold text-slate-900">{receiptGenerated.studentName} ({receiptGenerated.className})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#808080]">Amount Paid:</span>
              <span className="font-bold text-[#130070] font-mono text-base">₹{receiptGenerated.amount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#808080]">Payment Mode:</span>
              <span className="font-medium text-slate-800">{receiptGenerated.paymentMode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#808080]">Fee Head:</span>
              <span className="font-medium text-slate-800">{receiptGenerated.feeHead}</span>
            </div>
            <div className="flex justify-between text-xs text-[#808080] pt-2 border-t border-[#DCD4FD]/60">
              <span>Date: {receiptGenerated.date}</span>
              <span>Collector: {receiptGenerated.collectedBy}</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#130070] bg-[#ECE7FE] hover:bg-[#DCD4FD] rounded-xl transition-colors border border-[#DCD4FD]"
            >
              <Receipt className="w-4 h-4" />
              <span>Print Thermal Receipt</span>
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2 text-xs font-bold text-white bg-[#130070] hover:bg-[#1C0191] rounded-xl transition-colors shadow-sm"
            >
              Done & Close
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Student Lookup */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Select Student (By Name, SR No., or Class)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#808080]" />
              <input
                type="text"
                placeholder="Search e.g. Divyanshi, SR-2024-001..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#130070]/20 focus:border-[#130070]"
              />
            </div>

            {/* Quick list preview */}
            <div className="mt-2 space-y-1 max-h-36 overflow-y-auto">
              {filteredStudents.map((st) => (
                <div
                  key={st.id}
                  onClick={() => {
                    setSelectedStudent(st);
                    const due = Math.max(0, (st.feeTotal || 25000) - (st.feePaid || 0));
                    setAmount(due > 0 ? String(due) : '5000');
                  }}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer border transition-all ${
                    selectedStudent?.id === st.id
                      ? 'bg-[#ECE7FE] border-[#DCD4FD] text-[#130070] font-semibold ring-1 ring-[#130070]'
                      : 'bg-[#F0EBFA] border-[#DCD4FD] hover:bg-[#ECE7FE]/60 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#808080]" />
                    <span>{st.name} ({st.className})</span>
                    <span className="text-[10px] text-[#808080] font-mono">[{st.srNo}]</span>
                  </div>
                  <span className="text-[#808080]">
                    Status: <strong className="text-slate-700">{st.feeStatus}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {selectedStudent && (
            <div className="p-3 bg-[#ECE7FE] rounded-xl border border-[#DCD4FD] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#130070]">{selectedStudent.name}</p>
                <p className="text-[11px] text-[#808080]">
                  Father: {selectedStudent.fatherName} • Class: {selectedStudent.className}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Total / Paid</p>
                <p className="text-xs font-bold text-slate-800">
                  ₹{selectedStudent.feePaid?.toLocaleString('en-IN') || 0} / ₹{selectedStudent.feeTotal?.toLocaleString('en-IN') || 0}
                </p>
              </div>
            </div>
          )}

          {/* Amount & Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Collection Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-base font-bold text-emerald-900 bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Payment Mode
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium"
              >
                <option value="Cash">Cash (Counter)</option>
                <option value="UPI / QR Code">UPI / QR Code (PhonePe, GPay, Paytm)</option>
                <option value="Net Banking / NEFT">Net Banking / NEFT</option>
                <option value="Cheque / DD">Cheque / Demand Draft</option>
                <option value="Card (POS)">Card (POS Machine)</option>
              </select>
            </div>
          </div>

          {/* Fee Head & Remarks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Fee Head
              </label>
              <select
                value={feeHead}
                onChange={(e) => setFeeHead(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              >
                <option value="Quarter 1 (Apr - Jun)">Quarter 1 (Apr - Jun)</option>
                <option value="Quarter 2 (Jul - Sep)">Quarter 2 (Jul - Sep)</option>
                <option value="Quarter 3 (Oct - Dec)">Quarter 3 (Oct - Dec)</option>
                <option value="Quarter 4 (Jan - Mar)">Quarter 4 (Jan - Mar)</option>
                <option value="Admission & Annual Charges">Admission & Annual Charges</option>
                <option value="Exam & Board Fee">Exam & Board Fee</option>
                <option value="Bus / Transport Fee">Bus / Transport Fee</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Remarks / Receipt Note
              </label>
              <input
                type="text"
                placeholder="Optional remark..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-[#DCD4FD]/60">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-[#ECE7FE] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedStudent || !amount || isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#130070] hover:bg-[#1C0191] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-md shadow-[#130070]/25"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording...' : 'Collect & Print Receipt'}</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
