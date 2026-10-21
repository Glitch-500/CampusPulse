import React from 'react';
import { IndianRupee, TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import StatCard from '../common/StatCard';

export default function FeeMetrics({
  expected = 2450000,
  collected = 1835000,
  pending = 615000,
  previousDues = 142000
}) {
  const collectionPct = Math.round((collected / (expected || 1)) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Expected */}
      <StatCard
        title="Total Expected Fees"
        value={`₹${expected.toLocaleString('en-IN')}`}
        subtitle="Full year projected realization (2026-27)"
        icon={IndianRupee}
        variant="default"
        badgeText="Session 26-27"
        badgeColor="bg-[#ECE7FE] text-[#130070] border border-[#DCD4FD]"
      />

      {/* Total Collected */}
      <StatCard
        title="Total Collected"
        value={`₹${collected.toLocaleString('en-IN')}`}
        subtitle={`${collectionPct}% realized so far`}
        icon={CheckCircle}
        variant="royal"
        badgeText={`${collectionPct}% Paid`}
        badgeColor="bg-[#ECE7FE] text-[#130070] border border-[#DCD4FD]"
      />

      {/* Pending Balance */}
      <StatCard
        title="Pending (Outstanding)"
        value={`₹${pending.toLocaleString('en-IN')}`}
        subtitle="Unpaid installments due for collection"
        icon={AlertCircle}
        variant="alert"
        badgeText="Immediate Followup"
        badgeColor="bg-amber-100 text-amber-800"
      />

      {/* Previous Year Dues */}
      <StatCard
        title="Previous Year Dues"
        value={`₹${previousDues.toLocaleString('en-IN')}`}
        subtitle="Carried forward balance from 2025-26"
        icon={Clock}
        variant="default"
        badgeText="Arrears"
        badgeColor="bg-[#ECE7FE] text-[#808080] border border-[#DCD4FD]"
      />
    </div>
  );
}
