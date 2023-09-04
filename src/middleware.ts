import { AUTH_TOKEN, hasValidAuthTokens } from '@/lib/cookies';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const hasValidNextTokens = (request: NextRequest) => {
  const token = request.cookies.get(AUTH_TOKEN)?.value;
  const refreshToken = request.cookies.get(AUTH_TOKEN)?.value;

  return hasValidAuthTokens(token, refreshToken);
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!hasValidNextTokens(request)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // todo: handle case where navigation is towards login and user is logged in
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/authed',
};
