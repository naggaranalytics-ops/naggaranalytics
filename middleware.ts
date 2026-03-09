import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
    const acceptLang = request.headers.get('accept-language') || '';
    if (acceptLang.toLowerCase().startsWith('ar')) return 'ar';
    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip API routes, Next.js internals, and static files
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Check if pathname already has a locale prefix
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect to locale-prefixed path
    const locale = pathname === '/' ? getLocale(request) : defaultLocale;
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
