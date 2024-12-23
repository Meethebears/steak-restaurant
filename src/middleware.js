import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    const user = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    console.log('User', user)

    if (!user) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Get the pathname of the request
    const { pathname } = request.nextUrl

    // If the pathname starts with /protected and the user is not an admin, redirect to the home page
    if (
        pathname.startsWith('/home') &&
        (!user || user.role !== 'admin')
    ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Continue with the request if the user is an admin or the route is not protected
    return NextResponse.next()
}
export const config = {
    matcher: ['/home/:path*', '/dashboard/:path*','/addproduct/:path*'],
}