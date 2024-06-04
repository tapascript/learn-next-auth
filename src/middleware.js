import { NextResponse } from "next/server";

export function middleware(request) {
    console.log(request.url);
    return NextResponse.redirect(new URL("/products/1/checkout", request.url));
}

export const config = {
    matcher: "/products",
    // DO NOT DO: matcher: "/products/:path*",
};
