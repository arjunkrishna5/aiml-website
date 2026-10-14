import { Cpu, MapPin, Mail, Phone, ExternalLink, Shield } from "lucide-react";
import Link from "next/link";

export function NCERCFooter() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/5 py-16 bg-[#07080A]/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Institutional Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF2E54]/20 border border-[#FF2E54]/40 flex items-center justify-center text-[#FF2E54]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="font-[family-name:var(--font-outfit)] font-black text-xl text-white tracking-wider flex items-center gap-2">
                  CYPHER <span className="text-xs px-2 py-0.5 rounded bg-[#FF2E54]/15 text-[#FF2E54] border border-[#FF2E54]/30 font-mono">AIML</span>
                </span>
                <span className="text-[11px] text-[#94A3B8] block">
                  Nehru College of Engineering and Research Centre
                </span>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Official portal of CYPHER, the Association of the Department of Artificial Intelligence &amp; Machine Learning, NCERC. Dedicated to technical excellence, peer learning, and innovation.
            </p>

            <div className="pt-2 text-xs text-[#94A3B8] space-y-1">
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-3.5 h-3.5 text-[#FF2E54]" />
                <span>Affiliated to APJ Abdul Kalam Technological University (KTU)</span>
              </div>
              <div className="text-[11px] text-[#94A3B8] pl-5.5">
                Approved by AICTE, New Delhi • Accredited by NAAC
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Department Portal
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-[#94A3B8]">
              <Link href="/#about" className="hover:text-white transition-colors">
                About Department &amp; HOD Desk
              </Link>
              <Link href="/#vision" className="hover:text-white transition-colors">
                Vision &amp; Mission Statements
              </Link>
              <Link href="/#events" className="hover:text-white transition-colors">
                Flagship Events &amp; Hackathons
              </Link>
              <Link href="/#projects" className="hover:text-white transition-colors">
                Academic AI Projects
              </Link>
              <Link href="/faculty" className="hover:text-white transition-colors">
                Faculty Directory
              </Link>
              <Link href="/research" className="hover:text-white transition-colors">
                Research Publications
              </Link>
              <Link href="/verify" className="hover:text-white transition-colors text-emerald-400">
                Certificate Verification Portal
              </Link>
              <Link href="/#committee" className="hover:text-white transition-colors">
                Executive Committee
              </Link>
            </div>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Campus Contact
            </h4>
            
            <div className="space-y-2.5 text-xs text-[#94A3B8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF2E54] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Nehru College of Engineering and Research Centre (NCERC),<br />
                  Pampady, Thiruvilwamala, Thrissur Dt., Kerala – 679588
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span className="font-mono text-[11px] text-white/90">
                  cypher.aiml@ncerc.ac.in
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <a
                  href="https://ncerc.ac.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/80 hover:text-[#00F0FF] transition-colors underline"
                >
                  Official College Website (ncerc.ac.in)
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>
            © 2026 Department of Artificial Intelligence &amp; Machine Learning, NCERC. All rights reserved.
          </p>

          <p className="font-mono text-[11px] text-[#FF2E54]">
            Engineered by CYPHER Student Technical Team
          </p>
        </div>

      </div>
    </footer>
  );
}
