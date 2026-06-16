import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession();
      if (session?.accessToken && session?.refreshToken) {
        const res = NextResponse.next();
        res.cookies.set("accessToken", session.accessToken);
        res.cookies.set("refreshToken", session.refreshToken);
        return res;
      }
    } catch (err) {
      console.error("Session refresh failed:", err);
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (!accessToken && privateRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (accessToken && publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};


