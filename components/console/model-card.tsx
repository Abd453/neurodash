'use client';
import { Lock, Code } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ModelCardProps {
  id: number;
  name: string;
  company: string;
  mmlu: number;
  context: string;
  type: string;
  audited: boolean;
  isComparing: boolean;
  onToggleCompare: () => void;
}

export function ModelCard({
  id,
  name,
  company,
  mmlu,
  context,
  type,
  audited,
  isComparing,
  onToggleCompare,
}: ModelCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/console/model/${id}`);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card click from firing
    onToggleCompare();
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        relative p-5 rounded-xl border transition-all duration-300 group overflow-hidden cursor-pointer
        ${
          isComparing
            ? 'bg-cyan-900/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
            : 'bg-[#131720] border-white/10 hover:border-cyan-500/50 hover:bg-[#1A1F2B]'
        }
      `}
    >
      {/* Top Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          {type === 'Closed API' ? (
            <Lock size={12} className="text-cyan-400" />
          ) : (
            <Code size={12} className="text-cyan-400" />
          )}
          {company}
        </div>

        {/* Compare Toggle */}
        <div className="flex items-center gap-2 z-10">
          <span
            className={`text-xs ${
              isComparing ? 'text-cyan-400' : 'text-slate-500'
            }`}
          >
            Compare
          </span>
          <button
            onClick={handleToggleClick}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              isComparing ? 'bg-cyan-500' : 'bg-white/10'
            }`}
          >
            <div
              className={`absolute top-[2px] left-[2px] h-4 w-4 rounded-full bg-white transition-transform ${
                isComparing ? 'translate-x-full' : ''
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors">
        {name}
      </h3>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-slate-500 mb-1">MMLU Score</p>
          <p className="text-3xl font-bold text-cyan-400">
            {mmlu}
            <span className="text-sm text-slate-500 ml-1">%</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Context Window</p>
          <p className="text-xl font-bold text-white">{context}</p>
        </div>
      </div>

      {/* Footer Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-slate-300">
          {type}
        </span>
        {audited && (
          <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs text-cyan-400 flex items-center gap-1">
            Audited
          </span>
        )}
      </div>
    </div>
  );
}
