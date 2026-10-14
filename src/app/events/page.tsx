"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AmbientSpotlight } from "@/components/hero/AmbientSpotlight";
import { DEPARTMENT_EVENTS, DepartmentEvent } from "@/data/departmentData";
import {
  Calendar,
  MapPin,
  Trophy,
  ArrowRight,
  ChevronLeft,
  Clock,
  Award,
} from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<DepartmentEvent[]>(DEPARTMENT_EVENTS);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setEvents(data.data);
        }
      })
      .catch((err) => console.warn("Failed to fetch events:", err));
  }, []);

  const filteredEvents = events.filter((e) => e.status === activeTab);

  return (
    <main className="relative min-h-screen bg-[#07080A] text-[#F0F6FC] pb-24">
      <AmbientSpotlight />
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      <Navbar />

      <div className="relative z-10 pt-32 sm:pt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20 mb-3">
              <Calendar className="w-3.5 h-3.5" />
              Department Hackathons &amp; Summits
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Events &amp; Innovation Challenges
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#8B949E] max-w-2xl leading-relaxed">
              From 36-hour national robotics hackathons to NVIDIA-certified deep learning workshops, discover what’s happening in our department.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-card self-start md:self-auto">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "upcoming"
                  ? "bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  : "text-[#8B949E] hover:text-white"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "past"
                  ? "bg-white/10 text-white"
                  : "text-[#8B949E] hover:text-white"
              }`}
            >
              Past Highlights
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/20 group relative overflow-hidden"
            >
              {/* Corner ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#00F0FF]/10 to-transparent blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div>
                {/* Meta row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30">
                      {event.category}
                    </span>
                    {event.prizePool && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        <Trophy className="w-3 h-3" />
                        {event.prizePool}
                      </span>
                    )}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono ${
                      event.registrationOpen
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-white/5 text-[#8B949E] border border-white/10"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        event.registrationOpen ? "bg-emerald-400 animate-pulse" : "bg-white/40"
                      }`}
                    />
                    {event.registrationOpen ? "Registrations Active" : "Concluded"}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs font-mono text-[#8B5CF6] mb-4">
                  {event.tagline}
                </p>

                <p className="text-sm text-[#8B949E] leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Winners highlight if past */}
                {event.winners && (
                  <div className="p-3.5 rounded-xl bg-amber-400/05 border border-amber-400/20 text-xs text-amber-300/90 flex items-start gap-2.5 mb-6">
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{event.winners}</span>
                  </div>
                )}
              </div>

              {/* Bottom Details & Action */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs text-[#8B949E]">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {event.registrationOpen ? (
                  <a
                    href="#register"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all font-medium"
                  >
                    <span>Register Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#8B949E]">
                    {event.attendees || "Archive Available"}
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
