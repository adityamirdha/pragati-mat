import React from "react";

export default function HeroSection({ onOpenConsole }) {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 sm:py-24">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Initiative Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          MoP&NG CPSE Harmonization Initiative
        </div>

        {/* Brand Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
          PRAGATI-MAT
        </h1>

        {/* Subheading / Platform description */}
        <p className="mt-3 text-lg sm:text-xl font-semibold text-slate-700 uppercase tracking-wider">
          Central Material Master Harmonization Platform
        </p>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
          Standardizing, harmonizing, and reconciling inventory and surplus assets across public sector enterprises with deterministic precision.
        </p>

        {/* Action Button & System Status */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onOpenConsole}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-base shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Open Adjudication Console
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById("features");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-base transition-colors"
          >
            Learn More
          </button>
        </div>

        {/* Status indicator */}
        <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          System Status: Ready for Ingestion
        </div>

        {/* Enterprise Badges / Trust Metrics */}
        <div className="mt-14 pt-8 border-t border-slate-200 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Standards</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">ASME B16.34 Safety Verified</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Reliability</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Zero-False-Merge Deterministic Gate</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Security</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">On-Premise & Air-Gapped Compliant</p>
          </div>
        </div>

      </div>
    </section>
  );
}