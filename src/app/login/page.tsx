"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(156,30,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(156,30,153,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-rht-violet/20 blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-rht-orange/15 blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rht-violet-light/10 blur-[100px]"
      />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 1.2, ease: "easeInOut" }}
          className="absolute h-1 w-1 rounded-full bg-rht-violet-light"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
        />
      ))}

      <motion.div
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-rht-violet-light/20 to-transparent"
      />
    </div>
  );
}

function HexagonIcon() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
      <motion.path
        d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
        stroke="url(#hexGrad)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M50 15 L82 33 L82 67 L50 85 L18 67 L18 33 Z"
        stroke="url(#hexGrad)"
        strokeWidth="0.5"
        fill="rgba(156,30,153,0.05)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9c1e99" />
          <stop offset="100%" stopColor="#c428c0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => router.push("/dashboard"), 800);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0a0810] p-4">
      <CyberGrid />

      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      <motion.a
        href="/"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute left-6 top-6 z-20 flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
      >
        <Shield className="h-4 w-4" />
        <span>CyberSense</span>
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-rht-violet/20 via-transparent to-rht-orange/10 blur-xl" />

        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl">
          <div className="mx-auto mb-6 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative mb-4 h-16 w-16"
            >
              <HexagonIcon />
              <Shield className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-rht-violet-light" />
            </motion.div>
            <h1 className="text-xl font-bold tracking-tight text-white">Welcome Back</h1>
            <p className="mt-1 text-sm text-white/40">Accédez à votre espace CyberSense</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium text-white/50">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  defaultValue="f.sow@saficongo.com"
                  className="h-11 border-white/[0.08] bg-white/[0.04] pl-10 text-white placeholder:text-white/20 focus:border-rht-violet/40 focus:ring-rht-violet/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium text-white/50">Mot de passe</Label>
                <button type="button" className="text-[11px] text-rht-violet-light/70 hover:text-rht-violet-light">Mot de passe oublié ?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  defaultValue="demo1234"
                  className="h-11 border-white/[0.08] bg-white/[0.04] pl-10 pr-10 text-white placeholder:text-white/20 focus:border-rht-violet/40 focus:ring-rht-violet/20"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="relative h-11 w-full overflow-hidden rounded-xl bg-gradient-to-r from-rht-violet to-rht-violet-light font-semibold text-white hover:opacity-90"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </motion.div>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-[10px] uppercase tracking-widest text-white/20">ou</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <div className="flex justify-center gap-3">
            {[
              { icon: (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm2.033 17.6c-.02.03-.7 1.22-2.312 1.22-1.222 0-1.634-.72-3.052-.72-1.456 0-1.99.7-3.122.74-1.342.05-2.362-1.32-3.382-2.63-2.093-2.7-2.423-5.87-1.07-7.55.958-1.19 2.478-1.93 3.868-1.93 1.438 0 2.34.72 3.528.72 1.152 0 1.856-.72 3.518-.72 1.222 0 2.582.66 3.538 1.8-3.108 1.7-2.602 6.13.486 7.32z" />
                </svg>
              ), label: "Apple" },
              { icon: (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              ), label: "Google" },
              { icon: (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ), label: "X" },
            ].map((provider) => (
              <motion.button
                key={provider.label}
                whileHover={{ scale: 1.05, borderColor: "rgba(156,30,153,0.3)" }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="flex h-10 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/60"
              >
                {provider.icon}
              </motion.button>
            ))}
          </div>

          <p className="mt-6 text-center text-[11px] text-white/25">
            Pas encore de compte ?{" "}
            <button className="font-medium text-rht-violet-light/70 hover:text-rht-violet-light">
              Contactez votre administrateur
            </button>
          </p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 text-[10px] text-white/15"
      >
        Rostel High-Tech — www.rostelhightech.com
      </motion.p>
    </div>
  );
}
