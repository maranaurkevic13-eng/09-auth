import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); 
  const { pathname } = req.nextUrl;

  // Якщо користувач неавторизований і відкриває приватний маршрут 
  if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Якщо користувач авторизований і відкриває публічний маршрут 
  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
