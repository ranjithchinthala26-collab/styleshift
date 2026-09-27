"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Server, EyeOff, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Domain Verification",
      desc: "DNS + HTTPS ownership check required",
      details:
        "StyleForge strictly verifies domain authority and authorization before applying or allowing deployment of synthesized aesthetic packages, protecting brands against unauthorized design spoofing.",
    },
    {
      icon: <Server className="w-10 h-10" />,
      title: "Ephemeral Sandbox",
      desc: "Every scan runs in isolated containers",
      details:
        "Target URLs are parsed inside isolated, single-use container sandboxes with zero network exposure to internal infrastructure, strict CPU/memory limits, and automatic garbage collection.",
    },
    {
      icon: <EyeOff className="w-10 h-10" />,
      title: "Zero Data Retention",
      desc: "Nothing is stored after transformation",
      details:
        "Customer assets, session data, and parsed DOM tokens are held in-memory during transformation and wiped upon session completion. We never scrape, retain, or monetize customer proprietary content.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "SOC 2 Type II",
      desc: "Full compliance & encryption at rest",
      details:
        "Every transaction, data transfer, and API payload is encrypted using TLS 1.3 in transit and AES-256 at rest, adhering to strict enterprise security and SOC 2 Type II auditing standards.",
    },
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen font-sans">
      <section className="pt-36 pb-24">
        <div className="max-w-screen-2xl mx-auto px-8 text-center">
          <div className="inline-flex px-6 py-2 bg-white/5 border border-white/10 rounded-3xl text-xs font-mono tracking-widest mb-8 text-[#22D3EE]">
            ENTERPRISE ASSURANCE
          </div>
          <h1 className="text-7xl md:text-8xl font-semibold tracking-tighter leading-none">
            Enterprise-grade security
          </h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto mt-6">
            Engineered with privacy-first isolation, domain authorization protocols, and zero data leakage.
          </p>
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-8 pb-32">
        {securityFeatures.map((item, idx) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-[#111827] border border-white/10 p-12 md:p-14 rounded-3xl group shadow-xl"
          >
            <div className="text-[#22D3EE] mb-10 group-hover:rotate-12 transition-transform duration-300">
              {item.icon}
            </div>
            <div className="text-3xl md:text-4xl font-semibold tracking-tight">
              {item.title}
            </div>
            <div className="mt-4 text-xl text-[#22D3EE] font-mono text-sm">
              {item.desc}
            </div>
            <p className="mt-6 text-base text-white/60 leading-relaxed">
              {item.details}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
