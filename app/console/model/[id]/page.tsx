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

  // Find the specific model data
  const data = mockModels.find((m) => m.id === id) || mockModels[0];

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 md:p-10 pb-20">
      <div className="max-w-[1200px] mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-300">
          {activeTab === 'performance' && (
            <>
              <MetricCard
                title="MMLU BENCHMARK SCORE"
                value={`${data.performance.mmlu}%`}
                desc="Measures accuracy across 57 academic subjects"
                color="text-cyan-400"
              />
              <MetricCard
                title="HUMANEVAL CODE SCORE"
                value={`${data.performance.humaneval}%`}
                desc="Measures coding ability"
                color="text-cyan-400"
              />
              <MetricCard
                title="MAX CONTEXT WINDOW"
                value={`${data.performance.context.toLocaleString()}`}
                unit="Tokens"
                desc="Maximum input size"
                color="text-cyan-400"
              />
            </>
          )}
          {activeTab === 'safety' && (
            <>
              <MetricCard
                title="HARMFUL REQUEST REFUSAL RATE"
                value={`${data.safety.refusalRate}%`}
                desc="Percentage of harmful requests refused"
                color="text-orange-500"
              />
              <MetricCard
                title="JAILBREAK RESISTANCE"
                value={`${data.safety.jailbreakRes}%`}
                desc="Lower is better"
                color="text-orange-500"
              />
            </>
          )}
          {activeTab === 'governance' && (
            <>
              <MetricCard
                title="THIRD-PARTY SAFETY AUDIT"
                value={data.governance.auditStatus}
                unit="Status"
                desc="Independent audit status"
                color="text-purple-500"
              />
              <MetricCard
                title="MODEL UPDATE CADENCE"
                value={data.governance.frequency}
                unit="Frequency"
                desc="Update frequency"
                color="text-purple-500"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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
