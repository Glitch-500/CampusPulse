import React from 'react';
import { Plus, Languages, Trash2, Pencil, Users, ChevronRight } from 'lucide-react';

export default function ClassListColumn({
  classes = [],
  selectedClass,
  onSelectClass,
  onAddClass,
  onDeleteClass
}) {
  return (
    <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-4 sm:p-5 shadow-sm space-y-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DCD4FD]/60">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-slate-900 text-base">Classes</h3>
          <span className="text-xs font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded-full border border-[#DCD4FD]">
            {classes.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-[#ECE7FE] rounded-lg transition-colors"
            title="Translate Hindi / English"
          >
            <Languages className="w-4 h-4" />
          </button>
          <button
            onClick={onAddClass}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-[#130070] hover:bg-[#1C0191] rounded-lg transition-all shadow-xs"
            title="Add New Class"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Class List Items */}
      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {classes.map((cls) => {
          const isSelected = selectedClass?.id === cls.id;
          return (
            <div
              key={cls.id}
              onClick={() => onSelectClass(cls)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                isSelected
                  ? 'bg-[#ECE7FE] border-[#DCD4FD] ring-1 ring-[#130070]/30 shadow-xs'
                  : 'bg-[#F0EBFA] border-[#DCD4FD] hover:border-[#130070]/30 hover:bg-[#ECE7FE]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs uppercase ${
                    isSelected
                      ? 'bg-[#130070] text-white shadow-xs'
                      : 'bg-[#ECE7FE] text-slate-700 group-hover:bg-[#DCD4FD]/60'
                  }`}
                >
                  {cls.name.slice(0, 2)}
                </span>
                <div>
                  <h4
                    className={`text-sm font-bold leading-tight ${
                      isSelected ? 'text-[#130070] font-black' : 'text-slate-800'
                    }`}
                  >
                    {cls.name}
                  </h4>
                  <p className="text-[11px] text-[#808080] mt-0.5 flex items-center gap-1.5">
                    <span>Sec {cls.section}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{cls.teacher}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  title="Edit Class"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDeleteClass) onDeleteClass(cls.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Class"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <ChevronRight
                  className={`w-4 h-4 ml-1 transition-transform ${
                    isSelected ? 'text-[#130070] translate-x-0.5' : 'text-slate-300'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
