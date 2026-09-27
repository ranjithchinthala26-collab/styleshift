import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020617] text-white/60 py-16 font-sans">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#22D3EE] via-[#A78BFA] to-[#C084FC] rounded-xl flex items-center justify-center shadow-[0_0_20px_-5px_#22D3EE]">
                <span className="text-[#020617] font-black text-sm">SF</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">StyleForge</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              StyleShift: Bridging Versions with Custom Web Aesthetics. Multi-modal AI website intelligence and futuristic visual generation.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/preview-studio" className="hover:text-[#22D3EE] transition-colors">Preview Studio</Link></li>
              <li><Link href="/product" className="hover:text-[#22D3EE] transition-colors">Architecture</Link></li>
              <li><Link href="/how-ai-thinks" className="hover:text-[#22D3EE] transition-colors">How AI Thinks</Link></li>
              <li><Link href="/integrations" className="hover:text-[#22D3EE] transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/security" className="hover:text-[#22D3EE] transition-colors">Security & Compliance</Link></li>
              <li><Link href="/docs" className="hover:text-[#22D3EE] transition-colors">API Reference</Link></li>
              <li><Link href="/docs#cli-commands" className="hover:text-[#22D3EE] transition-colors">CLI Commands</Link></li>
              <li><Link href="/docs#sdk" className="hover:text-[#22D3EE] transition-colors">SDK</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Status & Trust</h4>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs text-emerald-400 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </div>
            <p className="text-xs text-white/40">
              Ephemeral Sandboxed Crawlers &bull; Zero Data Retention &bull; SOC 2 Type II Certified
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p>&copy; {new Date().getFullYear()} StyleForge / StyleShift. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/security" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/security" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
