"use client";

import { useState, useMemo } from "react";
import { Terminal, Sparkles, Cpu, Layers, Activity, RefreshCw } from "lucide-react";

// Color palette for alternating tokens
const TOKEN_COLORS = [
  { bg: "rgba(0, 240, 255, 0.15)", textColor: "#00F0FF", border: "rgba(0, 240, 255, 0.3)" },
  { bg: "rgba(139, 92, 246, 0.15)", textColor: "#A78BFA", border: "rgba(139, 92, 246, 0.3)" },
  { bg: "rgba(236, 72, 153, 0.15)", textColor: "#F472B6", border: "rgba(236, 72, 153, 0.3)" },
  { bg: "rgba(16, 185, 129, 0.15)", textColor: "#34D399", border: "rgba(16, 185, 129, 0.3)" },
  { bg: "rgba(245, 158, 11, 0.15)", textColor: "#FBBF24", border: "rgba(245, 158, 11, 0.3)" },
  { bg: "rgba(59, 130, 246, 0.15)", textColor: "#60A5FA", border: "rgba(59, 130, 246, 0.3)" },
];

const PRESET_PROMPTS = [
  "Transformers utilize self-attention mechanisms to learn latent representations across sequences.",
  "Convolutional neural networks extract hierarchical spatial features for real-time edge vision.",
  "Autonomous agents synthesize goal-oriented plans via tree-of-thought heuristic reasoning.",
];

export function AISandboxWidget() {
  const [inputText, setInputText] = useState(PRESET_PROMPTS[0]);

  // Generate simulated deterministic tokens & IDs from input text
  const tokens = useMemo(() => {
    if (!inputText.trim()) return [];
    
    // Split on words and punctuation (BPE approximation)
    const regex = /\w+|[^\w\s]|\s+/g;
    const matches = inputText.match(regex) || [];

    return matches.map((chunk, idx) => {
      // Deterministic hash for token ID
      let hash = 0;
      for (let i = 0; i < chunk.length; i++) {
        hash = (hash * 31 + chunk.charCodeAt(i)) % 99999;
      }
      const tokenId = Math.abs(hash) + 1000;
      const scheme = TOKEN_COLORS[idx % TOKEN_COLORS.length];

      return {
        chunk,
        id: tokenId,
        isSpace: /^\s+$/.test(chunk),
        bg: scheme.bg,
        textColor: scheme.textColor,
        border: scheme.border,
      };
    });
  }, [inputText]);

  const charCount = inputText.length;
  const tokenCount = tokens.filter((t) => !t.isSpace).length;
  const compressionRatio = tokenCount > 0 ? (charCount / tokenCount).toFixed(2) : "0.00";

  // Simulated vector embedding preview (first 8 dimensions)
  const embeddingVector = useMemo(() => {
    if (!inputText) return Array(8).fill(0);
    return Array.from({ length: 8 }, (_, i) => {
      const val = Math.sin((inputText.length + 1) * (i + 1) * 0.73);
      return Number(val.toFixed(3));
    });
  }, [inputText]);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-3">
            <Activity className="w-3.5 h-3.5" />
            Live Client-Side AI Playground
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive LLM Tokenizer &amp; Latent Inspector
          </h2>
        </div>
        <p className="mt-3 md:mt-0 text-sm text-[#8B949E] max-w-md">
          Experience real-time sub-word tokenization and embedding projection computed entirely in your browser with 0 latency.
        </p>
      </div>

      {/* Main Sandbox Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        
        {/* Preset Prompt Selectors */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono text-[#8B949E] mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            Presets:
          </span>
          {PRESET_PROMPTS.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInputText(prompt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                inputText === prompt
                  ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30"
                  : "bg-white/5 text-[#8B949E] hover:text-white border border-white/5 hover:border-white/10"
              }`}
            >
              Prompt {index + 1}
            </button>
          ))}
        </div>

        {/* Text Input Area */}
        <div className="relative mb-8">
          <label className="block text-xs font-mono uppercase text-[#8B949E] mb-2">
            Input Sequence / Prompt:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="w-full bg-[#07080A]/90 text-white font-mono text-sm sm:text-base rounded-2xl p-4 sm:p-5 border border-white/10 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/50 transition-all resize-none shadow-inner"
            placeholder="Type any prompt or technical sentence here to see live BPE tokenization..."
          />
        </div>

        {/* Real-time Token Stream Visualizer */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-[#8B949E] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              Tokenized Sub-Word Stream:
            </span>
            <span className="text-[11px] font-mono text-[#8B949E]">
              Hover chip for Token ID
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#07080A]/80 border border-white/5 min-h-[110px] flex flex-wrap items-center gap-1.5 leading-relaxed font-mono text-sm sm:text-base">
            {tokens.length === 0 ? (
              <span className="text-[#8B949E] italic text-sm">
                No tokens generated. Type something above to inspect...
              </span>
            ) : (
              tokens.map((token, idx) =>
                token.isSpace ? (
                  <span key={idx} className="w-2" />
                ) : (
                  <span
                    key={idx}
                    className="group relative px-2.5 py-1 rounded-lg border text-xs sm:text-sm transition-transform hover:scale-105 cursor-help"
                    style={{
                      backgroundColor: token.bg,
                      color: token.textColor,
                      borderColor: token.border,
                    }}
                  >
                    {token.chunk}
                    {/* Hover Tooltip with Token ID */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#07080A] text-white border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-20">
                      ID: #{token.id}
                    </span>
                  </span>
                )
              )
            )}
          </div>
        </div>

        {/* Real-Time Telemetry & Vector Embedding Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
          
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] font-mono uppercase text-[#8B949E] block mb-1">
              Active Tokens
            </span>
            <span className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-[#00F0FF]">
              {tokenCount}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] font-mono uppercase text-[#8B949E] block mb-1">
              Characters
            </span>
            <span className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-[#8B5CF6]">
              {charCount}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] font-mono uppercase text-[#8B949E] block mb-1">
              Compression Ratio
            </span>
            <span className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-emerald-400">
              {compressionRatio} <span className="text-xs font-normal text-[#8B949E]">c/t</span>
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 sm:col-span-3 lg:col-span-1">
            <span className="text-[11px] font-mono uppercase text-[#8B949E] block mb-1 flex items-center justify-between">
              <span>Embedding Vector (d=768)</span>
              <span className="text-emerald-400 text-[10px]">Active</span>
            </span>
            <div className="flex items-center gap-1 overflow-x-auto pt-1 font-mono text-[10px] text-white/70">
              {embeddingVector.slice(0, 4).map((val, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5"
                >
                  {val > 0 ? `+${val}` : val}
                </span>
              ))}
              <span className="text-[#8B949E]">...</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
