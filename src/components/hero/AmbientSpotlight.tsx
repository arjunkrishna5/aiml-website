"use client";

import { useEffect, useRef } from "react";

export function AmbientSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      container.style.setProperty("--mouse-x", `${clientX}px`);
      container.style.setProperty("--mouse-y", `${clientY}px`);
      container.style.setProperty("--spotlight-opacity", "1");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700"
      style={
        {
          "--mouse-x": "50vw",
          "--mouse-y": "30vh",
          "--spotlight-opacity": "0.7",
        } as React.CSSProperties
      }
    >
      {/* Dynamic Cursor Spotlight (GPU accelerated via CSS variables) */}
      <div
        className="absolute inset-0 opacity-[var(--spotlight-opacity)] transition-opacity duration-500"
        style={{
          background: `radial-gradient(650px circle at var(--mouse-x) var(--mouse-y), rgba(0, 240, 255, 0.08), rgba(139, 92, 246, 0.05) 40%, transparent 80%)`,
        }}
      />

      {/* Top Fixed Ambient Beam (Permanent depth glow) */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b from-[#00F0FF]/12 via-[#8B5CF6]/08 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Side Ambient Beam */}
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/06 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
