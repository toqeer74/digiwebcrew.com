import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { locales, defaultLocale } from './types/i18n';
export type { Locale } from './types/i18n';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip if it's an internal next.js path or api
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') // Admin usually stays non-localized or custom
  ) {
    return;
  }

  // 2. Check if the pathname already has a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 3. If pathname has locale, serve it
  if (pathnameHasLocale) {
    return NextResponse.rewrite(request.nextUrl);
  }

  // 4. If no locale, redirect to default locale (en) without prefix
  // For App Router, we need to rewrite to the [locale] folder
  return NextResponse.rewrite(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|admin).*)',
  ],
};
