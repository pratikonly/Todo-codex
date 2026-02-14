import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/study-tracker", "/analytics", "/leaderboard", "/ai-planner", "/profile", "/settings"];

export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get("edupilot_session")?.value);
  if (!hasSession && protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
