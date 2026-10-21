import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  badgeText,
  badgeColor,
  onClick,
  extraContent,
  className = ''
}) {
  const variantStyles = {
    default: 'bg-[#F0EBFA] border-[#DCD4FD] text-slate-800 shadow-sm hover:border-[#130070]/30',
    emerald: 'bg-gradient-to-br from-[#F5F3FF] via-[#F0EBFA] to-[#ECE7FE]/60 border-[#DCD4FD] text-slate-900 shadow-sm',
    royal: 'bg-gradient-to-br from-[#F5F3FF] via-[#F0EBFA] to-[#ECE7FE]/60 border-[#DCD4FD] text-slate-900 shadow-sm',
    grey: 'bg-gradient-to-br from-[#F9FAFB] via-[#F0EBFA] to-[#F3F4F6] border-[#D1D5DB] text-slate-900 shadow-sm',
    boy: 'bg-gradient-to-br from-[#F5F3FF] via-[#F0EBFA] to-[#ECE7FE]/60 border-[#DCD4FD] text-slate-900 shadow-sm',
    girl: 'bg-gradient-to-br from-[#F5F3FF] via-[#F0EBFA] to-[#ECE7FE]/60 border-[#DCD4FD] text-slate-900 shadow-sm',
    alert: 'bg-gradient-to-br from-[#F5F3FF] via-[#F0EBFA] to-[#ECE7FE]/60 border-amber-300/80 text-slate-900 shadow-sm hover:border-amber-400',
    rte: 'bg-gradient-to-br from-[#F5F3FF] via-[#F0EBFA] to-[#ECE7FE]/60 border-[#DCD4FD] text-slate-900 shadow-sm',
    crimson: 'bg-gradient-to-br from-[#F5F3FF] via-[#F0EBFA] to-[#ECE7FE]/60 border-[#DCD4FD] text-slate-900 shadow-sm',
  };

  const iconStyles = {
    default: 'bg-[#ECE7FE] text-[#130070] border border-[#DCD4FD]',
    emerald: 'bg-[#130070] text-white shadow-sm shadow-[#130070]/30',
    royal: 'bg-[#130070] text-white shadow-sm shadow-[#130070]/30',
    grey: 'bg-[#808080] text-white shadow-sm shadow-[#808080]/30',
    boy: 'bg-[#130070] text-white shadow-sm shadow-[#130070]/30',
    girl: 'bg-pink-500 text-white shadow-sm shadow-pink-200',
    alert: 'bg-amber-500 text-white shadow-sm shadow-amber-300',
    rte: 'bg-[#130070] text-white shadow-sm shadow-[#130070]/30',
    crimson: 'bg-[#130070] text-white shadow-sm shadow-[#130070]/30',
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 ${
        variantStyles[variant] || variantStyles.default
      } ${onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#808080]">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3
              className={`text-2xl font-bold tracking-tight font-sans ${
                variant === 'crimson' || variant === 'emerald' || variant === 'royal' || variant === 'boy'
                  ? 'text-[#130070] font-black'
                  : 'text-slate-900 font-extrabold'
              }`}
            >
              {value}
            </h3>
            {badgeText && (
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  badgeColor ||
                  (variant === 'crimson' || variant === 'emerald' || variant === 'royal'
                    ? 'bg-[#ECE7FE] text-[#130070] border border-[#DCD4FD]'
                    : 'bg-slate-100 text-[#808080]')
                }`}
              >
                {badgeText}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs font-medium text-slate-500 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              iconStyles[variant] || iconStyles.default
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>
        )}
      </div>

      {extraContent && <div className="mt-4 pt-3 border-t border-slate-100/80">{extraContent}</div>}
    </div>
  );
}
