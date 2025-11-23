'use client';
import { Lock, Code, Sparkles } from 'lucide-react';
import { mockModels } from '@/app/data/mockModels';

interface FilterSidebarProps {
  selectedCompanies: string[];
  onCompanyChange: (c: string) => void;
  selectedTypes: string[];
  onTypeChange: (t: string) => void;
  minContext: number;
  onContextChange: (val: number) => void;
  isVisibleMobile: boolean;
}

export function FilterSidebar({
  selectedCompanies,
  onCompanyChange,
  selectedTypes,
  onTypeChange,
  minContext,
  onContextChange,
  isVisibleMobile,
}: FilterSidebarProps) {
  // Determine maximum context from mockModels for slider
  const maxContext = Math.max(...mockModels.map((m) => m.contextVal));

  // Unique companies from mockModels
  const companies = Array.from(new Set(mockModels.map((m) => m.company)));

  return (
    <div
      className={`
      w-full lg:w-64 shrink-0 pr-0 lg:pr-6 space-y-8
      ${isVisibleMobile ? 'block' : 'hidden lg:block'}
      transition-all
    `}
    >
      {/* Filter Group: Company */}
      <div>
        <h3 className="text-cyan-400 font-bold mb-4 text-sm uppercase tracking-wider">
          Company
        </h3>
        <div className="space-y-3">
          {companies.map((company) => (
            <Checkbox
              key={company}
              label={company}
              checked={selectedCompanies.includes(company)}
              onChange={() => onCompanyChange(company)}
            />
          ))}
        </div>
      </div>

      {/* Filter Group: Model Type */}
      <div>
        <h3 className="text-cyan-400 font-bold mb-4 text-sm uppercase tracking-wider">
          Model Type
        </h3>
        <div className="space-y-3">
          <Checkbox
            label="Closed API"
            icon={<Lock size={14} />}
            checked={selectedTypes.includes('Closed API')}
            onChange={() => onTypeChange('Closed API')}
          />
          <Checkbox
            label="Open-weight"
            icon={<Code size={14} />}
            checked={selectedTypes.includes('Open-weight')}
            onChange={() => onTypeChange('Open-weight')}
          />
          <Checkbox
            label="Mixed"
            icon={<Sparkles size={14} />}
            checked={selectedTypes.includes('Mixed')}
            onChange={() => onTypeChange('Mixed')}
          />
        </div>
      </div>

      {/* Filter Group: Slider */}
      <div>
        <div className="flex justify-between mb-4 flex-col">
          <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider">
            Min Context Window
          </h3>
          <span className="text-xl font-bold text-white">
            {Math.round(minContext / 1000)}k{' '}
            <span className="text-sm font-normal text-slate-400">Tokens</span>
          </span>
        </div>

        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #0b0e14;
            border: 2px solid #06b6d4;
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
            cursor: pointer;
            margin-top: -8px;
            transition: box-shadow 0.2s;
          }
          input[type='range']::-webkit-slider-thumb:hover {
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.9);
          }
          input[type='range']::-moz-range-thumb {
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #0b0e14;
            border: 2px solid #06b6d4;
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
            cursor: pointer;
            border: none;
          }
        `}</style>

        <input
          type="range"
          min={0}
          max={maxContext}
          step={1000}
          value={minContext}
          onChange={(e) => onContextChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #06B6D4 ${
              (minContext / maxContext) * 100
            }%, rgba(255, 255, 255, 0.1) ${(minContext / maxContext) * 100}%)`,
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none"
        />

        <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
          <span>0k</span>
          <span>{Math.round(maxContext / 2000)}k</span>
          <span>{Math.round(maxContext / 1000)}k</span>
        </div>
      </div>
    </div>
  );
}

function Checkbox({
  label,
  icon,
  checked,
  onChange,
}: {
  label: string;
  icon?: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={onChange}
        />

        <div
          className={`w-5 h-5 border rounded transition-all flex items-center justify-center ${
            checked
              ? 'bg-cyan-500 border-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]'
              : 'border-white/20 bg-transparent group-hover:border-white/50'
          }`}
        >
          {checked && (
            <svg className="w-3 h-3" viewBox="0 0 17 12" fill="none">
              <path
                d="M1 5.917L5.724 10.5L16 1.5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      <span
        className={`text-sm transition-colors flex items-center gap-2 ${
          checked
            ? 'text-white font-medium'
            : 'text-slate-400 group-hover:text-white'
        }`}
      >
        {icon && (
          <span className={checked ? 'text-cyan-800' : 'text-cyan-400'}>
            {icon}
          </span>
        )}
        {label}
      </span>
    </label>
  );
}
