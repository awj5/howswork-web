import type { Handler, Config } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  let payload: { companyID?: number; pin?: number } = {};

  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request." }) };
  }

  const { companyID, pin } = payload;

  if (!companyID || !pin) return { statusCode: 400, body: JSON.stringify({ error: "Missing details." }) };

  const { data, error } = await supabase
    .from("check_ins")
    .select("*")
    .eq("company_id", companyID)
    .eq("pin", pin)
    .eq("status", "Open")
    .limit(1);

  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  if (!data.length) return { statusCode: 401, body: JSON.stringify({ error: "Pin is invalid." }) };
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
