import Link from "next/link";
import { ExternalLink, Bot, Eye, FileText, Cpu, ArrowUpRight, Sparkles } from "lucide-react";

const PLATFORMS = [
  {
    id: "neurocampus",
    title: "NeuroCampus: Multimodal Academic Copilot",
    tagline: "Fine-tuned LLaMA 3.3 model trained on department syllabus, research notes, and live campus schedules.",
    icon: Bot,
    category: "LLMs & Agentic Systems",
    status: "Production",
    statusColor: "emerald",
    accentColor: "#00F0FF",
    stats: "2,400+ Active Students",
    techStack: ["vLLM", "Next.js", "FastAPI", "VectorDB"],
    githubUrl: "#",
    liveUrl: "#",
    isLarge: true,
  },
  {
    id: "visioneye",
    title: "VisionEye Edge Tracker",
    tagline: "Real-time edge computer vision model monitoring GPU cluster occupancy and lab workstation availability.",
    icon: Eye,
    category: "Edge Computer Vision",
    status: "Live Beta",
    statusColor: "cyan",
    accentColor: "#00F0FF",
    stats: "98.4% Accuracy",
    techStack: ["YOLOv11", "TensorRT", "Jetson Orin"],
    githubUrl: "#",
    liveUrl: "#",
    isLarge: false,
  },
  {
    id: "paperpulse",
    title: "PaperPulse Research Hub",
    tagline: "Automated arXiv and IEEE ingestion pipeline tracking department research citations, h-index, and author metrics.",
    icon: FileText,
    category: "Academic Analytics",
    status: "Production",
    statusColor: "violet",
    accentColor: "#8B5CF6",
    stats: "65+ Indexed Papers",
    techStack: ["Python", "OpenAlex API", "PostgreSQL"],
    githubUrl: "#",
    liveUrl: "#",
    isLarge: false,
  },
  {
    id: "simrl-quad",
    title: "SimRL: Autonomous Robotics Sandbox",
    tagline: "Reinforcement learning environment for quadruped robot locomotion, obstacle avoidance, and Sim-to-Real hardware transfer.",
    icon: Cpu,
    category: "Robotics & RL",
    status: "Hardware Lab",
    statusColor: "amber",
    accentColor: "#EC4899",
    stats: "ROS 2 Verified",
    techStack: ["Isaac Sim", "PyTorch", "ROS 2", "CUDA"],
    githubUrl: "#",
    liveUrl: "#",
    isLarge: true,
  },
];

export function PlatformsBento() {
  return (
    <section id="platforms" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Student Engineering &amp; Innovation
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Digital Platforms &amp; Software Tools
          </h2>
        </div>
        <p className="mt-3 md:mt-0 text-sm text-[#8B949E] max-w-md">
          Real tools and platforms designed, trained, and maintained by AIML students, research fellows, and departmental labs.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon;
          return (
            <div
              key={platform.id}
              className={`glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${
                platform.isLarge ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              {/* Subtle top border glow on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: platform.accentColor }}
              />

              {/* Ambient radial blur inside card */}
              <div
                className="absolute top-0 right-0 w-64 h-64 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: platform.accentColor }}
              />

              <div>
                {/* Top Row: Category & Status Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${platform.accentColor}15`,
                        border: `1px solid ${platform.accentColor}30`,
                        color: platform.accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8B949E]">
                      {platform.category}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-white/90">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: platform.accentColor }}
                    />
                    {platform.status}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-[family-name:var(--font-outfit)] text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {platform.title}
                </h3>
                <p className="text-sm text-[#8B949E] leading-relaxed mb-6">
                  {platform.tagline}
                </p>
              </div>

              {/* Bottom Row: Tech Stack Tags & Action Links */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {platform.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-[#8B949E] border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a
                    href={platform.githubUrl}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8B949E] hover:text-white border border-white/10 transition-colors"
                    aria-label="View source code on GitHub"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <Link
                    href={`/projects/${platform.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
                  >
                    <span>Launch Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#00F0FF]" />
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
