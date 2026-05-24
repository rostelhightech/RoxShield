"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Clock, LogOut } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
const WARNING_MS = 2 * 60 * 1000;  // 2 minutes warning

export function SessionTimeout() {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [loggingOut, setLoggingOut] = useState(false);
  const { locale } = useTranslation();
  const pathname = usePathname();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const warningRef = useRef<ReturnType<typeof setTimeout>>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval>>(null);

  const isAuthArea = pathname.startsWith("/dashboard") || pathname.startsWith("/employee") || pathname.startsWith("/admin");

  const clearAllTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  }, []);

  const doLogout = useCallback(() => {
    setLoggingOut(true);
    clearAllTimers();
    signOut({ callbackUrl: "/login?reason=timeout" });
  }, [clearAllTimers]);

  const resetTimers = useCallback(() => {
    if (!isAuthArea) return;

    setShowWarning(false);
    setCountdown(120);
    clearAllTimers();

    warningRef.current = setTimeout(() => {
      setShowWarning(true);
      setCountdown(120);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            doLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, TIMEOUT_MS - WARNING_MS);

    timeoutRef.current = setTimeout(() => {
      doLogout();
    }, TIMEOUT_MS);
  }, [isAuthArea, clearAllTimers, doLogout]);

  const handleStayConnected = useCallback(() => {
    setShowWarning(false);
    setCountdown(120);
    clearAllTimers();
    // Small delay to ensure state is clean before resetting
    setTimeout(() => resetTimers(), 50);
  }, [clearAllTimers, resetTimers]);

  const handleLogout = useCallback(() => {
    setLoggingOut(true);
    clearAllTimers();
    signOut({ callbackUrl: "/login" });
  }, [clearAllTimers]);

  useEffect(() => {
    if (!isAuthArea) return;

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    const resetOnActivity = () => {
      if (!showWarning) resetTimers();
    };

    events.forEach((event) => document.addEventListener(event, resetOnActivity, { passive: true }));
    resetTimers();

    return () => {
      events.forEach((event) => document.removeEventListener(event, resetOnActivity));
      clearAllTimers();
    };
  }, [isAuthArea, resetTimers, showWarning, clearAllTimers]);

  if (!isAuthArea || !showWarning) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 mx-4 w-full max-w-[400px] rounded-xl border border-border bg-popover p-6 shadow-2xl">
        <div className="flex items-center gap-2 text-destructive">
          <Clock className="h-5 w-5" />
          <h2 className="text-lg font-semibold">
            {locale === "en" ? "Session Expiring" : "Session expirante"}
          </h2>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "Your session will expire due to inactivity."
              : "Votre session va expirer pour cause d'inactivité."}
          </p>

          <div className="flex items-center justify-center rounded-xl bg-destructive/10 py-4">
            <span className="text-3xl font-bold tabular-nums text-destructive">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              <LogOut className="h-4 w-4" />
              {locale === "en" ? "Log out" : "Déconnexion"}
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-rht-violet to-rht-violet-light text-white hover:opacity-90"
              onClick={handleStayConnected}
              disabled={loggingOut}
            >
              {locale === "en" ? "Stay connected" : "Rester connecté"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
