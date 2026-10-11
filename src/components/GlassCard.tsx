'use client';

import React from 'react';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface GlassCardProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc?: string;
  icon?: LucideIcon;
  badge?: string;
  bullets?: string[];
  tags?: string[];
  stepNumber?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  icon: Icon,
  badge,
  bullets,
  tags,
  stepNumber,
  actionLabel,
  onAction,
  className = '',
  theme = 'dark',
  compact = false,
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
        compact ? 'rounded-2xl p-4 sm:p-5' : 'rounded-3xl p-5 sm:p-6'
      } ${
        isLight
          ? 'bg-white/95 border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.06),_0_0_0_1px_rgba(0,0,0,0.03)] hover:border-[#5c7090]/60 hover:bg-white hover:shadow-[0_16px_35px_-5px_rgba(92,112,144,0.16)]'
          : 'bg-[#0d1624]/90 border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.45)] hover:border-[#5c7090]/60 hover:bg-[#111c2e] hover:shadow-[0_4px_25px_rgba(92,112,144,0.22)]'
      } ${className}`}
    >
      {/* Top subtle light reflection */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-40 w-40 rounded-full bg-[#5c7090]/15 blur-2xl transition duration-500 group-hover:bg-[#5c7090]/25 group-hover:scale-125" />

      <div>
        {/* Optional Image Header */}
        {imageSrc && (
          <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl border border-white/5 bg-slate-950">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* Top Badges, Step Number & Icons */}
        <div className={`flex items-center justify-between gap-3 ${compact ? 'mb-3' : 'mb-3.5'}`}>
          <div className="flex items-center gap-2.5">
            {stepNumber && (
              <span className={`text-xs font-black tracking-widest px-2 py-0.5 rounded-md ${
                isLight ? 'bg-slate-100 text-[#5c7090]' : 'bg-white/10 text-[#5c7090]'
              }`}>
                {stepNumber}
              </span>
            )}
            {Icon && (
              <div className={`flex items-center justify-center rounded-xl border text-[#5c7090] transition-colors ${
                compact ? 'h-9 w-9' : 'h-10 w-10'
              } ${
                isLight
                  ? 'bg-slate-100 border-slate-200 group-hover:bg-[#5c7090]/10'
                  : 'bg-[#5c7090]/15 border-[#5c7090]/30 shadow-inner group-hover:border-[#5c7090]/60 group-hover:bg-[#5c7090]/25'
              }`}>
                <Icon className={compact ? 'h-4 w-4' : 'h-4.5 w-4.5'} />
              </div>
            )}
          </div>

          {badge && (
            <span className="rounded-full bg-[#5c7090]/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#5c7090] border border-[#5c7090]/30 backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>

        {/* Subtitle if available */}
        {subtitle && (
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#5c7090]">
            {subtitle}
          </div>
        )}

        {/* Title */}
        <h3
          className={`font-bold tracking-tight transition-colors ${
            compact ? 'text-base sm:text-lg leading-snug' : 'text-lg sm:text-xl'
          } ${
            isLight ? 'text-[#09111c] group-hover:text-black' : 'text-white group-hover:text-slate-100'
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`mt-1.5 leading-relaxed ${
            compact ? 'text-xs' : 'text-xs sm:text-sm'
          } ${
            isLight ? 'text-slate-600 font-normal' : 'text-slate-300/90 font-light'
          }`}
        >
          {description}
        </p>

        {/* Tags option (modern minimal pill chips) */}
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                  isLight
                    ? 'bg-slate-100 text-slate-700 border border-slate-200/80'
                    : 'bg-white/5 text-slate-300 border border-white/5'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bullet points */}
        {bullets && bullets.length > 0 && (
          <ul
            className={`mt-3 space-y-1.5 border-t pt-2.5 ${
              isLight ? 'border-slate-200/80' : 'border-white/5'
            }`}
          >
            {bullets.map((bullet, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2 text-xs ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5c7090]" />
                <span className="leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action CTA if present */}
      {actionLabel && (
        <button
          onClick={onAction}
          className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-all duration-300 cursor-pointer ${
            isLight
              ? 'bg-slate-100 text-slate-800 border border-slate-300/80 hover:bg-[#5c7090] hover:text-white hover:border-[#5c7090]'
              : 'bg-white/5 text-white border border-white/10 hover:border-[#5c7090]/50 hover:bg-[#5c7090]/20 hover:text-white'
          }`}
        >
          {actionLabel}
          <span className="text-[#5c7090] group-hover:text-current transition-transform group-hover:translate-x-1">→</span>
        </button>
      )}
    </div>
  );
};
