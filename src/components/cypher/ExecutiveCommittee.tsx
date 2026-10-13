"use client";

import { Users, UserCheck, Shield } from "lucide-react";

const COMMITTEE_MEMBERS = [
  {
    role: "Faculty Mentor",
    name: "Dr. Bobby Mathews",
    designation: "Head of Department, AI & ML",
    badge: "HOD & Mentor",
    isLeader: true,
  },
  {
    role: "Staff Coordinator",
    name: "Prof. Rahul M",
    designation: "Assistant Professor, Dept of AI & ML",
    badge: "Faculty In-Charge",
    isLeader: true,
  },
  {
    role: "Student President",
    name: "Arjun Krishna",
    designation: "Department Association President",
    badge: "Student Head",
    isLeader: false,
  },
  {
    role: "Vice President",
    name: "Sneha P",
    designation: "Executive Vice President",
    badge: "Student Lead",
    isLeader: false,
  },
  {
    role: "General Secretary",
    name: "Muhammed Nihal",
    designation: "Operations & Secretarial Lead",
    badge: "Operations",
    isLeader: false,
  },
  {
    role: "Joint Secretary",
    name: "Ananya Nair",
    designation: "Academic & Event Coordination",
    badge: "Coordination",
    isLeader: false,
  },
  {
    role: "Technical Head",
    name: "Adithyan S",
    designation: "Hackathons & Coding Sprints Lead",
    badge: "Technical Head",
    isLeader: false,
  },
  {
    role: "Media & Design Lead",
    name: "Devika R",
    designation: "Creative Design & Public Relations",
    badge: "Creative & Media",
    isLeader: false,
  },
];

export function ExecutiveCommittee() {
  return (
    <section id="committee" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Header matching AIDA JECC */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#DC2626] uppercase block mb-2">
            • CYPHER LEADERSHIP
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Executive Committee 2026–27
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-xs sm:text-sm text-slate-400 max-w-md">
          The student office bearers and faculty coordinators steering CYPHER activities, workshops, and student mentorship at NCERC.
        </p>
      </div>

      {/* Grid of Committee Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {COMMITTEE_MEMBERS.map((member, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${
              member.isLeader
                ? "bg-[#10121A] border border-[#DC2626]/40 shadow-[0_0_20px_rgba(220,38,38,0.1)]"
                : "bg-[#10121A] border border-white/10 hover:border-white/20"
            }`}
          >
            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold ${
                    member.isLeader
                      ? "bg-[#DC2626]/20 text-[#DC2626] border border-[#DC2626]/40"
                      : "bg-white/5 text-slate-300 border border-white/10"
                  }`}
                >
                  {member.badge}
                </span>

                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Role & Name */}
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                {member.role}
              </span>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {member.designation}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Dept of AI &amp; ML</span>
              <span className="text-white/60">NCERC</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
