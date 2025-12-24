import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const config = {
  path: "/api/pin-login",
  rateLimit: {
    windowLimit: 3,
    windowSize: 60,
    aggregateBy: ["ip"],
  },
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { companyID, pin } = await req.json();

  const { data, error } = await supabase
    .from("check_ins")
    .select("id")
    .eq("company_id", companyID)
    .eq("pin", pin)
    .eq("status", "Open")
    .limit(1);

  if (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }

  if (!data?.length) {
    return new Response(JSON.stringify({ error: "Pin is invalid" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
