"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, User as UserIcon, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    register,
  } = useAuth();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestRegister, setSuggestRegister] = useState(false);

  if (!isAuthModalOpen) return null;

  const resetForm = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSuggestRegister(false);
  };

  const handleModeSwitch = (mode: "login" | "register") => {
    setAuthModalMode(mode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSuggestRegister(false);

    if (authModalMode === "register") {
      if (!name.trim()) {
        setErrorMsg("Please enter your name.");
        return;
      }
      if (!email.trim() || !email.includes("@")) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }

      setIsSubmitting(true);
      const res = await register(name, email, password);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMsg("Account created! Logging you in...");
      } else {
        setErrorMsg(res.error || "Registration failed.");
      }
    } else {
      // Login mode
      if (!email.trim() || !email.includes("@")) {
        setErrorMsg("Please enter your email address.");
        return;
      }
      if (!password) {
        setErrorMsg("Please enter your password.");
        return;
      }

      setIsSubmitting(true);
      const res = await login(email, password);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMsg("Successfully logged in!");
      } else {
        setErrorMsg(res.error || "Invalid credentials.");
        if (res.notRegistered) {
          setSuggestRegister(true);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-md bg-[#0F172A] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden text-white"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#22D3EE]/15 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5"
        >
          <X size={20} />
        </button>

        {/* Header with SF Icon */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-[#22D3EE] via-[#A78BFA] to-[#C084FC] rounded-2xl flex items-center justify-center shadow-[0_0_30px_-5px_#22D3EE] mb-4">
            <span className="text-[#020617] font-black text-xl tracking-[-1px]">SF</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            {authModalMode === "login" ? "Welcome back" : "Create your account"}
          </h3>
          <p className="text-sm text-white/50 mt-1">
            {authModalMode === "login"
              ? "Access your saved website aesthetics & export history."
              : "Start forging futuristic web aesthetics with StyleShift."}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => handleModeSwitch("login")}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              authModalMode === "login"
                ? "bg-white text-black shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch("register")}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              authModalMode === "register"
                ? "bg-white text-black shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* Alert banners */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex flex-col gap-2">
            <span>{errorMsg}</span>
            {suggestRegister && (
              <button
                type="button"
                onClick={() => handleModeSwitch("register")}
                className="underline font-semibold text-left text-[#22D3EE] hover:text-white"
              >
                Click here to register this email instead &rarr;
              </button>
            )}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === "register" && (
            <div>
              <label className="block text-xs font-mono text-white/60 uppercase mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ranjith Kumar"
                  required
                  className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#22D3EE] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-white/60 uppercase mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                required
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#22D3EE] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-white/60 uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#22D3EE] transition-colors"
              />
            </div>
          </div>

          {authModalMode === "register" && (
            <div>
              <label className="block text-xs font-mono text-white/60 uppercase mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#22D3EE] transition-colors"
                />
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 mt-2 bg-gradient-to-r from-[#22D3EE] to-[#A78BFA] text-black font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#22D3EE]/25 hover:shadow-[#22D3EE]/40 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>
                  {authModalMode === "login"
                    ? "Log In with Credentials"
                    : "Create Account & Sign In"}
                </span>
                <ArrowRight size={16} />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer switch prompt */}
        <div className="mt-6 text-center text-xs text-white/50">
          {authModalMode === "login" ? (
            <p>
              New to StyleShift?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("register")}
                className="text-[#22D3EE] hover:underline font-semibold"
              >
                Register now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("login")}
                className="text-[#22D3EE] hover:underline font-semibold"
              >
                Log in here
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
