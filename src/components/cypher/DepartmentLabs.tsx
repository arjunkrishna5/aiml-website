import { Cpu, Database, Lightbulb, Code2, Monitor, CheckCircle2 } from "lucide-react";

const LABS = [
  {
    title: "AI & Machine Learning Laboratory",
    tagline: "Dedicated to training and deploying neural network architectures, computer vision models, and natural language processing pipelines.",
    icon: Cpu,
    accentColor: "#FF2E54",
    features: [
      "High-spec workstations with high-memory GPUs",
      "Pre-configured environments: PyTorch, TensorFlow, OpenCV",
      "High-speed gigabit LAN connectivity",
    ],
  },
  {
    title: "Data Analytics & Database Laboratory",
    tagline: "Equipped for large-scale relational database management, data mining, business intelligence, and statistical computing.",
    icon: Database,
    accentColor: "#00F0FF",
    features: [
      "Modern relational and NoSQL database engines",
      "Tools: PostgreSQL, MongoDB, Pandas, Scikit-Learn",
      "Interactive data visualization software",
    ],
  },
  {
    title: "Project & Innovation Hub",
    tagline: "Creative incubator space for final year and pre-final year students to design, prototype, and build capstone engineering projects.",
    icon: Lightbulb,
    accentColor: "#8B5CF6",
    features: [
      "Collaborative student ideation and discussion zones",
      "Hardware prototyping kits & IoT sensor modules",
      "Dedicated repository testing and deployment rigs",
    ],
  },
  {
    title: "Advanced Programming & Computing Lab",
    tagline: "Core facility for data structures, algorithm design, competitive programming, and full-stack software development.",
    icon: Code2,
    accentColor: "#10B981",
    features: [
      "Modern development suites: C++, Python, Linux OS",
      "Automated coding and contest practice platforms",
      "Uninterrupted power supply with centralized server",
    ],
  },
];

export function DepartmentLabs() {
  return (
    <section id="labs" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20 mb-3">
            <Monitor className="w-3.5 h-3.5" />
            Academic Infrastructure
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Department Laboratories
          </h2>
        </div>
        <p className="mt-3 md:mt-0 text-sm text-[#94A3B8] max-w-md">
          Well-equipped academic computing facilities providing students with hands-on exposure to industry-standard tools and frameworks.
        </p>
      </div>

      {/* Grid of Labs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LABS.map((lab, idx) => {
          const Icon = lab.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/20 group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${lab.accentColor}15`,
                      border: `1px solid ${lab.accentColor}30`,
                      color: lab.accentColor,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white">
                      {lab.title}
                    </h3>
                    <span className="text-[11px] font-mono text-[#94A3B8]">
                      NCERC Academic Block
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {lab.tagline}
                </p>

                {/* Features */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  {lab.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: lab.accentColor }}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
