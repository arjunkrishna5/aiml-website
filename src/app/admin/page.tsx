"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  ShieldAlert,
  ArrowUpRight,
  RefreshCw,
  LogOut,
  Download,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { generateQRCodeDataUrl } from "@/lib/qrCode";
import { CertificateRecord } from "@/data/certificateData";
import { DepartmentEvent } from "@/data/departmentData";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"events" | "certificates" | "registry">("events");

  // Check auth status on mount
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data.authenticated);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setAuthError(data.error || "Invalid administrator passcode.");
      }
    } catch {
      setAuthError("Unable to connect to authentication service.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  // ==========================================
  // EVENT MANAGEMENT STATE & HANDLERS
  // ==========================================
  const [eventsList, setEventsList] = useState<DepartmentEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventSuccessMsg, setEventSuccessMsg] = useState("");
  const [certificatesList, setCertificatesList] = useState<CertificateRecord[]>([]);

  const [newTitle, setNewTitle] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [newStatus, setNewStatus] = useState<"upcoming" | "past">("upcoming");
  const [newCategory, setNewCategory] = useState<"Hackathon" | "Workshop" | "Symposium" | "Guest Lecture">("Hackathon");
  const [newVenue, setNewVenue] = useState("Aryabhatta Central Computing Block, NCERC");
  const [newRegistrationOpen, setNewRegistrationOpen] = useState(true);
  const [newPrizePool, setNewPrizePool] = useState("");
  const [newAttendees, setNewAttendees] = useState("250+ Engineers");
  const [newDescription, setNewDescription] = useState("");
  const [isPublishingEvent, setIsPublishingEvent] = useState(false);

  const loadEvents = useCallback(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setEventsList(data.data);
      })
      .catch((err) => console.error("Failed to load events:", err))
      .finally(() => setEventsLoading(false));
  }, []);

  const loadCertificates = useCallback(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (data.certificates) setCertificatesList(data.certificates);
      })
      .catch((err) => console.error("Failed to load certificates:", err));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadEvents();
      loadCertificates();
    }
  }, [isAuthenticated, loadEvents, loadCertificates]);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate.trim()) return;

    setIsPublishingEvent(true);
    setEventSuccessMsg("");

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          tagline: newTagline || `${newCategory} organized by CYPHER AIML`,
          date: newDate,
          status: newStatus,
          category: newCategory,
          venue: newVenue,
          registrationOpen: newRegistrationOpen,
          prizePool: newPrizePool || undefined,
          attendees: newAttendees || undefined,
          description: newDescription || newTitle,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEventSuccessMsg(`Event "${newTitle}" has been successfully published.`);
        setNewTitle("");
        setNewTagline("");
        setNewPrizePool("");
        setNewDescription("");
        loadEvents();
        setTimeout(() => setEventSuccessMsg(""), 6000);
      }
    } catch (err) {
      console.error("Error creating event:", err);
    } finally {
      setIsPublishingEvent(false);
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the event "${title}"?`)) return;

    try {
      const res = await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        loadEvents();
      }
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  // ==========================================
  // ==========================================
  // CERTIFICATE ISSUANCE STATE & HANDLERS
  // ==========================================
  const [certMode, setCertMode] = useState<"single" | "bulk">("single");
  const [verificationBaseUrl, setVerificationBaseUrl] = useState("");
  const [detectedNetworkUrl, setDetectedNetworkUrl] = useState("");

  useEffect(() => {
    fetch("/api/admin/network")
      .then((res) => res.json())
      .then((data) => {
        if (data.networkUrl) {
          setDetectedNetworkUrl(data.networkUrl);
          if (
            typeof window !== "undefined" &&
            (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
          ) {
            setVerificationBaseUrl(data.networkUrl);
          } else if (typeof window !== "undefined") {
            setVerificationBaseUrl(window.location.origin);
          }
        } else if (typeof window !== "undefined") {
          setVerificationBaseUrl(window.location.origin);
        }
      })
      .catch(() => {
        if (typeof window !== "undefined") {
          setVerificationBaseUrl(window.location.origin);
        }
      });
  }, []);

  // Single cert state
  const [singleName, setSingleName] = useState("");
  const [singleDate, setSingleDate] = useState(new Date().toISOString().split("T")[0]);
  const [singleEvent, setSingleEvent] = useState("CYPHER 2.0 National Hackathon");
  const [singleRole, setSingleRole] = useState("First Place Winner");
  const [isMintingCert, setIsMintingCert] = useState(false);
  const [mintedSingleCert, setMintedSingleCert] = useState<CertificateRecord | null>(null);
  const [mintedSingleQr, setMintedSingleQr] = useState<string>("");

  // Bulk cert state
  const [csvText, setCsvText] = useState(
    `name,date,event\nRahul V. Nair,2026-03-22,CYPHER 2.0 National Flagship Hackathon\nDevika Krishna,2026-02-14,State-Level AI Symposium & Paper Presentation\nMohammed Farhan,2026-01-28,Hands-on Edge AI Masterclass\nAnandakrishnan,2026-04-10,Autonomous AI & LLM Summit`
  );
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [bulkOutput, setBulkOutput] = useState<
    Array<{
      cert: CertificateRecord;
      qr: string;
      verifyUrl: string;
    }>
  >([]);

  const handleSingleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleName.trim()) return;

    setIsMintingCert(true);
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: singleName,
          date: singleDate,
          event: singleEvent,
          role: singleRole,
        }),
      });

      const data = await res.json();
      if (data.success && data.certificates && data.certificates[0]) {
        const cert: CertificateRecord = data.certificates[0];
        setMintedSingleCert(cert);

        const base =
          verificationBaseUrl.trim() || (typeof window !== "undefined" ? window.location.origin : "");
        const cleanBase = base.replace(/\/$/, "");
        const verifyUrl = `${cleanBase}/verify?code=${encodeURIComponent(cert.certificateId)}`;
        const qr = await generateQRCodeDataUrl(verifyUrl, {
          width: 240,
          darkColor: "#050505",
          lightColor: "#FFFFFF",
        });
        setMintedSingleQr(qr);

        loadCertificates();
      }
    } catch (err) {
      console.error("Minting error:", err);
    } finally {
      setIsMintingCert(false);
    }
  };

  const parseCsvData = (raw: string) => {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) return [];

    const startIndex = lines[0].toLowerCase().includes("name") ? 1 : 0;
    const records: Array<{ name: string; date: string; event: string }> = [];

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      const parts = line.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
      if (parts.length >= 1 && parts[0]) {
        records.push({
          name: parts[0],
          date: parts[1] || new Date().toISOString().split("T")[0],
          event: parts[2] || "CYPHER AIML Technical Program",
        });
      }
    }
    return records;
  };

  const handleBulkMint = async () => {
    const records = parseCsvData(csvText);
    if (records.length === 0) {
      alert("No valid certificate rows parsed from input.");
      return;
    }

    setBulkProcessing(true);
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: records }),
      });

      const data = await res.json();
      if (data.success && data.certificates) {
        const base =
          verificationBaseUrl.trim() || (typeof window !== "undefined" ? window.location.origin : "");
        const cleanBase = base.replace(/\/$/, "");
        const prepared = await Promise.all(
          data.certificates.map(async (cert: CertificateRecord) => {
            const verifyUrl = `${cleanBase}/verify?code=${encodeURIComponent(cert.certificateId)}`;
            const qr = await generateQRCodeDataUrl(verifyUrl, {
              width: 240,
              darkColor: "#050505",
              lightColor: "#FFFFFF",
            });
            return { cert, qr, verifyUrl };
          })
        );
        setBulkOutput(prepared);
        loadCertificates();
      }
    } catch (err) {
      console.error("Bulk minting error:", err);
      alert("Failed to process bulk certificates.");
    } finally {
      setBulkProcessing(false);
    }
  };

  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) setCsvText(content);
    };
    reader.readAsText(file);
  };

  const downloadBulkOutputCsv = () => {
    if (bulkOutput.length === 0) return;
    const header = "name,date,event,role,certificate_id,verify_url\n";
    const rows = bulkOutput
      .map(
        (b) =>
          `"${b.cert.name}","${b.cert.date}","${b.cert.event}","${b.cert.role || ""}","${b.cert.certificateId}","${b.verifyUrl}"`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `cypher_certificates_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Initial Loading State
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-400 font-mono text-xs uppercase tracking-widest">
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-600 mr-2" />
        Checking authorization...
      </div>
    );
  }

  // 2. High-Contrast Login Gate
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-8 border-[#0E0E11] font-mono selection:bg-red-600 selection:text-white">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-6">
          <div>
            <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold block mb-1">
              Admin Portal
            </span>
            <div className="text-xl sm:text-2xl font-serif tracking-tight text-white uppercase">
              CYPHER <span className="italic font-normal text-red-500 font-serif">ncerc</span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Department of Artificial Intelligence &amp; Machine Learning
            </p>
          </div>

          <div className="text-right text-xs text-zinc-400 hidden sm:block">
            <div>Nehru College of Engineering and Research Centre</div>
            <div className="text-zinc-500">Pampady, Thiruvilwamala</div>
          </div>
        </div>

        {/* Central Gate Box */}
        <div className="my-auto max-w-2xl w-full mx-auto py-12">
          <div className="border border-zinc-800 bg-[#09090B] p-8 sm:p-12 relative">
            
            {/* Top Wireframe Badge */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-8">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-red-500" />
                <span>Restricted Access</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-red-950/80 text-red-400 border border-red-700/60 uppercase">
                Password Required
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight leading-none mb-3">
                Administrator Sign In
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
                Faculty convenors and authorized CYPHER coordinators can publish events and issue digital certificates.
              </p>
            </div>

            {authError && (
              <div className="mb-6 p-4 border-l-4 border-l-red-600 bg-red-950/20 text-red-400 text-xs border border-zinc-800 flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold uppercase tracking-wider text-[11px]">Authentication Error</div>
                  <div>{authError}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2 font-bold">
                  Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin passcode..."
                    className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white placeholder-zinc-700 text-sm px-4 py-3.5 tracking-wider focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={authLoading || !password}
                  className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>

                <div className="text-xs text-zinc-400 text-right">
                  Default Passcode: <code className="text-zinc-200 bg-zinc-900 px-2 py-1 border border-zinc-800">CYPHER@AIML2026</code>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between border-t border-zinc-800 pt-6 text-xs text-zinc-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>← Back to Website</span>
          </Link>
          <div>Department of AI &amp; ML, NCERC</div>
        </div>
      </main>
    );
  }

  // 3. Authenticated Workspace
  return (
    <main className="min-h-screen bg-[#050505] text-[#FAFAFA] font-mono selection:bg-red-600 selection:text-white border-t-4 border-t-red-600">
      
      {/* Top Header */}
      <header className="border-b border-zinc-800 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-red-600" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">
                  Admin Portal
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-zinc-800 text-zinc-300 uppercase border border-zinc-700">
                  Authenticated
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif text-white tracking-tight uppercase mt-0.5">
                CYPHER Admin Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>View Website</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white border border-zinc-800 text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 space-y-10">
        
        {/* Navigation Tabs */}
        <nav className="flex flex-wrap border-b border-zinc-800 gap-0">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-3.5 text-xs uppercase tracking-widest font-bold border-r border-t border-l border-zinc-800 -mb-px transition-all cursor-pointer ${
              activeTab === "events"
                ? "bg-[#09090B] text-white border-t-2 border-t-red-600 border-b-transparent"
                : "bg-black/60 text-zinc-400 hover:text-white hover:bg-zinc-900 border-t-transparent"
            }`}
          >
            Events ({eventsList.length})
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-6 py-3.5 text-xs uppercase tracking-widest font-bold border-r border-t border-l border-zinc-800 -mb-px transition-all cursor-pointer ${
              activeTab === "certificates"
                ? "bg-[#09090B] text-white border-t-2 border-t-red-600 border-b-transparent"
                : "bg-black/60 text-zinc-400 hover:text-white hover:bg-zinc-900 border-t-transparent"
            }`}
          >
            Issue Certificates
          </button>

          <button
            onClick={() => setActiveTab("registry")}
            className={`px-6 py-3.5 text-xs uppercase tracking-widest font-bold border-r border-t border-l border-zinc-800 -mb-px transition-all cursor-pointer ${
              activeTab === "registry"
                ? "bg-[#09090B] text-white border-t-2 border-t-red-600 border-b-transparent"
                : "bg-black/60 text-zinc-400 hover:text-white hover:bg-zinc-900 border-t-transparent"
            }`}
          >
            Certificate Registry ({certificatesList.length})
          </button>
        </nav>

        {/* ======================================================= */}
        {/* TAB 1: EVENT MANAGEMENT */}
        {/* ======================================================= */}
        {activeTab === "events" && (
          <div className="space-y-10">
            
            {eventSuccessMsg && (
              <div className="p-4 border-l-4 border-l-red-600 bg-[#09090B] border border-zinc-800 text-white text-xs flex items-center justify-between">
                <span className="font-bold tracking-wider">{eventSuccessMsg}</span>
                <span className="text-[10px] text-zinc-400">Published</span>
              </div>
            )}

            {/* Asymmetric 12-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Span 7): Event Form */}
              <div className="lg:col-span-7 border border-zinc-800 bg-[#09090B] p-6 sm:p-8 space-y-6">
                <div className="border-b border-zinc-800 pb-4">
                  <div className="text-[10px] uppercase tracking-widest text-red-500 font-bold mb-1">
                    New Event
                  </div>
                  <h2 className="text-2xl font-serif text-white uppercase tracking-tight">
                    Publish Department Event
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Published events will immediately appear on the public events page.
                  </p>
                </div>

                <form onSubmit={handleCreateEvent} className="space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. CYPHER 2.0 National Hackathon"
                      className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-4 py-3 tracking-wider focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                        Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) =>
                          setNewCategory(
                            e.target.value as "Hackathon" | "Workshop" | "Symposium" | "Guest Lecture"
                          )
                        }
                        className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-3 py-3 focus:outline-none"
                      >
                        <option value="Hackathon">Hackathon</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Symposium">Symposium</option>
                        <option value="Guest Lecture">Guest Lecture</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-3 py-2.5 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                      Tagline or Subtitle
                    </label>
                    <input
                      type="text"
                      value={newTagline}
                      onChange={(e) => setNewTagline(e.target.value)}
                      placeholder="e.g. 48-Hour Competitive Deep Learning Sprint"
                      className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-4 py-3 tracking-wider focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                        Status
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as "upcoming" | "past")}
                        className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-3 py-3 focus:outline-none"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                        Venue
                      </label>
                      <input
                        type="text"
                        value={newVenue}
                        onChange={(e) => setNewVenue(e.target.value)}
                        className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-4 py-3 tracking-wider focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                        Prize Pool (Optional)
                      </label>
                      <input
                        type="text"
                        value={newPrizePool}
                        onChange={(e) => setNewPrizePool(e.target.value)}
                        placeholder="e.g. INR 1,00,000"
                        className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-4 py-3 tracking-wider focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                        Capacity or Attendees
                      </label>
                      <input
                        type="text"
                        value={newAttendees}
                        onChange={(e) => setNewAttendees(e.target.value)}
                        placeholder="e.g. 250+ Engineers"
                        className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-4 py-3 tracking-wider focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Detailed schedule, problem domains, cluster access instructions..."
                      className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs p-4 tracking-wider focus:outline-none"
                    />
                  </div>

                  <div className="border-t border-zinc-800 pt-5 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                      <input
                        type="checkbox"
                        checked={newRegistrationOpen}
                        onChange={(e) => setNewRegistrationOpen(e.target.checked)}
                        className="accent-red-600 rounded-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs">Open for registrations</span>
                    </label>

                    <button
                      type="submit"
                      disabled={isPublishingEvent || !newTitle.trim()}
                      className="px-8 py-3.5 bg-red-600 hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
                    >
                      {isPublishingEvent ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <>
                          <span>Publish Event</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column (Span 5): Guidelines & Events List */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Guidelines Box */}
                <div className="border border-zinc-800 bg-[#09090B] p-6 space-y-4">
                  <div className="text-xs text-white uppercase tracking-wider font-bold border-b border-zinc-800 pb-2">
                    Event Guidelines
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    All published department events and technical workshops will be publicly visible on the events page and eligible for KTU Activity Points.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                    <div>Status: Live on Website</div>
                    <div>Category: Department Activities</div>
                    <div>Campus: NCERC Pampady</div>
                    <div>Organized by: CYPHER Association</div>
                  </div>
                </div>

                {/* Published Events Feed */}
                <div className="border border-zinc-800 bg-[#09090B] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-white">
                      Published Events ({eventsList.length})
                    </span>
                    <button
                      onClick={loadEvents}
                      className="text-xs text-zinc-400 hover:text-white uppercase transition-colors"
                    >
                      {eventsLoading ? "Refreshing..." : "Refresh"}
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 divide-y divide-zinc-800/60">
                    {eventsList.map((ev) => (
                      <div key={ev.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] px-1.5 py-0.2 uppercase font-bold ${
                                ev.status === "upcoming"
                                  ? "bg-red-950/80 text-red-400 border border-red-800/60"
                                  : "bg-zinc-800 text-zinc-400"
                              }`}
                            >
                              {ev.status}
                            </span>
                            <span className="text-xs text-zinc-400 font-mono">
                              {ev.date}
                            </span>
                          </div>

                          <h4 className="text-xs font-serif font-bold text-white truncate">
                            {ev.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 truncate">
                            {ev.venue}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDeleteEvent(ev.id, ev.title)}
                          className="p-1.5 border border-zinc-800 hover:border-red-600 hover:bg-red-950 text-zinc-400 hover:text-red-400 text-xs uppercase transition-colors cursor-pointer"
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 2: CERTIFICATE GENERATOR */}
        {/* ======================================================= */}
        {activeTab === "certificates" && (
          <div className="space-y-8">
            
            {/* Target Verification URL Configuration */}
            <div className="p-4 bg-[#09090B] border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>QR Target Verification URL</span>
                </div>
                <div className="text-zinc-400 text-[11px] mt-0.5">
                  Scanning the QR code with any mobile camera will immediately open this URL to verify the certificate.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={verificationBaseUrl}
                  onChange={(e) => setVerificationBaseUrl(e.target.value)}
                  placeholder="e.g. http://192.168.1.2:3000 or https://cypher.ncerc.ac.in"
                  className="bg-[#050505] border border-zinc-700 text-white font-mono text-xs px-3 py-1.5 focus:border-red-500 focus:outline-none w-64 md:w-80"
                />
                {detectedNetworkUrl && verificationBaseUrl !== detectedNetworkUrl && (
                  <button
                    type="button"
                    onClick={() => setVerificationBaseUrl(detectedNetworkUrl)}
                    className="px-2.5 py-1.5 border border-zinc-700 hover:border-red-500 text-zinc-300 hover:text-white text-[10px] uppercase font-bold transition-colors cursor-pointer"
                    title="Switch to LAN IP for scanning from phone over Wi-Fi"
                  >
                    Use Mobile LAN IP
                  </button>
                )}
                {typeof window !== "undefined" && verificationBaseUrl !== window.location.origin && (
                  <button
                    type="button"
                    onClick={() => setVerificationBaseUrl(window.location.origin)}
                    className="px-2.5 py-1.5 border border-zinc-700 hover:border-white text-zinc-400 hover:text-white text-[10px] uppercase font-bold transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Mode Selector */}
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
              <button
                onClick={() => setCertMode("single")}
                className={`px-5 py-2 text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  certMode === "single"
                    ? "bg-white text-black border-white"
                    : "border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                Single Certificate
              </button>

              <button
                onClick={() => setCertMode("bulk")}
                className={`px-5 py-2 text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  certMode === "bulk"
                    ? "bg-white text-black border-white"
                    : "border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                Bulk CSV Import
              </button>
            </div>

            {/* SINGLE CERTIFICATE ISSUANCE */}
            {certMode === "single" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="lg:col-span-7 border border-zinc-800 bg-[#09090B] p-6 sm:p-8 space-y-6">
                  <div className="border-b border-zinc-800 pb-4">
                    <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold block mb-1">
                      Single Certificate
                    </span>
                    <h3 className="text-2xl font-serif text-white uppercase tracking-tight">
                      Issue Certificate
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Generates a unique certificate ID and verification QR code.
                    </p>
                  </div>

                  <form onSubmit={handleSingleMint} className="space-y-5">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                        Recipient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={singleName}
                        onChange={(e) => setSingleName(e.target.value)}
                        placeholder="e.g. Anandakrishnan"
                        className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-4 py-3 tracking-wider focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                          Event Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={singleEvent}
                          onChange={(e) => setSingleEvent(e.target.value)}
                          placeholder="e.g. CYPHER 2.0 National Hackathon"
                          className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-4 py-3 tracking-wider focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                          Award or Role (Optional)
                        </label>
                        <input
                          type="text"
                          value={singleRole}
                          onChange={(e) => setSingleRole(e.target.value)}
                          placeholder="e.g. First Place Winner"
                          className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-4 py-3 tracking-wider focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                        Issue Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={singleDate}
                        onChange={(e) => setSingleDate(e.target.value)}
                        className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white text-xs px-4 py-3 focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isMintingCert || !singleName.trim()}
                        className="px-8 py-3.5 bg-red-600 hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
                      >
                        {isMintingCert ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <span>Generate Certificate &amp; QR</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right: Certificate Preview Card */}
                <div className="lg:col-span-5 border border-zinc-800 bg-[#09090B] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold border-b border-zinc-800 pb-3 mb-6">
                      Certificate Preview
                    </div>

                    {mintedSingleCert && mintedSingleQr ? (
                      <div className="space-y-6">
                        <div className="p-4 bg-white border border-zinc-800 inline-block">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={mintedSingleQr} alt="Certificate QR Code" className="w-36 h-36 mx-auto" />
                        </div>

                        <div className="space-y-3 text-xs border-t border-zinc-800 pt-4">
                          <div>
                            <span className="text-zinc-400 block text-[10px] uppercase">Recipient</span>
                            <span className="font-serif text-lg text-white font-bold">{mintedSingleCert.name}</span>
                          </div>

                          <div>
                            <span className="text-zinc-400 block text-[10px] uppercase">Event</span>
                            <span className="text-zinc-200">{mintedSingleCert.event}</span>
                          </div>

                          <div>
                            <span className="text-zinc-400 block text-[10px] uppercase">Certificate ID</span>
                            <span className="font-mono font-bold text-red-500 bg-black px-2 py-1 border border-zinc-800 inline-block">
                              {mintedSingleCert.certificateId}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <a
                            href={mintedSingleQr}
                            download={`${mintedSingleCert.certificateId}_QR.png`}
                            className="px-4 py-2 border border-zinc-700 hover:border-white text-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download QR</span>
                          </a>

                          <Link
                            href={`/verify?code=${mintedSingleCert.certificateId}`}
                            target="_blank"
                            className="px-4 py-2 bg-red-600 hover:bg-white hover:text-black text-white text-xs uppercase tracking-wider font-bold transition-colors"
                          >
                            <span>Verify →</span>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="py-20 text-center text-zinc-400 space-y-2">
                        <div className="text-xs uppercase tracking-widest font-bold text-zinc-300">
                          No Certificate Generated Yet
                        </div>
                        <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                          Fill in the recipient details on the left to generate the certificate ID and QR code.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-zinc-800 pt-4 text-xs text-zinc-400">
                    Issuer: CYPHER, Department of AI &amp; ML, NCERC
                  </div>
                </div>

              </div>
            )}

            {/* BULK CSV IMPORT */}
            {certMode === "bulk" && (
              <div className="border border-zinc-800 bg-[#09090B] p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold block mb-1">
                      Bulk Issuance
                    </span>
                    <h3 className="text-2xl font-serif text-white uppercase tracking-tight">
                      Bulk Certificate Generator
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Paste or upload CSV data with headers: <code className="text-red-400">name,date,event</code>. Unique IDs and QR codes are generated automatically.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="px-4 py-2 border border-zinc-700 hover:border-white text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors inline-flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-red-500" />
                      <span>Upload CSV File</span>
                      <input type="file" accept=".csv" onChange={handleCsvFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <textarea
                    rows={7}
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    className="w-full bg-[#050505] border border-zinc-700 focus:border-red-500 text-white font-mono text-xs p-4 tracking-wider leading-relaxed focus:outline-none"
                  />

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="text-xs text-zinc-400">
                      Rows detected:{" "}
                      <strong className="text-white font-mono">{parseCsvData(csvText).length}</strong>
                    </div>

                    <button
                      onClick={handleBulkMint}
                      disabled={bulkProcessing || parseCsvData(csvText).length === 0}
                      className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {bulkProcessing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating Certificates...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Generate Certificates ({parseCsvData(csvText).length} records)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Bulk Output Table */}
                {bulkOutput.length > 0 && (
                  <div className="border-t border-zinc-800 pt-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs uppercase tracking-widest font-bold text-white flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Generated Certificates ({bulkOutput.length})</span>
                      </h4>

                      <button
                        onClick={downloadBulkOutputCsv}
                        className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export to CSV</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-zinc-800">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#050505] border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="py-3 px-4">QR</th>
                            <th className="py-3 px-4">Certificate ID</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Event</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800 text-zinc-300">
                          {bulkOutput.map(({ cert, qr }) => (
                            <tr key={cert.certificateId} className="hover:bg-zinc-900/60">
                              <td className="py-2.5 px-4">
                                <div className="p-1 bg-white inline-block">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={qr} alt="QR Thumbnail" className="w-7 h-7" />
                                </div>
                              </td>
                              <td className="py-2.5 px-4 font-mono font-bold text-red-500">
                                {cert.certificateId}
                              </td>
                              <td className="py-2.5 px-4 font-serif font-bold text-white">
                                {cert.name}
                              </td>
                              <td className="py-2.5 px-4 text-zinc-400 font-mono">
                                {cert.date}
                              </td>
                              <td className="py-2.5 px-4 truncate max-w-xs text-zinc-400">
                                {cert.event}
                              </td>
                              <td className="py-2.5 px-4 text-right space-x-3">
                                <a
                                  href={qr}
                                  download={`${cert.certificateId}_QR.png`}
                                  className="text-zinc-400 hover:text-white uppercase text-[11px]"
                                >
                                  Download QR
                                </a>
                                <Link
                                  href={`/verify?code=${cert.certificateId}`}
                                  target="_blank"
                                  className="text-red-500 hover:text-white uppercase text-[11px] font-bold"
                                >
                                  Verify →
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 3: CERTIFICATE REGISTRY */}
        {/* ======================================================= */}
        {activeTab === "registry" && (
          <div className="border border-zinc-800 bg-[#09090B] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold block mb-1">
                  Certificate Registry
                </span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-tight">
                  Certificate Registry
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Complete list of all issued certificates.
                </p>
              </div>

              <button
                onClick={loadCertificates}
                className="px-4 py-2 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-zinc-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#050505] border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Certificate ID</th>
                    <th className="py-3 px-4">Recipient Name</th>
                    <th className="py-3 px-4">Event</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {certificatesList.map((c) => (
                    <tr key={c.certificateId} className="hover:bg-zinc-900/60">
                      <td className="py-3 px-4 font-bold text-red-500">
                        {c.certificateId}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-white">
                        {c.name}
                      </td>
                      <td className="py-3 px-4 truncate max-w-xs text-zinc-300">
                        {c.event}
                      </td>
                      <td className="py-3 px-4 text-zinc-400">
                        {c.role || "Participant"}
                      </td>
                      <td className="py-3 px-4 text-zinc-400">
                        {c.date}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/verify?code=${c.certificateId}`}
                          target="_blank"
                          className="px-3 py-1 border border-zinc-700 hover:border-white text-white uppercase text-[10px] tracking-wider transition-colors inline-block"
                        >
                          Verify →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
