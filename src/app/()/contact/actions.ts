"use server";

import { isValidEmail } from "@/utils/helpers";
import resend from "@/utils/resend";

export async function contact(formData: FormData, to: string, subject: string) {
  if (formData.get("website")) return { success: true }; // Honeypot
  let email = formData.get("email") as string;
  email = email.trim().toLowerCase();
  if (!isValidEmail(email)) return { error: "Email is invalid" };

  try {
    // Save email to Resend
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    // Send email to HowsWork
    const send = await resend.emails.send({
      from: "HowsWork <no-reply@updates.howswork.app>",
      to,
      subject,
      html: `<p>First name: ${formData.get("first-name")}<br />Last name: ${formData.get("last-name")}<br />Company: ${formData.get("company")}<br />Email: ${email}<br />Message:<br />${(formData.get("message") as string)?.replace(/\n/g, "<br />")}</p>`,
    });

    if (send.error) throw new Error(send.error.message);
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }

  return { success: true };
}
