import { NextResponse, NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const isLogin = request.cookies.get("access_token");
    const token = isLogin?.value

    const currentPath = request.nextUrl.pathname;
    // if not login then go to login page and keep the state of which page want to go
    if ((currentPath !== "/login" && !isLogin)) {
        if (currentPath === "/registration") {
            return NextResponse.next()

        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    // if login then go dashboard page and can't go to login page
    if ((currentPath === "/login" && isLogin)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // TODO:login check
    // if login then check role and check he have access of the page or not
    // then go desired page and also will implement double protection of the page with RoleGuardComponent and AuthGuard component and show dasboard menu based on their role
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|images|assets|public|api/public).*)',
    ],
}

