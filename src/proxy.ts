import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const country = request.headers.get("x-country") ?? "unknown";
  const res = NextResponse.next();
  res.headers.set("x-country", country);
  res.cookies.set("x-country", country, { path: "/", sameSite: "lax" });
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
