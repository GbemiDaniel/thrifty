import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    let supabaseResponse = NextResponse.next({
        request: { headers: request.headers },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        {
            cookies: {
                getAll() { return request.cookies.getAll() },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()
    const pathname = request.nextUrl.pathname;

    // Define routes that require ANY logged-in user
    const protectedUserRoutes = ['/dashboard', '/orders', '/settings', '/wishlist', '/checkout'];
    
    // Check if the current path matches any protected route
    const isProtectedRoute = protectedUserRoutes.some(route => pathname.startsWith(route)) || pathname.startsWith('/admin');

    // 1. Protect Private Routes
    if (isProtectedRoute) {
        // Not logged in? Boot them to login.
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // If trying to access Admin, verify role in profiles table
        if (pathname.startsWith('/admin')) {
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
            if (!profile || profile.role !== 'admin') {
                // Logged in, but NOT an admin? Boot them to the homepage.
                return NextResponse.redirect(new URL('/', request.url)) 
            }
        }
    }

    // 2. Prevent logged-in users from seeing the Login page
    if (user && pathname === '/login') {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (profile?.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url))
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return supabaseResponse
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
