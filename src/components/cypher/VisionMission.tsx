"use client";

import { ShieldCheck, Target, Compass } from "lucide-react";

export function VisionMission() {
  return (
    <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      
      {/* Section Tagline matching AIDA JECC */}
      <div className="mb-4">
        <span className="text-xs font-mono font-bold tracking-widest text-[#DC2626] uppercase">
          • ABOUT CYPHER NCERC
        </span>
      </div>

      {/* Giant Editorial Headline matching AIDA JECC */}
      <h2 className="font-serif text-[clamp(1.85rem,3.8vw,3.5rem)] font-normal text-white leading-[1.15] mb-12 max-w-5xl">
        Nurturing{" "}
        <span className="italic text-[#DC2626] font-serif font-normal">
          ethical professionals
        </span>{" "}
        who practice responsible AI &amp; create socially impactful solutions.
      </h2>

      {/* Two Column Cards for Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        {/* Card 1: Department Vision */}
        <div className="bg-[#10121A] rounded-3xl p-7 sm:p-9 border border-white/10 relative overflow-hidden flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#DC2626] uppercase block mb-3">
              • OFFICIAL DEPARTMENT VISION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Department Vision
            </h3>
            
            <p className="font-serif italic text-base sm:text-lg text-slate-300 leading-relaxed pl-4 border-l-2 border-[#DC2626]">
              &ldquo;To be a premier center of academic excellence and research in Artificial Intelligence &amp; Machine Learning, producing globally competent, innovative, and ethically grounded engineers capable of addressing complex societal and technological challenges.&rdquo;
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Approved by AICTE &amp; Affiliated to APJ Abdul Kalam Technological University (KTU)</span>
          </div>
        </div>

        {/* Card 2: Department Mission */}
        <div className="bg-[#10121A] rounded-3xl p-7 sm:p-9 border border-white/10 relative overflow-hidden flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#DC2626] uppercase block mb-3">
              • STRATEGIC GOALS &amp; MISSION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Department Mission
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold text-[#DC2626] shrink-0 mt-0.5">
                  01.
                </span>
                <p className="leading-relaxed">
                  Provide state-of-the-art academic &amp; practical infrastructure to foster mastery in core AI &amp; ML technologies.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold text-[#DC2626] shrink-0 mt-0.5">
                  02.
                </span>
                <p className="leading-relaxed">
                  Cultivate an innovation-driven research mindset, student innovation, and entrepreneurship through industry-academia tie-ups.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold text-[#DC2626] shrink-0 mt-0.5">
                  03.
                </span>
                <p className="leading-relaxed">
                  Instill professional ethics, leadership qualities, lifelong learning habits, and social responsibility in students.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>NCERC Campus, Thrissur</span>
            <span className="text-[#DC2626]">Dept of AI &amp; ML</span>
          </div>
        </div>

      </div>

    </section>
  );
}
