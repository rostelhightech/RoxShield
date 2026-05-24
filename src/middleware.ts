import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const protectedPaths = ["/dashboard", "/employee", "/admin"];
const publicPaths = ["/", "/login", "/pricing", "/about", "/demo", "/contact", "/legal"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  // Check if the path is protected
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users from login page to their home
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

  // Role-based access control
  if (isAuthenticated) {
    const role = (req.auth as any)?.user?.role;

    // /admin — only SUPER_ADMIN
    if (pathname.startsWith("/admin") && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // /dashboard — ADMIN and SUPER_ADMIN only (not employees)
    // Exception: employees can access /dashboard/training/* for learning modules
    if (pathname.startsWith("/dashboard") && role === "EMPLOYEE") {
      if (!pathname.startsWith("/dashboard/training")) {
        return NextResponse.redirect(new URL("/employee", req.url));
      }
    }

    // /employee — EMPLOYEE only (admins go to dashboard)
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
