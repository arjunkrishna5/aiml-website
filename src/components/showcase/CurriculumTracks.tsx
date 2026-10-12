"use client";

import { useState } from "react";
import { BookOpen, Brain, Eye, Terminal, Cpu, CheckCircle2, ChevronRight, Award } from "lucide-react";

const TRACKS = [
  {
    id: "foundations",
    title: "Foundations & Mathematical Rigor",
    short: "Math & Foundations",
    icon: Brain,
    description: "The mathematical backbone required to construct, analyze, and mathematically prove machine learning architectures.",
    modules: [
      "Multivariate Calculus & Matrix Decompositions",
      "Stochastic Optimization & Gradient Descent Dynamics",
      "Information Theory & Bayesian Inference",
      "Data Structures & Algorithmic Complexity (C++ & Python)",
    ],
    capstone: "Custom Autograd Engine from Scratch (Micrograd-style engine)",
    stack: ["NumPy", "SymPy", "C++20", "LaTeX"],
  },
  {
    id: "vision",
    title: "Computer Vision & Spatial Intelligence",
    short: "Computer Vision",
    icon: Eye,
    description: "From pixel arrays to real-time spatial cognition, semantic segmentation, and hardware-accelerated edge inference.",
    modules: [
      "Convolutional Architectures & Vision Transformers (ViTs)",
      "Real-Time Object Detection & Tracking (YOLO & SAM)",
      "3D Gaussian Splatting & Neural Radiance Fields (NeRFs)",
      "Hardware Acceleration & Quantization with TensorRT",
    ],
    capstone: "Autonomous Drone Navigation with Real-Time Obstacle Avoidance",
    stack: ["OpenCV", "PyTorch", "TensorRT", "Jetson Orin"],
  },
  {
    id: "nlp",
    title: "Natural Language Processing & Generative Agents",
    short: "NLP & GenAI",
    icon: Terminal,
    description: "Architecting context-aware reasoning engines, parameter-efficient fine-tuning, and multi-agent orchestrations.",
    modules: [
      "Transformer Mechanism & Multi-Head Self-Attention",
      "Parameter-Efficient Fine-Tuning (LoRA, QLoRA, Prefix Tuning)",
      "Retrieval-Augmented Generation (RAG) & Vector Databases",
      "Agentic Reasoning Frameworks & Tool-Calling Graphs",
    ],
    capstone: "Self-Reflective Multi-Agent Research Paper Synthesizer",
    stack: ["HuggingFace", "LangGraph", "vLLM", "Qdrant"],
  },
  {
    id: "mlops",
    title: "Robotics, Autonomous Systems & MLOps",
    short: "Robotics & MLOps",
    icon: Cpu,
    description: "Deploying high-throughput models to production pipelines, continuous retraining, and physical robotics control.",
    modules: [
      "Reinforcement Learning (PPO, SAC) in Simulation Environments",
      "Robot Operating System 2 (ROS 2) & Isaac Sim",
      "Containerization & Distributed Training (Docker, Kubernetes)",
      "CI/CD Pipelines for ML, Model Registry & Drift Monitoring",
    ],
    capstone: "Sim-to-Real Quadruped Robot Balance and Navigation Policy",
    stack: ["ROS 2", "Isaac Sim", "Docker", "MLflow"],
  },
];

export function CurriculumTracks() {
  const [activeTab, setActiveTab] = useState(TRACKS[0].id);

  const currentTrack = TRACKS.find((t) => t.id === activeTab) || TRACKS[0];
  const Icon = currentTrack.icon;

  return (
    <section id="academics" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum Architecture
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialization Pathways
          </h2>
        </div>
        <p className="mt-3 md:mt-0 text-sm text-[#8B949E] max-w-md">
          A four-tier progressive specialization roadmap engineered for industry-readiness and academic research excellence.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {TRACKS.map((track) => {
          const TabIcon = track.icon;
          const isActive = track.id === activeTab;
          return (
            <button
              key={track.id}
              onClick={() => setActiveTab(track.id)}
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#00F0FF]/20 via-[#8B5CF6]/20 to-transparent border border-[#00F0FF]/40 text-white shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                  : "bg-white/[0.02] border border-white/5 text-[#8B949E] hover:text-white hover:bg-white/5"
              }`}
            >
              <TabIcon
                className={`w-4 h-4 ${
                  isActive ? "text-[#00F0FF]" : "text-[#8B949E]"
                }`}
              />
              <span>{track.short}</span>
            </button>
          );
        })}
      </div>

      {/* Active Track Showcase Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[#00F0FF] tracking-wider">
                  Specialization Track
                </span>
                <h3 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-bold text-white">
                  {currentTrack.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed">
              {currentTrack.description}
            </p>

            {/* Core Modules List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/80">
                Core Course Modules &amp; Lab Practicalities:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentTrack.modules.map((mod, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-white/90 leading-tight">
                      {mod}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Capstone & Stack */}
          <div className="lg:col-span-5 space-y-6 p-6 rounded-2xl bg-[#07080A]/80 border border-white/5">
            
            {/* Capstone Project Box */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#8B5CF6] mb-2">
                <Award className="w-4 h-4 text-[#8B5CF6]" />
                Target Capstone Project:
              </div>
              <p className="text-sm font-medium text-white p-3 rounded-xl bg-white/[0.03] border border-white/5 leading-relaxed">
                {currentTrack.capstone}
              </p>
            </div>

            {/* Industry Stack Tags */}
            <div>
              <div className="text-xs font-mono uppercase text-[#8B949E] mb-2">
                Tooling &amp; Industry Alignment:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentTrack.stack.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 text-[#00F0FF] border border-[#00F0FF]/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-between w-full p-3.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
              >
                <span>Download Detailed Syllabus PDF</span>
                <ChevronRight className="w-4 h-4 text-[#00F0FF]" />
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
