import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOGIN_REDIRECT } from "./config/route.config";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("session");
  const authenticated = !!accessToken;

  /**
    blocking auth if user has logged
  */
  if (request.nextUrl.pathname === "/gate") {
    if (authenticated) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }
    return;
  }

  /**
    blocking base route if user not loggin
  */

  if (!authenticated) {
    return NextResponse.redirect(new URL("/gate", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/gate/:path*", "/manage/:path*"],
};
