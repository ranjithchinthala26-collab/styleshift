# StyleShift: Bridging Versions with Custom Web Aesthetics
### AI-Powered Website Intelligence & Futuristic Aesthetic Transformation Studio

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.21-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)](https://www.sqlite.org/)

---

## 🌟 Overview

**StyleShift** (also known as **StyleForge**) is a full-stack AI-driven web aesthetic transformation platform. It analyzes legacy or modern website URLs, extracts their structural layout, color harmonies, component trees, and UX metrics, and allows developers & designers to re-forge their web applications with breathtaking futuristic visual aesthetics:

1. **Cyber Neon**: Vaporwave + electric saturated glow (`#22D3EE`)
2. **Glassmorphism Pro**: Multi-depth frosted glass & soft specular highlights (`#A78BFA`)
3. **Apple Minimal**: Luxury monospaced clarity and intentional whitespace (`#FFFFFF`)
4. **Quantum Gradient**: Shifting holographic energy fields and mesh gradients (`#C084FC`)
5. **Holographic UI**: Floating volumetric light layers and cyan accents (`#67E8F9`)
6. **Liquid Metal**: Chrome reflections and synth-cyberpunk glow (`#F472B6`)

Live Demo URL: **[https://styleforge-peach.vercel.app/preview-studio](https://styleforge-peach.vercel.app/preview-studio)**

---

## 📂 Project Architecture

```
C:\Users\Ranjith\webapp\styleshift/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts # Register new user (password hashing with scrypt + JWT cookie)
│   │   │   ├── login/route.ts    # Login existing user with credential verification
│   │   │   ├── me/route.ts       # Session validation & current user profile
│   │   │   └── logout/route.ts   # Clears session cookie
│   │   ├── analyze/route.ts      # Website scraping & DOM intelligence API
│   │   ├── transform/route.ts    # Aesthetic synthesis & token generation API
│   │   ├── verify/route.ts       # Domain ownership authorization API
│   │   ├── export/route.ts       # Zip bundle generator with CSS/Tailwind
│   │   └── history/route.ts      # Query past analyses & transformations
│   ├── preview-studio/
│   │   └── page.tsx              # Interactive Preview Studio (Exact live UI)
│   ├── product/
│   │   └── page.tsx              # Deep product tour & animated stats
│   ├── how-ai-thinks/
│   │   └── page.tsx              # 4-stage neural pipeline presentation
│   ├── security/
│   │   └── page.tsx              # Enterprise sandboxing & compliance
│   ├── integrations/
│   │   └── page.tsx              # Ecosystem tools (GitHub, Figma, Vercel)
│   ├── docs/
│   │   └── page.tsx              # Documentation & interactive code snippets
│   ├── globals.css               # Futuristic keyframes, ambient glow & dark theme
│   ├── layout.tsx                # Root layout with Inter font & dark theme
│   └── page.tsx                  # High-conversion landing page
├── components/
│   ├── AuthModal.tsx             # Futuristic Log In & Registration modal
│   ├── Navbar.tsx                # Glassmorphism navbar with user profile dropdown
│   └── Footer.tsx                # Footer with status, links, and copyright
├── context/
│   └── AuthContext.tsx           # Global authentication state, login/register/logout hooks
├── lib/
│   ├── auth.ts                   # Password hashing (scryptSync) & signed session tokens
│   ├── analyzer.ts               # URL fetcher, Cheerio parser & UX scorer
│   ├── presets.ts                # 6 Futuristic design presets & tokens
│   ├── transformer.ts            # CSS generator & template compiler
│   ├── exporter.ts               # JSZip archive packager
│   └── prisma.ts                 # Database client singleton
├── prisma/
│   └── schema.prisma             # SQLite schema (User, Analyses, Styles, Verification)
├── tailwind.config.ts            # Custom cyber colors & keyframe animations
├── tsconfig.json                 # TypeScript compiler options
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies & scripts
└── .env                          # Local database & environment variables
```

---

## 🔐 Authentication System (Register / Login)

The platform provides a complete credential authentication system:

- **New Users**:
  - Click **Log In** or **Get Started Free** in the navbar to open the Auth Modal.
  - Switch to **Register** tab.
  - Enter Full Name, Email, Password (min 6 characters), and Password Confirmation.
  - Password is hashed using salted `scrypt` cryptography.
  - Prevents duplicate registration if the email already exists in the SQLite database and guides user to log in.
  - Automatically signs in the new user and issues a secure signed session cookie.

- **Existing Users**:
  - Switch to **Log In** tab in the Auth Modal.
  - Enter Email and Password.
  - Timing-safe hash comparison verifies credentials.
  - If email is not found, displays a notice: *"No account found with this email. Please register."* with a 1-click switch to the Register form.
  - If password is wrong, securely displays: *"Invalid password. Please check your credentials."*
  - On success, sets HTTP-only session cookie and displays the user's name and avatar in the navigation bar.
  - User can view their profile and click **Sign Out** anytime.

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- **Node.js**: v18.17+ or v20+ (v22 tested)
- **npm** or **pnpm** or **yarn**

### 1. Open Project Directory
```powershell
cd C:\Users\Ranjith\webapp\styleshift
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Initialize SQLite Database
```powershell
npx prisma db push
```

### 4. Start Development Server
```powershell
npm run dev
```

Navigate to:
- **Preview Studio**: `http://localhost:3000/preview-studio`
- **Home Page**: `http://localhost:3000/`
- **Product Architecture**: `http://localhost:3000/product`
- **How AI Thinks**: `http://localhost:3000/how-ai-thinks`
- **Security**: `http://localhost:3000/security`
- **Integrations**: `http://localhost:3000/integrations`
- **Developer Docs**: `http://localhost:3000/docs`

---

## ⚡ Fullstack API Endpoints

### Authentication APIs
* `POST /api/auth/register` - Create new user account with hashed password.
* `POST /api/auth/login` - Verify user credentials and generate session token.
* `GET /api/auth/me` - Validate session and retrieve current user profile.
* `POST /api/auth/logout` - Invalidate session and clear cookie.

### Core Application APIs
* `POST /api/analyze` - Scrapes target website, parses DOM hierarchy, detects components, colors, and calculates UX score.
* `POST /api/transform` - Synthesizes custom CSS tokens and stylesheets for selected preset (Cyber Neon, Glassmorphism, Apple Minimal, Quantum, Holographic, Liquid Metal).
* `POST /api/verify` - Validates domain ownership authorization.
* `POST /api/export` - Compiles and downloads `.zip` package with `styles.css`, `tokens.json`, `tailwind.config.js`, and `index.html`.
* `GET /api/history` - Fetches previous website analyses and transformations from SQLite.
