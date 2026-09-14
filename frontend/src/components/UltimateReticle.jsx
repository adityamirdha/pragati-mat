import React, { useState, useEffect } from "react";

export default function UltimateReticle() {
  const [isConverged, setIsConverged] = useState(false);

  useEffect(() => {
    // Lock into synchronized ambient orbit after convergence completes
    const timer = setTimeout(() => {
      setIsConverged(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible">
      
      {/* INLINE CONVERGENCE & DRAW-IN KEYFRAMES */}
      <style>{`
        @keyframes convergeFromTopLeft {
          0% {
            transform: translate3d(-240px, -240px, -150px) rotate(-60deg) scale(0.3);
            opacity: 0;
          }
          70% {
            transform: translate3d(15px, 15px, 20px) rotate(8deg) scale(1.08);
            opacity: 0.9;
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes convergeFromTopRight {
          0% {
            transform: translate3d(240px, -240px, -150px) rotate(60deg) scale(0.3);
            opacity: 0;
          }
          70% {
            transform: translate3d(-15px, 15px, 20px) rotate(-8deg) scale(1.08);
            opacity: 0.9;
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes convergeFromBottomLeft {
          0% {
            transform: translate3d(-240px, 240px, -150px) rotate(60deg) scale(0.3);
            opacity: 0;
          }
          70% {
            transform: translate3d(15px, -15px, 20px) rotate(-8deg) scale(1.08);
            opacity: 0.9;
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes convergeFromBottomRight {
          0% {
            transform: translate3d(240px, 240px, -150px) rotate(-60deg) scale(0.3);
            opacity: 0;
          }
          70% {
            transform: translate3d(-15px, -15px, 20px) rotate(8deg) scale(1.08);
            opacity: 0.9;
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes drawLaserLine {
          0% {
            stroke-dashoffset: 600;
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes lockShockwave {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          40% {
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>

      {/* 3D PERSPECTIVE CONTAINER */}
      <div className="relative w-[520px] h-[520px] sm:w-[640px] sm:h-[640px] flex items-center justify-center [perspective:1200px]">
        
        {/* AMBIENT RADIAL NEBULA GLOW */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-600/20 via-purple-600/25 to-violet-500/15 blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }} 
        />

        {/* ========================================================================= */}
        {/* PHASE 1: SCATTERED CONVERGING FRAGMENTS (MERGING INTO ONE)                */}
        {/* ========================================================================= */}

        {/* FRAGMENT 1: TOP-LEFT SECTOR (ONGC Pipeline Vector) */}
        <div
          className="absolute inset-0"
          style={{
            animation: "convergeFromTopLeft 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            {/* Top-Left Hex Edge */}
            <path
              d="M 44,110 L 200,20"
              stroke="#FF2A85"
              strokeWidth="2.5"
              strokeDasharray="300"
              style={{ animation: "drawLaserLine 2s ease-out forwards" }}
            />
            {/* Diagonal convergence beam to center */}
            <line
              x1="44"
              y1="110"
              x2="200"
              y2="200"
              stroke="rgba(255, 42, 133, 0.4)"
              strokeWidth="1.2"
              strokeDasharray="6 4"
            />
            <circle cx="44" cy="110" r="5.5" fill="#06040F" stroke="#FF2A85" strokeWidth="2.5" />
            <circle cx="44" cy="110" r="2.5" fill="#FF2A85" />
          </svg>
        </div>

        {/* FRAGMENT 2: TOP-RIGHT SECTOR (IOCL Pipeline Vector) */}
        <div
          className="absolute inset-0"
          style={{
            animation: "convergeFromTopRight 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            {/* Top-Right Hex Edge */}
            <path
              d="M 200,20 L 356,110"
              stroke="#D946EF"
              strokeWidth="2.5"
              strokeDasharray="300"
              style={{ animation: "drawLaserLine 2s ease-out forwards" }}
            />
            <line
              x1="356"
              y1="110"
              x2="200"
              y2="200"
              stroke="rgba(217, 70, 239, 0.4)"
              strokeWidth="1.2"
              strokeDasharray="6 4"
            />
            <circle cx="200" cy="20" r="6" fill="#06040F" stroke="#D946EF" strokeWidth="2.5" />
            <circle cx="200" cy="20" r="2.5" fill="#D946EF" />
            <circle cx="356" cy="110" r="5.5" fill="#06040F" stroke="#D946EF" strokeWidth="2.5" />
          </svg>
        </div>

        {/* FRAGMENT 3: BOTTOM-LEFT SECTOR (BPCL Pipeline Vector) */}
        <div
          className="absolute inset-0"
          style={{
            animation: "convergeFromBottomLeft 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            {/* Left & Bottom-Left Edges */}
            <path
              d="M 44,110 L 44,290 L 200,380"
              stroke="#A855F7"
              strokeWidth="2.2"
              strokeDasharray="450"
              style={{ animation: "drawLaserLine 2.1s ease-out forwards" }}
            />
            <line
              x1="44"
              y1="290"
              x2="200"
              y2="200"
              stroke="rgba(168, 85, 247, 0.4)"
              strokeWidth="1.2"
              strokeDasharray="6 4"
            />
            <circle cx="44" cy="290" r="5.5" fill="#06040F" stroke="#A855F7" strokeWidth="2.5" />
            <circle cx="44" cy="290" r="2.5" fill="#A855F7" />
          </svg>
        </div>

        {/* FRAGMENT 4: BOTTOM-RIGHT SECTOR (CPCL Pipeline Vector) */}
        <div
          className="absolute inset-0"
          style={{
            animation: "convergeFromBottomRight 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            {/* Right & Bottom-Right Edges */}
            <path
              d="M 356,110 L 356,290 L 200,380"
              stroke="#FF2A85"
              strokeWidth="2.2"
              strokeDasharray="450"
              style={{ animation: "drawLaserLine 2.1s ease-out forwards" }}
            />
            <line
              x1="356"
              y1="290"
              x2="200"
              y2="200"
              stroke="rgba(255, 42, 133, 0.4)"
              strokeWidth="1.2"
              strokeDasharray="6 4"
            />
            <circle cx="356" cy="290" r="5.5" fill="#06040F" stroke="#FF2A85" strokeWidth="2.5" />
            <circle cx="200" cy="380" r="6" fill="#06040F" stroke="#FF2A85" strokeWidth="2.5" />
            <circle cx="200" cy="380" r="2.5" fill="#A855F7" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 2: CONVERGENCE LOCK-IN SHOCKWAVE (TRIGGERS WHEN MERGED AT 2.2s)      */}
        {/* ========================================================================= */}
        <div
          className="absolute w-60 h-60 rounded-full border-2 border-pink-400 pointer-events-none"
          style={{
            animation: "lockShockwave 1.2s ease-out 2.1s forwards",
            opacity: 0,
          }}
        />
        <div
          className="absolute w-44 h-44 rounded-full border border-purple-400 pointer-events-none"
          style={{
            animation: "lockShockwave 1.4s ease-out 2.25s forwards",
            opacity: 0,
          }}
        />

        {/* ========================================================================= */}
        {/* PHASE 3: UNIFIED CONTINUOUS ROTATING LATTICE (ACTIVE ONCE MERGED)         */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isConverged ? "opacity-100 animate-[spin_55s_linear_infinite]" : "opacity-0"
          }`}
        >
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            {/* Fully Assembled Outer Hexagon */}
            <polygon
              points="200,20 356,110 356,290 200,380 44,290 44,110"
              stroke="rgba(217, 70, 239, 0.5)"
              strokeWidth="1.6"
              strokeDasharray="10 6"
            />
          </svg>
        </div>

        {/* MID INTERNAL ROTATING HEXAGON (COUNTER ROTATION) */}
        <div
          className={`absolute inset-10 transition-opacity duration-1000 ${
            isConverged ? "opacity-100 animate-[spin_32s_linear_infinite_reverse]" : "opacity-0"
          }`}
        >
          <svg className="w-full h-full" viewBox="0 0 350 350" fill="none">
            <polygon
              points="175,25 305,100 305,250 175,325 45,250 45,100"
              stroke="rgba(168, 85, 247, 0.6)"
              strokeWidth="1.8"
            />
            {/* Internal Laser Vectors */}
            <line x1="175" y1="25" x2="175" y2="325" stroke="rgba(255, 42, 133, 0.25)" strokeWidth="1" strokeDasharray="5 5" />
            <line x1="45" y1="100" x2="305" y2="250" stroke="rgba(255, 42, 133, 0.25)" strokeWidth="1" strokeDasharray="5 5" />
            <line x1="45" y1="250" x2="305" y2="100" stroke="rgba(255, 42, 133, 0.25)" strokeWidth="1" strokeDasharray="5 5" />
          </svg>
        </div>

        {/* 3D TILTED ISOMETRIC LATTICE RING */}
        <div
          className={`absolute inset-20 [transform:rotateX(62deg)_rotateZ(45deg)] transition-opacity duration-1000 ${
            isConverged ? "opacity-100 animate-[spin_20s_linear_infinite]" : "opacity-0"
          }`}
        >
          <div className="w-full h-full border-2 border-pink-500/50 rounded-3xl shadow-[0_0_35px_rgba(255,42,133,0.4)] flex items-center justify-center">
            <div className="w-4/5 h-4/5 border border-dashed border-purple-400/60 rounded-2xl" />
          </div>
        </div>

        {/* INNER CORE NUCLEUS */}
        <div
          className={`absolute w-44 h-44 sm:w-52 sm:h-52 transition-opacity duration-1000 ${
            isConverged ? "opacity-100 animate-[spin_16s_linear_infinite]" : "opacity-0"
          }`}
        >
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
            <polygon
              points="100,20 169,60 169,140 100,180 31,140 31,60"
              stroke="rgba(255, 42, 133, 0.85)"
              strokeWidth="2"
              fill="rgba(168, 85, 247, 0.09)"
            />
            <circle cx="100" cy="100" r="4.5" fill="#FF2A85" />
            <circle cx="100" cy="100" r="11" stroke="rgba(168, 85, 247, 0.85)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* TELEMETRY STATUS TAGS */}
        <div className="absolute -top-4 font-mono text-[9px] text-pink-300 tracking-widest uppercase bg-[#06040F]/90 px-3 py-0.5 border border-pink-700/60 rounded shadow-md shadow-pink-950/60">
          {isConverged ? "HARMONIZATION LOCKED • ZERO-FP GATE" : "INGESTING DISTRIBUTED CPSE VECTORS..."}
        </div>
        <div className="absolute -bottom-4 font-mono text-[9px] text-purple-300 tracking-widest uppercase bg-[#06040F]/90 px-3 py-0.5 border border-purple-700/60 rounded shadow-md shadow-purple-950/60">
          ASME B16.34 METALLURGY MATRIX
        </div>

      </div>
    </div>
  );
}