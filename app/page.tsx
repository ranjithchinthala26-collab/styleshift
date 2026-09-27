"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const SHOWCASE_ITEMS = [
  { id: 1, title: "Shopify → Futuristic glassmorphic UI", category: "E-Commerce", color: "#22D3EE" },
  { id: 2, title: "SaaS Dashboard → Violet Void", category: "Enterprise", color: "#A78BFA" },
  { id: 3, title: "Linear → Deep space gradient layout", category: "DevTools", color: "#C084FC" },
  { id: 4, title: "Portfolio → Electric Flux", category: "Creative", color: "#67E8F9" },
  { id: 5, title: "Personal site → Holographic card system", category: "Personal", color: "#F472B6" },
  { id: 6, title: "Blog → Circuit Realm", category: "Editorial", color: "#34D399" },
  { id: 7, title: "Medium → Neural network inspired grid", category: "Publishing", color: "#FBBF24" },
  { id: 8, title: "Analytics → Quantum Glow", category: "Data", color: "#818CF8" },
  { id: 9, title: "Stripe → Interactive data nebula", category: "Fintech", color: "#EC4899" },
];

export default function HomePage() {
  const [urlInput, setUrlInput] = useState("");
  const router = useRouter();

  const handleQuickAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      router.push(`/preview-studio?url=${encodeURIComponent(urlInput.trim())}`);
    } else {
      router.push("/preview-studio");
    }
  };

  return (
    <div className="bg-[#020617] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[100dvh] pt-28 pb-20 relative flex items-center overflow-hidden">
        {/* Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(#22D3EE_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#A78BFA_1px,transparent_2px)] bg-[length:80px_80px] opacity-10 pointer-events-none" />

        {/* Ambient floating preview cards */}
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-36 left-12 w-52 h-52 border border-[#22D3EE]/30 rounded-3xl backdrop-blur-xl bg-white/5 p-6 hidden xl:block shadow-[0_0_50px_-15px_#22D3EE]"
        >
          <div className="text-[#22D3EE] text-xs font-mono tracking-[3px]">LIVE PREVIEW</div>
          <div className="h-px bg-white/10 my-4" />
          <div className="space-y-3">
            <div className="h-2.5 bg-white/20 rounded w-3/4 animate-pulse" />
            <div className="h-2.5 bg-[#22D3EE]/40 rounded w-11/12" />
            <div className="h-2.5 bg-white/20 rounded w-1/2" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          className="absolute bottom-40 right-20 w-64 h-64 border border-[#A78BFA]/30 rounded-3xl backdrop-blur-3xl bg-white/5 p-8 hidden 2xl:block shadow-[0_0_60px_-15px_#A78BFA]"
        >
          <div className="flex gap-2">
            <div className="flex-1 h-20 bg-gradient-to-br from-[#22D3EE] to-[#A78BFA] rounded-2xl shadow-lg" />
            <div className="flex-1 h-20 bg-white/10 rounded-2xl border border-white/10" />
          </div>
          <div className="mt-4 text-xs font-mono text-white/50">CYBERNETIC TOKENS</div>
        </motion.div>

        {/* Hero Content */}
        <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-3xl mb-8 text-sm tracking-wide text-white/90">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full animate-pulse" />
              <span>POWERED BY MULTIMODAL AI</span>
            </div>

            <h1 className="text-7xl md:text-[92px] leading-none font-semibold tracking-[-5px] mb-6">
              AI that{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22D3EE] via-[#A78BFA] to-[#C084FC]">
                forges
              </span>
              <br />
              your website
            </h1>

            <p className="max-w-xl text-xl md:text-2xl text-white/70 font-light tracking-tight leading-relaxed mb-10">
              Paste any URL. Our AI instantly understands layout, extracts components, and generates breathtaking futuristic redesigns using Adobe-level intelligence.
            </p>

            {/* Quick URL Input Bar */}
            <form onSubmit={handleQuickAnalyze} className="max-w-2xl mb-12">
              <div className="flex flex-col sm:flex-row gap-3 bg-[#111827] border border-white/10 rounded-3xl p-2 shadow-2xl focus-within:border-[#22D3EE]/50 transition-colors">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="flex-1 bg-transparent px-8 py-3.5 text-base md:text-lg outline-none placeholder:text-white/40 text-white"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#22D3EE] to-[#A78BFA] text-black font-semibold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] shadow-xl shadow-[#22D3EE]/40 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Analyze Website</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-8 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#22D3EE]" />
                <span>Instant DOM Parsing</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#A78BFA]" />
                <span>500k+ UI Pattern Models</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Sandboxed & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Grid Section */}
      <section className="py-28 border-t border-white/10 bg-[#0A0F1C]/60 relative">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-[#22D3EE] text-xs font-mono tracking-[3px] uppercase mb-2">
                TRANSFORMATION SHOWCASE
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
                From Legacy to Cyber Aesthetic
              </h2>
            </div>
            <Link
              href="/preview-studio"
              className="inline-flex items-center gap-2 text-[#22D3EE] hover:underline font-medium text-sm"
            >
              Open Interactive Studio <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOWCASE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#111827] border border-white/10 rounded-3xl p-8 hover:border-[#22D3EE]/40 transition-all group"
              >
                <div className="flex justify-between items-center mb-6">
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full border"
                    style={{ borderColor: `${item.color}40`, color: item.color }}
                  >
                    {item.category}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <h3 className="text-xl font-semibold leading-snug group-hover:text-white transition-colors mb-4">
                  {item.title}
                </h3>
                <div className="h-32 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center text-white/30 text-xs font-mono">
                  Synthesized Spatial Layout
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-24 border-t border-white/10 bg-gradient-to-b from-[#020617] to-[#0A0F1C] relative">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
            Ready to shift your aesthetics?
          </h2>
          <p className="text-xl text-white/70 max-w-xl mx-auto mb-10">
            Launch the Preview Studio now and transform your web identity with a single click.
          </p>
          <Link
            href="/preview-studio"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-bold rounded-2xl text-lg hover:bg-[#22D3EE] hover:text-white transition-all shadow-2xl shadow-[#22D3EE]/30"
          >
            <span>Launch Preview Studio</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
