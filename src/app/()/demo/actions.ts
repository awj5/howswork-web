"use server";

import { isValidEmail } from "@/utils/helpers";
import resend from "@/utils/resend";

export async function requestDemo(formData: FormData) {
  let email = formData.get("email") as string;
  email = email.trim().toLowerCase();
  if (!isValidEmail(email)) return { error: "Email is invalid" };

  try {
    // Save to Resend
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    // Send email
    const send = await resend.emails.send({
      from: "HowsWork <no-reply@updates.howswork.app>",
      to: "support@howswork.app",
      subject: "Demo request",
      html: `<p>First name: ${formData.get("first-name")}<br />Last name: ${formData.get("last-name")}<br />Company: ${formData.get("company")}<br />Email: ${email}<br />Message:<br />${(formData.get("message") as string)?.replace(/\n/g, "<br />")}</p>`,
    });

    if (send.error) throw new Error(send.error.message);
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }

  return { success: true };
}
