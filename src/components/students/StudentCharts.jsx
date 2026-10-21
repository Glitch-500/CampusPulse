import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function StudentCharts({ categoryStats = [], boysGirlsData = [] }) {
  const total = categoryStats.reduce((acc, curr) => acc + (curr.value || 0), 0);

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const pct = Math.round((data.value / total) * 100);
      return (
        <div className="bg-[#130070] text-white px-3 py-2 rounded-xl text-xs shadow-lg space-y-0.5 border border-[#2C07BD]">
          <p className="font-bold text-slate-200">{data.name} Category</p>
          <p className="text-[#ECE7FE] font-bold">{data.value} Students ({pct}%)</p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-lg space-y-1">
          <p className="font-bold text-slate-200">{label} Category</p>
          <p className="text-sky-300 font-semibold">Boys: {payload[0]?.value}</p>
          <p className="text-pink-300 font-semibold">Girls: {payload[1]?.value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1. Category Wise Distribution (Donut Chart) */}
      <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-5 shadow-sm flex flex-col justify-between">
        <div className="pb-3 border-b border-[#DCD4FD]/60 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Category Wise Distribution</h4>
            <p className="text-xs text-[#808080]">Roster representation as per state norms</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
            4 Categories
          </span>
        </div>

        <div className="relative w-full h-64 my-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={categoryStats}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Donut Center Total Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 leading-none">{total}</span>
            <span className="text-[11px] font-bold text-[#808080] uppercase tracking-wider mt-1">
              Students
            </span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#DCD4FD]/60">
          {categoryStats.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: item.color }} />
              <div>
                <span className="font-bold text-slate-800">{item.name}:</span>{' '}
                <span className="text-[#808080]">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Boys vs Girls by Category (Clustered Bar Chart) */}
      <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-5 shadow-sm flex flex-col justify-between">
        <div className="pb-3 border-b border-[#DCD4FD]/60 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Boys vs Girls by Category</h4>
            <p className="text-xs text-[#808080]">Gender segregation across social groups</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-sky-700">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" /> Boys
            </span>
            <span className="flex items-center gap-1.5 text-pink-700">
              <span className="w-2.5 h-2.5 rounded-sm bg-pink-500" /> Girls
            </span>
          </div>
        </div>

        <div className="w-full h-64 my-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={boysGirlsData}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              barGap={6}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2D9F3" />
              <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#808080', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#808080', fontSize: 11 }} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="Boys" fill="#0284C7" radius={[6, 6, 0, 0]} maxBarSize={32} />
              <Bar dataKey="Girls" fill="#DB2777" radius={[6, 6, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-3 border-t border-[#DCD4FD]/60 text-xs text-[#808080] flex justify-between items-center">
          <span>Even distribution maintained across all categories</span>
          <span className="font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded border border-[#DCD4FD]">RTE Compliant</span>
        </div>
      </div>
    </div>
  );
}
