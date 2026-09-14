import React, { useState, useEffect, useRef } from "react";
import { Terminal, Activity, ChevronDown, ChevronUp, ShieldCheck, Cpu, Database, Radio, Disc3 } from "lucide-react";

export default function SystemDiagnosticsDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, time: "02:35:01", type: "KERNEL", msg: "Pragati-Mat Core Dual-Engine initialized." },
    { id: 2, time: "02:35:03", type: "LEXICON", msg: "Synset normalization active. 1,480 units indexed." },
    { id: 3, time: "02:35:06", type: "GUARD", msg: "Deterministic hard-guards locked: ZERO_FP_ENFORCED." },
    { id: 4, time: "02:35:10", type: "BRIDGE", msg: "MoP&NG CPSE multi-cluster bridge established (ONGC/IOCL/BPCL)." },
  ]);

  const [metrics, setMetrics] = useState({
    latency: "1.24 ms",
    throughput: "4,820/s",
    cpuUsage: "14.2%",
    activeGuards: "100% OK",
  });

  const terminalEndRef = useRef(null);

  // Live log simulation streamer
  useEffect(() => {
    const eventPool = [
      { type: "LEXICON", msg: "Normalized imperial thread: 3IN -> DN 80MM." },
      { type: "GUARD", msg: "Class match evaluated: CL600 vs CL600 [VERIFIED_PASS]." },
      { type: "SYNSET", msg: "Metallurgic synset: AISI 316 -> ASTM A182 F316." },
      { type: "CPSE_FEED", msg: "Received delta stream from Hazira Plant ERP." },
      { type: "SURPLUS", msg: "Identified cross-holding surplus in Cluster #104." },
      { type: "UNSPSC", msg: "Auto-tagged taxonomy: 40141607 (Globe Valves)." },
      { type: "KERNEL", msg: "Sub-millisecond RapidFuzz block comparison executed." },
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const randomEvent = eventPool[Math.floor(Math.random() * eventPool.length)];

      setLogs((prev) => [
        ...prev.slice(-18),
        { id: Date.now(), time: timeStr, ...randomEvent },
      ]);

      // Jitter simulation
      setMetrics({
        latency: `${(1.1 + Math.random() * 0.4).toFixed(2)} ms`,
        throughput: `${(4750 + Math.floor(Math.random() * 200)).toLocaleString()}/s`,
        cpuUsage: `${(12 + Math.random() * 4).toFixed(1)}%`,
        activeGuards: "100% OK",
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isOpen]);

  return (
    <div className="fixed bottom-5 right-5 z-50 font-mono text-xs select-none">
      {isOpen ? (
        /* EXPANDED CYBER HUD DOCK */
        <div className="w-[390px] sm:w-[460px] bg-[#070A0F]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(55,217,255,0.25)] overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-slate-200 tracking-wider flex items-center gap-1.5 text-[11px]">
                <Terminal size={14} className="text-cyan-400" /> SOVEREIGN AI TELEMETRY DOCK
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                LIVE KERNEL
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Quick Hardware Metrics Grid */}
          <div className="grid grid-cols-4 gap-1 p-3 bg-[#0B0F16] border-b border-slate-800/80 text-[10px]">
            <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
              <span className="text-slate-500 block">JITTER</span>
              <span className="text-cyan-300 font-bold">{metrics.latency}</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
              <span className="text-slate-500 block">THROUGHPUT</span>
              <span className="text-emerald-400 font-bold">{metrics.throughput}</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
              <span className="text-slate-500 block">CPU LOAD</span>
              <span className="text-indigo-300 font-bold">{metrics.cpuUsage}</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
              <span className="text-slate-500 block">HARD-GUARD</span>
              <span className="text-emerald-300 font-bold">{metrics.activeGuards}</span>
            </div>
          </div>

          {/* Real-time Streaming Event Log Terminal */}
          <div className="p-3 bg-black/70 max-h-56 overflow-y-auto space-y-1.5 text-[10.5px]">
            {logs.map((log) => (
              <div key={log.id} className="leading-tight flex items-start gap-2">
                <span className="text-slate-500 shrink-0">{log.time}</span>
                <span
                  className={`font-bold shrink-0 px-1 py-0.2 rounded text-[9px] ${
                    log.type === "GUARD"
                      ? "text-emerald-400 bg-emerald-950/60"
                      : log.type === "KERNEL"
                      ? "text-cyan-400 bg-cyan-950/60"
                      : log.type === "LEXICON"
                      ? "text-indigo-300 bg-indigo-950/60"
                      : "text-amber-400 bg-amber-950/60"
                  }`}
                >
                  [{log.type}]
                </span>
                <span className="text-slate-300">{log.msg}</span>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Footer Status */}
          <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Disc3 size={12} className="animate-spin text-cyan-400" /> Continuous Pipeline Sync
            </span>
            <span className="text-slate-500 font-sans">MoP&NG Sovereign Node #01</span>
          </div>
        </div>
      ) : (
        /* MINIMIZED FLOATING CYBER BADGE */
        <button
          onClick={() => setIsOpen(true)}
          className="group px-4 py-2.5 bg-[#070A0F]/90 hover:bg-[#0B0F16] border border-cyan-500/40 hover:border-cyan-400 rounded-full shadow-[0_0_25px_rgba(55,217,255,0.25)] flex items-center gap-3 transition duration-200 cursor-pointer backdrop-blur-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>

          <span className="text-slate-200 text-xs font-bold tracking-wider group-hover:text-cyan-300 transition flex items-center gap-1.5">
            <Terminal size={14} className="text-cyan-400" /> TELEMETRY HUD
          </span>

          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            {metrics.latency}
          </span>

          <ChevronUp size={14} className="text-slate-400 group-hover:text-white transition" />
        </button>
      )}
    </div>
  );
}