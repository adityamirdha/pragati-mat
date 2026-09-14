import React, { useEffect, useRef } from "react";

export default function CyberParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    const setDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setDimensions();

    let width = canvas.width;
    let height = canvas.height;

    const PARTICLE_COUNT = window.innerWidth < 768 ? 140 : 300;
    const particles = [];

    // ORIGINAL ELECTRIC CYAN & BLUE PALETTE
    const colors = [
      "rgba(0, 242, 254, ",   // Electric Neon Cyan
      "rgba(56, 189, 248, ",  // Sky Blue
      "rgba(16, 185, 129, ",  // Emerald Green Accent
      "rgba(99, 102, 241, ",  // Indigo Accent
      "rgba(245, 158, 11, ",  // Amber Spark
    ];

    let mouse = { x: null, y: null, radius: 130 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const blastSpeed = Math.random() * 32 + 16;
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 2.6 + 1.2;

      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * blastSpeed,
        vy: Math.sin(angle) * blastSpeed,
        size: size,
        colorBase: colorBase,
        alpha: Math.random() * 0.6 + 0.4,
        isExploding: true,
        ambientVx: (Math.random() - 0.5) * 1.1,
        ambientVy: (Math.random() - 0.5) * 1.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.isExploding) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.958;
          p.vy *= 0.958;

          if (Math.abs(p.vx) < 0.8 && Math.abs(p.vy) < 0.8) {
            p.isExploding = false;
            p.vx = p.ambientVx;
            p.vy = p.ambientVy;
          }
        } else {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x <= 0 || p.x >= width) p.vx *= -1;
          if (p.y <= 0 || p.y >= height) p.vy *= -1;

          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              p.x -= (dx / dist) * force * 5;
              p.y -= (dy / dist) * force * 5;
            }
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `${p.colorBase}0.85)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Constellation Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      setDimensions();
      width = canvas.width;
      height = canvas.height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "transparent",
      }}
    />
  );
}