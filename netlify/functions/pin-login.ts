import type { Config } from "@netlify/functions";
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

export default async (req: Request) => {
  try {
    const { companyID, pin } = await req.json();

    const { data: checkInData, error: checkInError } = await supabase
      .from("check_ins")
      .select("*")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", "Open")
      .limit(1);

    if (checkInError) throw checkInError;
    if (!checkInData.length) return Response.json({ error: "Pin is invalid." }, { status: 401 });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
