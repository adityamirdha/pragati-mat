import React, { useEffect, useState } from "react";

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive elements
      const target = e.target;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Smooth trailing physics
  useEffect(() => {
    let animId;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Dynamic Ambient Laser Spotlight */}
      <div
        className="absolute rounded-full transition-transform duration-75 ease-out"
        style={{
          width: "450px",
          height: "450px",
          left: `${pos.x - 225}px`,
          top: `${pos.y - 225}px`,
          background: "radial-gradient(circle, rgba(55,217,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Trailing Outer Ring */}
      <div
        className={`absolute rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? "border-cyan-400 bg-cyan-400/10 scale-150 shadow-[0_0_20px_rgba(55,217,255,0.4)]"
            : "border-cyan-500/40 scale-100"
        }`}
        style={{
          width: "32px",
          height: "32px",
          left: `${trailingPos.x - 16}px`,
          top: `${trailingPos.y - 16}px`,
        }}
      />

      {/* Sharp Micro Reticle Center */}
      <div
        className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#37d9ff]"
        style={{
          left: `${pos.x - 3}px`,
          top: `${pos.y - 3}px`,
        }}
      />
    </div>
  );
}