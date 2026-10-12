import { Trophy, Calendar, MapPin, ArrowRight, Sparkles, Download, Users } from "lucide-react";

export function FlagshipBanner() {
  return (
    <section id="events" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Container with glowing border */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden border border-[#00F0FF]/30 shadow-[0_0_50px_rgba(0,240,255,0.12)] group hover:border-[#00F0FF]/50 transition-all duration-500">
        
        {/* Ambient background glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#00F0FF]/20 via-[#8B5CF6]/15 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#8B5CF6]/15 via-[#EC4899]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Event Details */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Tag Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30">
                <Sparkles className="w-3.5 h-3.5" />
                FLAGSHIP NATIONAL HACKATHON
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-white/80 border border-white/10">
                <Trophy className="w-3 h-3 text-amber-400" />
                ₹1,50,000+ Prize Pool
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                REGISTRATIONS OPEN
              </span>
            </div>

            {/* Event Title */}
            <div>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                HACK-AI 2026: <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#00F0FF] via-[#A78BFA] to-[#EC4899] bg-clip-text text-transparent">
                  Autonomous Systems &amp; Neural Agents
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#8B949E] leading-relaxed max-w-2xl">
                A 36-hour non-stop national hackathon organized by the AIML Department. Build and deploy real autonomous perception pipelines, multi-agent frameworks, and robotic control systems with industry mentors.
              </p>
            </div>

            {/* Event Metadata Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-[#8B949E]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00F0FF]" />
                <span className="text-white font-medium">November 14–15, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                <span>Advanced AI Computing Lab • Block 4</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Teams of 2–4 • Open to All Colleges</span>
              </div>
            </div>

          </div>

          {/* Right Column: CTA Box & Countdown Indicator */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a
              href="#register"
              className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl font-semibold text-sm bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#8B5CF6] text-black hover:shadow-[0_0_35px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              <span>Register Team Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#rulebook"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl font-medium text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all text-center"
            >
              <Download className="w-4 h-4 text-[#8B949E]" />
              <span>Download Rulebook &amp; Problem Tracks</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
