import { Cpu, Award, BookOpen, Rocket } from "lucide-react";

const STATS = [
  {
    icon: Cpu,
    value: "4.8+",
    unit: "TFLOPs",
    label: "Neural GPU Compute",
    description: "High-throughput workstations & edge clusters",
    color: "#00F0FF",
  },
  {
    icon: Award,
    value: "96.4%",
    unit: "Rate",
    label: "Placement & Research",
    description: "Top-tier AI labs, FAANG & deep tech startups",
    color: "#8B5CF6",
  },
  {
    icon: BookOpen,
    value: "65+",
    unit: "Papers",
    label: "Publications & Patents",
    description: "Peer-reviewed IEEE, Scopus & Springer citations",
    color: "#10B981",
  },
  {
    icon: Rocket,
    value: "18+",
    unit: "Products",
    label: "Student Digital Platforms",
    description: "Active web platforms, SDKs & open-source tools",
    color: "#EC4899",
  },
];

export function StatsTicker() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Subtle accent line on top of each card */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: stat.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                    color: stat.color,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-[#8B949E] border border-white/5">
                  KPI Matrix
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>
                <span
                  className="text-xs font-mono font-semibold"
                  style={{ color: stat.color }}
                >
                  {stat.unit}
                </span>
              </div>

              <div className="text-sm font-semibold text-white mb-1 tracking-tight">
                {stat.label}
              </div>

              <p className="text-xs text-[#8B949E] leading-relaxed">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
