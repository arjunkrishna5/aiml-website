"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cpu, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { name: "Overview", href: "#overview" },
  { name: "Core Pillars", href: "#pillars" },
  { name: "Platforms", href: "#platforms" },
  { name: "Research", href: "#research" },
  { name: "Faculty", href: "#faculty" },
  { name: "Events", href: "#events" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07080A]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Department Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 via-[#8B5CF6]/20 to-transparent border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-[#00F0FF]/40 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]">
              <Cpu className="w-5 h-5 text-[#00F0FF] transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-outfit)] font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                DEPT OF <span className="text-[#00F0FF]">AIML</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#8B949E]">
                Autonomous Systems & AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#8B949E] hover:text-white hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#platforms"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 group shadow-sm"
            >
              <span>Explore Labs</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00F0FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-[#8B949E] hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#07080A]/95 backdrop-blur-2xl px-6 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#8B949E] hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10">
            <a
              href="#platforms"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-medium"
            >
              <span>Explore Department Platforms</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
