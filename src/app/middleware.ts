import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// const publicRoutes = ["/login"];
const assetsRoute = ["/assets"];

async function middleware(req: NextRequest) {
  console.log(req);
  const path = req.nextUrl.pathname;

  // const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));
  const isAssetsRoute = assetsRoute.some((route) => path.startsWith(route));

  // Redirect '/' to '/users'
  if (path === "/") {
    return NextResponse.redirect(new URL("/users", req.nextUrl));
  }

  if (isAssetsRoute) {
    return NextResponse.next();
  }

  // Uncomment this if you want authentication handling
  // const session = await auth();
  // if ((!isPublicRoute && !session) || path === "/") {
  //   return NextResponse.redirect(new URL("/login", req.nextUrl));
  // }
  // if (isPublicRoute && session && !path.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  // }

  return NextResponse.next();
}

// Wrap middleware with `auth`
export default auth(middleware);

// Improved matcher to exclude Next.js static files and API routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
