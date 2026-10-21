import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

export default function FeeCollectionChart({ data = [] }) {
  const [selectedSession, setSelectedSession] = useState('2026-27');

  const totalCollectedInTrend = data.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#130070] text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-[#2C07BD]">
          <p className="font-semibold text-slate-300">{label} 2026</p>
          <p className="font-bold text-[#ECE7FE] text-sm">
            Collected: ₹{payload[0].value?.toLocaleString('en-IN')}
          </p>
          {payload[1] && (
            <p className="text-[#808080]">
              Projected: ₹{payload[1].value?.toLocaleString('en-IN')}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-5 shadow-sm flex flex-col justify-between h-full">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DCD4FD]/60">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">Fee Collection Trend</h3>
            <span className="flex items-center text-[11px] font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded-full border border-[#DCD4FD]">
              <ArrowUpRight className="w-3 h-3 mr-0.5 text-[#130070]" /> +14.2% YoY
            </span>
          </div>
          <p className="text-xs text-[#808080] mt-0.5">
            Month-wise fee realization across the academic year
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 bg-[#ECE7FE]/70 p-1 rounded-xl text-xs font-semibold border border-[#DCD4FD]/50">
          <button
            onClick={() => setSelectedSession('2026-27')}
            className={`px-3 py-1 rounded-lg transition-all ${
              selectedSession === '2026-27'
                ? 'bg-[#130070] text-white shadow-xs'
                : 'text-[#808080] hover:text-slate-900'
            }`}
          >
            2026-27
          </button>
          <button
            onClick={() => setSelectedSession('All sessions')}
            className={`px-3 py-1 rounded-lg transition-all ${
              selectedSession === 'All sessions'
                ? 'bg-[#130070] text-white shadow-xs'
                : 'text-[#808080] hover:text-slate-900'
            }`}
          >
            All sessions
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-64 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="royalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#130070" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#130070" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2D9F3" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#808080', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#808080', fontSize: 11 }}
              tickFormatter={(v) => `₹${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#130070"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#royalGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Total Sum Badge */}
      <div className="pt-3 border-t border-[#DCD4FD]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#130070]" />
          <span className="text-xs text-[#808080]">Cumulative Realized Collection:</span>
        </div>
        <span className="text-sm font-extrabold text-[#130070] bg-[#ECE7FE] px-3 py-1 rounded-xl border border-[#DCD4FD] font-mono">
          Total: ₹{totalCollectedInTrend.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}
