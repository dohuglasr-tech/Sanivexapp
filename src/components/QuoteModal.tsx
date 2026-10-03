'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Manejo Integrado de Plagas (MIP)',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    city: 'Bogotá D.C.',
    service: defaultService,
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await supabase.from('cotizaciones').insert([
        {
          nombre: formData.name,
          empresa: formData.company,
          telefono: formData.phone,
          ciudad: formData.city,
          servicio: formData.service,
          detalles: formData.details,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      // Non-blocking fallback
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hola SANIVEX, solicito cotización para el servicio de *${formData.service}*.\n\nNombre: ${formData.name}\nEmpresa: ${formData.company || 'Particular'}\nCiudad: ${formData.city}\nTeléfono: ${formData.phone}\nDetalles: ${formData.details || 'Por favor contactarme para inspección técnica.'}`
    );
    return `https://wa.me/573009123456?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-slate-900/95 p-6 sm:p-8 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.2)] text-slate-100 z-10 animate-in zoom-in-95 duration-300">
        {/* Glow ambient light */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                Presupuesto Técnico Sin Compromiso
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Protege tu Infraestructura
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Nuestros especialistas evaluarán tu caso con estrictos estándares de sanidad ambiental.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Nombre o Contacto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Empresa / Negocio (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ej. Almacenes & Logística SAS"
                    className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+57 300 000 0000"
                    className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Ciudad de Operación
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
                  >
                    <option value="Bogotá D.C.">Bogotá D.C. y Sabana</option>
                    <option value="Medellín">Medellín y Valle de Aburrá</option>
                    <option value="Cali">Cali y Valle del Cauca</option>
                    <option value="Barranquilla">Barranquilla y Costa Caribe</option>
                    <option value="Bucaramanga">Bucaramanga y Santanderes</option>
                    <option value="Eje Cafetero">Eje Cafetero (Pereira, Manizales, Armenia)</option>
                    <option value="Otra">Otra Región en Colombia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Servicio Requerido
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
                >
                  <option value="Manejo Integrado de Plagas (MIP)">Manejo Integrado de Plagas (MIP)</option>
                  <option value="Control de Roedores">Control de Roedores de Importancia Sanitaria</option>
                  <option value="Control de Aves">Control y Exclusión de Aves Urbanas</option>
                  <option value="Control de Termitas">Control y Erradicación de Termitas</option>
                  <option value="Sanitización y Desinfección">Sanitización y Desinfección de Alto Nivel</option>
                  <option value="Plan Integral Empresa">Plan Integral Corporativo (BPM / HACCP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Detalles adicionales o área en m²
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Describe brevemente el tipo de instalación, nivel de infestación o urgencia..."
                  className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-400 py-3.5 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:from-cyan-300 hover:to-sky-300 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Procesando solicitud...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Solicitar Presupuesto Inmediato</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center animate-in zoom-in-95">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 shadow-[0_0_25px_rgba(52,211,153,0.3)]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">¡Solicitud Recibida!</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
              Un especialista técnico de SANIVEX en <strong className="text-cyan-400">{formData.city}</strong> se comunicará contigo de inmediato para coordinar la inspección.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                <MessageCircle className="h-4 w-4" />
                Continuar por WhatsApp
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-3 rounded-2xl bg-slate-800 border border-white/10 hover:bg-slate-700 text-xs font-semibold text-white transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
