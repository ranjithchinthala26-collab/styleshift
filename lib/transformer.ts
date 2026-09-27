import { AnalysisReport } from "./analyzer";
import { StylePreset, STYLE_PRESETS } from "./presets";

export interface TransformedPackage {
  preset: StylePreset;
  css: string;
  tailwindConfig: string;
  tokens: Record<string, any>;
  componentCode: string;
  htmlPreview: string;
}

export function generateTransformation(
  report: AnalysisReport,
  presetId: string
): TransformedPackage {
  const preset = STYLE_PRESETS.find((p) => p.id === presetId) || STYLE_PRESETS[0];

  const tokens = {
    theme: preset.name,
    presetId: preset.id,
    targetUrl: report.url,
    colors: {
      accent: preset.color,
      background: preset.background,
      card: preset.cardBg,
      glow: preset.glowColor,
      textPrimary: preset.cssVariables["--text-primary"],
      textMuted: preset.cssVariables["--text-muted"],
    },
    typography: {
      fontFamily: preset.font,
      scale: {
        h1: "4.5rem",
        h2: "2.75rem",
        h3: "1.75rem",
        body: "1.0625rem",
      },
    },
    effects: {
      backdropBlur: "24px",
      cardBorder: preset.borderStyle,
      boxShadow: preset.previewStyles.accentGlow,
    },
  };

  const css = `/* StyleShift Generated Transformation: ${preset.name} */
/* Target Website: ${report.url} */
:root {
  --color-accent: ${preset.color};
  --color-bg-base: ${preset.background};
  --color-card-bg: ${preset.cardBg};
  --color-card-border: ${preset.borderStyle.replace('1px solid ', '')};
  --color-glow: ${preset.glowColor};
  --font-family-primary: ${preset.font};
  --shadow-accent-glow: ${preset.previewStyles.accentGlow};
}

body {
  background-color: var(--color-bg-base);
  color: #ffffff;
  font-family: var(--font-family-primary);
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

.styleshift-card {
  background: var(--color-card-bg);
  border: ${preset.borderStyle};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.styleshift-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: 0 10px 40px -10px var(--color-glow);
}

.styleshift-btn-primary {
  background: ${preset.previewStyles.buttonGradient};
  color: #000000;
  font-weight: 700;
  padding: 1rem 2.5rem;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 30px -5px var(--color-accent);
  transition: all 0.25s ease;
}

.styleshift-btn-primary:hover {
  transform: scale(1.03);
  filter: brightness(1.1);
}

.styleshift-glow-text {
  background: linear-gradient(135deg, #ffffff, var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
`;

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'shift-accent': '${preset.color}',
        'shift-bg': '${preset.background}',
        'shift-card': '${preset.cardBg}',
      },
      fontFamily: {
        'shift-font': ['${preset.font.split(',')[0].replace(/'/g, '')}', 'sans-serif'],
      },
      boxShadow: {
        'shift-glow': '${preset.previewStyles.accentGlow}',
      }
    }
  }
};`;

  const componentCode = `import React from 'react';

export default function TransformedHero() {
  return (
    <section className="min-h-screen bg-[${preset.background}] text-white flex items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border border-[${preset.color}]/40 text-[${preset.color}] mb-6">
          AI Transformation: ${preset.name}
        </span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          ${report.title}
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Redesigned with futuristic aesthetics, high-performance tokens, and micro-interactions.
        </p>
        <button className="px-10 py-4 bg-[${preset.color}] text-black font-semibold rounded-2xl shadow-[0_0_40px_-5px_${preset.color}] hover:scale-105 transition-all">
          Explore Redesign
        </button>
      </div>
    </section>
  );
}`;

  const htmlPreview = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${report.title} - ${preset.name} Redesign</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 2rem;
    }
    .hero-container {
      max-width: 800px;
    }
    .badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: ${preset.color};
      border: 1px solid ${preset.color}66;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 4rem;
      letter-spacing: -2px;
      margin-bottom: 1rem;
    }
    p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 1.25rem;
      margin-bottom: 2.5rem;
    }
  </style>
</head>
<body>
  <div class="hero-container">
    <div class="badge">Forged with ${preset.name}</div>
    <h1 class="styleshift-glow-text">${report.title}</h1>
    <p>Target URL: ${report.url} &bull; UX Score: ${report.uxScore}</p>
    <div class="styleshift-card">
      <h3>Detected Architecture</h3>
      <p style="font-size: 14px; margin: 12px 0;">${report.layout}</p>
      <button class="styleshift-btn-primary">Launch Interface</button>
    </div>
  </div>
</body>
</html>`;

  return {
    preset,
    css,
    tailwindConfig,
    tokens,
    componentCode,
    htmlPreview,
  };
}
