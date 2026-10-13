"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AmbientSpotlight } from "@/components/hero/AmbientSpotlight";
import { FACULTY_DATA, FacultyMember } from "@/data/departmentData";
import {
  Search,
  Mail,
  MapPin,
  ExternalLink,
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  ChevronLeft,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "LLMs & NLP",
  "Computer Vision",
  "Robotics & RL",
  "Edge AI & MLOps",
] as const;

export default function FacultyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredFaculty = useMemo(() => {
    return FACULTY_DATA.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || member.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="relative min-h-screen bg-[#07080A] text-[#F0F6FC] pb-24">
      <AmbientSpotlight />
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      <Navbar />

      {/* Header Container */}
      <div className="relative z-10 pt-32 sm:pt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B949E] hover:text-[#00F0FF] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Overview
          </Link>
        </div>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20 mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              Academic Leadership &amp; Mentorship
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Faculty &amp; Research Advisors
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#8B949E] max-w-2xl leading-relaxed">
              Meet our professors, research fellows, and lab directors leading research in generative artificial intelligence, spatial vision, and autonomous computing.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl glass-card text-center min-w-[120px]">
              <span className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-[#00F0FF] block">
                100%
              </span>
              <span className="text-[10px] font-mono uppercase text-[#8B949E]">
                Doctoral Faculty
              </span>
            </div>
            <div className="p-4 rounded-2xl glass-card text-center min-w-[120px]">
              <span className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-[#8B5CF6] block">
                4,000+
              </span>
              <span className="text-[10px] font-mono uppercase text-[#8B949E]">
                Total Citations
              </span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="py-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B949E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name, domain, or role..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-[#8B949E] focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "bg-white/5 text-[#8B949E] hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((member) => (
            <div
              key={member.id}
              className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle top border accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Role & Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#00F0FF]">
                    {member.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#8B949E]">
                    <BookOpen className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{member.papersCount} Papers</span>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-1 group-hover:text-[#00F0FF] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-[#8B5CF6] mb-3">
                  {member.role}
                </p>

                {/* Qualification */}
                <div className="flex items-center gap-2 text-xs text-[#8B949E] mb-4">
                  <GraduationCap className="w-4 h-4 shrink-0 text-white/50" />
                  <span className="truncate">{member.qualification}</span>
                </div>

                {/* Domain Focus */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
                  <span className="text-[10px] font-mono uppercase text-[#8B949E] block mb-1">
                    Primary Domain:
                  </span>
                  <p className="text-xs text-white font-medium">
                    {member.domain}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#8B949E] leading-relaxed mb-6 line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Bottom Actions & Contacts */}
              <div className="pt-4 border-t border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#8B949E]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span className="font-mono text-[11px]">{member.email}</span>
                  </div>
                  <a
                    href={member.googleScholar}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#00F0FF] hover:underline"
                  >
                    <span>Scholar</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#8B949E]/70">
                  <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{member.office}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredFaculty.length === 0 && (
          <div className="py-20 text-center glass-card rounded-3xl p-8">
            <Sparkles className="w-8 h-8 text-[#8B949E] mx-auto mb-3" />
            <h3 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-white mb-1">
              No faculty found matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-[#8B949E] mb-4">
              Try adjusting your search terms or selecting another specialization filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
