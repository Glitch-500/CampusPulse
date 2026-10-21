import React, { useState } from 'react';
import {
  FileText,
  Settings,
  Receipt,
  FileCheck2,
  Clock,
  Search,
  IndianRupee,
  CreditCard,
  Printer,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import Badge from '../common/Badge';

export default function FeeLedgerTable({
  students = [],
  onOpenTakeFees,
  onPrintReceipt
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const actionItems = [
    { id: 'reports', label: 'Fees Reports', icon: FileText },
    { id: 'set_fees', label: 'Set Class Fees', icon: Settings },
    { id: 'agreement', label: 'Agreement', icon: FileCheck2 },
    { id: 'assign', label: 'Assign Accounts', icon: IndianRupee },
    { id: 'dues', label: 'Previous Dues', icon: Clock },
    { id: 'receipt_book', label: 'Receipt Book', icon: Receipt },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const filtered = students.filter((s) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      s.name.toLowerCase().includes(q) ||
      s.srNo.toLowerCase().includes(q) ||
      s.className.toLowerCase().includes(q) ||
      s.fatherName.toLowerCase().includes(q);

    if (activeTab === 'paid') return matchSearch && s.feeStatus === 'Paid';
    if (activeTab === 'due') return matchSearch && (s.feeStatus === 'Due' || s.feeStatus === 'Partial');
    if (activeTab === 'rte') return matchSearch && s.feeStatus.includes('RTE');
    return matchSearch;
  });

  const handleShowReceipt = (student) => {
    setSelectedReceipt({
      receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: '20 Oct 2026',
      studentName: student.name,
      fatherName: student.fatherName,
      className: student.className,
      srNo: student.srNo,
      amount: student.feePaid || 14000,
      mode: 'Counter Cash / UPI',
      balance: Math.max(0, (student.feeTotal || 25000) - (student.feePaid || 0))
    });
  };

  return (
    <div className="space-y-4">
      {/* 1. Action Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {actionItems.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => {}}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#F0EBFA] hover:bg-[#ECE7FE] border border-[#DCD4FD] text-slate-700 rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-xs"
            >
              <Icon className="w-4 h-4 text-emerald-700" />
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Main Ledger Card */}
      <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#808080]" />
            <input
              type="text"
              placeholder="Search ledger by student name, father name, SR no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#130070]/20 focus:border-[#130070]"
            />
          </div>

          {/* Quick status tabs */}
          <div className="flex items-center gap-1.5 bg-[#ECE7FE]/70 p-1 rounded-xl text-xs font-semibold border border-[#DCD4FD]/50">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all' ? 'bg-[#F0EBFA] text-emerald-800 shadow-xs' : 'text-[#808080]'
              }`}
            >
              All Records ({students.length})
            </button>
            <button
              onClick={() => setActiveTab('due')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'due' ? 'bg-[#F0EBFA] text-amber-700 shadow-xs' : 'text-[#808080]'
              }`}
            >
              Pending Dues
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'paid' ? 'bg-[#F0EBFA] text-emerald-800 shadow-xs' : 'text-[#808080]'
              }`}
            >
              Fully Paid
            </button>
            <button
              onClick={() => setActiveTab('rte')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'rte' ? 'bg-[#F0EBFA] text-emerald-800 shadow-xs' : 'text-[#808080]'
              }`}
            >
              RTE Beneficiaries
            </button>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto rounded-xl border border-[#DCD4FD]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#ECE7FE]/60 text-slate-700 font-bold uppercase tracking-wider border-b border-[#DCD4FD]/60">
              <tr>
                <th className="py-3 px-3.5">Student Details</th>
                <th className="py-3 px-3.5">Class</th>
                <th className="py-3 px-3.5">Total Assigned</th>
                <th className="py-3 px-3.5">Paid Amount</th>
                <th className="py-3 px-3.5">Pending Balance</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-right">Receipt / Pay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCD4FD]/50 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No student fee records found.</p>
                    <p className="text-xs mt-1">Check search keywords or change selected tab.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((st) => {
                  const balance = Math.max(0, (st.feeTotal || 25000) - (st.feePaid || 0));
                  return (
                    <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">{st.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {st.srNo} • Father: {st.fatherName}
                        </span>
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="font-semibold text-slate-700">{st.className}</span>
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap font-mono font-bold text-slate-800">
                        ₹{(st.feeTotal || 0).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap font-mono font-bold text-[#130070]">
                        ₹{(st.feePaid || 0).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap font-mono font-bold text-rose-700">
                        ₹{balance.toLocaleString('en-IN')}
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
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleShowReceipt(st)}
                            className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="View/Print Fee Receipt"
                          >
                            <Receipt className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenTakeFees && onOpenTakeFees(st)}
                            className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
                          >
                            Take Fees
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-[#F0EBFA] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#DCD4FD] space-y-4 font-sans">
            <div className="text-center pb-3 border-b border-dashed border-[#DCD4FD]">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                Official Fee Receipt
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1 uppercase tracking-tight">
                Deepti Montessori School
              </h3>
              <p className="text-[11px] text-[#808080]">
                Plot 42, Knowledge Park, Sector 5, Jaipur • Ph: +91 98290 12345
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#808080]">Receipt No:</span>
                <span className="font-bold font-mono text-slate-800">{selectedReceipt.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#808080]">Date:</span>
                <span className="font-medium text-slate-700">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#808080]">Student Name:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#808080]">Class & SR No:</span>
                <span className="font-medium text-slate-700">
                  {selectedReceipt.className} • {selectedReceipt.srNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#808080]">Father's Name:</span>
                <span className="font-medium text-slate-700">{selectedReceipt.fatherName}</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center my-2">
                <span className="font-bold text-emerald-900 text-xs">Amount Received:</span>
                <span className="font-black text-emerald-800 text-lg font-mono">
                  ₹{selectedReceipt.amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#808080]">Remaining Balance:</span>
                <span className="font-mono font-bold text-rose-600">
                  ₹{selectedReceipt.balance.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCD4FD]/60 flex justify-end gap-2">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-[#ECE7FE] rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
