import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const cookie = await cookies();
    const isLogin = cookie.get("access_token");


    
    const currentPath = request.nextUrl.pathname;
    // if not login then go to login page and keep the state of which page want to go
    if ((currentPath !== "login" && !isLogin)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // if login then go dashboard page and can't go to login page
    if ((currentPath === "login" && isLogin)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // TODO:login check
    // if login then check role and check he have access of the page or not
    // then go desired page and also will implement double protection of the page with RoleGuardComponent and AuthGuard component and show dasboard menu based on their role
    return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    matcher: '/:path*',
}

