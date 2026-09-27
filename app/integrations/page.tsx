"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  Figma,
  Layers,
  Zap,
  Globe,
  Code2,
  Cpu,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function IntegrationsPage() {
  const integrations = [
    {
      icon: <GitBranch className="w-10 h-10 text-[#22D3EE]" />,
      name: "GitHub",
      desc: "Export redesigned components",
      bullets: [
        "Export generated components",
        "Auto push to repository",
        "CI/CD ready deployment",
      ],
    },
    {
      icon: <Figma className="w-10 h-10 text-[#A78BFA]" />,
      name: "Figma",
      desc: "Instant design handoff",
      bullets: [
        "Sync design tokens",
        "Convert UI to design components",
        "Collaborative workflow support",
      ],
    },
    {
      icon: <Layers className="w-10 h-10 text-[#C084FC]" />,
      name: "Framer",
      desc: "One-click prototype import",
      bullets: [
        "Import interactive prototypes",
        "Export motion animations",
        "Rapid UI experimentation",
      ],
    },
    {
      icon: <Zap className="w-10 h-10 text-emerald-400" />,
      name: "Vercel",
      desc: "Deploy transformed sites instantly",
      bullets: [
        "Instant deployment",
        "AI optimized builds",
        "Edge performance ready",
      ],
    },
  ];

  const workflowSteps = [
    {
      title: "Analyze Website",
      desc: "Our AI scans your current DOM and CSS architecture.",
      icon: <Globe className="w-6 h-6 text-[#22D3EE]" />,
    },
    {
      title: "Generate AI Styles",
      desc: "Neural engines forge a futuristic visual identity.",
      icon: <Sparkles className="w-6 h-6 text-[#A78BFA]" />,
    },
    {
      title: "Export to Design",
      desc: "Send assets directly to your favorite creative tools.",
      icon: <Layers className="w-6 h-6 text-[#C084FC]" />,
    },
    {
      title: "Deploy Instantly",
      desc: "Go live with optimized, production-ready code.",
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
    },
  ];

  const tools = [
    "Next.js",
    "Tailwind CSS",
    "React",
    "VS Code",
    "Figma Tokens",
    "Webflow",
    "TypeScript",
    "Slack Webhooks",
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen font-sans selection:bg-[#22D3EE]/30">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#22D3EE15_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex px-6 py-2 bg-white/5 border border-white/10 rounded-3xl text-xs font-mono tracking-widest mb-8 text-[#22D3EE]">
              ECOSYSTEM CONNECTIVITY
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-8">
              Works with <br />
              <span className="relative">
                your stack
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute -bottom-2 left-0 h-[4px] bg-gradient-to-r from-[#22D3EE] via-[#A78BFA] to-transparent rounded-full"
                />
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              StyleForge seamlessly integrates with the tools developers and designers already use, bridging the gap between legacy web code and futuristic user experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Integration Cards */}
      <section className="max-w-screen-2xl mx-auto px-8 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrations.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#111827] border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-[#22D3EE]/40 transition-all shadow-xl group"
            >
              <div>
                <div className="mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-white/60 mb-6">{item.desc}</p>
              </div>
              <ul className="space-y-2.5 border-t border-white/10 pt-6">
                {item.bullets.map((b) => (
                  <li key={b} className="text-xs text-white/50 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4-Step Connected Workflow */}
      <section className="py-24 border-t border-white/10 bg-[#0A0F1C]/50">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Continuous Aesthetic Delivery
            </h2>
            <p className="text-lg text-white/60">
              From scanning your legacy app to deploying next-generation visual design.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {workflowSteps.map((ws, i) => (
              <div
                key={ws.title}
                className="bg-[#111827] border border-white/10 p-8 rounded-3xl relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {ws.icon}
                </div>
                <div className="text-xs font-mono text-[#22D3EE] mb-2 uppercase">
                  Step 0{i + 1}
                </div>
                <h4 className="text-xl font-bold mb-3">{ws.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Badges */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8 text-center">
          <h3 className="text-sm font-mono tracking-[4px] uppercase text-white/40 mb-10">
            NATIVELY COMPATIBLE TOOLCHAINS
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium hover:border-[#22D3EE]/40 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
