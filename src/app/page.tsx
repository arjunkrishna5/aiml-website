import { Navbar } from "@/components/layout/Navbar";
import { AmbientSpotlight } from "@/components/hero/AmbientSpotlight";
import { SplitHero } from "@/components/hero/SplitHero";
import { StatsTicker } from "@/components/hero/StatsTicker";
import { FlagshipBanner } from "@/components/showcase/FlagshipBanner";
import { PlatformsBento } from "@/components/showcase/PlatformsBento";
import { AISandboxWidget } from "@/components/showcase/AISandboxWidget";
import { CurriculumTracks } from "@/components/showcase/CurriculumTracks";
import {
  Brain,
  Cpu,
  Layers,
  Database,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#07080A] text-[#F0F6FC]">
      {/* Global Ambient Lighting & Cursor Spotlight */}
      <AmbientSpotlight />

      {/* Background Tech Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section */}
      <div id="overview">
        <SplitHero />
      </div>

      {/* 3. Live Department Stats Ticker */}
      <StatsTicker />

      {/* 4. Flagship Event Spotlight Banner (Sub-phase 3.1) */}
      <FlagshipBanner />

      {/* 5. Core Academic & Research Pillars */}
      <section id="pillars" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20 mb-3">
              <Brain className="w-3.5 h-3.5" />
              Academic &amp; Research Foundations
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Frontiers of Artificial Intelligence
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#8B949E] max-w-md">
            Our curriculum and research labs bridge foundational mathematics with high-scale autonomous applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 sm:p-7 group transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-2">
              Neural Systems &amp; Deep Learning
            </h3>
            <p className="text-sm text-[#8B949E] leading-relaxed mb-4">
              Convolutional architectures, transformers, and self-supervised models trained on accelerated GPU clusters.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-[#00F0FF]/80">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">PyTorch</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">CUDA</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">TensorRT</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-7 group transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] mb-5 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-2">
              Generative AI &amp; Reasoning Agents
            </h3>
            <p className="text-sm text-[#8B949E] leading-relaxed mb-4">
              Building multi-agent orchestrations, context engineering, retrieval systems (RAG), and parameter-efficient fine-tuning.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-[#8B5CF6]/80">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">LangGraph</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">HuggingFace</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">LoRA</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-7 group transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-2">
              Autonomous Edge &amp; Robotics
            </h3>
            <p className="text-sm text-[#8B949E] leading-relaxed mb-4">
              Quantized edge models, computer vision for drone navigation, and reinforcement learning in real-world environments.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-emerald-400/80">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">ROS 2</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">ONNX</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">Jetson Orin</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Student Platforms Bento Grid (Sub-phase 3.2) */}
      <PlatformsBento />

      {/* 7. Live Interactive AI Tokenizer & Sandbox (Sub-phase 3.3) */}
      <div id="sandbox">
        <AISandboxWidget />
      </div>

      {/* 8. Specialization Curriculum Pathways (Sub-phase 3.4) */}
      <CurriculumTracks />

      {/* 9. Department Footer */}
      <footer id="contact" className="relative z-10 border-t border-white/5 py-12 bg-[#07080A]/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-[family-name:var(--font-outfit)] font-semibold text-sm text-white">
              Department of Artificial Intelligence &amp; Machine Learning
            </span>
          </div>

          <p className="text-xs text-[#8B949E]">
            © 2026 AIML Department. Engineered with Next.js &amp; Lenis.
          </p>
        </div>
      </footer>
    </main>
  );
}
