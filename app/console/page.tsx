'use client';

import { useState, useMemo } from 'react';
import { Search, ListFilter, Filter } from 'lucide-react';
import Link from 'next/link';
import { ModelCard } from '@/components/console/model-card';
import { FilterSidebar } from '@/components/console/filter-sidebar';
import { ComparisonBar } from '@/components/console/comparison-bar';

// 1. Define Data
const allModels = [
  {
    id: 1,
    name: 'GPT-4o',
    company: 'OpenAI',
    mmlu: 88.7,
    context: '128k',
    contextVal: 128,
    type: 'Closed API',
    audited: true,
  },
  {
    id: 2,
    name: 'Claude 3.5 Sonnet',
    company: 'Anthropic',
    mmlu: 88.3,
    context: '200k',
    contextVal: 200,
    type: 'Closed API',
    audited: true,
  },
  {
    id: 3,
    name: 'Gemini 1.5 Pro',
    company: 'Google',
    mmlu: 85.9,
    context: '1000k',
    contextVal: 1000,
    type: 'Closed API',
    audited: false,
  },
  {
    id: 4,
    name: 'Llama 3.1 (405B)',
    company: 'Meta',
    mmlu: 87.3,
    context: '128k',
    contextVal: 128,
    type: 'Open-weight',
    audited: true,
  },
  {
    id: 5,
    name: 'Mistral Large 2',
    company: 'Mistral',
    mmlu: 84.0,
    context: '32k',
    contextVal: 32,
    type: 'Open-weight',
    audited: false,
  },
  {
    id: 6,
    name: 'Grok-1.5',
    company: 'xAI',
    mmlu: 81.3,
    context: '128k',
    contextVal: 128,
    type: 'Open-weight',
    audited: false,
  },
];

export default function ConsolePage() {
  // --- 2. State Management ---
  const [search, setSearch] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minContext, setMinContext] = useState(0);

  // State for Comparison (Checking/Unchecking)
  const [comparisonIds, setComparisonIds] = useState<number[]>([]);

  // State for Mobile Responsive Sidebar
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // --- 3. Handlers ---

  // Toggle Company Checkbox
  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  // Toggle Type Checkbox
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Toggle Comparison Logic (Check/Uncheck)
  const toggleCompare = (id: number) => {
    setComparisonIds((prev) => {
      if (prev.includes(id)) {
        // Remove if already checked
        return prev.filter((cid) => cid !== id);
      } else {
        // Add if not checked
        return [...prev, id];
      }
    });
  };

  // --- 4. Filtering Logic (Memoized) ---
  const filteredModels = useMemo(() => {
    return allModels.filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(search.toLowerCase()) ||
        model.company.toLowerCase().includes(search.toLowerCase());

      const matchesCompany =
        selectedCompanies.length === 0 ||
        selectedCompanies.includes(model.company);

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(model.type);

      const matchesContext = model.contextVal >= minContext;

      return matchesSearch && matchesCompany && matchesType && matchesContext;
    });
  }, [search, selectedCompanies, selectedTypes, minContext]);

  // --- 5. JSX Render ---
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col relative overflow-hidden pb-24">
      {/* Background Blobs */}
      <div className="blob blob-1 opacity-20"></div>
      <div className="blob blob-2 opacity-20"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 md:px-8 py-5 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-xl md:text-2xl font-bold">
          <span className="text-cyan-500">NEURO</span>DASH
        </Link>
        <div className="text-right">
          <p className="text-xs text-slate-400">Total Models</p>
          <p className="text-xl font-bold text-cyan-500">
            {filteredModels.length}
          </p>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            The Normalized Lab Console
          </h1>
          <p className="text-slate-400">
            AI Model Transparency and Comparison Dashboard
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 md:mb-10">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={20}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search models by name, company, or description..."
            className="
              w-full bg-[#131720] border border-white/10 rounded-xl py-4 pl-12 pr-4 
              text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
              transition-all placeholder:text-slate-600
            "
          />
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 transition"
          >
            <Filter size={16} />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Sidebar Filters (Responsive) */}
          <div
            className={`w-full lg:w-auto lg:sticky lg:top-28 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Label for Desktop */}
            <div className="hidden lg:flex items-center gap-2 mb-6 text-cyan-400 font-bold text-lg border-l-4 border-cyan-500 pl-3">
              Filters
            </div>
            <FilterSidebar
              selectedCompanies={selectedCompanies}
              onCompanyChange={toggleCompany}
              selectedTypes={selectedTypes}
              onTypeChange={toggleType}
              minContext={minContext}
              onContextChange={setMinContext}
              isVisibleMobile={true} // Always true because parent handles visibility
            />
          </div>

          {/* Main Cards Grid */}
          <div className="flex-1 w-full">
            {/* Sort & Count Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-slate-500 text-sm">
                Showing {filteredModels.length} of {allModels.length} models
              </p>

              <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-500 transition-colors">
                <ListFilter size={16} /> Sort by:{' '}
                <span className="text-cyan-500">MMLU Score</span>
              </button>
            </div>

            {/* Grid */}
            {filteredModels.length === 0 ? (
              <div className="p-12 border border-dashed border-white/10 rounded-xl text-center text-slate-500">
                No models match your criteria.
                <button
                  onClick={() => {
                    setSelectedCompanies([]);
                    setSelectedTypes([]);
                    setSearch('');
                    setMinContext(0);
                  }}
                  className="block mx-auto mt-2 text-cyan-500 hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredModels.map((model) => (
                  <ModelCard
                    key={model.id}
                    id={model.id}
                    name={model.name}
                    company={model.company}
                    mmlu={model.mmlu}
                    context={model.context}
                    type={model.type}
                    audited={model.audited}
                    // LOGIC: This boolean controls the visual state (Checked/Unchecked)
                    isComparing={comparisonIds.includes(model.id)}
                    // LOGIC: This function updates the array
                    onToggleCompare={() => toggleCompare(model.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar (Only shows if items selected) */}
      <ComparisonBar
        selectedModels={allModels.filter((m) => comparisonIds.includes(m.id))}
        onClear={() => setComparisonIds([])}
        onRemove={toggleCompare}
      />
    </div>
  );
}
