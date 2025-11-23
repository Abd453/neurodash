import { Upload, BrainCircuit, Activity } from 'lucide-react';

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Upload className="text-primary" size={24} />
          </div>
          <span className="text-accent bg-accent/10 px-2 py-1 rounded text-xs font-bold">
            +12%
          </span>
        </div>
        <h3 className="text-text-sub font-medium">Total Dataset Size</h3>
        <p className="text-3xl font-bold text-dark mt-1">
          12,500 <span className="text-sm font-normal text-gray-400">rows</span>
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-secondary/10 rounded-xl">
            <BrainCircuit className="text-secondary" size={24} />
          </div>
          <span className="text-accent bg-accent/10 px-2 py-1 rounded text-xs font-bold">
            +2.4%
          </span>
        </div>
        <h3 className="text-text-sub font-medium">Model Accuracy</h3>
        <p className="text-3xl font-bold text-dark mt-1">92.5%</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-orange-100 rounded-xl">
            <Activity className="text-orange-500" size={24} />
          </div>
        </div>
        <h3 className="text-text-sub font-medium">Training Time</h3>
        <p className="text-3xl font-bold text-dark mt-1">3m 45s</p>
      </div>
    </div>
  );
}
