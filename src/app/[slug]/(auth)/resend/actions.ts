"use server";

import supabase from "@/utils/supabase";
import { resend } from "@/utils/resend";
import { twilioClient, twilioPhoneNumber } from "@/utils/twilio";
import { isValidPhone, isValidEmail } from "@/utils/helpers";

export async function resendPin(formData: FormData) {
  let contact = formData.get("contact") as string;
  contact = contact.trim().toLowerCase();
  if (!isValidEmail(contact) && !isValidPhone(contact)) return { error: "Email or mobile number is invalid." };

  // Check if mobile number
  if (!contact.includes("@")) {
    const normalized = normalizeAusNumber(contact); // Normalize Aus mobile numbers
    contact = normalized ?? contact.replace(/[\s\-\(\)]/g, ""); // Keep original if not Aus number (remove all spaces, dashes, parentheses)
  }

  // Get company contacts
  const { data: peopleData, error: peopleError } = await supabase
    .from("people")
    .select("contacts")
    .eq("company_id", formData.get("companyID"))
    .single();

  if (peopleError) return { error: peopleError.message };

  // Check if user is included in contacts
  if (peopleData.contacts.includes(contact)) {
    // Get pin from open check-in
    const { data: checkInData, error: checkInError } = await supabase
      .from("check_ins")
      .select("pin")
      .eq("company_id", formData.get("companyID"))
      .eq("status", "Open")
      .maybeSingle();

    if (checkInError) return { error: checkInError.message };
    if (!checkInData) return { error: "PIN not available." }; // Only send email or SMS if there is an open check-in

    // Get company name
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("name")
      .eq("id", formData.get("companyID"))
      .single();

    if (companyError) return { error: companyError.message };

    if (contact.includes("@")) {
      // Email
      try {
        await resend.emails.send({
          from: "HowsWork <no-reply@updates.howswork.app>",
          to: contact,
          subject: `HowsWork PIN for ${companyData.name}`,
          html: `
            <h2>PIN</h2>
            <p>${checkInData.pin}</p>
            `,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      // SMS
      try {
        await twilioClient.messages.create({
          to: contact,
          from: twilioPhoneNumber,
          body: `HowsWork PIN: ${checkInData.pin}`,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return { success: true };
}

function normalizeAusNumber(number: string) {
  let cleaned = number.replace(/[\s\-\(\)]/g, ""); // Remove all spaces, dashes, parentheses
  if (cleaned.startsWith("04") && cleaned.length === 10) return `+61${cleaned.substring(1)}`; // Convert 04 to +614
  if (cleaned.startsWith("+614") && cleaned.length === 12) return cleaned; // Already in correct format
  if (cleaned.startsWith("614") && cleaned.length === 11) return `+${cleaned}`; // Add missing +
  return null; // Not an Aus mobile
}
