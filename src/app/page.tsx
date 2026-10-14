import { Navbar } from "@/components/layout/Navbar";
import { SplitHero } from "@/components/hero/SplitHero";
import { VisionMission } from "@/components/cypher/VisionMission";
import { AboutHOD } from "@/components/cypher/AboutHOD";
import { EventsShowcase } from "@/components/cypher/EventsShowcase";
import { AcademicProjects } from "@/components/cypher/AcademicProjects";
import { ExecutiveCommittee } from "@/components/cypher/ExecutiveCommittee";
import { NCERCFooter } from "@/components/cypher/NCERCFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F4F5F8] text-[#0F172A]">
      {/* 1. Floating Sticky Navbar (Fades in smoothly on scroll) */}
      <Navbar />

      {/* 2. Top Hero Section (100% faithful to AIDA JECC reference: Light dot grid, editorial serif, red tilted stacked card) */}
      <div id="overview">
        <SplitHero />
      </div>

      {/* 3. Dark Curved Sheet (AIDA JECC Exact Style: rounded-t-[3rem] sm:rounded-t-[4.5rem]) */}
      <div className="relative bg-[#0C0D12] text-white rounded-t-[3rem] sm:rounded-t-[4.5rem] shadow-[0_-30px_70px_rgba(0,0,0,0.8)] border-t border-white/10 -mt-6 sm:-mt-10 z-20 overflow-hidden pt-12 sm:pt-16">
        
        {/* Subtle Dark Dot Grid in background of dark sheet */}
        <div className="absolute inset-0 bg-dark-dot-grid opacity-40 pointer-events-none" />

        <div className="relative z-10">
          {/* Vision & Mission Section */}
          <VisionMission />

          {/* Department Highlights & Message from HOD */}
          <AboutHOD />

          {/* Flagship Hackathons, Workshops & Tech Talks */}
          <EventsShowcase />

          {/* Academic Projects Showcase */}
          <AcademicProjects />

          {/* Executive Committee */}
          <ExecutiveCommittee />

          {/* Official NCERC Footer */}
          <NCERCFooter />
        </div>
      </div>
    </main>
  );
}
