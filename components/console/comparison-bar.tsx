'use client';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ComparisonBarProps {
  selectedModels: { id: number; name: string }[];
  onClear: () => void;
  onRemove: (id: number) => void;
}

export function ComparisonBar({
  selectedModels,
  onClear,
  onRemove,
}: ComparisonBarProps) {
  if (selectedModels.length === 0) return null;

  // Create the query string (e.g., ?ids=1,2)
  const queryParams = selectedModels.map((m) => m.id).join(',');

  // Check if we have enough models to compare
  const canCompare = selectedModels.length >= 2;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0B0E14] border-t border-white/10 p-4 z-50 animate-in slide-in-from-bottom-10 shadow-2xl">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Side: Selected Items List */}
        <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto">
          <h3 className="text-cyan-400 font-bold whitespace-nowrap">
            Selected ({selectedModels.length})
          </h3>
          <div className="flex gap-2">
            {selectedModels.map((model) => (
              <div
                key={model.id}
                className="flex items-center gap-2 bg-white/10 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap"
              >
                {model.name}
                <button
                  onClick={() => onRemove(model.id)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Clear All
          </button>

          {/* LOGIC: Conditionally render Link or Disabled Button */}
          {canCompare ? (
            <Link
              href={`/console/compare?ids=${queryParams}`}
              className="px-5 py-2 text-sm font-bold text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              Compare Models <ArrowRight size={16} />
            </Link>
          ) : (
            <button
              disabled
              title="Select at least 2 models to compare"
              className="px-5 py-2 text-sm font-bold text-slate-500 bg-slate-800 rounded-lg cursor-not-allowed flex items-center gap-2 border border-white/5"
            >
              Compare Models <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
