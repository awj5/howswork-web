"use server";

import { isValidEmail } from "@/utils/helpers";
import { resend } from "@/utils/resend";

export async function subscribeToMailingList(formData: FormData) {
  let email = formData.get("email") as string;
  email = email.trim().toLowerCase();
  if (!isValidEmail(email)) return { error: "Email is invalid." };

  // Save to Resend
  try {
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });
  } catch (error) {
    console.error(error);
    return { error: "Unexpected error subscribing." };
  }

  return { success: true };
}
