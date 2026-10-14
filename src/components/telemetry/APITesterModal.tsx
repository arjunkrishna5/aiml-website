"use client";

import { useState } from "react";
import {
  Database,
  Terminal,
  Activity,
  X,
  Play,
  Copy,
  Check,
  RefreshCw,
  Server,
  Sparkles,
} from "lucide-react";

const ENDPOINTS = [
  { name: "System Status", method: "GET", url: "/api/status" },
  { name: "Faculty Roster", method: "GET", url: "/api/faculty" },
  { name: "Research Papers", method: "GET", url: "/api/research" },
  { name: "Events Calendar", method: "GET", url: "/api/events" },
  { name: "Student Projects", method: "GET", url: "/api/projects" },
  { name: "Seed Database", method: "POST", url: "/api/seed" },
];

export function APITesterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [responseJson, setResponseJson] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [httpStatus, setHttpStatus] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const runRequest = async (endpoint = selectedEndpoint) => {
    setLoading(true);
    setResponseJson(null);
    setHttpStatus(null);

    const start = performance.now();
    try {
      const res = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: { "Content-Type": "application/json" },
      });
      const end = performance.now();
      const data = await res.json();

      setLatency(Math.round(end - start));
      setHttpStatus(res.status);
      setResponseJson(data);
    } catch (err: unknown) {
      const end = performance.now();
      setLatency(Math.round(end - start));
      setHttpStatus(500);
      const errMsg = err instanceof Error ? err.message : "Request failed";
      setResponseJson({ error: errMsg });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (responseJson) {
      navigator.clipboard.writeText(JSON.stringify(responseJson, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Floating Bottom Console Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => {
            setIsOpen(true);
            if (!responseJson) runRequest(selectedEndpoint);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-semibold bg-[#07080A]/90 hover:bg-[#0E1117] text-white border border-[#00F0FF]/30 hover:border-[#00F0FF]/60 shadow-[0_4px_25px_rgba(0,240,255,0.2)] transition-all duration-300 group backdrop-blur-xl"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Server className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>API Telemetry Console</span>
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-white flex items-center gap-2">
                    Full-Stack API &amp; Data Layer Console
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Phase 5 Active
                    </span>
                  </h3>
                  <p className="text-xs text-[#8B949E]">
                    Next.js Server Actions &amp; REST Route Handlers with Hybrid Fail-Safe Database Engine.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#8B949E] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Endpoints Selector Tabs */}
            <div className="py-4 flex flex-wrap gap-2 border-b border-white/5">
              {ENDPOINTS.map((ep) => {
                const isSelected = selectedEndpoint.url === ep.url;
                return (
                  <button
                    key={ep.url}
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      runRequest(ep);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      isSelected
                        ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                        : "bg-white/5 text-[#8B949E] hover:text-white border border-white/5"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-[#8B5CF6]">
                      {ep.method}
                    </span>
                    <span>{ep.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Request Bar & Metrics */}
            <div className="py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2 py-1 rounded bg-[#8B5CF6]/20 text-[#A78BFA] font-bold">
                  {selectedEndpoint.method}
                </span>
                <span className="text-white/80">{selectedEndpoint.url}</span>
              </div>

              <div className="flex items-center gap-3">
                {latency !== null && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    {latency}ms
                  </span>
                )}
                {httpStatus !== null && (
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded ${
                      httpStatus === 200 || httpStatus === 201
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    HTTP {httpStatus}
                  </span>
                )}
                <button
                  onClick={() => runRequest()}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-black disabled:opacity-50 transition-all font-medium"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                  />
                  <span>Send</span>
                </button>
              </div>
            </div>

            {/* JSON Response Terminal Body */}
            <div className="relative">
              <div className="flex items-center justify-between pb-2 text-[11px] font-mono text-[#8B949E]">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                  Live JSON Response:
                </span>
                {responseJson && (
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <pre className="p-4 rounded-2xl bg-[#07080A]/95 border border-white/5 font-mono text-xs text-[#00F0FF] max-h-72 overflow-y-auto leading-relaxed shadow-inner">
                {loading
                  ? "Awaiting response from backend Route Handler..."
                  : responseJson
                  ? JSON.stringify(responseJson, null, 2)
                  : "Click 'Send' to test endpoint."}
              </pre>
            </div>

            {/* Footer Notice */}
            <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8B949E]">
              <span>
                Backend Mode:{" "}
                <span className="text-emerald-400 font-mono font-medium">
                  Zero-Downtime Hybrid Fallback
                </span>
              </span>
              <span>Deployable on Vercel / Node.js Server</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
