"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HowAiThinksPage() {
  const steps = [
    {
      num: "01",
      title: "URL Ingestion",
      desc: "Secure crawl + multimodal analysis",
      details:
        "Our high-concurrency sandboxed engine crawls the target URL, capturing full-fidelity DOM hierarchies, computed CSS styles, layout trees, and spatial bounding boxes without running invasive scripts.",
    },
    {
      num: "02",
      title: "Structural Detection",
      desc: "Layout hierarchy & spacing intelligence",
      details:
        "Visual neural networks detect the structural rhythm: hero sections, feature matrices, social proof carousels, pricing grids, and navigation patterns, abstracting them into high-level UX primitives.",
    },
    {
      num: "03",
      title: "Component Recognition",
      desc: "Neural matching against 500k+ patterns",
      details:
        "Trained on over 500,000 top modern web interfaces, the classifier categorizes design systems, typography pairings, color harmonies, and contrast ratios with 99.4% accuracy.",
    },
    {
      num: "04",
      title: "Style Synthesis",
      desc: "Generates cyber-futuristic redesign",
      details:
        "The generative aesthetic engine synthesizes cohesive visual tokens: frosted glassmorphic layers, vaporwave neon glows, quantum gradient meshes, and chrome reflections, delivering clean production-ready code.",
    },
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen font-sans">
      {/* Header */}
      <section className="pt-32 pb-24 relative">
        <div className="max-w-screen-2xl mx-auto px-8 text-center">
          <div className="inline-flex px-6 py-2 bg-white/5 border border-white/10 rounded-3xl text-xs font-mono tracking-widest mb-8 text-[#22D3EE]">
            AI COGNITION PIPELINE
          </div>
          <h1 className="text-7xl md:text-8xl font-semibold tracking-tighter mb-8 leading-none">
            How StyleForge thinks
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Watch the reasoning pipeline that turns any website into a futuristic masterpiece.
          </p>
        </div>
      </section>

      {/* Steps Pipeline */}
      <div className="max-w-5xl mx-auto px-8 pb-32">
        {steps.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative flex flex-col md:flex-row gap-12 mb-24 last:mb-0 border-b border-white/5 pb-16 last:border-b-0"
          >
            {/* Giant Number */}
            <div className="md:w-72 flex-shrink-0 select-none">
              <div className="font-mono text-[140px] md:text-[180px] leading-none text-white/10 font-bold">
                {step.num}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 pt-4 md:pt-10">
              <div className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
                {step.title}
              </div>
              <div className="text-lg md:text-xl text-[#22D3EE] font-mono mb-4">
                {step.desc}
              </div>
              <p className="text-base text-white/60 leading-relaxed max-w-xl">
                {step.details}
              </p>
            </div>
          </motion.div>
        ))}

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/preview-studio"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-bold rounded-2xl text-lg hover:bg-[#22D3EE] hover:text-white transition-all shadow-xl shadow-[#22D3EE]/20"
          >
            <span>Experience the Pipeline in Studio</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
