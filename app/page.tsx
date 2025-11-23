'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Rocket,
  Github,
  Zap,
  Database,
  GitBranch,
  Twitter,
  Linkedin,
  Disc,
  Activity,
  PieChart,
} from 'lucide-react';

export default function Home() {
  const [theme, setTheme] = useState('dark');

  // On mount, set theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  // Update localStorage & document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Theme toggle button listener
  useEffect(() => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      });
    }
  }, []);
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* --- Navigation --- */}
      <nav className="flex justify-between items-center px-[5%] py-6 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Layers className=" text-cyan-500" />
          <span>
            NEURO<span className="text-gradient">DASH</span>
          </span>
        </div>
        <div className="flex items-center gap-8">
          <Link
            href="#features"
            className="text-slate-400 hover:text-primary transition-colors text-sm"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-slate-400 hover:text-primary transition-colors text-sm"
          >
            About
          </Link>
          <Link
            href="/auth/login"
            className="px-5 py-2 text-sm border border-white/10 rounded-lg hover:border-cyan-500 hover:text-cyan-500 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="flex flex-col items-center text-center pt-24 px-[5%] pb-8 relative">
        <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 max-w-4xl">
          Unlock Intelligence <br /> with{' '}
          <span className="text-gradient">Precision AI</span>
        </h1>
        <p className="text-lg text-slate-400 mb-12 max-w-xl">
          The hackathon-ready dashboard platform. Train models, visualize
          datasets, and deploy in seconds.
        </p>

        <div className="flex gap-4 mb-16">
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:-translate-y-1 transition-all">
            <Rocket className="w-5 h-5" /> Start Hacking
          </button>

          <button className="bg-white/5 border border-white/10 hover:border-secondary hover:text-secondary text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all">
            <Github size={18} /> GitHub
          </button>
        </div>

        {/* 3D Dashboard Mockup */}
        <div className="dashboard-preview-container w-full max-w-5xl">
          <div className="dashboard-glass-panel border border-white/10 border-t-white/30 rounded-3xl p-6 h-[450px] grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
            {/* Mock Sidebar */}
            <div className="hidden md:flex flex-col gap-3 bg-white/5 rounded-xl p-4">
              <div className="bg-purple-600/20 text-purple-400 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3">
                <PieChart className="w-4 h-4" /> Overview
              </div>
              <div className="flex items-center gap-3 h-9 px-3 rounded-lg text-slate-400 text-sm hover:bg-white/5">
                <Database size={16} /> Datasets
              </div>
              <div className="flex items-center gap-3 h-9 px-3 rounded-lg text-slate-400 text-sm hover:bg-white/5">
                <Zap size={16} /> Models
              </div>
              <div className="mt-auto pt-8 text-xs text-slate-500 flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div> v1.0.4
              </div>
            </div>

            {/* Mock Content */}
            <div className="flex flex-col gap-6">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  value="98.4%"
                  label="Accuracy"
                  color="text-purple-500"
                />
                <StatCard value="0.024" label="Loss Rate" color="text-white" />
                <StatCard
                  value="14k"
                  label="Rows"
                  color="text-secondary text-cyan-500"
                />
              </div>

              {/* Chart Area */}
              <div className="flex-grow bg-white/5 rounded-xl border border-white/5 p-6 flex items-end justify-between gap-2">
                {[40, 65, 50, 85, 70, 95, 60, 80].map((h, i) => (
                  <div
                    key={i}
                    className="bar"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Trusted By --- */}
      <div className="py-12 border-b border-white/5 text-center">
        <p className="text-sm text-slate-500 uppercase tracking-widest mb-6">
          Trusted by Builders at
        </p>
        <div className="flex justify-center gap-12 flex-wrap opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Using text placeholders as generic logos for the demo */}
          <span className="text-xl font-bold flex items-center gap-2">
            <Disc /> Acme Corp
          </span>
          <span className="text-xl font-bold flex items-center gap-2">
            <Activity /> GlobalAI
          </span>
          <span className="text-xl font-bold flex items-center gap-2">
            <Layers /> StackSys
          </span>
          <span className="text-xl font-bold flex items-center gap-2">
            <Zap /> FlashData
          </span>
        </div>
      </div>

      {/* --- Features --- */}
      <section id="features" className="py-24 px-[5%]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Why NeuroDash?
          </h2>
          <p className="text-center text-slate-400 mb-16 max-w-xl mx-auto">
            We provide the infrastructure so you can focus on the algorithms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Card 1 */}
            <FeatureCard
              className="group p-6 rounded-2xl border border-cyan-500 
               hover:border-cyan-400 hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)] 
               transition-all duration-300"
              icon={
                <div
                  className="p-3 rounded-xl border-3 border-cyan-500 
                      group-hover:border-cyan-400 transition-all 
                      w-16 h-16 flex items-center justify-center"
                >
                  <Zap
                    className="text-cyan-500 group-hover:text-cyan-400 transition-all"
                    size={32}
                  />
                </div>
              }
              title="Real-Time Training"
              desc="Visualize your epochs in real-time with our low-latency websocket connection."
            />

            {/* Card 2 */}
            <FeatureCard
              className="group p-6 rounded-2xl border border-cyan-500
               hover:border-cyan-400 hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)] 
               transition-all duration-300"
              icon={
                <div
                  className="p-3 rounded-xl border-3 border-cyan-500 
                      group-hover:border-cyan-400 transition-all 
                      w-16 h-16 flex items-center justify-center"
                >
                  <Database
                    className="text-cyan-500 group-hover:text-cyan-400 transition-all"
                    size={32}
                  />
                </div>
              }
              title="Auto-Dataset"
              desc="Drag and drop CSVs. We automatically clean, normalize, and split your data."
            />

            {/* Card 3 */}
            <FeatureCard
              className="group p-6 rounded-2xl border border-cyan-500
               hover:border-cyan-400 hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)] 
               transition-all duration-300"
              icon={
                <div
                  className="p-3 rounded-xl border-3 border-cyan-500 
                      group-hover:border-cyan-400 transition-all 
                      w-16 h-16 flex items-center justify-center"
                >
                  <GitBranch
                    className="text-cyan-500 group-hover:text-cyan-400 transition-all"
                    size={32}
                  />
                </div>
              }
              title="Version Control"
              desc="Rollback your model weights instantly. We track every training run automatically."
            />
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 px-[5%]">
        <div className="max-w-4xl mx-auto from-primary0 to-secondary/10 border border-purple-900 rounded-3xl p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Win the Hackathon?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Join 5,000+ developers building the next generation of AI
              applications.
            </p>
            <button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold  transition-all 
    bg-purple-500
    hover:-translate-y-0.5 
    hover:shadow-[0_0_15px_#8b5cf6]"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-footer border-t border-white/5 pt-20 pb-8 px-[5%]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 ">
            <div className="flex items-center gap-2 text-xl font-bold mb-4">
              <Layers className="text-secondary text-cyan-500" />
              <span>
                NEURO<span className="text-gradient">DASH</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The ultimate dashboard for AI model visualization and deployment.
              Built for speed.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary hover:pl-1 transition-all"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary hover:pl-1 transition-all"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary hover:pl-1 transition-all"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary hover:pl-1 transition-all"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary hover:pl-1 transition-all"
                >
                  API Status
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary hover:pl-1 transition-all"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Stay Updated</h4>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-white"
              />
              <button
                className="
    bg-primary 
    text-white 
    px-6 py-3 
    rounded-lg 
    font-semibold 
    flex items-center gap-2 
    transition-all 
    bg-purple-500
    hover:-translate-y-0.5 
    hover:shadow-[0_0_15px_#8b5cf6]
  "
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; 2025 NeuroDash Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-secondary transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-secondary transition-colors">
              <Github size={20} />
            </Link>
            <Link href="#" className="hover:text-secondary transition-colors">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* --- Sub-Components --- */

function StatCard({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
      <div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  className,
}: {
  icon: any;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div
      className={`
        group relative p-8 rounded-2xl 
        bg-[#131720] border border-white/10 
        transition-all duration-300 
        hover:border-cyan-500 hover:-translate-y-2 
        hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)]
        flex flex-col items-start text-left
        ${className ?? ''}
      `}
    >
      {/* Icon Container - Matches the 'Square' look in your screenshot */}
      <div
        className="
          mb-6 w-16 h-16 rounded-xl 
          border-2 border-white/10 bg-white/5 
          flex items-center justify-center 
          text-cyan-500 
          transition-all duration-300
          group-hover:border-cyan-500 group-hover:bg-cyan-500/10 group-hover:scale-110
        "
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>

      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
