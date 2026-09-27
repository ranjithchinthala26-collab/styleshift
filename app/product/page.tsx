"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, Layers, Palette, Terminal, Shield, Zap } from "lucide-react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = Math.ceil(value / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ProductPage() {
  const features = [
    {
      icon: <Cpu className="w-9 h-9 text-[#22D3EE]" />,
      title: "Website Intelligence",
      desc: "Deep DOM + visual hierarchy parsing",
      bullets: [
        "Structural layout analysis",
        "UX hierarchy detection",
        "Semantic DOM understanding",
      ],
    },
    {
      icon: <Layers className="w-9 h-9 text-[#A78BFA]" />,
      title: "Component Recognition",
      desc: "Trained on 500k+ premium interfaces",
      bullets: [
        "Detects navigation patterns",
        "Button, card & form decomposition",
        "Micro-interaction classification",
      ],
    },
    {
      icon: <Palette className="w-9 h-9 text-[#C084FC]" />,
      title: "Aesthetic Synthesis",
      desc: "Instant futuristic transformations",
      bullets: [
        "Cyberpunk, glass & quantum themes",
        "Volumetric neon glow generation",
        "Dynamic dark-mode color harmonization",
      ],
    },
    {
      icon: <Terminal className="w-9 h-9 text-[#67E8F9]" />,
      title: "Production Ready Export",
      desc: "One-click tokens & stylesheets",
      bullets: [
        "Full Tailwind CSS configuration",
        "Portable JSON design tokens",
        "Modular React/Next.js components",
      ],
    },
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="pt-48 pb-32 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#22D3EE]/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-3xl text-xs font-bold tracking-[3px] mb-8 text-[#22D3EE] font-mono">
              <Sparkles size={14} /> POWERED BY MULTIMODAL AI
            </div>

            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
              The AI that
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22D3EE] via-[#A78BFA] to-[#C084FC] animate-gradient-x">
                reimagines
              </span>
              <br />
              every website
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed mb-10">
              Turn any website into a futuristic experience using AI-powered design intelligence. Instantly analyzes any URL, extracts components, and generates breathtaking redesigns using Adobe-level intelligence.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link href="/preview-studio">
                <button className="px-10 py-5 bg-[#22D3EE] text-black font-black rounded-2xl hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all flex items-center gap-3 active:scale-95 cursor-pointer">
                  Start Transforming <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="/preview-studio">
                <button className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl hover:bg-white/10 transition-all font-bold cursor-pointer text-white">
                  View Demo
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating animated preview mockup */}
        <motion.div
          animate={{ y: [0, -40, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-96 h-96 border border-[#22D3EE]/20 backdrop-blur-3xl bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] hidden xl:flex items-center justify-center p-12 shadow-2xl"
        >
          <div className="w-full h-full border border-white/10 rounded-2xl bg-black/40 p-6 flex flex-col gap-4">
            <div className="w-1/2 h-4 bg-[#22D3EE]/20 rounded-full" />
            <div className="w-full h-24 bg-white/5 rounded-xl border border-white/5" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-white/5 rounded-xl" />
              <div className="h-16 bg-[#22D3EE]/10 rounded-xl" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 border-y border-white/10 bg-[#0A0F1C]/40">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-[#22D3EE] font-mono mb-2">
                <Counter value={500} suffix="k+" />
              </div>
              <div className="text-sm text-white/50">UI Patterns Trained</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-[#A78BFA] font-mono mb-2">
                <Counter value={99} suffix=".4%" />
              </div>
              <div className="text-sm text-white/50">Parsing Accuracy</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-[#C084FC] font-mono mb-2">
                &lt; 1.2s
              </div>
              <div className="text-sm text-white/50">Generation Speed</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-emerald-400 font-mono mb-2">
                100%
              </div>
              <div className="text-sm text-white/50">Sandboxed Privacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 border-b border-white/10 bg-[#0A0F1C]/50 relative">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111827] border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-[#22D3EE]/40 transition-all group"
              >
                <div>
                  <div className="mb-8 group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-6">{feat.desc}</p>
                </div>
                <ul className="space-y-2 border-t border-white/10 pt-6">
                  {feat.bullets.map((b) => (
                    <li key={b} className="text-xs text-white/50 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
