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
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  theme?: 'dark' | 'light';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  icon: Icon,
  badge,
  bullets,
  actionLabel,
  onAction,
  className = '',
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${
        isLight
          ? 'bg-white/95 border border-slate-200/90 shadow-[0_15px_35px_-5px_rgba(15,23,42,0.08),_0_0_0_1px_rgba(0,0,0,0.03)] hover:border-[#5c7090]/60 hover:bg-white hover:shadow-[0_20px_40px_-5px_rgba(92,112,144,0.18)]'
          : 'bg-[#0d1624] border border-white/10 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)] hover:border-[#5c7090]/60 hover:bg-[#111c2e] hover:shadow-[0_4px_30px_rgba(92,112,144,0.25)]'
      } ${className}`}
    >
      {/* Top subtle light reflection */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[#5c7090]/15 blur-3xl transition duration-500 group-hover:bg-[#5c7090]/25 group-hover:scale-125" />

      <div>
        {/* Optional Image Header */}
        {imageSrc && (
          <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-950">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* Top Badges & Icons */}
        <div className="mb-4 flex items-center justify-between gap-3">
          {Icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5c7090]/15 border border-[#5c7090]/30 text-[#5c7090] shadow-inner group-hover:border-[#5c7090]/60 group-hover:bg-[#5c7090]/25 transition-colors">
              <Icon className="h-5 w-5" />
            </div>
          )}
          {badge && (
            <span className="rounded-full bg-[#5c7090]/15 px-3 py-1 text-xs font-semibold tracking-wide text-[#5c7090] border border-[#5c7090]/30 backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>

        {/* Subtitle if available */}
        {subtitle && (
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#5c7090]">
            {subtitle}
          </div>
        )}

        {/* Title */}
        <h3
          className={`text-xl font-bold tracking-tight transition-colors ${
            isLight ? 'text-[#09111c] group-hover:text-black' : 'text-white group-hover:text-slate-100'
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`mt-3 text-xs sm:text-sm leading-relaxed ${
            isLight ? 'text-slate-600 font-normal' : 'text-slate-300/90 font-light'
          }`}
        >
          {description}
        </p>

        {/* Bullet points */}
        {bullets && bullets.length > 0 && (
          <ul
            className={`mt-4 space-y-2 border-t pt-3 ${
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
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action CTA if present */}
      {actionLabel && (
        <button
          onClick={onAction}
          className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
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
