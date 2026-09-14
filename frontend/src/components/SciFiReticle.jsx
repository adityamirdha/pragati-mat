import React from "react";

export default function SciFiReticle() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible">
      <div className="relative w-[500px] h-[500px] sm:w-[580px] sm:h-[580px] flex items-center justify-center">
        
        {/* Soft Cyan Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" style={{ animationDuration: "5s" }} />

        {/* 1. OUTER SOLID CYAN RING WITH CORNER ACCENT DIAMONDS */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/50">
          {/* Top-Left Diamond */}
          <div className="absolute -top-1.5 left-16 w-3 h-3 border border-cyan-400 rotate-45 bg-[#050814]" />
          {/* Top-Right Diamond */}
          <div className="absolute -top-1.5 right-16 w-3 h-3 border border-cyan-400 rotate-45 bg-[#050814]" />
          {/* Bottom-Left Diamond */}
          <div className="absolute -bottom-1.5 left-16 w-3 h-3 border border-cyan-400 rotate-45 bg-[#050814]" />
          {/* Bottom-Right Diamond */}
          <div className="absolute -bottom-1.5 right-16 w-3 h-3 border border-cyan-400 rotate-45 bg-[#050814]" />
        </div>

        {/* 2. ROTATING RADAR ARC RING */}
        <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-cyan-400/80 border-b-cyan-500/30 animate-[spin_25s_linear_infinite]" />

        {/* 3. DEGREE MARKERS (270° & 090°) */}
        <div className="absolute w-full flex justify-between items-center px-2 text-[11px] font-mono text-cyan-400 tracking-wider">
          <span className="flex items-center gap-1">
            <span className="w-3 h-[1.5px] bg-cyan-400 inline-block" /> 270°
          </span>
          <span className="flex items-center gap-1">
            090° <span className="w-3 h-[1.5px] bg-cyan-400 inline-block" />
          </span>
        </div>

        {/* 4. INNER DASHED CONCENTRIC RING (REVERSE SPIN) */}
        <div className="absolute inset-14 rounded-full border border-dashed border-cyan-400/50 animate-[spin_40s_linear_infinite_reverse]">
          {/* Orbiting Telemetry Dots */}
          <div className="absolute top-8 left-14 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
          <div className="absolute bottom-10 right-16 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#00F2FE]" />
          <div className="absolute top-20 right-8 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
        </div>

        {/* 5. INNER CORE RING & CENTER TARGET BEACON */}
        <div className="absolute inset-28 rounded-full border border-cyan-500/30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-cyan-100 shadow-[0_0_18px_#00F2FE] animate-pulse" />
        </div>

        {/* 6. HORIZONTAL SCANLINE EFFECT */}
        <div 
          className="absolute inset-0 rounded-full opacity-15 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 242, 254, 0.4) 3px, rgba(0, 242, 254, 0.4) 4px)",
          }}
        />

      </div>
    </div>
  );
}