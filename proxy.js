// middleware.js
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth";

export async function proxy(request) {
    const user = await getUserFromSession();
    const { pathname } = request.nextUrl;

    // If user is not authenticated AND the current path is NOT the login page
    // (to avoid infinite redirects due to /admin is also the login page)
    if (!user && pathname !== "/admin") { 
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/suites/:path*"], // Use the wildcard for protection
};