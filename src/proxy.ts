import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const country = req.headers.get("x-nf-country") ?? "unknown";
  const res = NextResponse.next();
  res.headers.set("x-country", country);
  const allHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    allHeaders[key] = value;
  });
  console.log("All headers:", JSON.stringify(allHeaders));
  console.log("Country:", country);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
