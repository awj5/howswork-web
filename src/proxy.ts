import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const country = req.headers.get("x-nf-country") ?? "unknown";
  const res = NextResponse.next();
  res.headers.set("x-country", country);
  console.log("Country:", country);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
