import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const country = request.headers.get("x-nf-country") ?? "unknown";
  const res = NextResponse.next();
  res.headers.set("x-country", country);
  res.cookies.set("x-country", country, { path: "/", sameSite: "lax" });
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
