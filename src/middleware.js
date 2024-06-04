import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function middleware(request) {
  const session = await auth();
  console.log(session);
  console.log(request.url);
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: "/api/:path*",
    // DO NOT DO: matcher: "/products/:path*",
};
