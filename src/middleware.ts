import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("_accessToken");

  if (request.nextUrl.pathname === "/gate") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/manage", request.url));
    }
  }

  if (request.nextUrl.pathname === "/manage") {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/gate", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/gate/:path*", "/manage/:path*"],
};
