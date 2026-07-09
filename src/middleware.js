import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    // 1. Fixed the deprecated Next.js request syntax
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, // Note: Usually named _ANON_KEY, but leaving your naming to prevent breaks
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // This triggers token refresh if needed, attaching new cookies to supabaseResponse
    const { data: { user } } = await supabase.auth.getUser()
    const pathname = request.nextUrl.pathname;

    const protectedUserRoutes = ['/dashboard', '/orders', '/settings', '/wishlist', '/checkout'];
    const isProtectedRoute = protectedUserRoutes.some(route => pathname.startsWith(route)) || pathname.startsWith('/admin');

    // 2. NEW: Helper function to redirect WITHOUT deleting Supabase's refreshed cookies
    const redirectWithCookies = (path) => {
        const redirectUrl = new URL(path, request.url)
        const newResponse = NextResponse.redirect(redirectUrl)

        // Port all cookies over from the Supabase response to the new Redirect response
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            newResponse.cookies.set(cookie.name, cookie.value, cookie.options)
        })
        return newResponse
    }

    if (isProtectedRoute) {
        if (!user) {
            return redirectWithCookies('/login')
        }

        if (pathname.startsWith('/admin')) {
            // Because middleware runs on the Edge, we do a lightweight profile check
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
            if (!profile || profile.role !== 'admin') {
                return redirectWithCookies('/')
            }
        }
    }

    if (user && pathname === '/login') {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (profile?.role === 'admin') {
            return redirectWithCookies('/admin')
        } else {
            return redirectWithCookies('/')
        }
    }

    return supabaseResponse
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}