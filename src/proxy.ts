import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Next.js 16 : le fichier s'appelle proxy.ts (middleware.ts est déprécié)
// Le proxy s'exécute en Node.js runtime par défaut — pas besoin de "export const runtime"

const protectedPaths = ["/dashboard", "/employee", "/admin"];

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  // Paths protégés — rediriger vers login si non authentifié
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rediriger les utilisateurs connectés hors de la page login
  if (pathname === "/login" && isAuthenticated) {
    const role = (req.auth as any)?.user?.role;
    if (role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (role === "EMPLOYEE") {
      return NextResponse.redirect(new URL("/employee", req.url));
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Contrôle d'accès par rôle
  if (isAuthenticated) {
    const role = (req.auth as any)?.user?.role;

    // /admin — SUPER_ADMIN uniquement
    if (pathname.startsWith("/admin") && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // /dashboard — ADMIN et SUPER_ADMIN uniquement
    // Exception : les employés peuvent accéder à /dashboard/training/*
    if (pathname.startsWith("/dashboard") && role === "EMPLOYEE") {
      if (!pathname.startsWith("/dashboard/training")) {
        return NextResponse.redirect(new URL("/employee", req.url));
      }
    }

    // /employee — EMPLOYEE uniquement
    if (pathname.startsWith("/employee") && role !== "EMPLOYEE") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|sitemap.xml|robots.txt).*)",
  ],
};
