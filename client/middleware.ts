import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/browse',
  '/requests',
  '/admin'
]

// Define public routes that are always accessible
const publicRoutes = [
  '/',
  '/login',
  '/register'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if user is authenticated (you can modify this based on your auth implementation)
  const isAuthenticated = checkAuthentication(request)
  
  // If user is not authenticated and trying to access protected routes
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    // Redirect to login page
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // If user is authenticated and trying to access login/register pages
  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Allow the request to continue
  return NextResponse.next()
}

// Function to check if user is authenticated
function checkAuthentication(request: NextRequest): boolean {
  // Check for authentication token in cookies
  const token = request.cookies.get('auth-token')?.value
  const sessionToken = request.cookies.get('session-token')?.value
  
  // You can also check for other auth methods like:
  // - JWT tokens in Authorization header
  // - Session cookies
  // - API tokens
  
  // For now, we'll check if any auth token exists
  // In a real implementation, you would validate the token
  return !!(token || sessionToken)
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 