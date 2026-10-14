"use client";

import { useState, useEffect, useCallback, useTransition, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Copy,
  Check,
  ChevronLeft,
  RefreshCw,
  Printer,
  Lock,
} from "lucide-react";
import { generateQRCodeDataUrl } from "@/lib/qrCode";
import { CertificateRecord } from "@/data/certificateData";

interface VerifiedResponse {
  success: boolean;
  verified: boolean;
  certificate?: CertificateRecord;
  message?: string;
}

function VerifyPortalContent() {
  const searchParams = useSearchParams();
  const codeParam = searchParams.get("code") || "";

  const [searchCode, setSearchCode] = useState(codeParam);
  const [result, setResult] = useState<VerifiedResponse | null>(null);
  const [isSearching, startSearchTransition] = useTransition();
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const certificateCardRef = useRef<HTMLDivElement>(null);

  const handleVerify = useCallback(async (codeToVerify?: string) => {
    const code = (codeToVerify !== undefined ? codeToVerify : searchCode).trim();
    if (!code) return;

    startSearchTransition(async () => {
      try {
        const res = await fetch(`/api/certificates?code=${encodeURIComponent(code)}`);
        const data: VerifiedResponse = await res.json();
        setResult(data);

        if (data.verified && data.certificate) {
          const origin = typeof window !== "undefined" ? window.location.origin : "";
          const verifyUrl = `${origin}/verify?code=${encodeURIComponent(data.certificate.certificateId)}`;
          const qr = await generateQRCodeDataUrl(verifyUrl, {
            width: 240,
            darkColor: "#050505",
            lightColor: "#FFFFFF",
          });
          setQrDataUrl(qr);
        } else {
          setQrDataUrl("");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setResult({
          success: false,
          verified: false,
          message: "Network error occurred while verifying credential.",
        });
      }
    });
  }, [searchCode]);

  // Auto-verify when URL contains ?code=...
  useEffect(() => {
    if (codeParam) {
      handleVerify(codeParam);
    }
  }, [codeParam, handleVerify]);

  const copyToClipboard = (text: string, type: "code" | "link") => {
    navigator.clipboard.writeText(text);
    if (type === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F0F6FC] py-12 px-4 sm:px-6 lg:px-8">
      {/* Atmosphere Grids */}
      <div className="fixed inset-0 bg-dark-dot-grid opacity-30 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-2"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Department Home</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>Certificate Authenticity Verification</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                OFFICIAL PORTAL
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Public verification service for certificates, awards, and credentials issued by CYPHER, Department of Artificial Intelligence &amp; Machine Learning, NCERC.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-400 hover:text-white border border-white/10 transition-colors"
            >
              <Lock className="w-3 h-3 text-red-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#10121A]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          <h2 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-red-500" />
            <span>Enter Unique Certificate Code</span>
          </h2>
          <p className="text-xs text-slate-400 mb-5">
            Enter the exact unique identifier printed on your certificate or encoded in your QR badge.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                placeholder="e.g. CYPHER-2026-WIN-001"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#090A0F] border border-white/15 text-white placeholder-slate-500 text-sm font-mono tracking-wider focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              {searchCode && (
                <button
                  onClick={() => {
                    setSearchCode("");
                    setResult(null);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-slate-300"
                >
                  CLEAR
                </button>
              )}
            </div>

            <button
              onClick={() => handleVerify()}
              disabled={isSearching || !searchCode.trim()}
              className="px-7 py-3.5 rounded-2xl bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Verification Chips */}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-mono text-[11px] text-slate-500">Test authentic credentials:</span>
            {[
              "CYPHER-2026-WIN-001",
              "CYPHER-2026-MERIT-042",
              "CYPHER-2026-DEMO-777",
            ].map((demo) => (
              <button
                key={demo}
                onClick={() => {
                  setSearchCode(demo);
                  handleVerify(demo);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-red-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
              >
                {demo}
              </button>
            ))}

            <button
              onClick={() => {
                const fake = "CYPHER-FAKE-999";
                setSearchCode(fake);
                handleVerify(fake);
              }}
              className="px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-[11px] font-mono text-zinc-400 hover:text-red-300 border border-red-900/40 transition-colors cursor-pointer ml-auto"
              title="Test counterfeit / unverified behavior"
            >
              Test Invalid Code
            </button>
          </div>
        </div>

        {/* Searching / Loading State */}
        {isSearching && (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#10121A]/90 border border-white/10 shadow-2xl backdrop-blur-xl text-center space-y-4 animate-pulse">
            <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500">
              <RefreshCw className="w-7 h-7 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Verifying Certificate Authenticity...</h3>
              <p className="text-xs text-slate-400 font-mono">
                Checking CYPHER registry records for code:{" "}
                <span className="text-red-400 font-bold">{searchCode}</span>
              </p>
            </div>
          </div>
        )}

        {/* Verification Result Display */}
        {result && !isSearching && (
          <div className="transition-all duration-300">
            {result.verified && result.certificate ? (
              /* REAL / AUTHENTIC CREDENTIAL */
              <div
                ref={certificateCardRef}
                className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#12141F] via-[#0C0D14] to-[#08090E] border-2 border-emerald-500/50 shadow-[0_0_60px_rgba(16,185,129,0.18)] overflow-hidden"
              >
                {/* Verified Header Ribbon */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        AUTHENTIC CERTIFICATE VERIFIED
                      </div>
                      <h3 className="text-sm font-semibold text-white mt-1">
                        Officially Issued by Department of AIML, NCERC
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintCertificate}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Proof</span>
                    </button>

                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${window.location.origin}/verify?code=${result.certificate?.certificateId}`,
                          "link"
                        )
                      }
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-xs font-medium text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 items-center">
                  <div className="md:col-span-8 space-y-5">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                        Verified Recipient
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white mt-1">
                        {result.certificate.name}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block">
                          Event / Program
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white mt-0.5 block">
                          {result.certificate.event}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block">
                          Award / Role
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-emerald-400 mt-0.5 block">
                          {result.certificate.role || "Certificate of Achievement"}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block">
                          Date of Issuance
                        </span>
                        <span className="text-xs sm:text-sm font-mono text-slate-200 mt-0.5 block">
                          {result.certificate.date}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block">
                          Issuing Authority
                        </span>
                        <span className="text-xs sm:text-sm text-slate-200 mt-0.5 block">
                          {result.certificate.issuer || "CYPHER — NCERC AIML"}
                        </span>
                      </div>
                    </div>

                    {/* Unique ID Display */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="px-3.5 py-2 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">UNIQUE ID:</span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                          {result.certificate.certificateId}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(result.certificate?.certificateId || "", "code")
                        }
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Copy Certificate ID"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10">
                    {qrDataUrl ? (
                      <div className="space-y-3 text-center">
                        <div className="p-2.5 bg-white rounded-2xl inline-block shadow-xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={qrDataUrl}
                            alt="Certificate QR Code"
                            className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Official Verification QR
                        </span>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-slate-500 text-xs font-mono">
                        Generating QR Code...
                      </div>
                    )}
                  </div>
                </div>

                {/* Guarantee Footer */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
                  <span>
                    Nehru College of Engineering and Research Centre (NCERC) • KTU Affiliated
                  </span>
                  <span className="font-mono text-emerald-400/90">
                    Official CYPHER Academic Record
                  </span>
                </div>
              </div>
            ) : (
              /* FAKE / UNVERIFIED CREDENTIAL */
              <div className="p-6 sm:p-8 rounded-3xl bg-red-950/40 border-2 border-red-500/50 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                      UNVERIFIED / INVALID CREDENTIAL
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Certificate Not Found in Department Records
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                      The unique code <span className="font-mono text-red-400 font-bold bg-black/40 px-1.5 py-0.5 rounded">{searchCode}</span> is not registered in our database. This certificate may be counterfeit, invalid, or altered.
                    </p>
                    <div className="pt-3 text-xs text-slate-400 flex flex-wrap items-center gap-4">
                      <span>
                        If you believe this is an error, please contact{" "}
                        <a href="mailto:cypher.aiml@ncerc.ac.in" className="text-red-400 underline">
                          cypher.aiml@ncerc.ac.in
                        </a>.
                      </span>

                      <button
                        onClick={() => {
                          setSearchCode("");
                          setResult(null);
                        }}
                        className="text-white hover:text-red-400 underline cursor-pointer ml-auto"
                      >
                        Try Another Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function CertificateVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07080A] flex items-center justify-center text-slate-400 text-xs font-mono">
          Loading Certificate Portal...
        </div>
      }
    >
      <VerifyPortalContent />
    </Suspense>
  );
}
