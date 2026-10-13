"use client";

import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";

export function EventsShowcase() {
  return (
    <section id="events" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Header matching AIDA JECC */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#DC2626] uppercase block mb-2">
            • CYPHER ACTIVITIES &amp; INITIATIVES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Department Flagship Events
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-xs sm:text-sm text-slate-400 max-w-md">
          Flagship hackathons, hands-on workshops, and industry tech talks organized by the CYPHER association at NCERC.
        </p>
      </div>

      {/* 3 Showcase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Flagship Hackathon (Red Outline & Active) */}
        <div className="bg-[#10121A] rounded-3xl p-6 border-2 border-[#DC2626] shadow-[0_0_35px_rgba(220,38,38,0.2)] flex flex-col justify-between relative overflow-hidden group">
          
          <div>
            {/* Top Poster Graphic Box */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-[#07080A] border border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-4 mb-6 shadow-inner">
              <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 mb-2 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="text-white font-extrabold text-base tracking-wider font-[family-name:var(--font-outfit)]">
                CYPHER 2.0
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                48-HOUR HACKATHON
              </div>

              {/* Red Badge */}
              <div className="absolute bottom-3 px-3 py-1 rounded-full bg-[#DC2626] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>HACKATHON IS LIVE</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono font-bold text-[#DC2626] uppercase">
                OCTOBER 2026
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ₹1 LAKH PRIZES
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
              CYPHER 2.0 — Warriors of AI
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              A 48-hour Healthcare &amp; Computer Vision AI battlefield where student teams turn bold ideas into working solutions that create real impact.
            </p>

            <div className="text-[11px] font-mono text-slate-400 mb-6">
              <span>Coord: Prof. Rahul M • Student Lead: Arjun K</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <a
              href="#contact"
              className="flex-1 py-2.5 px-4 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold text-center tracking-wide shadow-md transition-colors"
            >
              REGISTER NOW ↗
            </a>
            <a
              href="#about"
              className="py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              DETAILS ↗
            </a>
          </div>
        </div>

        {/* Card 2: Workshop */}
        <div className="bg-[#10121A] rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
          <div>
            {/* Top Poster Graphic Box */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-[#07080A] border border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-4 mb-6 shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-2">
                <Calendar className="w-7 h-7" />
              </div>
              <div className="text-white font-bold text-sm tracking-wider">
                NEURAL SYSTEMS
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                PRACTICAL WORKSHOP
              </div>
            </div>

            {/* Tag */}
            <div className="mb-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                #2026 • Workshop
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Generative AI &amp; LLM Systems
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Hands-on masterclass introducing transformer architectures, prompt engineering, RAG pipelines, and model deployment on cloud containers.
            </p>
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-slate-400">
            <span className="text-emerald-400">COMPLETED</span>
            <span className="text-white hover:text-red-400 cursor-pointer flex items-center gap-1">
              SEE DETAILS <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 3: Technical Talk */}
        <div className="bg-[#10121A] rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group">
          <div>
            {/* Top Poster Graphic Box */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-[#07080A] border border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-4 mb-6 shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="text-white font-bold text-sm tracking-wider">
                TECH CAREERS
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                INDUSTRY TALK
              </div>
            </div>

            {/* Tag */}
            <div className="mb-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                #2026 • Technical Talk
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Inside Top Tech Labs
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              A career-focused session featuring insights into machine learning engineering pipelines, research publications, and top placement roadmaps.
            </p>
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-slate-400">
            <span className="text-emerald-400">COMPLETED</span>
            <span className="text-white hover:text-red-400 cursor-pointer flex items-center gap-1">
              SEE DETAILS <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
