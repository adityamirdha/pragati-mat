import React from "react";
import { Shield, GitMerge, FileSpreadsheet, RefreshCw, Lock, Zap } from "lucide-react";

export default function ArchitectureSection() {
  const pillars = [
    {
      icon: <Shield className="text-cyan-400" size={24} />,
      title: "Stage-1: Deterministic Hard-Guards",
      desc: "Before any semantic embedding or vector comparison, rule gates strictly validate safety-critical attributes: nominal bore, ANSI pressure class, and ASTM metallurgical grade. Any dimension conflict yields immediate 0% rejection.",
    },
    {
      icon: <GitMerge className="text-indigo-400" size={24} />,
      title: "Stage-2: Weighted Hybrid Scoring",
      desc: "Normalized material descriptions pass through a domain-specific lexicon equipped with synset tokenization, resolving legacy abbreviations (e.g. 'AISI 316', 'SS-316', '316SS') into a unified canonical root.",
    },
    {
      icon: <Zap className="text-emerald-400" size={24} />,
      title: "Inter-CPSE Capital Synchronization",
      desc: "Maps matching stock units across ONGC, IOCL, and BPCL locations. Flags duplicate procurement requests across sister CPSEs to route internal requisitions before external tenders are issued.",
    },
  ];

  return (
    <section id="architecture" className="relative py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
          Deep Engineering Pipeline
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 mt-4 tracking-tight">
          Deterministic Safety Meets Probabilistic Intelligence.
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
          Why standard LLMs fail in hydrocarbon infrastructure: In oil refineries, misclassifying a Class 150 valve for a Class 600 line causes catastrophic failure. Pragati-Mat eliminates false positives by architectural design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className="glass-panel p-8 rounded-2xl hover:border-cyan-500/40 transition duration-300 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition duration-500" />
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl inline-block mb-5">
              {p.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-3">{p.title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}