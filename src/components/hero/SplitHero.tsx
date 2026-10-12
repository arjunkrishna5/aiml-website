import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  BrainCircuit,
  Eye,
  Bot,
  FileText,
} from "lucide-react";

export function SplitHero() {
  return (
    <section className="relative z-10 pt-28 sm:pt-36 pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.1)] group hover:border-[#00F0FF]/30 transition-all duration-300 max-w-full">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <span className="text-[#8B949E] group-hover:text-white transition-colors truncate">
              Pioneering Artificial Intelligence &amp; Neural Computing
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="hidden sm:inline text-[#00F0FF] font-mono text-[11px] font-semibold shrink-0">
              v2.6 Portal
            </span>
          </div>
        </div>

        {/* Main Split Typography & Central Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-8 items-center mb-14 sm:mb-16">
          
          {/* Left Typography Block */}
          <div className="lg:col-span-4 text-center lg:text-left flex flex-col justify-center">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#00F0FF] font-semibold mb-2">
              Next-Gen Computing
            </span>
            <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(1.85rem,2.5vw,3.25rem)] xl:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
              ARTIFICIAL <br />
              <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                INTELLIGENCE
              </span>
            </h1>
            <p className="mt-4 text-xs sm:text-sm text-[#8B949E] leading-relaxed max-w-md mx-auto lg:mx-0">
              Advancing machine cognition through rigorous scientific inquiry, deep neural modeling, and hardware-accelerated intelligence.
            </p>
          </div>

          {/* Central Flagship Interactive Glass Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] xl:max-w-sm glass-card rounded-3xl p-5 sm:p-6 xl:p-7 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] group hover:border-[#00F0FF]/40 transition-all duration-500">
              
              {/* Corner decorative lights */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F0FF]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#00F0FF]/20 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8B5CF6]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#8B5CF6]/20 transition-all duration-500" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-white tracking-wide">
                      NEURAL LAB CLUSTER
                    </h2>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      SYSTEMS OPERATIONAL
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8B949E] border border-white/10">
                  GPU 100%
                </span>
              </div>

              {/* Dynamic Pillars in the Center Card */}
              <div className="py-4 space-y-2.5">
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex items-center gap-3">
                  <Eye className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <div className="text-left">
                    <div className="text-xs font-medium text-white">Computer Vision &amp; Perception</div>
                    <div className="text-[10px] text-[#8B949E]">Real-time edge inference &amp; spatial AI</div>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                  <div className="text-left">
                    <div className="text-xs font-medium text-white">Large Language Models (LLMs)</div>
                    <div className="text-[10px] text-[#8B949E]">Agentic architectures &amp; reasoning engines</div>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex items-center gap-3">
                  <Bot className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-left">
                    <div className="text-xs font-medium text-white">Autonomous Robotics</div>
                    <div className="text-[10px] text-[#8B949E]">Reinforcement learning in hardware</div>
                  </div>
                </div>
              </div>

              {/* Card Footer Ticker */}
              <div className="pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8B949E]">
                <span className="font-mono text-[#00F0FF]">CUDA 12.8</span>
                <span className="flex items-center gap-1 text-white/70">
                  <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                  Active Research Hub
                </span>
              </div>
            </div>
          </div>

          {/* Right Typography Block */}
          <div className="lg:col-span-4 text-center lg:text-right flex flex-col justify-center">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8B5CF6] font-semibold mb-2">
              Algorithmic Rigor
            </span>
            <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(1.85rem,2.5vw,3.25rem)] xl:text-5xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-white/60">&amp; MACHINE</span> <br />
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                LEARNING
              </span>
            </h1>
            <p className="mt-4 text-xs sm:text-sm text-[#8B949E] leading-relaxed max-w-md mx-auto lg:ml-auto lg:mr-0">
              Cultivating the next generation of artificial intelligence pioneers, research fellows, and world-class engineers.
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <a
            href="#platforms"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-xs sm:text-sm bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#8B5CF6] text-black font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Explore Digital Ecosystem</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#research"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
          >
            <FileText className="w-4 h-4 text-[#8B949E]" />
            <span>Research &amp; Publications</span>
          </a>
        </div>

      </div>
    </section>
  );
}
