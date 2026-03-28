import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const country = req.headers.get("x-country") ?? "unknown";
  const res = NextResponse.next();
  res.headers.set("x-country", country);
  res.cookies.set("x-country", country, { path: "/", sameSite: "lax" });
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
