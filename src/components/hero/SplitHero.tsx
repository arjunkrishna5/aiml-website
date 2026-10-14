"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu } from "lucide-react";
import { CursorReactiveBackground } from "./CursorReactiveBackground";
import { ExpandingNav } from "./ExpandingNav";

export function SplitHero() {
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({
      x: -(y * 14), // Tilt X
      y: x * 14,   // Tilt Y
    });
  };

  const handleHeroMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-light-dot-grid flex flex-col justify-between pt-6 sm:pt-8 pb-10 sm:pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Dynamic Cursor Reactive Background (Interactive Synapse Matrix & Spring Spotlight) */}
      <CursorReactiveBackground />

      {/* 1. Floating Pill Header (100% faithful to AIDA JECC) */}
      <div className="flex items-center justify-between w-full z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#18181B] text-white shadow-xl hover:bg-black transition-all group"
        >
          <div className="w-5 h-5 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-500">
            <svg className="w-3 h-3 text-red-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
            </svg>
          </div>
          <span className="font-extrabold tracking-wider text-xs sm:text-sm font-[family-name:var(--font-outfit)]">
            CYPHER <span className="font-serif italic font-normal text-red-500 lowercase text-xs">ncerc</span>
          </span>
        </Link>

        {/* Interactive Expanding Navigation Pill (Reveals full navigation on hover) */}
        <ExpandingNav />
      </div>

      {/* 2. Main Hero Split Typography & Central Red Tilted Stack Card */}
      <div className="my-auto py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: "Artificial Intelligence" (High-contrast Serif) */}
          <div className="lg:col-span-4 text-center lg:text-left select-none">
            <h1 className="font-serif text-[clamp(2.75rem,5.5vw,5.75rem)] font-normal text-[#0F172A] leading-[0.98] tracking-tight">
              Artificial <br />
              Intelligence
            </h1>
          </div>

          {/* Center Column: Floating Tilted Stacked Card (Dynamic 3D Cursor Parallax) */}
          <div className="lg:col-span-4 flex items-center justify-center my-4 lg:my-0">
            <a
              href="#events"
              style={{
                transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className="relative flex items-center justify-center group cursor-pointer will-change-transform"
            >
              {/* Back Dark Card tilted +6 degrees */}
              <div className="absolute w-[270px] sm:w-[310px] md:w-[330px] h-[190px] sm:h-[220px] md:h-[230px] rounded-3xl bg-[#0F172A] shadow-2xl rotate-6 transition-transform duration-500 group-hover:rotate-8" />

              {/* Front Vibrant Red Card tilted -2 degrees */}
              <div className="relative w-[270px] sm:w-[310px] md:w-[330px] rounded-3xl bg-[#DC2626] p-3 sm:p-3.5 shadow-2xl -rotate-2 transition-transform duration-500 group-hover:rotate-0 flex flex-col justify-between">
                
                {/* Inner Display Screen with CYPHER Emblem / Poster Graphic */}
                <div className="w-full aspect-[16/10] rounded-2xl bg-black overflow-hidden relative border border-white/10 flex items-center justify-center shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917] via-[#09090b] to-black flex flex-col items-center justify-center p-3 text-center">
                    
                    {/* Glowing Crest */}
                    <div className="relative mb-2">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-600/30 to-slate-900 border border-red-500/50 flex items-center justify-center shadow-[0_0_24px_rgba(220,38,38,0.5)]">
                        <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-red-600 text-[8px] font-mono font-bold tracking-widest text-white uppercase whitespace-nowrap shadow-sm">
                        NCERC AIML
                      </div>
                    </div>

                    <div className="text-white font-black text-sm sm:text-base tracking-widest font-[family-name:var(--font-outfit)]">
                      CYPHER 2.0
                    </div>
                    <div className="text-[10px] font-mono text-white/60 tracking-wider mt-0.5">
                      DEPARTMENT OF AI &amp; ML
                    </div>
                  </div>
                </div>

                {/* Card Bottom Row */}
                <div className="flex items-center justify-between pt-2.5 px-1 text-white">
                  <span className="font-bold text-xs tracking-wider">#2026</span>
                  <span className="font-semibold text-[11px] sm:text-xs flex items-center gap-1 group-hover:underline">
                    CYPHER 2.0 — Warriors of AI ↗
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: "& Machine Learning" (Serif + Red Italic Script) */}
          <div className="lg:col-span-4 text-center lg:text-right select-none">
            <h1 className="font-serif text-[clamp(2.75rem,5.5vw,5.75rem)] font-normal text-[#0F172A] leading-[0.98] tracking-tight">
              &amp; Machine <br />
              <span className="italic text-[#DC2626] font-normal">Learning</span>
            </h1>
          </div>

        </div>
      </div>

      {/* 3. Horizontal Separator & Sub-Hero Info Bar */}
      <div className="relative z-10">
        <div className="w-full border-t border-slate-300/80 mb-6 sm:mb-8" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] max-w-2xl font-normal leading-relaxed text-center sm:text-left">
            Official student association of the Department of Artificial Intelligence &amp; Machine Learning at Nehru College of Engineering and Research Centre. Empowering ethical leaders with precision &amp; care.
          </p>

          <a
            href="#about"
            className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_10px_25px_rgba(220,38,38,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 shrink-0"
          >
            <span>EXPLORE CYPHER</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </section>
  );
}
