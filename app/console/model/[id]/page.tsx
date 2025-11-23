'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';
import { mockModels } from '@/app/data/mockModels';

type TabType = 'performance' | 'safety' | 'governance';

export default function ModelDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [activeTab, setActiveTab] = useState<TabType>('performance');

  // STATE: Tracks which specific card is currently expanded (e.g., "mmlu", "safety-1")
  const [openCardKey, setOpenCardKey] = useState<string | null>(null);

  // Find the specific model data
  const data = mockModels.find((m) => m.id === id) || mockModels[0];

  // Helper to toggle cards. If clicking the same card, close it. If new, open it.
  const handleToggle = (key: string) => {
    setOpenCardKey((prev) => (prev === key ? null : key));
  };

  // Reset open card when switching tabs
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setOpenCardKey(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 md:p-10 pb-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section (Unchanged) */}
        <div className="mb-8">
          <Link
            href="/console"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to Index
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <p className="text-sm text-slate-400 mb-1">{data.company}</p>
              <h1 className="text-5xl font-bold text-white mb-4">
                {data.name}
              </h1>
              <p className="text-slate-300 max-w-3xl leading-relaxed text-lg">
                {data.description}
              </p>
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap">
              View Original Documentation <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* Tags (Unchanged) */}
        <div className="flex flex-wrap gap-3 mb-12">
          {data.tags.map((tag, i) => (
            <span
              key={i}
              className={`px-4 py-1.5 rounded-full border border-white/10 text-sm font-medium ${
                tag.includes('Audited')
                  ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
                  : 'text-slate-300 bg-white/5'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tabs (Updated handler) */}
        <div className="flex gap-1 bg-[#131720] p-1 rounded-lg w-fit mb-8 border border-white/10">
          <TabButton
            label="Performance"
            isActive={activeTab === 'performance'}
            onClick={() => handleTabChange('performance')}
            activeColor="bg-cyan-500 text-black"
          />
          <TabButton
            label="Safety"
            isActive={activeTab === 'safety'}
            onClick={() => handleTabChange('safety')}
            activeColor="bg-orange-500 text-black"
          />
          <TabButton
            label="Governance"
            isActive={activeTab === 'governance'}
            onClick={() => handleTabChange('governance')}
            activeColor="bg-purple-500 text-white"
          />
        </div>

        {/* --- DYNAMIC CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-300">
          {/* 1. PERFORMANCE TAB */}
          {activeTab === 'performance' && (
            <>
              <MetricCard
                title="MMLU BENCHMARK SCORE"
                value={`${data.performance.mmlu}%`}
                desc="Measures accuracy across 57 academic subjects including STEM, humanities, and social sciences"
                color="text-cyan-400"
                borderColor="group-hover:border-cyan-500/50"
                sourceText={`${data.name} achieves ${data.performance.mmlu}% on the MMLU benchmark (5-shot, chain-of-thought prompting)`}
                // STATE LOGIC
                isOpen={openCardKey === 'perf-mmlu'}
                onToggle={() => handleToggle('perf-mmlu')}
              />
              <MetricCard
                title="HUMANEVAL CODE SCORE"
                value={`${data.performance.humaneval}%`}
                desc="Measures ability to generate functionally correct Python code from docstrings"
                color="text-cyan-400"
                borderColor="group-hover:border-cyan-500/50"
                sourceText={`On the HumanEval coding benchmark, ${data.name} scored ${data.performance.humaneval}% using pass@1 metric`}
                // STATE LOGIC
                isOpen={openCardKey === 'perf-human'}
                onToggle={() => handleToggle('perf-human')}
              />
              <MetricCard
                title="MAX CONTEXT WINDOW"
                value={`${data.performance.context.toLocaleString()}`}
                unit="Tokens"
                desc="Maximum number of tokens (roughly words) the model can process in a single request"
                color="text-cyan-400"
                borderColor="group-hover:border-cyan-500/50"
                sourceText={`The model supports a ${data.context} token context window in the API`}
                // STATE LOGIC
                isOpen={openCardKey === 'perf-context'}
                onToggle={() => handleToggle('perf-context')}
              />
            </>
          )}

          {/* 2. SAFETY TAB */}
          {activeTab === 'safety' && (
            <>
              <MetricCard
                title="HARMFUL REQUEST REFUSAL RATE"
                value={`${data.safety.refusalRate}%`}
                desc="Percentage of harmful, unethical, or inappropriate requests that the model correctly refuses to answer"
                color="text-orange-500"
                borderColor="group-hover:border-orange-500/50"
                sourceText={`${data.name} refused ${data.safety.refusalRate}% of clearly harmful or out-of-scope requests in safety testing`}
                // STATE LOGIC
                isOpen={openCardKey === 'safe-refusal'}
                onToggle={() => handleToggle('safe-refusal')}
              />
              <MetricCard
                title="JAILBREAK RESISTANCE"
                value={`${data.safety.jailbreakRes}%`}
                desc="Lower is better. Percentage of adversarial attacks that successfully bypassed safety guardrails"
                color="text-orange-500"
                borderColor="group-hover:border-orange-500/50"
                sourceText={`Red team adversarial testing showed a ${data.safety.jailbreakRes}% jailbreak success rate across 10,000+ attempts`}
                // STATE LOGIC
                isOpen={openCardKey === 'safe-jail'}
                onToggle={() => handleToggle('safe-jail')}
              />
            </>
          )}

          {/* 3. GOVERNANCE TAB */}
          {activeTab === 'governance' && (
            <>
              <MetricCard
                title="THIRD-PARTY SAFETY AUDIT"
                value={data.governance.auditStatus}
                unit="Status"
                desc="Whether the model has undergone independent third-party safety evaluation"
                color="text-purple-500"
                borderColor="group-hover:border-purple-500/50"
                sourceText={`Independent safety audit completed by external AI safety organization in Q3 2024`}
                // STATE LOGIC
                isOpen={openCardKey === 'gov-audit'}
                onToggle={() => handleToggle('gov-audit')}
              />
              <MetricCard
                title="MODEL UPDATE CADENCE"
                value={data.governance.frequency}
                unit="Frequency"
                desc="How frequently the model receives updates and improvements"
                color="text-purple-500"
                borderColor="group-hover:border-purple-500/50"
                sourceText={`Model is updated ${data.governance.frequency.toLowerCase()} with improvements and safety enhancements`}
                // STATE LOGIC
                isOpen={openCardKey === 'gov-update'}
                onToggle={() => handleToggle('gov-update')}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function TabButton({ label, isActive, onClick, activeColor }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-2 rounded-md text-sm font-bold transition-all ${
        isActive ? activeColor : 'text-slate-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}
// --- UPDATED METRIC CARD WITH CONTROLLED STATE ---
interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  desc: string;
  color: string;
  borderColor: string;
  sourceText: string;
  isOpen: boolean; // NEW: Controlled by parent
  onToggle: () => void; // NEW: Triggers parent update
}

function MetricCard({
  title,
  value,
  unit,
  desc,
  color,
  borderColor,
  sourceText,
  isOpen,
  onToggle,
}: MetricCardProps) {
  return (
    <div
      className={`bg-[#0B0E14] border border-white/10 rounded-xl p-8 flex flex-col h-full transition-all duration-300 group ${borderColor} hover:border-opacity-50`}
    >
      <h3 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
        {title}
      </h3>

      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-5xl font-bold ${color}`}>{value}</span>
        {unit && (
          <span className="text-xl text-slate-400 font-medium">{unit}</span>
        )}
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
        {desc}
      </p>

      {/* Source Trace Toggle */}
      <div className="mt-auto">
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 text-xs font-bold cursor-pointer transition-colors hover:text-white ${color}`}
        >
          Source Trace
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Expandable Content */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen
              ? 'grid-rows-[1fr] opacity-100 mt-4'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-4 rounded-lg bg-[#131720] border border-white/5 text-sm text-slate-300 italic leading-relaxed shadow-inner">
              {sourceText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
