import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#05070F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "StyleForge – AI-Powered Website Intelligence | StyleShift",
  description:
    "StyleShift: Bridging Versions with Custom Web Aesthetics. Analyze any website and generate futuristic design transformations using intelligent UI pattern recognition and multi-modal AI.",
  keywords: [
    "StyleShift",
    "StyleForge",
    "AI website redesign",
    "UI transformation",
    "design intelligence",
    "website analyzer",
    "futuristic UI",
    "AI design tool",
  ],
  authors: [{ name: "StyleForge Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased dark`}>
      <body className="bg-[#05070F] text-white min-h-screen selection:bg-[#22D3EE]/30 selection:text-white flex flex-col justify-between font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
