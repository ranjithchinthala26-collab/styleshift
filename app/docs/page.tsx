"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Terminal, Code2, BookOpen, Layers } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  id: string;
}

export default function DocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, id }) => {
    return (
      <div className="relative group my-6">
        <div className="absolute -inset-px bg-gradient-to-r from-[#22D3EE]/20 to-[#A78BFA]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative bg-[#0A0F1C] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              {language}
            </span>
            <button
              onClick={() => handleCopy(code, id)}
              className="text-white/40 hover:text-[#22D3EE] transition-colors p-1 flex items-center gap-1.5 text-xs font-mono"
            >
              {copiedId === id ? (
                <>
                  <Check size={14} className="text-[#22D3EE]" />
                  <span className="text-[#22D3EE]">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-6 text-sm font-mono text-[#22D3EE] overflow-auto leading-relaxed">
            {code}
          </pre>
        </div>
      </div>
    );
  };

  const sections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "api-reference", label: "API Reference" },
    { id: "cli-commands", label: "CLI Commands" },
    { id: "sdk", label: "SDK" },
    { id: "examples", label: "Examples" },
    { id: "changelog", label: "Changelog" },
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen font-sans">
      <div className="flex w-full pt-20 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Sticky Sidebar */}
        <aside className="w-80 border-r border-white/5 h-[calc(100vh-80px)] sticky top-20 p-10 overflow-auto hidden lg:block bg-[#020617]/50 backdrop-blur-md z-20">
          <div className="uppercase text-[10px] tracking-[0.3em] text-white/30 font-bold mb-10">
            System Documentation
          </div>
          <nav className="space-y-1">
            {sections.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-center gap-3 py-3 text-sm text-white/50 hover:text-[#22D3EE] transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#22D3EE] group-hover:shadow-[0_0_8px_#22D3EE] transition-all" />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Documentation Content */}
        <main className="flex-1 max-w-4xl mx-auto px-8 md:px-16 py-16 relative z-10 scroll-smooth">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 text-[#22D3EE] mb-4">
              <Terminal size={20} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase font-mono">
                Developer Portal
              </span>
            </div>
            <h1 className="text-6xl font-bold tracking-tighter mb-4">
              Architecture & API
            </h1>
            <p className="text-white/50 text-xl mb-16 leading-relaxed max-w-2xl">
              Integrate StyleForge & StyleShift visual intelligence directly into your deployment pipelines and design workflows.
            </p>

            {/* Getting Started */}
            <section id="getting-started" className="mb-20">
              <h2 className="text-3xl font-bold mb-4">1. Getting Started</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                StyleShift operates as both an interactive cloud preview studio and an automated CI/CD aesthetic compiler. Install the CLI or send requests to our REST endpoints.
              </p>
              <CodeBlock
                id="curl-install"
                language="bash"
                code="npm install -g @styleshift/cli
# Or run with npx:
npx styleshift analyze https://yourwebsite.com --preset=cyber-neon"
              />
            </section>

            {/* API Reference */}
            <section id="api-reference" className="mb-20">
              <h2 className="text-3xl font-bold mb-4">2. REST API Reference</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Analyze any live URL, extract UI intelligence, and generate cyber-futuristic stylesheets programmatically.
              </p>

              <h3 className="text-xl font-semibold text-[#22D3EE] mt-6 mb-2">
                POST /api/analyze
              </h3>
              <p className="text-sm text-white/60 mb-2">
                Scans and parses the DOM of any publicly accessible website.
              </p>
              <CodeBlock
                id="api-analyze"
                language="json"
                code={`// Request
POST /api/analyze
Content-Type: application/json

{
  "url": "https://stripe.com"
}

// Response
{
  "success": true,
  "id": "clyx90...",
  "report": {
    "url": "https://stripe.com",
    "title": "Financial Infrastructure for the Internet",
    "layout": "Hero → Feature Grid → Pricing → Testimonials → Footer",
    "colors": ["#635BFF", "#0A2540", "#00D4FF", "#FFFFFF"],
    "typography": "Inter + Satoshi (Modern Sans)",
    "components": ["Navigation", "Hero CTA", "Cards", "Pricing Tables", "Forms"],
    "industry": "Fintech Platform",
    "audience": "Developers & Startups",
    "uxScore": 92
  }
}`}
              />

              <h3 className="text-xl font-semibold text-[#22D3EE] mt-8 mb-2">
                POST /api/transform
              </h3>
              <p className="text-sm text-white/60 mb-2">
                Synthesizes custom tokens and CSS stylesheets for the target analysis.
              </p>
              <CodeBlock
                id="api-transform"
                language="json"
                code={`// Request
POST /api/transform
Content-Type: application/json

{
  "analysisId": "clyx90...",
  "presetId": "cyber-neon" // or glassmorphism, apple-minimal, quantum, holographic, liquid-metal
}

// Response
{
  "success": true,
  "id": "trans-1727400000",
  "transformation": {
    "preset": { "id": "cyber-neon", "name": "Cyber Neon", "color": "#22D3EE" },
    "tokens": { ... },
    "css": ":root { --color-accent: #22D3EE; ... }"
  }
}`}
              />
            </section>

            {/* CLI Commands */}
            <section id="cli-commands" className="mb-20">
              <h2 className="text-3xl font-bold mb-4">3. CLI Commands</h2>
              <CodeBlock
                id="cli-docs"
                language="bash"
                code={`# Scan URL and generate local tokens.json
styleshift scan https://example.com -o ./design-tokens.json

# Apply aesthetic preset and output ready-to-use CSS
styleshift forge --input=./design-tokens.json --preset=glassmorphism --out=./theme.css

# Export full bundle with Tailwind config & Next.js component
styleshift export https://example.com --preset=quantum --zip`}
              />
            </section>

            {/* SDK */}
            <section id="sdk" className="mb-20">
              <h2 className="text-3xl font-bold mb-4">4. Node / TypeScript SDK</h2>
              <CodeBlock
                id="sdk-code"
                language="typescript"
                code={`import { analyzeWebsite } from "@/lib/analyzer";
import { generateTransformation } from "@/lib/transformer";

// Analyze website
const report = await analyzeWebsite("https://my-startup.io");

// Synthesize modern Cyber Neon design system
const result = generateTransformation(report, "cyber-neon");

console.log("Tokens:", result.tokens);
console.log("Custom CSS:", result.css);`}
              />
            </section>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
