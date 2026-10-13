"use client";

import { Briefcase, Trophy, Rocket, Users, ArrowRight } from "lucide-react";

const PILLARS_DATA = [
  {
    number: "01",
    tag: "SERVICES PROVIDED",
    title: "Services We Provide",
    description:
      "Cutting-edge AI research, hands-on training, and innovative solutions tailored to empower the next generation.",
    buttonText: "What We Do →",
    href: "#about",
    isRedFeatured: true,
    icon: Briefcase,
  },
  {
    number: "02",
    tag: "COMPETITIVE HACKATHONS",
    title: "Competitive Hackathons",
    description:
      "Begin with foundational sprints, then build further through inter-college hackathons, ideathons, and team mentorship.",
    buttonText: "Join the Challenge →",
    href: "#events",
    isRedFeatured: false,
    icon: Trophy,
  },
  {
    number: "03",
    tag: "SKILL BOOTCAMPS",
    title: "Industry Skill Bootcamps",
    description:
      "Explore Computer Vision, Deep Learning, Generative AI, and edge robotics through documented hands-on sessions.",
    buttonText: "Level Up ↗",
    href: "#events",
    isRedFeatured: true,
    icon: Rocket,
  },
  {
    number: "04",
    tag: "PLACEMENTS & INTERNSHIPS",
    title: "Placements & Internships",
    description:
      "Connecting talent with top opportunities through strong industry partnerships, research internships, and career support.",
    buttonText: "Start Your Journey →",
    href: "#committee",
    isRedFeatured: false,
    icon: Users,
  },
];

export function CypherPillars() {
  return (
    <section id="pillars" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Top Banner Tagline matching AIDA JECC */}
      <div className="flex flex-col items-center text-center mb-14">
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl font-normal leading-relaxed mb-4">
          Four foundational pillars driving innovation, research, hackathons, industry bootcamps, and career success.
        </p>
      </div>

      {/* 4 Vertical Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PILLARS_DATA.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.number}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative overflow-hidden min-h-[460px] ${
                pillar.isRedFeatured
                  ? "bg-[#10121A] border-2 border-[#DC2626] shadow-[0_0_30px_rgba(220,38,38,0.15)]"
                  : "bg-[#10121A] border border-white/10 hover:border-white/20"
              }`}
            >
              {/* Corner Dot Grid Watermark */}
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-dark-dot-grid opacity-30 pointer-events-none" />

              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold uppercase">
                    {pillar.tag}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      pillar.isRedFeatured
                        ? "bg-[#DC2626]/20 text-[#DC2626] border border-[#DC2626]/40"
                        : "bg-white/5 text-slate-300 border border-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Giant Number */}
                <div
                  className={`text-6xl sm:text-7xl font-bold tracking-tight mb-4 ${
                    pillar.isRedFeatured ? "text-[#DC2626]" : "text-white"
                  }`}
                >
                  {pillar.number}
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {pillar.title}
                </h3>

                {/* Small Divider Accent */}
                <div
                  className={`w-10 h-1 mb-4 rounded-full ${
                    pillar.isRedFeatured ? "bg-[#DC2626]" : "bg-white/40"
                  }`}
                />

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Card Action Button */}
              <div className="pt-8">
                <a
                  href={pillar.href}
                  className={`inline-flex items-center justify-center w-full py-3 px-5 rounded-full text-xs font-bold transition-all duration-200 ${
                    pillar.isRedFeatured
                      ? "bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-[0_4px_16px_rgba(220,38,38,0.35)]"
                      : "bg-[#F1F5F9] hover:bg-white text-[#0F172A] shadow-md"
                  }`}
                >
                  <span>{pillar.buttonText}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
