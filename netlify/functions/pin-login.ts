import type { Handler, Config } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

// Rate limit this endpoint (soft limit)
// 8 requests per 5 minutes, aggregated by IP + domain
export const config: Config = {
  path: "/api/pin-login",
  rateLimit: {
    windowLimit: 8,
    windowSize: 300, // seconds
    aggregateBy: ["ip", "domain"],
  },
};

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload: { companyID?: number; pin?: number } = {};
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request." }) };
  }

  const { companyID, pin } = payload;

  if (!companyID || !pin) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing details." }) };
  }

  const { data, error } = await supabase
    .from("check_ins")
    .select("id")
    .eq("company_id", companyID)
    .eq("pin", pin)
    .eq("status", "Open")
    .limit(1);

  if (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Something went wrong. Please try again." }) };
  }

  if (!data?.length) {
    return { statusCode: 401, body: JSON.stringify({ error: "That PIN doesn't look right. Please try again." }) };
  }

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
