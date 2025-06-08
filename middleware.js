// middleware.js
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth";

export async function middleware(request) {
    const user = await getUserFromSession();
    const { pathname } = request.nextUrl;

    // If user is not authenticated AND the current path is NOT the login page
    // (to avoid infinite redirects if /admin is also your login)
    if (!user && pathname !== "/admin") { // Assuming '/admin' is where unauthenticated users are redirected
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"], // This correctly uses the wildcard for protection
};