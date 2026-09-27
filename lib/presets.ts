export interface StylePreset {
  id: string;
  name: string;
  color: string;
  desc: string;
  tagline: string;
  font: string;
  background: string;
  cardBg: string;
  borderStyle: string;
  glowColor: string;
  cssVariables: Record<string, string>;
  previewStyles: {
    heroBg: string;
    cardBorder: string;
    accentGlow: string;
    buttonGradient: string;
  };
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "cyber-neon",
    name: "Cyber Neon",
    color: "#22D3EE",
    desc: "Vaporwave + electric glow",
    tagline: "High-contrast cybernetic aesthetic with saturated neon lines and dark grids",
    font: "Space Grotesk, JetBrains Mono, sans-serif",
    background: "#030712",
    cardBg: "rgba(15, 23, 42, 0.75)",
    borderStyle: "1px solid rgba(34, 211, 238, 0.4)",
    glowColor: "rgba(34, 211, 238, 0.5)",
    cssVariables: {
      "--accent": "#22D3EE",
      "--accent-glow": "0 0 25px rgba(34, 211, 238, 0.45)",
      "--bg-base": "#030712",
      "--card-bg": "rgba(17, 24, 39, 0.8)",
      "--card-border": "rgba(34, 211, 238, 0.3)",
      "--text-primary": "#FFFFFF",
      "--text-muted": "#94A3B8",
    },
    previewStyles: {
      heroBg: "radial-gradient(ellipse at 50% 0%, rgba(34, 211, 238, 0.15) 0%, #030712 70%)",
      cardBorder: "1px solid rgba(34, 211, 238, 0.35)",
      accentGlow: "0 0 40px -10px #22D3EE",
      buttonGradient: "linear-gradient(135deg, #22D3EE, #06B6D4)",
    },
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism Pro",
    color: "#A78BFA",
    desc: "Frosted depth & blur",
    tagline: "Translucent layers, multi-depth backdrop blur, and soft specular highlights",
    font: "Inter, system-ui, sans-serif",
    background: "#080614",
    cardBg: "rgba(255, 255, 255, 0.04)",
    borderStyle: "1px solid rgba(255, 255, 255, 0.12)",
    glowColor: "rgba(167, 139, 250, 0.35)",
    cssVariables: {
      "--accent": "#A78BFA",
      "--accent-glow": "0 0 30px rgba(167, 139, 250, 0.4)",
      "--bg-base": "#080614",
      "--card-bg": "rgba(255, 255, 255, 0.05)",
      "--card-border": "rgba(255, 255, 255, 0.15)",
      "--text-primary": "#FFFFFF",
      "--text-muted": "#A1A1AA",
    },
    previewStyles: {
      heroBg: "radial-gradient(circle at 50% 20%, rgba(167, 139, 250, 0.18) 0%, #080614 70%)",
      cardBorder: "1px solid rgba(255, 255, 255, 0.15)",
      accentGlow: "0 0 50px -10px #A78BFA",
      buttonGradient: "linear-gradient(135deg, #A78BFA, #8B5CF6)",
    },
  },
  {
    id: "apple-minimal",
    name: "Apple Minimal",
    color: "#FFFFFF",
    desc: "Clean luxury whitespace",
    tagline: "Precision typographic hierarchy, micro-interactions, and deep monospaced clarity",
    font: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    background: "#000000",
    cardBg: "#121214",
    borderStyle: "1px solid rgba(255, 255, 255, 0.1)",
    glowColor: "rgba(255, 255, 255, 0.2)",
    cssVariables: {
      "--accent": "#FFFFFF",
      "--accent-glow": "0 0 20px rgba(255, 255, 255, 0.2)",
      "--bg-base": "#000000",
      "--card-bg": "#121214",
      "--card-border": "rgba(255, 255, 255, 0.08)",
      "--text-primary": "#F5F5F7",
      "--text-muted": "#86868B",
    },
    previewStyles: {
      heroBg: "radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.08) 0%, #000000 60%)",
      cardBorder: "1px solid rgba(255, 255, 255, 0.1)",
      accentGlow: "0 0 30px rgba(255, 255, 255, 0.15)",
      buttonGradient: "linear-gradient(180deg, #FFFFFF, #E5E5E5)",
    },
  },
  {
    id: "quantum",
    name: "Quantum Gradient",
    color: "#C084FC",
    desc: "Holographic energy fields",
    tagline: "Dynamic mesh gradients, shifting spectral waves, and cosmic lighting",
    font: "Outfit, Plus Jakarta Sans, sans-serif",
    background: "#090418",
    cardBg: "rgba(20, 10, 36, 0.8)",
    borderStyle: "1px solid rgba(192, 132, 252, 0.3)",
    glowColor: "rgba(192, 132, 252, 0.4)",
    cssVariables: {
      "--accent": "#C084FC",
      "--accent-glow": "0 0 35px rgba(192, 132, 252, 0.45)",
      "--bg-base": "#090418",
      "--card-bg": "rgba(24, 12, 44, 0.8)",
      "--card-border": "rgba(192, 132, 252, 0.25)",
      "--text-primary": "#FAF5FF",
      "--text-muted": "#D8B4FE",
    },
    previewStyles: {
      heroBg: "linear-gradient(135deg, #090418 0%, #170933 50%, #05020D 100%)",
      cardBorder: "1px solid rgba(192, 132, 252, 0.3)",
      accentGlow: "0 0 60px -10px #C084FC",
      buttonGradient: "linear-gradient(135deg, #C084FC, #9333EA)",
    },
  },
  {
    id: "holographic",
    name: "Holographic UI",
    color: "#67E8F9",
    desc: "Floating light layers",
    tagline: "Volumetric luminance, iridescent accents, and airy futuristic spatial cards",
    font: "Syne, Inter, sans-serif",
    background: "#030A14",
    cardBg: "rgba(8, 25, 44, 0.65)",
    borderStyle: "1px solid rgba(103, 232, 249, 0.35)",
    glowColor: "rgba(103, 232, 249, 0.4)",
    cssVariables: {
      "--accent": "#67E8F9",
      "--accent-glow": "0 0 35px rgba(103, 232, 249, 0.4)",
      "--bg-base": "#030A14",
      "--card-bg": "rgba(10, 31, 56, 0.7)",
      "--card-border": "rgba(103, 232, 249, 0.3)",
      "--text-primary": "#F0FDFF",
      "--text-muted": "#A5F3FC",
    },
    previewStyles: {
      heroBg: "radial-gradient(ellipse at 50% 30%, rgba(103, 232, 249, 0.16) 0%, #030A14 80%)",
      cardBorder: "1px solid rgba(103, 232, 249, 0.3)",
      accentGlow: "0 0 45px -5px #67E8F9",
      buttonGradient: "linear-gradient(135deg, #67E8F9, #0891B2)",
    },
  },
  {
    id: "liquid-metal",
    name: "Liquid Metal",
    color: "#F472B6",
    desc: "Chrome liquid reflections",
    tagline: "Molten chrome highlights, metallic Sheen textures, and synth-cyberpunk glow",
    font: "Cabinet Grotesk, Satoshi, sans-serif",
    background: "#0D040A",
    cardBg: "rgba(28, 9, 21, 0.8)",
    borderStyle: "1px solid rgba(244, 114, 182, 0.35)",
    glowColor: "rgba(244, 114, 182, 0.4)",
    cssVariables: {
      "--accent": "#F472B6",
      "--accent-glow": "0 0 35px rgba(244, 114, 182, 0.45)",
      "--bg-base": "#0D040A",
      "--card-bg": "rgba(35, 12, 26, 0.85)",
      "--card-border": "rgba(244, 114, 182, 0.3)",
      "--text-primary": "#FFF1F2",
      "--text-muted": "#FBCFE8",
    },
    previewStyles: {
      heroBg: "radial-gradient(ellipse at 50% 20%, rgba(244, 114, 182, 0.18) 0%, #0D040A 75%)",
      cardBorder: "1px solid rgba(244, 114, 182, 0.3)",
      accentGlow: "0 0 50px -10px #F472B6",
      buttonGradient: "linear-gradient(135deg, #F472B6, #DB2777)",
    },
  },
];
