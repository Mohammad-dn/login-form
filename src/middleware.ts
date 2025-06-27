import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.cookies.get("auth");

  const isAuth = auth?.value === "true";
  console.log("🚀 ~ middleware ~ isAuth:", isAuth);
  const { pathname } = request.nextUrl;

  if (pathname === "/auth" && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && !isAuth) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth", "/dashboard/:path*"],
};
