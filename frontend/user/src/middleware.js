import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies?.get("token")?.value;
  if (pathname.startsWith("/auth/") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
