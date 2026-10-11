import {
  Cpu,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Activity,
  Compass,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#07080A] text-[#F0F6FC] overflow-hidden">
      {/* Ambient Radial Mesh & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#00F0FF]/15 via-[#8B5CF6]/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07080A]/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00F0FF]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#00F0FF]" />
            </div>
            <span className="font-[family-name:var(--font-outfit)] font-semibold tracking-tight text-lg text-white">
              DEPT OF <span className="text-[#00F0FF]">AIML</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Phase 1 Active
            </span>
          </div>
        </div>
      </header>

      {/* Hero Smoke Test Section */}
      <section className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>Foundation & Architecture Initialized</span>
        </div>

        <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          Intelligence in Motion. <br />
          <span className="bg-gradient-to-r from-[#00F0FF] via-[#A78BFA] to-[#EC4899] bg-clip-text text-transparent">
            Built for What’s Next.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8B949E] leading-relaxed mb-10">
          Welcome to the official digital hub of the Artificial Intelligence and
          Machine Learning Department. Next.js App Router, Tailwind tokens, and
          Lenis physics are active.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#foundation-cards"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] text-black hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            Explore System Stack
            <ArrowRight className="w-4 h-4" />
          </a>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
            <Terminal className="w-4 h-4 text-[#8B949E]" />
            Lenis Smooth Scroll v1.3
          </div>
        </div>
      </section>

      {/* Architecture Cards Showcase (Tests Grid, Glassmorphism & Tokens) */}
      <section id="foundation-cards" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white tracking-tight">
              Phase 1 Engineering Foundation
            </h2>
            <p className="text-sm text-[#8B949E]">
              Core architectural pillars verified and operational.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-card rounded-2xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-5">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-white mb-2">
              Lenis Smooth Physics
            </h3>
            <p className="text-sm text-[#8B949E] leading-relaxed mb-4">
              Normalized momentum scroll running on requestAnimationFrame. Zero
              stutter, no layout hijacking, silky smooth 60-120fps.
            </p>
            <span className="text-xs font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-md">
              Lerp Interpolation: Ready
            </span>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-2xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] mb-5">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-white mb-2">
              Obsidian Cyber Tokens
            </h3>
            <p className="text-sm text-[#8B949E] leading-relaxed mb-4">
              Harmonized dark palette, subtle grid background, custom neon cyan
              and hyper violet accents with glassmorphism card wrappers.
            </p>
            <span className="text-xs font-mono text-[#8B5CF6] bg-[#8B5CF6]/10 px-2.5 py-1 rounded-md">
              CSS Variables: Loaded
            </span>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-2xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-white mb-2">
              Type-Safe Architecture
            </h3>
            <p className="text-sm text-[#8B949E] leading-relaxed mb-4">
              Next.js 16 App Router paired with React 19 and TypeScript 5.
              Pre-rendering server components for instant initial page delivery.
            </p>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
              App Router (RSC): Active
            </span>
          </div>
        </div>
      </section>

      {/* Extended Section to test scroll length & momentum */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#8B949E]">
            <Compass className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-2">
            Ready for Phase 2: Hero & Dynamic Sections
          </h3>
          <p className="text-sm text-[#8B949E] mb-6">
            Foundation verified. In the next phase, we build the split-screen
            hero, real department statistics ticker, and navigation system.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-[#8B949E]">
        Department of Artificial Intelligence & Machine Learning • Phase 1
        Foundation
      </footer>
    </main>
  );
}
