import React from 'react';

export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    royal: 'bg-[#ECE7FE] text-[#130070] border-[#DCD4FD] font-semibold',
    grey: 'bg-slate-100 text-[#808080] border-slate-200 font-medium',
    emerald: 'bg-[#ECE7FE] text-[#130070] border-[#DCD4FD]',
    compulsory: 'bg-[#ECE7FE] text-[#130070] border-[#DCD4FD]',
    co_scholastic: 'bg-slate-100 text-[#808080] border-slate-200',
    boy: 'bg-sky-50 text-sky-700 border-sky-200',
    girl: 'bg-pink-50 text-pink-700 border-pink-200',
    alert: 'bg-amber-50 text-amber-700 border-amber-200',
    rte: 'bg-[#ECE7FE] text-[#130070] border-[#DCD4FD] font-semibold',
    paid: 'bg-[#ECE7FE] text-[#130070] border-[#DCD4FD]',
    partial: 'bg-amber-100 text-amber-800 border-amber-200',
    due: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${
        variantStyles[variant] || variantStyles.default
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {children}
    </span>
  );
}
