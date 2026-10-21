import React from 'react';
import { Plus, GripVertical, Trash2, BookOpen, Check, Award } from 'lucide-react';
import Badge from '../common/Badge';

export default function SubjectConfigColumn({
  selectedClass,
  subjects = [],
  onOpenNewSubject,
  onDeleteSubject
}) {
  return (
    <div className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-4 sm:p-5 shadow-sm space-y-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCD4FD]/60">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">
            Subjects Configuration -{' '}
            <span className="text-[#130070]">{selectedClass?.name || 'Class 10th'}</span>
          </h3>
          <p className="text-xs text-[#808080] mt-0.5">
            Configure marks distribution, scholastic evaluation mode, and syllabus weightage
          </p>
        </div>

        <button
          onClick={onOpenNewSubject}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#130070] hover:bg-[#1C0191] text-white rounded-xl text-xs font-bold shrink-0 transition-all shadow-sm shadow-[#130070]/20 hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Subject</span>
        </button>
      </div>

      {/* Subject Cards */}
      <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
        {subjects.length === 0 ? (
          <div className="text-center py-12 text-[#808080]">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">No subjects configured for this class.</p>
            <p className="text-xs mt-1">Click "+ New Subject" to attach curriculum subjects.</p>
          </div>
        ) : (
          subjects.map((subj) => (
            <div
              key={subj.id}
              className="p-3.5 rounded-xl border border-[#DCD4FD] bg-[#ECE7FE]/40 hover:border-[#130070]/40 hover:bg-[#ECE7FE]/80 transition-all flex items-center justify-between group shadow-xs"
            >
              <div className="flex items-center gap-3">
                {/* Drag Handle */}
                <div className="cursor-grab text-slate-300 hover:text-slate-600 transition-colors">
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* Subject Initial Badge */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 text-white font-extrabold text-xs flex items-center justify-center font-mono shadow-xs shrink-0">
                  {subj.code || subj.name.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#130070] transition-colors">
                    {subj.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={subj.type === 'COMPULSORY' ? 'compulsory' : 'co_scholastic'}
                      size="sm"
                    >
                      {subj.type}
                    </Badge>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Max Marks: <strong className="text-slate-700 font-mono">{subj.maxMarks || 100}</strong>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-[#808080]">
                      Pass: {subj.passMarks || 33}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDeleteSubject && onDeleteSubject(subj.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-70 group-hover:opacity-100"
                  title="Remove Subject"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-[#DCD4FD]/60 flex items-center justify-between text-xs text-[#808080]">
        <span>{subjects.length} Subjects attached to {selectedClass?.name}</span>
        <span className="text-[11px] font-bold text-[#130070] bg-[#ECE7FE] px-2 py-0.5 rounded border border-[#DCD4FD]">
          RBSE/CBSE Marksheet Ready
        </span>
      </div>
    </div>
  );
}
