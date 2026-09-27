"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, Sparkles, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, openLoginModal, openRegisterModal, logout, loading } = useAuth();

  const navLinks = [
    { href: "/product", label: "Product" },
    { href: "/how-ai-thinks", label: "How AI Thinks" },
    { href: "/preview-studio", label: "Preview Studio" },
    { href: "/security", label: "Security" },
    { href: "/integrations", label: "Integrations" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-3xl border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#22D3EE] via-[#A78BFA] to-[#C084FC] rounded-2xl flex items-center justify-center shadow-[0_0_40px_-10px_#22D3EE] transition-all group-hover:scale-105">
              <span className="text-[#020617] font-black text-xl tracking-[-1px]">SF</span>
            </div>
            <span className="font-semibold text-2xl md:text-3xl tracking-[-2px] text-white">StyleForge</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive ? "text-[#22D3EE]" : "text-white/80 hover:text-[#22D3EE]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons & Auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/docs"
              className="hidden xl:block px-6 py-2.5 text-sm font-medium border border-white/20 rounded-2xl hover:border-white/40 transition-all text-white/80 hover:text-white"
            >
              Docs
            </Link>

            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-3 px-4 py-2 border border-white/20 rounded-2xl hover:border-[#22D3EE]/50 transition-all bg-white/5 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#A78BFA] text-black font-bold text-xs flex items-center justify-center shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-white/90">
                        {user.name.split(" ")[0]}
                      </span>
                      <ChevronDown size={14} className="text-white/50" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-56 bg-[#0F172A] border border-white/10 rounded-2xl p-2 shadow-2xl z-50">
                        <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                          <div className="text-xs font-semibold text-white truncate">
                            {user.name}
                          </div>
                          <div className="text-[11px] text-white/50 truncate font-mono mt-0.5">
                            {user.email}
                          </div>
                        </div>

                        <Link
                          href="/preview-studio"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <Sparkles size={14} className="text-[#22D3EE]" />
                          <span>Preview Studio</span>
                        </Link>

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={openLoginModal}
                      className="px-6 py-2.5 border border-white/20 rounded-2xl text-sm font-medium hover:border-white/40 transition-all text-white/90 hover:text-white cursor-pointer"
                    >
                      Log in
                    </button>
                    <button
                      onClick={openRegisterModal}
                      className="px-8 py-2.5 bg-white text-black font-semibold rounded-2xl hover:bg-[#22D3EE] hover:text-white transition-all text-sm shadow-lg shadow-[#22D3EE]/20 cursor-pointer"
                    >
                      Get Started Free
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/preview-studio"
              className="px-4 py-2 bg-[#22D3EE] text-black font-semibold rounded-xl text-xs"
            >
              Studio
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#020617]/98 border-b border-white/10 px-8 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-medium ${
                  pathname === link.href ? "text-[#22D3EE]" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              {user ? (
                <div className="flex items-center justify-between py-2">
                  <div className="text-sm font-semibold text-white">
                    Logged in as {user.name}
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="text-xs text-red-400 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openLoginModal();
                    }}
                    className="py-3 text-center border border-white/20 rounded-2xl text-sm font-medium"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openRegisterModal();
                    }}
                    className="py-3 text-center bg-white text-black font-bold rounded-2xl text-sm"
                  >
                    Register
                  </button>
                </div>
              )}

              <Link
                href="/preview-studio"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#22D3EE] text-black font-bold rounded-2xl text-sm mt-2"
              >
                Launch Studio
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Global Auth Modal */}
      <AuthModal />
    </>
  );
}
