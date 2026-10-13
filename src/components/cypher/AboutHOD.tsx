import { GraduationCap, Award, Building, BookOpen, Quote } from "lucide-react";

export function AboutHOD() {
  return (
    <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#FF2E54] bg-[#FF2E54]/10 border border-[#FF2E54]/20 mb-3">
          <Building className="w-3.5 h-3.5" />
          Nehru College of Engineering and Research Centre
        </span>
        <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Department of AI &amp; Machine Learning
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          Established to meet the rising demand for artificial intelligence pioneers, the Department of AIML at NCERC equips students with solid mathematical foundations, advanced deep learning frameworks, and ethical engineering principles.
        </p>
      </div>

      {/* Grid: About Department Card + HOD Desk Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: About Department Highlights */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF2E54]">
              Department Highlights
            </span>
            <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white mt-2 mb-4">
              Pioneering Tomorrow’s Intelligence
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
              Affiliated with <strong>APJ Abdul Kalam Technological University (KTU)</strong> and approved by <strong>AICTE</strong>, the AIML department at NCERC provides an intellectually vibrant environment designed to transform passionate students into industry-ready AI professionals.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <GraduationCap className="w-4 h-4 text-[#FF2E54] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-white block">Undergraduate B.Tech Degree</span>
                  <span className="text-[#94A3B8]">Comprehensive 4-year curriculum affiliated with KTU</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <BookOpen className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-white block">Modern Laboratory Infrastructure</span>
                  <span className="text-[#94A3B8]">Dedicated AI, Machine Learning, and High-Performance computing labs</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-white block">Active Association: CYPHER</span>
                  <span className="text-[#94A3B8]">Student-driven peer mentoring, workshops, and tech fests</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <span>Pampady, Thiruvilwamala</span>
            <span className="text-[#FF2E54]">Thrissur, Kerala</span>
          </div>
        </div>

        {/* Right Column: Message from Head of Department */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-white/10 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2E54]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-[#FF2E54]" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  HOD&apos;s Desk • Welcome Address
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#94A3B8]">
                Department Leadership
              </span>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              <p>
                &ldquo;Welcome to the Department of Artificial Intelligence and Machine Learning at Nehru College of Engineering and Research Centre (NCERC). We live in an era where AI is rapidly reshaping scientific discovery, industrial engineering, and everyday life.&rdquo;
              </p>
              <p>
                &ldquo;Our curriculum bridges rigorous theoretical fundamentals with extensive hands-on laboratory experience. Through our dynamic student association, <strong>CYPHER</strong>, we empower students to organize hackathons, master emerging technologies, and build impactful software solutions.&rdquo;
              </p>
              <p className="text-white font-medium">
                &ldquo;We invite you to explore our department, collaborate with our bright student minds, and be part of our journey towards technological innovation.&rdquo;
              </p>
            </div>
          </div>

          {/* Signature / HOD Details */}
          <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
            <div>
              <h4 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-white">
                Head of Department
              </h4>
              <p className="text-xs text-[#FF2E54] font-medium">
                Department of Artificial Intelligence &amp; Machine Learning
              </p>
              <p className="text-[11px] text-[#94A3B8]">
                Nehru College of Engineering and Research Centre (NCERC)
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono text-[#94A3B8] block">
                Office: Main Academic Block
              </span>
              <span className="text-[11px] font-mono text-[#FF2E54]">
                hodaiml@ncerc.ac.in
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
