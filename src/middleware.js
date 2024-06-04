import { NextResponse } from "next/server";

export function middleware(request) {
    console.log(request.url);
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: "/api/:path*",
    // DO NOT DO: matcher: "/products/:path*",
};
