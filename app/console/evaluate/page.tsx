'use client';

import React, { useState } from 'react';
import {
  Settings2,
  Upload,
  ArrowLeft,
  Zap,
  Scale,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

type ViewState = 'selection' | 'preset' | 'upload';

export default function EvaluatePage() {
  const [view, setView] = useState<ViewState>('selection');

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Navigation */}
        <div className="mb-10">
          {view !== 'selection' ? (
            <button
              onClick={() => setView('selection')}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />{' '}
              Back to Selection
            </button>
          ) : (
            <Link
              href="/console"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />{' '}
              Back to Console
            </Link>
          )}

          {/* Page Title & Subtitle */}
          <div className="animate-in slide-in-from-bottom-2 fade-in duration-500">
            <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
              {view === 'selection' && 'How to Evaluate?'}
              {view === 'preset' && 'Select a Preset Policy'}
              {view === 'upload' && 'Upload Your Policy'}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              {view === 'selection' &&
                'Choose how you want to set up your evaluation policy.'}
              {view === 'preset' &&
                'Choose from pre-configured evaluation policies optimized for different goals.'}
              {view === 'upload' &&
                'Upload a PDF, Word, or TXT file to auto-extract evaluation criteria.'}
            </p>
          </div>
        </div>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <div className="animate-in fade-in zoom-in-95 duration-300">
          {/* 1. SELECTION VIEW */}
          {view === 'selection' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SelectionCard
                icon={<Settings2 size={36} />}
                title="Use Preset Policy"
                desc="Select from pre-configured evaluation policies optimized for different priorities like Safety, Performance, or Governance."
                onClick={() => setView('preset')}
                color="text-cyan-400"
              />
              <SelectionCard
                icon={<Upload size={36} />}
                title="Upload Policy Document"
                desc="Upload your own policy file. AI will extract evaluation criteria automatically."
                onClick={() => setView('upload')}
                color="text-cyan-400"
              />
            </div>
          )}

          {/* 2. PRESET VIEW */}
          {view === 'preset' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PresetCard
                title="Balanced Policy"
                badge="Balanced"
                badgeColor="text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                desc="Standard criteria for general-purpose model evaluation."
                criteria={['MMLU Score', 'Refusal Rate', 'Context Window']}
              />
              <PresetCard
                title="Safety-First Policy"
                badge="Safety"
                badgeColor="text-orange-500 border-orange-500/30 bg-orange-500/10"
                desc="Emphasizes safety and responsible AI principles."
                criteria={['Refusal Rate', 'Jailbreak Rate', 'Toxicity Score']}
              />
              <PresetCard
                title="Performance-Max Policy"
                badge="Performance"
                badgeColor="text-cyan-400 border-cyan-400/30 bg-cyan-400/10"
                desc="Focuses on raw capability and benchmark scores."
                criteria={['MMLU Score', 'Code Gen Score', 'Latency']}
              />
              <PresetCard
                title="Governance Policy"
                badge="Governance"
                badgeColor="text-purple-500 border-purple-500/30 bg-purple-500/10"
                desc="Ensures regulatory and compliance requirements."
                criteria={['Audit Status', 'Data Recency', 'Transparency']}
              />
            </div>
          )}

          {/* 3. UPLOAD VIEW */}
          {view === 'upload' && (
            <div className="flex justify-center py-8">
              {/* CHANGED: max-w-2xl -> max-w-5xl to make it wider */}
              <div className="w-full  bg-[#131720] border border-white/10 rounded-3xl p-11 text-center shadow-2xl relative overflow-hidden group">
                {/* Glow Effect behind icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-[#0B0E14] border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:border-cyan-500/30 transition-colors duration-300">
                    <Upload size={32} className="text-cyan-400" />
                  </div>

                  <h2 className="text-2xl font-bold mb-4 text-white">
                    Upload Your Policy
                  </h2>

                  {/* Kept max-w-lg on text so it stays readable and doesn't stretch too far */}
                  <p className="text-slate-400 mb-10 text-base leading-relaxed max-w-lg mx-auto">
                    Upload a policy document (PDF, Word, or TXT). Our AI will
                    automatically extract around{' '}
                    <span className="text-cyan-400 font-medium">
                      15 quantifiable criteria
                    </span>
                    .
                  </p>

                  <label
                    className="inline-flex cursor-pointer px-8 py-1 bg-white/5 border border-white/10 text-cyan-400 font-semibold 
             rounded-3xl hover:border-cyan-500 hover:text-cyan-300 transition-all text-center"
                  >
                    Select Policy Document
                    <input type="file" className="hidden" />
                  </label>

                  <p className="text-xs text-slate-500 mt-6 font-medium tracking-wide">
                    Max file size: 10MB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* SUB COMPONENTS */
/* -------------------------------------------------- */

function SelectionCard({ icon, title, desc, onClick, color }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-[#131720] rounded-2xl p-8 border border-white/10 cursor-pointer
                 hover:border-cyan-500/50 hover:bg-[#1A1E29] hover:shadow-[0_10px_40px_rgba(6,182,212,0.1)]
                 transition-all duration-300 group relative overflow-hidden h-full flex flex-col justify-center"
    >
      <div
        className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-[#0B0E14] border border-white/10 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-300 ${color}`}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-base leading-relaxed">{desc}</p>
    </div>
  );
}

function PresetCard({ title, badge, badgeColor, desc, criteria }: any) {
  return (
    <div
      className="bg-[#131720] rounded-2xl p-6 border border-white/10 cursor-pointer
                    hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors pr-4">
          {title}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
        {desc}
      </p>

      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Criteria ({criteria.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {criteria.map((c: string, i: number) => (
            <span
              key={i}
              className="bg-[#0B0E14] border border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 group-hover:border-white/20 transition-colors"
            >
              {c}
            </span>
          ))}
          <span className="text-slate-500 text-xs flex items-center px-1 font-medium">
            +More
          </span>
        </div>
      </div>
    </div>
  );
}
