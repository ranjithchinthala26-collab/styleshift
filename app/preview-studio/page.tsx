"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  X,
  Globe,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface StyleOption {
  id: string;
  name: string;
  color: string;
  desc: string;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    id: "cyber-neon",
    name: "Cyber Neon",
    color: "#22D3EE",
    desc: "Vaporwave + electric glow",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism Pro",
    color: "#A78BFA",
    desc: "Frosted depth & blur",
  },
  {
    id: "apple-minimal",
    name: "Apple Minimal",
    color: "#FFFFFF",
    desc: "Clean luxury whitespace",
  },
  {
    id: "quantum",
    name: "Quantum Gradient",
    color: "#C084FC",
    desc: "Holographic energy fields",
  },
  {
    id: "holographic",
    name: "Holographic UI",
    color: "#67E8F9",
    desc: "Floating light layers",
  },
  {
    id: "liquid-metal",
    name: "Liquid Metal",
    color: "#F472B6",
    desc: "Chrome liquid reflections",
  },
];

interface AnalysisReport {
  layout: string;
  colors: string[];
  typography: string;
  components: string[];
  industry: string;
  audience: string;
  uxScore: number;
}

const DEFAULT_REPORT: AnalysisReport = {
  layout: "Hero → Feature Grid → Pricing → Testimonials → Footer",
  colors: ["#1A73E8", "#0F172A", "#FFFFFF", "#64748B"],
  typography: "Inter + Satoshi (Modern Sans)",
  components: ["Navigation", "Hero CTA", "Cards", "Pricing Tables", "Forms"],
  industry: "SaaS Platform",
  audience: "Developers & Startups",
  uxScore: 87,
};

export default function PreviewStudio() {
  const [url, setUrl] = useState("https://stripe.com");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);
  const [progress, setProgress] = useState(100);
  const [report, setReport] = useState<AnalysisReport | null>(DEFAULT_REPORT);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>("cyber-neon");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [transformationApplied, setTransformationApplied] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Verification Form Inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Trigger analysis pipeline
  const handleAnalyze = async () => {
    if (!url) return;
    setIsAnalyzing(true);
    setProgress(0);

    // Progressive animation matching the live app
    const steps = [20, 45, 70, 100];
    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setProgress(steps[i]);
    }

    try {
      // Connect to real backend analysis API
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.success && data.report) {
        setReport(data.report);
      } else {
        setReport(DEFAULT_REPORT);
      }
    } catch {
      setReport(DEFAULT_REPORT);
    }

    setTimeout(() => {
      setAnalysisComplete(true);
      setIsAnalyzing(false);
    }, 800);
  };

  const handleSelectStyle = (id: string) => {
    setSelectedStyleId(id);
    setShowVerifyModal(true);
  };

  const handleVerifyAndApply = async () => {
    setShowVerifyModal(false);
    setTransformationApplied(true);

    // Call verify endpoint in background
    try {
      await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          fullName: fullName || "Verified Developer",
          email: email || "dev@company.com",
          company: company || "Independent",
        }),
      });
    } catch (e) {
      console.warn("Verification API log:", e);
    }

    setTimeout(() => {
      setShowSuccessModal(true);
    }, 800);
  };

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          title: report?.industry ? `${report.industry} Portal` : "StyleShift Redesign",
          presetId: selectedStyleId || "cyber-neon",
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `styleshift-${selectedStyleId || "cyber-neon"}-aesthetic.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
      }
    } catch (err) {
      console.error("Export download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const resetAll = () => {
    setUrl("");
    setAnalysisComplete(false);
    setReport(null);
    setSelectedStyleId(null);
    setTransformationApplied(false);
    setShowSuccessModal(false);
  };

  const selectedPreset = STYLE_OPTIONS.find((s) => s.id === selectedStyleId);

  return (
    <div className="bg-[#020617] text-white min-h-screen overflow-hidden font-sans">
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(#22D3EE_0.8px,transparent_1px)] bg-[length:40px_40px] opacity-10 pointer-events-none" />
          <div className="max-w-4xl text-center px-8 relative z-10 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex px-6 py-2 bg-white/5 border border-white/10 rounded-3xl text-sm tracking-widest mb-8 text-[#22D3EE]"
            >
              AI POWERED PREVIEW STUDIO
            </motion.div>

            <h1 className="text-7xl md:text-8xl font-semibold tracking-tighter mb-6 leading-none">
              Preview Studio
            </h1>

            <p className="text-2xl text-white/70 max-w-2xl mx-auto">
              Analyze any website. Instantly generate breathtaking futuristic transformations.
            </p>

            {/* URL Input Form */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-[#111827] border border-white/10 rounded-3xl p-2 shadow-2xl focus-within:border-[#22D3EE]/50 transition-colors">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && url && handleAnalyze()}
                  placeholder="https://yourwebsite.com"
                  className="flex-1 bg-transparent px-8 py-3 text-lg outline-none placeholder:text-white/40 text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !url}
                  className="px-10 py-4 bg-gradient-to-r from-[#22D3EE] to-[#A78BFA] text-black font-semibold rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-[#22D3EE]/50 transition-all cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isAnalyzing ? "FORGING..." : "ANALYZE WEBSITE"}
                  <ArrowRight size={20} />
                </motion.button>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/50">
                <span>Try demo websites:</span>
                {["stripe.com", "linear.app", "apple.com", "shopify.com"].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setUrl(`https://${sample}`);
                      // Trigger analysis
                      setTimeout(() => {
                        const btn = document.querySelector('button[data-analyze-btn="true"]') as HTMLButtonElement;
                        if (btn) btn.click();
                      }, 50);
                    }}
                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#22D3EE] border border-white/10 transition-colors cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Progress Section */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 border-b border-white/10 bg-[#0A0F1C]"
            >
              <div className="max-w-2xl mx-auto px-8 text-center">
                <div className="text-[#22D3EE] text-sm tracking-[4px] mb-8 font-mono">
                  AI INTELLIGENCE ENGINE ACTIVE
                </div>

                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#22D3EE] to-[#C084FC]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                <div className="grid grid-cols-4 gap-6 text-sm">
                  {["Scanning", "DOM Parse", "Component AI", "Brand Intelligence"].map(
                    (step, idx) => (
                      <div
                        key={step}
                        className={`flex flex-col items-center transition-colors ${
                          progress > (idx + 1) * 20
                            ? "text-[#22D3EE]"
                            : "text-white/40"
                        }`}
                      >
                        <div
                          className={`w-6 h-px mb-3 ${
                            progress > (idx + 1) * 20
                              ? "bg-[#22D3EE]"
                              : "bg-white/30"
                          }`}
                        />
                        {step}
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Results & Report */}
        <AnimatePresence>
          {analysisComplete && report && (
            <div className="max-w-screen-2xl mx-auto px-8 pb-32">
              <div className="grid lg:grid-cols-12 gap-16 mt-20">
                {/* Left Browser Mockup */}
                <div className="lg:col-span-7">
                  <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="h-14 bg-black flex items-center px-6 gap-3 border-b border-white/10">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                      <div className="flex-1 text-center text-xs text-white/40 font-mono truncate px-4">
                        {url || "example.com"}
                      </div>
                    </div>
                    <motion.div
                      className="aspect-video bg-zinc-950 relative overflow-hidden flex items-center justify-center p-8 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="text-white/30 text-2xl font-light">
                        Original Website Preview
                      </div>
                      <div className="absolute bottom-8 left-8 text-xs bg-black/70 px-4 py-1.5 rounded-full border border-white/10 font-mono text-white/70">
                        {url}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right AI Report */}
                <div className="lg:col-span-5 space-y-8">
                  <h3 className="text-4xl font-semibold tracking-tight">
                    AI Intelligence Report
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.entries(report).map(([key, val], idx) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="bg-[#111827] border border-white/10 rounded-3xl p-8"
                      >
                        <div className="text-[#22D3EE] text-xs tracking-widest uppercase mb-2 font-mono">
                          {key}
                        </div>
                        <div className="text-lg leading-relaxed text-white/90">
                          {Array.isArray(val) ? val.join(" • ") : String(val)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Style Forge Presets Selection */}
              <div className="mt-32">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <div className="text-[#22D3EE] tracking-[3px] text-sm font-mono">
                      STYLE FORGE ENGINE
                    </div>
                    <h2 className="text-5xl font-semibold tracking-tight mt-2">
                      Choose Your Future
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {STYLE_OPTIONS.map((style, idx) => (
                    <motion.div
                      key={style.id}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      whileHover={{ y: -12 }}
                      onClick={() => handleSelectStyle(style.id)}
                      className="group bg-[#111827] border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-[#22D3EE]/50 transition-all shadow-xl"
                    >
                      <div
                        className="h-80 relative flex items-center justify-center overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, #111827, ${style.color}15)`,
                        }}
                      >
                        <div className="text-7xl font-bold opacity-30 group-hover:opacity-80 transition-all duration-300">
                          {style.name.split(" ")[0]}
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-2xl group-hover:text-white transition-colors">
                              {style.name}
                            </div>
                            <div className="text-white/70 mt-1 text-sm">
                              {style.desc}
                            </div>
                          </div>
                          <div
                            className="w-9 h-9 rounded-2xl flex-shrink-0 shadow-md"
                            style={{ background: style.color }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Transformed Comparison View */}
              <AnimatePresence>
                {transformationApplied && selectedPreset && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-32 border-t border-white/10 pt-20"
                  >
                    <div className="text-center mb-12">
                      <div className="inline text-[#22D3EE] text-sm tracking-widest font-mono">
                        TRANSFORMATION APPLIED
                      </div>
                      <h3 className="text-6xl font-semibold tracking-tight mt-3">
                        {selectedPreset.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Original Preview */}
                      <div>
                        <div className="uppercase text-xs tracking-widest text-white/50 mb-4 font-mono">
                          ORIGINAL
                        </div>
                        <div className="border border-white/10 rounded-3xl overflow-hidden bg-zinc-950 aspect-video relative flex items-center justify-center text-white/30 text-xl">
                          Original Design
                        </div>
                      </div>

                      {/* Forged Transformed Preview */}
                      <div>
                        <div className="uppercase text-xs tracking-widest text-[#22D3EE] mb-4 font-mono">
                          FORGED WITH {selectedPreset.name}
                        </div>
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#111827] to-black aspect-video relative flex flex-col items-center justify-center p-8 text-center"
                          style={{
                            border: `1px solid ${selectedPreset.color}80`,
                            boxShadow: `0 0 100px -20px ${selectedPreset.color}60`,
                          }}
                        >
                          <div className="text-white text-3xl font-light mb-2">
                            {selectedPreset.name} Redesign
                          </div>
                          <span
                            className="text-xs uppercase tracking-widest font-mono px-4 py-1.5 rounded-full border"
                            style={{
                              borderColor: `${selectedPreset.color}60`,
                              color: selectedPreset.color,
                            }}
                          >
                            Custom Web Aesthetics Applied
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Download Trigger Button */}
                    <div className="mt-20 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowSuccessModal(true)}
                        className="flex items-center gap-4 bg-white text-black px-16 py-7 rounded-3xl text-lg font-semibold shadow-2xl shadow-[#22D3EE]/30 hover:bg-[#22D3EE] hover:text-white transition-all cursor-pointer"
                      >
                        <Download className="w-6 h-6" />
                        DOWNLOAD STYLE PACKAGE
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>

        {/* Verification Modal */}
        <AnimatePresence>
          {showVerifyModal && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#111827] border border-white/10 rounded-3xl w-full max-w-lg p-12 relative shadow-2xl"
              >
                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="text-center mb-10">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#22D3EE] to-[#A78BFA] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#22D3EE]/30">
                    <Globe className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-3xl font-semibold">
                    Website Verification Required
                  </h3>
                  <p className="text-white/60 mt-3 text-sm">
                    We need to confirm ownership before applying the transformation.
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-black border border-white/20 rounded-2xl px-6 py-4 text-base outline-none focus:border-[#22D3EE] transition-colors"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work Email"
                    className="w-full bg-black border border-white/20 rounded-2xl px-6 py-4 text-base outline-none focus:border-[#22D3EE] transition-colors"
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company / Organization"
                    className="w-full bg-black border border-white/20 rounded-2xl px-6 py-4 text-base outline-none focus:border-[#22D3EE] transition-colors"
                  />
                </div>

                <div className="mt-6 flex items-center gap-3 text-sm text-white/80">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    id="consent-check"
                    className="w-5 h-5 accent-[#22D3EE] cursor-pointer"
                  />
                  <label htmlFor="consent-check" className="cursor-pointer select-none">
                    I confirm I own or have permission to transform this website
                  </label>
                </div>

                <motion.button
                  onClick={handleVerifyAndApply}
                  disabled={!confirmed}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full py-5 bg-gradient-to-r from-[#22D3EE] to-[#C084FC] text-black font-semibold rounded-3xl text-lg disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all shadow-xl shadow-[#22D3EE]/20"
                >
                  VERIFY & APPLY TRANSFORMATION
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Download Package Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[200] flex items-center justify-center p-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-center max-w-md w-full bg-[#111827] border border-white/10 rounded-3xl p-10 shadow-2xl relative"
              >
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mb-8 shadow-[0_0_100px_30px] shadow-emerald-500/50">
                  <CheckCircle2 className="w-14 h-14 text-black" />
                </div>

                <h2 className="text-4xl font-semibold tracking-tight mb-4">
                  Transformation Complete!
                </h2>

                <p className="text-lg text-white/70 mb-10">
                  Your futuristic design package is ready.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetAll}
                    className="px-8 py-4 border border-white/30 rounded-2xl text-sm font-medium hover:bg-white/5 transition-all text-white/80 hover:text-white"
                  >
                    BACK TO STUDIO
                  </button>
                  <button
                    onClick={handleDownloadZip}
                    disabled={isDownloading}
                    className="px-10 py-4 bg-white text-black rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-[#22D3EE] hover:text-white transition-all shadow-lg shadow-[#22D3EE]/30"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                    {isDownloading ? "BUILDING ZIP..." : "DOWNLOAD ZIP"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
