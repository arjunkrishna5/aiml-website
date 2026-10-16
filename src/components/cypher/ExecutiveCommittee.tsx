"use client";

import { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CommitteeMemberItem {
  name: string;
  role: string;
  designation: string;
  badge: string;
  isLeader: boolean;
}

const DEFAULT_MEMBERS: CommitteeMemberItem[] = [
  {
    role: "Faculty Mentor",
    name: "Dr. Anuja",
    designation: "Head of Department, AI & ML",
    badge: "HOD & Mentor",
    isLeader: true,
  },
  {
    role: "Staff Coordinator",
    name: "Mrs. Sreeji",
    designation: "Assistant Professor, Dept of AI & ML",
    badge: "Faculty In-Charge",
    isLeader: true,
  },
  {
    role: "Student President",
    name: "Member X",
    designation: "Department Association President",
    badge: "Student Head",
    isLeader: false,
  },
  {
    role: "Vice President",
    name: "Member Y",
    designation: "Executive Vice President",
    badge: "Student Lead",
    isLeader: false,
  },
  {
    role: "General Secretary",
    name: "Member Z",
    designation: "Operations & Secretarial Lead",
    badge: "Operations",
    isLeader: false,
  },
];

export function ExecutiveCommittee() {
  const [members, setMembers] = useState<CommitteeMemberItem[]>(DEFAULT_MEMBERS);

  useEffect(() => {
    // If Supabase committee_members table has rows, load them live!
    const fetchLiveCommittee = async () => {
      try {
        const { data, error } = await supabase
          .from("committee_members")
          .select("*")
          .order("display_order", { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped: CommitteeMemberItem[] = data.map((item) => ({
            name: item.name,
            role: item.role,
            designation: item.designation || "Dept of AI & ML",
            badge: item.badge || (item.is_faculty ? "Faculty In-Charge" : "Student Lead"),
            isLeader: Boolean(item.is_faculty),
          }));
          setMembers(mapped);
        }
      } catch (err) {
        console.warn("Using default committee list:", err);
      }
    };

    fetchLiveCommittee();
  }, []);

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
          The faculty mentors and student office bearers steering CYPHER activities, workshops, and community mentorship at NCERC.
        </p>
      </div>

      {/* Grid of Committee Members (5 Cards Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {members.map((member, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden min-h-[220px] ${
              member.isLeader
                ? "bg-[#10121A] border border-[#DC2626]/50 shadow-[0_0_24px_rgba(220,38,38,0.12)]"
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
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
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
