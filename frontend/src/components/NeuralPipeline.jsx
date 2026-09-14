import React, { useState } from "react";
import { Cpu, ShieldCheck, Database, CheckCircle2, ArrowRight, Zap, RefreshCw, Terminal, Layers } from "lucide-react";

export default function NeuralPipeline() {
  const [activePreset, setActivePreset] = useState(0);

  const presets = [
    {
      name: "Severe Duty Globe Valve",
      rawA: "VALVE-GLOBE-BW-3IN-CL600-SS316 (ONGC Hazira)",
      rawB: 'VALVE GLOBE, 3", 600#, AISI 316, BW ENDS (IOCL Gujarat)',
      extracted: {
        type: "VALVE GLOBE",
        dimension: "DN 80MM (3 INCH)",
        pressure: "CLASS 600 (ASME B16.34)",
        metallurgy: "ASTM A182 F316 / AISI 316",
        endConn: "BUTT WELD (BW)",
      },
      hardGuardStatus: "PASSED (0 Conflicts)",
      unspsc: "40141607 (Globe Valves)",
      canonicalId: "UMM-40141607-00104",
      canonicalTitle: "VALVE GLOBE | DN 80MM | CLASS 600 | ASTM A182 F316 | BW",
    },
    {
      name: "High Pressure Flange",
      rawA: "FLG-WN-4IN-1500#-A105-SCH80 (BPCL Mumbai)",
      rawB: 'FLANGE WNRF 4", 1500 LB, ASTM A105, SCH 80 (GAIL Pata)',
      extracted: {
        type: "FLANGE WNRF",
        dimension: "DN 100MM (4 INCH)",
        pressure: "CLASS 1500 (ASME B16.5)",
        metallurgy: "ASTM A105 FORGED CARBON STEEL",
        endConn: "WELD NECK RAISED FACE",
      },
      hardGuardStatus: "PASSED (0 Conflicts)",
      unspsc: "40173501 (Pipe Flanges)",
      canonicalId: "UMM-40173501-00821",
      canonicalTitle: "FLANGE WNRF | DN 100MM | CLASS 1500 | ASTM A105 | SCH 80",
    },
    {
      name: "Spiral Wound Gasket",
      rawA: "GSKT-SPWD-300#-6IN-SS316-GRAFOIL (IOCL Paradip)",
      rawB: 'GASKET SPIRAL WOUND 6" 300LB ASME B16.20 316/GRAPHITE (ONGC Uran)',
      extracted: {
        type: "GASKET SPIRAL WOUND",
        dimension: "DN 150MM (6 INCH)",
        pressure: "CLASS 300 (ASME B16.20)",
        metallurgy: "SS316 INNER/OUTER RING + GRAPHITE",
        endConn: "RAISED FACE COMPATIBLE",
      },
      hardGuardStatus: "PASSED (0 Conflicts)",
      unspsc: "31181502 (Gaskets)",
      canonicalId: "UMM-31181502-00412",
      canonicalTitle: "GASKET SPIRAL WOUND | DN 150MM | CLASS 300 | SS316/GRAPHITE",
    },
  ];

  const curr = presets[activePreset];

  return (
    <section className="relative py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/40 border border-cyan-500/30 px-3.5 py-1 rounded-full">
          Live Interactive Pipeline
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 mt-4 tracking-tight">
          How Raw Legacy Descriptions Become Canonical Gold.
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
          Select a sample procurement item below to watch our 4-stage deterministic and taxonomic pipeline harmonize disparate CPSE ERP records in sub-millisecond execution.
        </p>

        {/* Interactive Preset Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActivePreset(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition duration-200 cursor-pointer ${
                activePreset === idx
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(55,217,255,0.4)] scale-105"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage Canvas */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/30 relative shadow-[0_0_50px_rgba(55,217,255,0.08)]">
        {/* Stage Progress Tracker */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-6 mb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs flex items-center justify-center font-bold">
              01
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Raw Ingestion</div>
              <div className="text-[10px] text-slate-500 font-mono">Regex & Lexicon</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center justify-center font-bold">
              02
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Hard-Guard Check</div>
              <div className="text-[10px] text-slate-500 font-mono">Zero Risk Gate</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs flex items-center justify-center font-bold">
              03
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">UNSPSC Auto-Tag</div>
              <div className="text-[10px] text-slate-500 font-mono">Taxonomy Sync</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
              04
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Golden UMM Code</div>
              <div className="text-[10px] text-slate-500 font-mono">Inter-CPSE Minted</div>
            </div>
          </div>
        </div>

        {/* Interactive 2-Column Split: Input vs Canonical Resolution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Raw Disparate CPSE Inputs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Terminal size={14} className="text-cyan-400" /> Legacy Disparate Descriptions
              </span>
              <span className="text-[10px] text-slate-500">Unstructured ERP Feeds</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-[10px] text-blue-400 font-mono font-bold tracking-wide uppercase">Source ERP A:</div>
              <div className="font-mono text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded border border-slate-800/80">
                {curr.rawA}
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-[10px] text-amber-400 font-mono font-bold tracking-wide uppercase">Source ERP B:</div>
              <div className="font-mono text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded border border-slate-800/80">
                {curr.rawB}
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl text-xs space-y-2 font-mono">
              <div className="text-slate-400 font-bold flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" /> Hard-Guard Verification Result:
              </div>
              <div className="text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-3 py-1.5 rounded text-[11px]">
                {curr.hardGuardStatus} — Pressure rating, dimension, and metallurgic classes validated identical.
              </div>
            </div>
          </div>

          {/* Right: Extracted Features & Canonical Resolution */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-cyan-400" /> Standardized Engineering Entities
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">100% Normalized</span>
            </div>

            {/* Entity Spec Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="p-2 bg-slate-900/70 rounded border border-slate-800/60">
                <span className="text-[10px] text-slate-500 block">ITEM CLASS</span>
                <span className="text-slate-200 font-bold">{curr.extracted.type}</span>
              </div>
              <div className="p-2 bg-slate-900/70 rounded border border-slate-800/60">
                <span className="text-[10px] text-slate-500 block">NORMALIZED BORE</span>
                <span className="text-cyan-300 font-bold">{curr.extracted.dimension}</span>
              </div>
              <div className="p-2 bg-slate-900/70 rounded border border-slate-800/60">
                <span className="text-[10px] text-slate-500 block">PRESSURE CLASS</span>
                <span className="text-cyan-300 font-bold">{curr.extracted.pressure}</span>
              </div>
              <div className="p-2 bg-slate-900/70 rounded border border-slate-800/60">
                <span className="text-[10px] text-slate-500 block">MATERIAL GRADE</span>
                <span className="text-slate-200 font-bold">{curr.extracted.metallurgy}</span>
              </div>
            </div>

            {/* Final Canonical Golden Output Card */}
            <div className="bg-gradient-to-br from-cyan-950/40 via-slate-950 to-indigo-950/40 border border-cyan-500/40 p-4 rounded-xl shadow-[0_0_30px_rgba(55,217,255,0.15)] space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Unified Material Master (UMM)
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px]">
                  UNSPSC: {curr.unspsc}
                </span>
              </div>

              <div className="text-sm font-mono font-bold text-white pt-1">
                {curr.canonicalId}
              </div>

              <div className="text-xs font-mono text-slate-300 bg-black/50 p-2.5 rounded border border-slate-800">
                {curr.canonicalTitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}