export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * - .svg (SVG file)
     * - excluded paths (e.g. static screen path)
     */
    "/((?!login|api|_next/static|favicon.ico|.*\\.svg|auth/logout|dashboard).*)",
  ],
};
