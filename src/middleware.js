import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request) {
  const session = await auth();
    console.log(request.url);
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: "/api/:path*",
    // DO NOT DO: matcher: "/products/:path*",
};
