import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const country = req.headers.get("x-country") ?? "unknown";
  console.log("Country:", country);
  const res = NextResponse.next();
  res.headers.set("x-country", country);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
