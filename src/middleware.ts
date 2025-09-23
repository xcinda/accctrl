
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function middleware(request: NextRequest) {
    const headersList = await headers();
    const remoteUser = (headersList.get('http_x_remote_user') ?? "").split('\\').pop();
    const userAdminStatus = (await (fetch("http://soua1ap09.a1.sou-pha.justice.cz/api/isUserAdmin", {
      method: "POST",
      body: JSON.stringify({ username: remoteUser }),
      }
    )).then((promise) => promise.json())).isUserAdmin;
    if (!userAdminStatus) {
        return NextResponse.rewrite(new URL('/unauthorised', request.url))
    }
}

export const config = {
    matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/isUserAdmin (For Auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - unauthorised page
     */
    '/((?!api/isUserAdmin|_next/static|_next/image|favicon.ico|unauthorised).*)',
  ],
}
