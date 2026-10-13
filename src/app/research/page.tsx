"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AmbientSpotlight } from "@/components/hero/AmbientSpotlight";
import { RESEARCH_PAPERS, ResearchPaper } from "@/data/departmentData";
import {
  FileText,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

const TYPES = ["All", "Journal", "Conference", "Patent"] as const;

export default function ResearchPage() {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});

  const filteredPapers = useMemo(() => {
    return RESEARCH_PAPERS.filter((paper) => {
      return selectedType === "All" || paper.type === selectedType;
    });
  }, [selectedType]);

  const handleCopyBibtex = (paper: ResearchPaper) => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedId(paper.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className="relative min-h-screen bg-[#07080A] text-[#F0F6FC] pb-24">
      <AmbientSpotlight />
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      <Navbar />

      <div className="relative z-10 pt-32 sm:pt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B949E] hover:text-[#00F0FF] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Overview
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-3">
              <FileText className="w-3.5 h-3.5" />
              Scientific Publications &amp; IP
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Research &amp; Publications Hub
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#8B949E] max-w-2xl leading-relaxed">
              Explore peer-reviewed publications, international conference proceedings, and patents authored by department faculty and student scholars.
            </p>
          </div>

          {/* Research Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
            <div className="p-4 rounded-2xl glass-card text-center min-w-[110px]">
              <span className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-[#00F0FF] block">
                65+
              </span>
              <span className="text-[10px] font-mono uppercase text-[#8B949E]">
                Scopus / IEEE
              </span>
            </div>
            <div className="p-4 rounded-2xl glass-card text-center min-w-[110px]">
              <span className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-emerald-400 block">
                12
              </span>
              <span className="text-[10px] font-mono uppercase text-[#8B949E]">
                Patents Filed
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedType === type
                    ? "bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    : "bg-white/5 text-[#8B949E] hover:text-white border border-white/5"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-[#8B949E] hidden sm:inline">
            Showing {filteredPapers.length} results
          </span>
        </div>

        {/* Papers List */}
        <div className="space-y-6">
          {filteredPapers.map((paper) => {
            const isExpanded = expandedAbstracts[paper.id];
            const isCopied = copiedId === paper.id;

            return (
              <div
                key={paper.id}
                className="glass-card rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:border-white/20 group relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  
                  {/* Left Column: Paper Meta & Title */}
                  <div className="space-y-3 flex-1">
                    
                    {/* Tags Row */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/30">
                        {paper.type}
                      </span>
                      <span className="text-xs font-mono text-[#8B949E]">
                        Year {paper.year}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-xs font-mono text-emerald-400">
                        {paper.citations} Citations
                      </span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="font-[family-name:var(--font-outfit)] text-xl sm:text-2xl font-bold text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                      {paper.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-xs sm:text-sm text-[#8B949E]">
                      <span className="text-white/60">Authors: </span>
                      {paper.authors.join(", ")}
                    </p>

                    {/* Venue */}
                    <p className="text-xs font-mono text-[#00F0FF]/90">
                      {paper.venue}
                    </p>

                    {/* Abstract Expander */}
                    <div className="pt-2">
                      <button
                        onClick={() => toggleAbstract(paper.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B949E] hover:text-white transition-colors"
                      >
                        <span>{isExpanded ? "Hide Abstract" : "Read Abstract"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <p className="mt-3 text-xs sm:text-sm text-[#8B949E] leading-relaxed p-4 rounded-xl bg-white/[0.02] border border-white/5 animate-in fade-in duration-200">
                          {paper.abstract}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Right Column: Actions (Copy BibTeX & DOI) */}
                  <div className="flex flex-row lg:flex-col items-center gap-2.5 shrink-0 self-end lg:self-start">
                    <button
                      onClick={() => handleCopyBibtex(paper)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                        isCopied
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied BibTeX!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#8B949E]" />
                          <span>Copy BibTeX</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 text-[#00F0FF] border border-white/10 transition-colors"
                    >
                      <span>View DOI</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
