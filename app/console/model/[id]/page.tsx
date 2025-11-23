'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';

// --- MOCK DATA FOR DETAIL PAGE ---
const modelDetails = {
  1: {
    name: 'GPT-4o',
    company: 'OpenAI',
    description:
      "GPT-4o is OpenAI's latest flagship multimodal model with enhanced reasoning capabilities. It achieves state-of-the-art performance across diverse benchmarks while maintaining strong safety guardrails through extensive red-teaming and alignment work.",
    tags: [
      'Closed API',
      'System Card (PDF)',
      'Third-Party Audited',
      'Cutoff: October 2024',
      'Updates: Rolling updates with versioning',
    ],
    // Tab Data
    performance: {
      mmlu: 88.7,
      humaneval: 90.2,
      context: 128000,
    },
    safety: {
      refusalRate: 98.1,
      jailbreakRes: 2.3,
    },
    governance: {
      auditStatus: 'Completed',
      frequency: 'Monthly',
    },
  },
  // Add other IDs (2, 3, etc) here to prevent errors if clicked
  2: {
    name: 'Claude 3.5 Sonnet',
    company: 'Anthropic',
    description: "Anthropic's most intelligent model to date.",
    tags: ['Closed API', 'Audited'],
    performance: { mmlu: 88.3, humaneval: 92.0, context: 200000 },
    safety: { refusalRate: 99.0, jailbreakRes: 1.5 },
    governance: { auditStatus: 'In Progress', frequency: 'Weekly' },
  },
};

type TabType = 'performance' | 'safety' | 'governance';

export default function ModelDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const [activeTab, setActiveTab] = useState<TabType>('performance');

  // Fetch data based on ID (fallback to ID 1 if missing for demo)
  // @ts-ignore
  const data = modelDetails[id] || modelDetails[1];

  // --- HELPER: Get Color Scheme based on Tab ---
  const getTheme = () => {
    switch (activeTab) {
      case 'safety':
        return {
          text: 'text-orange-500',
          bg: 'bg-orange-500',
          border: 'focus:border-orange-500',
          metricColor: 'text-orange-500',
        };
      case 'governance':
        return {
          text: 'text-purple-500',
          bg: 'bg-purple-500',
          border: 'focus:border-purple-500',
          metricColor: 'text-purple-500',
        };
      default: // performance
        return {
          text: 'text-cyan-400',
          bg: 'bg-cyan-500',
          border: 'focus:border-cyan-500',
          metricColor: 'text-cyan-400',
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 md:p-10 pb-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Top Nav */}
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

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-12">
          {data.tags.map((tag: string, i: number) => (
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

        {/* Tabs */}
        <div className="flex gap-1 bg-[#131720] p-1 rounded-lg w-fit mb-8 border border-white/10">
          <TabButton
            label="Performance"
            isActive={activeTab === 'performance'}
            onClick={() => setActiveTab('performance')}
            activeColor="bg-cyan-500 text-black"
          />
          <TabButton
            label="Safety"
            isActive={activeTab === 'safety'}
            onClick={() => setActiveTab('safety')}
            activeColor="bg-orange-500 text-black"
          />
          <TabButton
            label="Governance"
            isActive={activeTab === 'governance'}
            onClick={() => setActiveTab('governance')}
            activeColor="bg-purple-500 text-white"
          />
        </div>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-300">
          {/* PERFORMANCE VIEW */}
          {activeTab === 'performance' && (
            <>
              <MetricCard
                title="MMLU BENCHMARK SCORE"
                value={`${data.performance.mmlu}%`}
                desc="Measures accuracy across 57 academic subjects including STEM, humanities, and social sciences"
                color="text-cyan-400"
              />
              <MetricCard
                title="HUMANEVAL CODE SCORE"
                value={`${data.performance.humaneval}%`}
                desc="Measures ability to generate functionally correct Python code from docstrings"
                color="text-cyan-400"
              />
              <MetricCard
                title="MAX CONTEXT WINDOW"
                value={`${data.performance.context.toLocaleString()}`}
                unit="Tokens"
                desc="Maximum number of tokens (roughly words) the model can process in a single request"
                color="text-cyan-400"
              />
            </>
          )}

          {/* SAFETY VIEW */}
          {activeTab === 'safety' && (
            <>
              <MetricCard
                title="HARMFUL REQUEST REFUSAL RATE"
                value={`${data.safety.refusalRate}%`}
                desc="Percentage of harmful, unethical, or inappropriate requests that the model correctly refuses to answer"
                color="text-orange-500"
              />
              <MetricCard
                title="JAILBREAK RESISTANCE"
                value={`${data.safety.jailbreakRes}%`}
                desc="Lower is better. Percentage of adversarial attacks that successfully bypassed safety guardrails"
                color="text-orange-500"
              />
            </>
          )}

          {/* GOVERNANCE VIEW */}
          {activeTab === 'governance' && (
            <>
              <MetricCard
                title="THIRD-PARTY SAFETY AUDIT"
                value={data.governance.auditStatus}
                unit="Status"
                desc="Whether the model has undergone independent third-party safety evaluation"
                color="text-purple-500"
              />
              <MetricCard
                title="MODEL UPDATE CADENCE"
                value={data.governance.frequency}
                unit="Frequency"
                desc="How frequently the model receives updates and improvements"
                color="text-purple-500"
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

function MetricCard({ title, value, unit, desc, color }: any) {
  return (
    <div className="bg-[#0B0E14] border border-white/10 rounded-xl p-8 flex flex-col h-full hover:border-white/20 transition-colors">
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
      <div
        className={`mt-auto flex items-center gap-1 text-xs font-bold cursor-pointer ${color}`}
      >
        Source Trace <ChevronDown size={14} />
      </div>
    </div>
  );
}
