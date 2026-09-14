import React from "react";
import { Activity, ShieldCheck, Database, Server, Cpu } from "lucide-react";

export default function CpseLiveTicker() {
  const tickerItems = [
    {
      icon: <Server size={12} className="text-blue-400" />,
      tag: "CPSE-A",
      text: "ONGC Hazira Plant • Ingesting 1,420 Valve Records • Local Code Namespace Preserved",
    },
    {
      icon: <ShieldCheck size={12} className="text-emerald-400" />,
      tag: "SAFETY GATE",
      text: "ASME B16.34 Zero-FP Hard Guard Active • Class 150 vs Class 600 Conflict Blocked",
    },
    {
      icon: <Server size={12} className="text-amber-400" />,
      tag: "CPSE-B",
      text: "IOCL Gujarat Refinery • Normalizing Imperial Units (2 IN → DN 50) with Provenance",
    },
    {
      icon: <Cpu size={12} className="text-indigo-400" />,
      tag: "CPSE-C",
      text: "CPCL Manali Refinery • Pilot Family: Valves • Canonical Schema v1.0 Mapped",
    },
    {
      icon: <Database size={12} className="text-cyan-400" />,
      tag: "PNMID REGISTRY",
      text: "Provisional National Material ID • Non-Authoritative, Versioned & Reversible",
    },
  ];

  return (
    <div className="w-full bg-[#080d1a]/80 border-y border-slate-800/80 backdrop-blur-md overflow-hidden py-2 text-xs font-mono select-none">
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite] gap-12 items-center">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 shrink-0 text-slate-400">
            {item.icon}
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">
              {item.tag}
            </span>
            <span className="text-slate-300">{item.text}</span>
            <span className="text-slate-700 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}