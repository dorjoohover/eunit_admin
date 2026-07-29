import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login'];
const assetsRoute = ['/assets', '/logo', '/icons'];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isAssetsRoute = assetsRoute.some((route) => path.startsWith(route));
  if (isAssetsRoute) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));
  const token = req.cookies.get('token')?.value;

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/users', req.nextUrl));
  }

  if (path === '/' && token) {
    return NextResponse.redirect(new URL('/users', req.nextUrl));
  }

  return NextResponse.next();
}

// Next.js-ийн middleware зөвхөн src/-ийн үндсэн түвшинд байвал ажиллана
// (src/app/middleware.ts-д байсан хуучин файл огт ажиллаагүй байсан).
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
