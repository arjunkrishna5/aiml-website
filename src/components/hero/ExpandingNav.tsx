"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  Calendar,
  FolderGit2,
  GraduationCap,
  BookOpen,
  Users,
  Mail,
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  desc: string;
  icon: LucideIcon;
  badge?: string;
  isExternal?: boolean;
}

const PRIMARY_LINKS: NavItem[] = [
  {
    name: "Overview",
    href: "/#overview",
    desc: "Hero & Department Mission",
    icon: Compass,
  },
  {
    name: "About HOD",
    href: "/#about",
    desc: "Message from Dr. Ananya Sharma",
    icon: Sparkles,
  },
  {
    name: "Events & Hackathons",
    href: "/#events",
    desc: "CYPHER 2.0, Tech Talks & Workshops",
    icon: Calendar,
    badge: "Active",
  },
  {
    name: "Academic Projects",
    href: "/#projects",
    desc: "Autonomous Vision, LLMs & Edge AI",
    icon: FolderGit2,
  },
  {
    name: "Faculty Directory",
    href: "/faculty",
    desc: "Professors, Research Guides & Staff",
    icon: GraduationCap,
    badge: "5 Categories",
  },
  {
    name: "Research Hub",
    href: "/research",
    desc: "Publications, Patents & BibTeX",
    icon: BookOpen,
  },
  {
    name: "Certificate Verification",
    href: "/verify",
    desc: "Check credentials & Bulk QR generator",
    icon: ShieldCheck,
    badge: "Official",
  },
  {
    name: "Executive Committee",
    href: "/#committee",
    desc: "Student council & Faculty leads",
    icon: Users,
  },
  {
    name: "Contact Campus",
    href: "#contact",
    desc: "NCERC Pampady, Thrissur, Kerala",
    icon: Mail,
  },
];

export function ExpandingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220); // Smooth grace window to prevent flicker
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Close on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-40"
    >
      {/* 1. Main Trigger Button (HOME +) */}
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white shadow-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer select-none group ${
          isOpen
            ? "bg-black ring-2 ring-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.35)]"
            : "bg-[#18181B] hover:bg-black"
        }`}
      >
        <span className="tracking-widest">HOME</span>
        <span
          className={`text-red-500 font-bold text-sm leading-none transition-transform duration-300 ${
            isOpen ? "rotate-45" : "group-hover:rotate-45"
          }`}
        >
          +
        </span>
      </button>

      {/* Invisible hover bridge to prevent gaps between button and menu */}
      <div className="absolute -bottom-3 left-0 right-0 h-4 pointer-events-auto" />

      {/* 2. Expanded Floating Navigation Flyout */}
      <div
        className={`absolute right-0 top-full mt-3 w-[340px] sm:w-[440px] md:w-[520px] rounded-3xl bg-[#10121A]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.7)] p-4 sm:p-5 transition-all duration-300 origin-top-right ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
        }`}
      >
        {/* Header / Brand in Menu */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase">
              CYPHER Portal Index
            </span>
          </div>
          <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
            NCERC AIML
          </span>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[60vh] sm:max-h-none overflow-y-auto sm:overflow-visible pr-1 sm:pr-0">
          {PRIMARY_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group/link"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover/link:text-red-400 group-hover/link:bg-red-500/10 group-hover/link:border-red-500/30 transition-all shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white group-hover/link:text-red-400 transition-colors">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5 group-hover/link:text-slate-300 transition-colors">
                    {item.desc}
                  </p>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover/link:text-white group-hover/link:translate-x-0.5 transition-all shrink-0 self-center" />
              </Link>
            );
          })}
        </div>

        {/* Quick Footer Action inside Expanded Menu */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between px-2">
          <Link
            href="/faculty"
            onClick={handleLinkClick}
            className="text-[11px] text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Explore Faculty</span>
            <ArrowUpRight className="w-3 h-3 text-red-500" />
          </Link>

          <a
            href="#contact"
            onClick={handleLinkClick}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors"
          >
            <span>Contact Dept</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
