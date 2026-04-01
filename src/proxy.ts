import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // 1. Grab the country from the incoming header
  const country = request.headers.get("x-country") ?? "unknown";

  // 2. We clone the request headers.
  // Modifying the 'request' is safer than modifying the 'res'
  // because it ensures the Next.js router sees the header
  // BEFORE it tries to find the page.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-country", country);

  // 3. Create the response by passing the new headers DOWNSTREAM
  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 4. Set the cookie on the response
  res.cookies.set("x-country", country, {
    path: "/",
    sameSite: "lax",
    secure: true,
  });

  return res;
}

export const config = {
  matcher: [
    /*
     * The regex looks solid, but ensure there are no spaces
     * and that _next/data is absolutely excluded.
     */
    "/((?!_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
