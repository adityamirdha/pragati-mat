import React, { useEffect, useState } from "react";
import { Terminal, Shield, Cpu, Disc3 } from "lucide-react";

export default function WarpTransition({ onComplete }) {
  const [progress, setProgress] = useState(12);
  const [logText, setLogText] = useState("MOUNTING MOP&NG REFINERY CLUSTER NODES...");

  useEffect(() => {
    const logs = [
      "SYNCHRONIZING ONGC HAZIRA & IOCL GUJARAT FEEDS...",
      "ENGAGING DETERMINISTIC ZERO-FP HARD-GUARDS...",
      "ESTABLISHING HIGH-SPEED CPSE SURPLUS ROUTING...",
      "SOVEREIGN KERNEL ACTIVE. LAUNCHING CONSOLE...",
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setProgress((prev) => Math.min(100, prev + 24));
      if (logs[currentStep]) {
        setLogText(logs[currentStep]);
      }
      if (currentStep >= 4) {
        clearInterval(interval);
        setTimeout(onComplete, 200);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] bg-[#040506] flex flex-col items-center justify-center p-6 select-none">
      {/* Background Cyber Glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-md w-full space-y-6 text-center">
        {/* Animated Cyber Core Icon */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl border border-cyan-500/40 animate-ping opacity-30" />
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(55,217,255,0.4)]">
            <Cpu size={32} className="animate-pulse" />
          </div>
        </div>

        <div>
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center justify-center gap-2">
            <Disc3 size={14} className="animate-spin text-cyan-400" />
            ACCESSING SOVEREIGN AI WORKSPACE
          </div>
          <h2 className="text-xl font-black text-white mt-1 tracking-tight">PRAGATI-MAT V2.4</h2>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-2 overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_15px_#37d9ff]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry Stream Log */}
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl font-mono text-[11px] text-slate-400 flex items-center justify-between">
          <span className="truncate text-left">{logText}</span>
          <span className="font-bold text-cyan-300 shrink-0 ml-2">{progress}%</span>
        </div>
      </div>
    </div>
  );
}