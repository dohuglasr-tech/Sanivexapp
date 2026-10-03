'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [supabaseStatus, setSupabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [supabaseMsg, setSupabaseMsg] = useState('Verificando conexión...');

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setSupabaseStatus('error');
          setSupabaseMsg(error.message);
        } else {
          setSupabaseStatus('connected');
          setSupabaseMsg('Conectado exitosamente con Supabase');
        }
      } catch (err: unknown) {
        setSupabaseStatus('error');
        setSupabaseMsg(err instanceof Error ? err.message : 'Error al conectar');
      }
    }
    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between py-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 text-lg">
            S
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white">Sanivexapp</span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              v1.0 Setup
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Stack Listo
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl w-full mx-auto my-12 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300 mb-6 backdrop-blur-sm shadow-inner">
          ✨ Entorno Conectado con Antigravity
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 max-w-3xl leading-tight">
          Sanivexapp está enlazada y lista para despegar
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Hemos conectado GitHub, Supabase y Next.js. El flujo de trabajo autónomo ya está operativo.
        </p>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 text-left">
          {/* Card 1: GitHub */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition duration-300 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🐙</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Enlazado
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">GitHub Repo</h3>
              <p className="text-xs text-slate-400 mb-3">
                Repositorio creado y conectado para control de versiones automático.
              </p>
              <div className="text-xs font-mono text-indigo-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 break-all">
                dohuglasr-tech/Sanivexapp
              </div>
            </div>
            <a
              href="https://github.com/dohuglasr-tech/Sanivexapp"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Ver en GitHub →
            </a>
          </div>

          {/* Card 2: Supabase */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition duration-300 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">⚡</span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    supabaseStatus === 'connected'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : supabaseStatus === 'checking'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}
                >
                  {supabaseStatus === 'connected'
                    ? 'Conectado'
                    : supabaseStatus === 'checking'
                    ? 'Comprobando...'
                    : 'Error'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Supabase DB</h3>
              <p className="text-xs text-slate-400 mb-3">
                PostgreSQL & Autenticación vinculados con claves del proyecto.
              </p>
              <div className="text-xs font-mono text-emerald-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 break-all">
                {supabaseMsg}
              </div>
            </div>
            <a
              href="https://supabase.com/dashboard/project/haqgcnvlnfmcfvcvwbik"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Abrir Dashboard Supabase →
            </a>
          </div>

          {/* Card 3: Vercel */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition duration-300 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">▲</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Listo para Deploy
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Vercel Hosting</h3>
              <p className="text-xs text-slate-400 mb-3">
                Importa el repo en Vercel con 1 clic para tener despliegue continuo (CI/CD).
              </p>
              <div className="text-xs font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                Auto-deploy en cada Push
              </div>
            </div>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
            >
              Conectar en Vercel →
            </a>
          </div>
        </div>

        {/* Action Panel */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 w-full max-w-2xl text-left">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            🚀 Todo listo para el diseño
          </h4>
          <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
            <li>
              El código base ya está sincronizado con el repositorio GitHub.
            </li>
            <li>
              En Vercel vinculas el repositorio <strong>dohuglasr-tech/Sanivexapp</strong> con las 2 variables de Supabase.
            </li>
            <li>
              ¡Dime qué diseño y funcionalidades necesitas para Sanivexapp y me pongo a crearlo!
            </li>
          </ol>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>Sanivexapp &bull; Creado con Antigravity, Next.js, Supabase & Vercel</div>
        <div className="flex items-center gap-4">
          <span>PostgreSQL Active</span>
          <span>&bull;</span>
          <span>Next.js 16</span>
        </div>
      </footer>
    </div>
  );
}
