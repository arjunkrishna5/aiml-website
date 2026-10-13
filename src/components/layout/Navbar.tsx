"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cpu, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Overview", href: "/#overview" },
  { name: "About", href: "/#about" },
  { name: "Pillars", href: "/#pillars" },
  { name: "Events", href: "/#events" },
  { name: "Projects", href: "/#projects" },
  { name: "Committee", href: "/#committee" },
  { name: "Labs", href: "/#labs" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 max-w-5xl mx-auto px-4 ${
        isScrolled
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div className="bg-[#10121A]/90 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 py-2.5 shadow-2xl flex items-center justify-between">
        
        {/* Brand Pill */}
        <Link href="/#overview" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-white tracking-wider font-[family-name:var(--font-outfit)]">
            CYPHER <span className="font-serif italic font-normal text-red-500 lowercase text-xs">ncerc</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-md transition-all"
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full bg-white/5 text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mt-2 p-4 rounded-3xl bg-[#10121A]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-2.5 rounded-xl bg-[#DC2626] text-white text-xs font-bold"
          >
            CONTACT DEPT
          </a>
        </div>
      )}
    </header>
  );
}
