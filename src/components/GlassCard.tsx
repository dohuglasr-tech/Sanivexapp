'use client';

import React from 'react';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

export interface GlassCardProps {
  title: string;
  subtitle?: string;
  subtitleColor?: string;
  description: string;
  imageSrc?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeVariant?: 'red' | 'amber' | 'purple' | 'blue' | 'emerald' | 'teal' | 'default';
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
  subtitleColor,
  description,
  imageSrc,
  icon: Icon,
  badge,
  badgeVariant,
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

  // Badge styling: matches the pastel pill in user's image (Alta urgencia -> red, Muy común -> peach/amber, Tratamiento especializado -> purple)
  const getBadgeStyle = () => {
    if (badgeVariant === 'red') return 'bg-[#ffebee] text-[#d32f2f] border border-red-200/50';
    if (badgeVariant === 'amber') return 'bg-[#fff3e0] text-[#e65100] border border-amber-200/50';
    if (badgeVariant === 'purple') return 'bg-[#f3e5f5] text-[#7b1fa2] border border-purple-200/50';
    if (badgeVariant === 'blue') return 'bg-[#e3f2fd] text-[#1565c0] border border-blue-200/50';
    if (badgeVariant === 'emerald') return 'bg-[#e8f5e9] text-[#2e7d32] border border-emerald-200/50';
    if (badgeVariant === 'teal') return 'bg-[#e0f2f1] text-[#00695c] border border-teal-200/50';

    // Auto-detection based on text if variant not explicitly passed
    const lowerBadge = (badge || '').toLowerCase();
    if (
      lowerBadge.includes('urgencia') ||
      lowerBadge.includes('crítica') ||
      lowerBadge.includes('riesgo') ||
      lowerBadge.includes('peligro') ||
      lowerBadge.includes('alerta')
    ) {
      return 'bg-[#ffebee] text-[#d32f2f] border border-red-200/50';
    }
    if (
      lowerBadge.includes('común') ||
      lowerBadge.includes('frecuente') ||
      lowerBadge.includes('blindaje') ||
      lowerBadge.includes('químico')
    ) {
      return 'bg-[#fff3e0] text-[#e65100] border border-amber-200/50';
    }
    if (
      lowerBadge.includes('especializado') ||
      lowerBadge.includes('diagnóstico') ||
      lowerBadge.includes('bio') ||
      lowerBadge.includes('láser')
    ) {
      return 'bg-[#f3e5f5] text-[#7b1fa2] border border-purple-200/50';
    }
    if (
      lowerBadge.includes('monitoreo') ||
      lowerBadge.includes('norma') ||
      lowerBadge.includes('bpm') ||
      lowerBadge.includes('certifica') ||
      lowerBadge.includes('hermético')
    ) {
      return 'bg-[#e8f5e9] text-[#2e7d32] border border-emerald-200/50';
    }

    return 'bg-white/95 text-slate-800 border border-white/40 shadow-sm';
  };

  // If card has an imageSrc, render the full-background + fondo opaco structure requested by user
  if (imageSrc) {
    return (
      <div
        className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] ${
          compact ? 'min-h-[360px] p-5' : 'min-h-[400px] sm:min-h-[420px] p-5 sm:p-6'
        } ${className}`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            quality={90}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Fondo opaco (Opaque overlay with dark gradient directly matching user's reference) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-[#060b14]/85 to-[#060b14]/25" />
          <div className="absolute inset-0 bg-[#060b14]/30" />
        </div>

        {/* Top Header: Badge Pill */}
        <div className="relative z-10 flex items-start justify-between w-full">
          {badge ? (
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide shadow-md backdrop-blur-sm ${getBadgeStyle()}`}
            >
              {badge}
            </span>
          ) : stepNumber ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-widest bg-white/20 text-white backdrop-blur-md border border-white/20">
              {stepNumber}
            </span>
          ) : (
            <div />
          )}

          {Icon && (
            <div className="h-9 w-9 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
              <Icon className="h-4.5 w-4.5" />
            </div>
          )}
        </div>

        {/* Bottom Content: Title, Subtitle, Description, Action CTA */}
        <div className="relative z-10 mt-auto pt-6 flex flex-col min-w-0 max-w-full">
          {/* Main Title (Bold white, exactly like reference) */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-slate-100 transition-colors break-words max-w-full">
            {title}
          </h3>

          {/* Subtitle (in accent red like reference: 'Ratas y ratones', 'Alemana y Americana') */}
          {subtitle && (
            <div className={`mt-1 text-xs sm:text-sm font-bold tracking-wide break-words max-w-full ${subtitleColor || 'text-red-500'}`}>
              {subtitle}
            </div>
          )}

          {/* Description */}
          <p className="mt-2 text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed break-words max-w-full">
            {description}
          </p>

          {/* Optional Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-black/40 text-slate-300 border border-white/10 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Link at Bottom */}
          {actionLabel && (
            <div className="mt-4 pt-1">
              <button
                onClick={onAction}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group/btn text-left"
              >
                <span>{actionLabel}</span>
                <span className="text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all">
                  →
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback for cards without imageSrc (standard clean glass card)
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
        compact ? 'rounded-2xl p-4 sm:p-5' : 'rounded-3xl p-5 sm:p-6'
      } ${
        isLight
          ? 'bg-white/95 border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.06)] hover:border-[#5c7090]/60 hover:bg-white hover:shadow-[0_16px_35px_-5px_rgba(92,112,144,0.16)]'
          : 'bg-[#0d1624]/90 border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.45)] hover:border-[#5c7090]/60 hover:bg-[#111c2e] hover:shadow-[0_4px_25px_rgba(92,112,144,0.22)]'
      } ${className}`}
    >
      <div className="pointer-events-none absolute -top-20 -left-20 h-40 w-40 rounded-full bg-[#5c7090]/15 blur-2xl transition duration-500 group-hover:bg-[#5c7090]/25 group-hover:scale-125" />

      <div>
        <div className={`flex items-center justify-between gap-3 ${compact ? 'mb-3' : 'mb-3.5'}`}>
          <div className="flex items-center gap-2.5">
            {stepNumber && (
              <span
                className={`text-xs font-black tracking-widest px-2 py-0.5 rounded-md ${
                  isLight ? 'bg-slate-100 text-[#5c7090]' : 'bg-white/10 text-[#5c7090]'
                }`}
              >
                {stepNumber}
              </span>
            )}
            {Icon && (
              <div
                className={`flex items-center justify-center rounded-xl border text-[#5c7090] transition-colors ${
                  compact ? 'h-9 w-9' : 'h-10 w-10'
                } ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 group-hover:bg-[#5c7090]/10'
                    : 'bg-[#5c7090]/15 border-[#5c7090]/30 shadow-inner group-hover:border-[#5c7090]/60 group-hover:bg-[#5c7090]/25'
                }`}
              >
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

        {subtitle && (
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#5c7090] break-words">
            {subtitle}
          </div>
        )}

        <h3
          className={`font-bold tracking-tight transition-colors break-words ${
            compact ? 'text-base sm:text-lg leading-snug' : 'text-lg sm:text-xl'
          } ${
            isLight ? 'text-[#09111c] group-hover:text-black' : 'text-white group-hover:text-slate-100'
          }`}
        >
          {title}
        </h3>

        <p
          className={`mt-1.5 leading-relaxed break-words ${
            compact ? 'text-xs' : 'text-xs sm:text-sm'
          } ${
            isLight ? 'text-slate-600 font-normal' : 'text-slate-300/90 font-light'
          }`}
        >
          {description}
        </p>

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
          <span className="text-[#5c7090] group-hover:text-current transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      )}
    </div>
  );
};
