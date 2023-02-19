// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    
    const response = NextResponse.next()
    const cookie = request.cookies.get('token');

    if (cookie || request.url === '/') {
        return response
    }
    else {
        const homeUrl = process.env.NEXT_PUBLIC_BDESH_URL;
        return NextResponse.redirect(homeUrl + '/');
    }
}

export const config = {
    matcher: ['/leads'],
};
