import React from 'react';
import { Trophy, Star, ArrowRight, Award, Sparkles } from 'lucide-react';

export default function TopperShowcase({ topper, onViewLeaderboard }) {
  const t = topper || {
    name: "Divyanshi Sharma",
    class: "Class 10th - Sec A",
    marks: "588 / 600",
    percentage: "98.0%",
    rank: 1,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-emerald-50/40 rounded-2xl border border-amber-200/80 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
      <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
        {/* Golden Trophy Icon Badge */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-amber-950 flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            <Trophy className="w-8 h-8 text-amber-950" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 bg-[#130070] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-xs">
            #1
          </span>
        </div>

        <div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5">
            <span className="text-[10px] font-black tracking-widest text-amber-900 uppercase">
              SCHOOL TOPPER SHOWCASE
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
            {t.name}
          </h3>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1 text-xs">
            <span className="font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded-md border border-[#DCD4FD]">
              {t.class}
            </span>
            <span className="font-mono font-bold text-amber-900">
              Score: {t.marks} ({t.percentage})
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">State Merit Eligible</span>
          </div>
        </div>
      </div>

      <button
        onClick={onViewLeaderboard}
        className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm shadow-amber-500/20 hover:scale-[1.02] shrink-0"
      >
        <Award className="w-4 h-4 text-slate-950" />
        <span>View Full Leaderboard</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
