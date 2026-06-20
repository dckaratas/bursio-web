import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/verify-email",
  "/gizlilik",
  "/kullanim-kosullari",
  "/kvkk",
  "/hakkinda",
  "/iletisim",
  "/forgot-password",
  "/reset-password",
  "/verify-email/success",
  "/verify-email/error",
];

const ROLE_ROUTES: Record<string, string[]> = {
  STUDENT: ["/student"],
  DONOR: ["/donor"],
  ADMIN: ["/admin"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public route ise geç
  if (PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("bursio_token")?.value;
  const role = request.cookies.get("bursio_role")?.value;

  // Token yoksa login'e yönlendir
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Rol kontrolü
  for (const [requiredRole, routes] of Object.entries(ROLE_ROUTES)) {
    const isProtectedRoute = routes.some((route) => pathname.startsWith(route));
    if (isProtectedRoute && role !== requiredRole) {
      // Yanlış role sahip kullanıcıyı kendi paneline yönlendir
      if (role === "STUDENT") return NextResponse.redirect(new URL("/student/matches", request.url));
      if (role === "DONOR") return NextResponse.redirect(new URL("/donor/matches", request.url));
      if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", request.url));
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};