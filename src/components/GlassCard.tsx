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
}) => {
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-slate-900/60 p-6 sm:p-7 backdrop-blur-2xl border border-white/10 transition-all duration-500 hover:border-cyan-400/40 hover:bg-slate-900/80 hover:shadow-[0_0_35px_rgba(6,182,212,0.18)] hover:-translate-y-1.5 ${className}`}
    >
      {/* Top subtle light sheen highlight */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Top Badges & Icons */}
        <div className="mb-4 flex items-center justify-between gap-3">
          {Icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner group-hover:border-cyan-400/40 group-hover:bg-cyan-500/20 transition-colors">
              <Icon className="h-5 w-5" />
            </div>
          )}
          {badge && (
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300 border border-cyan-500/20 backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>

        {/* Subtitle if available */}
        {subtitle && (
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            {subtitle}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-50 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300/90 font-light">
          {description}
        </p>

        {/* Bullet points */}
        {bullets && bullets.length > 0 && (
          <ul className="mt-4 space-y-2 border-t border-white/5 pt-3">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
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
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 py-2.5 text-xs font-semibold text-white border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300"
        >
          {actionLabel}
          <span className="text-cyan-400 transition-transform group-hover:translate-x-1">→</span>
        </button>
      )}
    </div>
  );
};
