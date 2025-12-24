import type { Handler, Config, Context } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Rate limit
export const config: Config = {
  path: "/.netlify/functions/pin-login",
  rateLimit: {
    windowLimit: 3, // Requests
    windowSize: 60, // 1 min
    aggregateBy: ["ip", "domain"],
  },
};

export default async (request: Request, context: Context) => {
  if (request.method !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  let payload: { companyID?: number; pin?: number } = {};

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { companyID, pin } = payload;

  if (!companyID || !pin) return Response.json({ error: "Missing details." }, { status: 400 });

  const { data, error } = await supabase
    .from("check_ins")
    .select("*")
    .eq("company_id", companyID)
    .eq("pin", pin)
    .eq("status", "Open")
    .limit(1);

  if (error) return Response.json({ error: "Server error." }, { status: 500 });
  if (!data?.length) return Response.json({ error: "Pin is invalid." }, { status: 401 });
  return Response.json({ success: true }, { status: 200 });
};
