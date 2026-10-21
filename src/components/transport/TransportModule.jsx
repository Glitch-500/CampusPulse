import React from 'react';
import { Bus, MapPin, Phone, Users, Shield, Navigation } from 'lucide-react';
import StatCard from '../common/StatCard';

export default function TransportModule({ vehicles = [] }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Transport Facility & Fleet</h2>
          <p className="text-xs text-slate-400">Manage school buses, vans, pickup routes, and live GPS tracking</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#130070] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#1C0191] transition-colors">
          <Bus className="w-4 h-4" />
          <span>+ Add Route / Vehicle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Active Vehicles"
          value="3 Vehicles"
          subtitle="2 Buses • 1 Wing Van"
          icon={Bus}
          variant="royal"
        />
        <StatCard
          title="Transport Students"
          value="104 Students"
          subtitle="Across 3 designated routes"
          icon={Users}
          variant="royal"
        />
        <StatCard
          title="GPS Safety Status"
          value="100% Online"
          subtitle="Speed governor compliant"
          icon={Shield}
          variant="royal"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-5 shadow-sm space-y-4 hover:border-[#130070]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs bg-[#ECE7FE] px-2.5 py-1 rounded-lg text-[#130070] border border-[#DCD4FD]">
                {v.id}
              </span>
              <span className="text-[10px] font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#DCD4FD]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#130070] animate-ping" />
                {v.status}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">{v.route}</h4>
              <p className="text-xs text-[#808080] mt-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#808080]" />
                <span>{v.studentsCount} / {v.capacity} Seats Filled</span>
              </p>
            </div>

            <div className="p-3 bg-[#ECE7FE]/40 rounded-xl border border-[#DCD4FD] text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#808080]">Driver:</span>
                <span className="font-bold text-slate-800">{v.driver}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#808080]">Contact:</span>
                <span className="font-mono text-[#130070] font-bold">{v.phone}</span>
              </div>
            </div>

            <button className="w-full py-2 bg-[#ECE7FE] hover:bg-[#ECE7FE]/80 text-[#130070] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-[#DCD4FD]">
              <Navigation className="w-3.5 h-3.5 text-[#130070]" />
              <span>Track Live Route</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
