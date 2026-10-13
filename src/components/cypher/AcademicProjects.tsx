"use client";

import { ArrowUpRight, Code, User, Compass } from "lucide-react";

const PROJECTS = [
  {
    tag: "#2023–2027 • Main Project",
    title: "Aerial Holographic Teaching System using AR & AI",
    description:
      "An Augmented Reality and AI-assisted educational system delivering interactive 3D spatial models and real-time speech evaluation in smart classrooms.",
    tags: ["Python", "TensorFlow", "ARKit", "FastAPI"],
    leader: "Grace Maria Reji",
    guide: "Prof. Sajitha A S",
  },
  {
    tag: "#2023–2027 • Main Project",
    title: "NexTeX: Smart Academic Research & Writing Assistant",
    description:
      "A localized Large Language Model engine tailored for academic research, LaTeX document typesetting, citation verification, and scientific synthesis.",
    tags: ["PyTorch", "HuggingFace", "Next.js", "Docker"],
    leader: "Hiba Rebin K",
    guide: "Prof. Linta A T",
  },
  {
    tag: "#2023–2027 • Main Project",
    title: "Federated Healthcare Diagnostic System",
    description:
      "A privacy-preserving distributed deep learning framework for medical image analysis across multi-institutional hospital records with zero raw data sharing.",
    tags: ["Federated ML", "OpenCV", "Python", "AES-256"],
    leader: "Saniya Ashraf",
    guide: "Prof. Anjali O",
  },
];

export function AcademicProjects() {
  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Header matching AIDA JECC */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold tracking-widest text-[#DC2626] uppercase block mb-3">
          • INNOVATION &amp; ENGINEERING SHOWCASE
        </span>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal text-white leading-tight">
          Academic <span className="italic text-[#DC2626] font-serif">Projects</span> Showcase
        </h2>
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
          Featured academic capstones, neural models, and software engineering systems developed by CYPHER students at Nehru College of Engineering and Research Centre.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((proj, idx) => (
          <div
            key={idx}
            className="bg-[#10121A] rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Project Card Tag */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white/5 text-slate-300 border border-white/10">
                  {proj.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                {proj.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                {proj.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-400 border border-white/5"
                  >
                    &lt;&gt; {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Leader & Guide Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <div>
                <div className="text-white font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Leader: {proj.leader}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Guide: {proj.guide}
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white text-[11px] font-semibold border border-white/10 flex items-center gap-1 cursor-pointer">
                DETAILS <ArrowUpRight className="w-3 h-3 text-[#DC2626]" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
