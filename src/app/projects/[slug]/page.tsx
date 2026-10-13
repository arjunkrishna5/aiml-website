import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AmbientSpotlight } from "@/components/hero/AmbientSpotlight";
import { PROJECTS_DATA } from "@/data/departmentData";
import {
  ChevronLeft,
  Cpu,
  Layers,
  CheckCircle2,
  Users,
  HardDrive,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({
    slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-[#07080A] text-[#F0F6FC] pb-24">
      <AmbientSpotlight />
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      <Navbar />

      <div className="relative z-10 pt-32 sm:pt-40 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/#platforms"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B949E] hover:text-[#00F0FF] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Platforms Ecosystem
          </Link>
        </div>

        {/* Project Header Banner */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 relative overflow-hidden mb-12">
          {/* Accent lighting */}
          <div
            className="absolute top-0 right-0 w-80 h-80 opacity-20 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: project.accentColor }}
          />

          <div className="relative z-10 space-y-4">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#00F0FF]">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.status}
              </span>
              <span className="text-xs font-mono text-[#8B949E]">
                {project.stats}
              </span>
            </div>

            {/* Title & Tagline */}
            <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-[#8B949E] leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            {/* Quick Action Link */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>View Source on GitHub</span>
              </a>
            </div>

          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Case Study Columns */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview Section */}
            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00F0FF]" />
                Executive Summary
              </h2>
              <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Problem Statement */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6]">
                The Problem It Solves
              </span>
              <p className="text-sm text-white/90 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* System Architecture */}
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#8B5CF6]" />
                System Pipeline &amp; Architecture
              </h2>
              <div className="space-y-3">
                {project.architecture.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl glass-card flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center text-[11px] font-mono font-bold text-[#00F0FF] shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Specifications */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Tech Stack Card */}
            <div className="glass-card rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-[#00F0FF] border border-[#00F0FF]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Hardware / Compute Specs */}
            <div className="glass-card rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-[#8B5CF6]" />
                Hardware Specifications
              </h3>
              <div className="space-y-2">
                {project.hardwareSpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-[#8B949E]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Development Team */}
            <div className="glass-card rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00F0FF]" />
                Engineering Team
              </h3>
              <div className="space-y-3">
                {project.teamMembers.map((member, i) => (
                  <div key={i} className="text-xs">
                    <div className="font-semibold text-white">{member.name}</div>
                    <div className="text-[11px] text-[#8B949E]">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
