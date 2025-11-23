'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from 'recharts';
// 1. IMPORT THE CENTRAL DATA SOURCE
import { mockModels } from '@/app/data/mockModels';

function CompareContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids');

  // 2. FILTER MODELS FROM IMPORTED DATA
  const selectedIds = idsParam ? idsParam.split(',').map(Number) : [];
  const models = mockModels.filter((m) => selectedIds.includes(m.id));

  // 3. PREPARE RADAR DATA
  // Note: Accessing specific score metrics inside m.performance based on your mockModels structure
  const radarData = [
    {
      subject: 'Safety',
      ...models.reduce(
        (acc, m) => ({ ...acc, [m.name]: m.performance.safety }),
        {}
      ),
    },
    {
      subject: 'Governance',
      ...models.reduce(
        (acc, m) => ({ ...acc, [m.name]: m.performance.governance }),
        {}
      ),
    },
    {
      subject: 'Performance',
      ...models.reduce(
        (acc, m) => ({ ...acc, [m.name]: m.performance.performance }),
        {}
      ),
    },
  ];

  if (models.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-white p-10 flex flex-col items-center justify-center">
        <p className="text-slate-400 mb-4">No models selected.</p>
        <Link href="/console" className="text-cyan-400 hover:underline">
          Go back to Console
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 md:p-10 pb-20">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/console"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Index
          </Link>
          <h1 className="text-3xl font-bold">Comparison Workbench</h1>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {models.map((m) => (
            <div
              key={m.id}
              className="px-6 py-2 rounded-full font-bold text-black shadow-[0_0_15px_rgba(0,0,0,0.3)]"
              style={{ backgroundColor: m.color }}
            >
              {m.name}
            </div>
          ))}
        </div>

        {/* Row 1: Radar & MMLU Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <div className="bg-[#131720] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-cyan-400 mb-6">
              Overall Profile Comparison
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={radarData}
                >
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  {models.map((m) => (
                    <Radar
                      key={m.id}
                      name={m.name}
                      dataKey={m.name}
                      stroke={m.color}
                      strokeWidth={3}
                      fill={m.color}
                      fillOpacity={0.2}
                    />
                  ))}
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B0E14',
                      border: '1px solid #333',
                      borderRadius: '8px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* MMLU Bar Chart */}
          <div className="bg-[#131720] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-cyan-400 mb-6">
              MMLU Benchmark Score
            </h3>
            <div className="h-[350px] w-full flex items-center">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  layout="vertical"
                  data={models}
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                    stroke="#334155"
                  />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    tick={{ fill: '#cbd5e1', fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-black border border-white/10 p-3 rounded-lg">
                            <p className="text-white font-bold">
                              {payload[0].payload.name}
                            </p>
                            <p className="text-cyan-400">
                              Score: {payload[0].value}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="mmlu" barSize={40} radius={[0, 4, 4, 0]}>
                    {models.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Row 2: Context Window */}
        <div className="bg-[#131720] border border-white/10 rounded-2xl p-6 shadow-xl mb-8">
          <h3 className="text-xl font-bold text-cyan-400 mb-6">
            Context Window Capacity
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={models}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#334155"
                />
                <XAxis dataKey="name" tick={{ fill: '#cbd5e1' }} />
                <YAxis
                  tick={{ fill: '#94a3b8' }}
                  label={{
                    value: 'Tokens (thousands)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#64748b',
                  }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-black border border-white/10 p-3 rounded-lg">
                          <p className="text-white font-bold">
                            {payload[0].payload.name}
                          </p>
                          <p className="text-orange-400">
                            Tokens: {payload[0].value?.toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="contextVal" fill="#8884d8" radius={[4, 4, 0, 0]}>
                  {models.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 3: Detailed Metric Table */}
        <div className="bg-[#131720] border border-white/10 rounded-2xl p-8 shadow-xl mb-8">
          <h3 className="text-xl font-bold text-cyan-400 mb-8">
            Detailed Metric Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 font-bold text-cyan-400 w-1/3">Metric</th>
                  {models.map((m) => (
                    <th key={m.id} className="py-4 font-bold text-white">
                      {m.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* MMLU Row */}
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-6 text-slate-400">MMLU Benchmark Score</td>
                  {models.map((m) => (
                    <td
                      key={m.id}
                      className="py-6 font-bold text-xl"
                      style={{ color: m.color }}
                    >
                      {m.mmlu}%
                    </td>
                  ))}
                </tr>
                {/* HumanEval Row */}
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-6 text-slate-400">HumanEval Code Score</td>
                  {models.map((m) => (
                    <td
                      key={m.id}
                      className="py-6 font-bold text-xl"
                      style={{ color: m.color }}
                    >
                      {m.humanEval}%
                    </td>
                  ))}
                </tr>
                {/* Context Row */}
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-6 text-slate-400">Max Context Window</td>
                  {models.map((m) => (
                    <td
                      key={m.id}
                      className="py-6 font-bold text-xl text-white"
                    >
                      {m.contextVal.toLocaleString()}
                      <span className="text-sm text-slate-500 ml-1 font-normal">
                        Tokens
                      </span>
                    </td>
                  ))}
                </tr>
                {/* Jailbreak Row (Nested Data Access) */}
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-6 text-slate-400">Jailbreak Resistance</td>
                  {models.map((m) => (
                    <td
                      key={m.id}
                      className="py-6 font-bold text-xl text-white"
                    >
                      {m.safety.jailbreakRes}%
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Row 4: Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {models.map((m) => (
            <Link
              href={`/console/model/${m.id}`}
              key={m.id}
              className="bg-[#131720] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col hover:border-cyan-500/50 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {m.name}
                  </h4>
                  <p className="text-sm text-slate-500 mb-4">{m.company}</p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed mb-8 flex-1 line-clamp-3">
                {m.description}
              </p>

              <button className="w-full py-3 rounded-lg border border-white/10 group-hover:border-white/30 group-hover:bg-white/5 transition-all text-white font-medium flex justify-center items-center gap-2">
                View Source <ExternalLink size={16} />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0E14] text-white p-10">
          Loading comparison...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
