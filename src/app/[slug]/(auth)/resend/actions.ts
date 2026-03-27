"use server";

import supabase from "@/utils/supabase";
import resend from "@/utils/resend";
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

  if (peopleError) {
    console.error(peopleError.message);
    return { error: "Internal server error" };
  }

  // Check if user is included in contacts
  if (peopleData.contacts.includes(contact)) {
    // Get pin from open check-in
    const { data: checkInData, error: checkInError } = await supabase
      .from("check_ins")
      .select("pin")
      .eq("company_id", formData.get("companyID"))
      .eq("status", 2)
      .maybeSingle();

    if (checkInError) {
      console.error(checkInError.message);
      return { error: "Internal server error" };
    }

    if (!checkInData) return { error: "PIN not available." }; // Only send email or SMS if there is an open check-in

    // Get company info
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("name, slug, timezone")
      .eq("id", formData.get("companyID"))
      .single();

    if (companyError) {
      console.error(companyError.message);
      return { error: "Internal server error" };
    }

    const isAus = companyData.timezone.includes("Australia"); // Use .com.au domain

    if (contact.includes("@")) {
      // Email
      try {
        await resend.emails.send({
          from: `HowsWork <no-reply@updates.howswork.${isAus ? "com.au" : "app"}>`,
          to: contact,
          subject: `Access PIN for ${companyData.name}`,
          html: `<table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
  <tbody>
    <tr>
      <td
        style="
          font-family:
            ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;,
            &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;
        "
      >
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="max-width: 37.5em; padding-bottom: 24px; padding-top: 24px"
        >
          <tbody>
            <tr style="width: 100%">
              <td>
                <img
                  alt="HowsWork"
                  height="32"
                  src="https://howswork.app/img/email-icon.png"
                  style="display: block; outline: none; border: none; text-decoration: none"
                  width="32"
                />
                <p style="font-size: 16px; line-height: 24px; margin-top: 16px; margin-bottom: 16px">Hi there,</p>
                <p style="font-size: 16px; line-height: 24px; margin-top: 16px; margin-bottom: 16px">
                  <strong>${companyData.name}</strong> is using <strong>HowsWork</strong>, a safe, anonymous way to share
                  how you&#x27;re really doing and raise workplace concerns.
                </p>
                <p style="font-size: 16px; line-height: 24px; margin-top: 16px; margin-bottom: 16px">
                  Access PIN for all <strong>${companyData.name}</strong> employees:
                </p>
                <style>
                  meta ~ .cino {
                    display: none !important;
                    opacity: 0 !important;
                  }

                  meta ~ .cio {
                    display: block !important;
                  }</style
                ><code
                  class="cino"
                  style="
                    border-radius: 6px;
                    background-color: rgb(229, 231, 235);
                    padding-right: 4px;
                    padding-left: 4px;
                    padding-bottom: 2px;
                    padding-top: 2px;
                    font-size: 20px;
                  "
                  >${checkInData.pin}</code
                ><span
                  class="cio"
                  style="
                    display: none;
                    border-radius: 6px;
                    background-color: rgb(229, 231, 235);
                    padding-right: 4px;
                    padding-left: 4px;
                    padding-bottom: 2px;
                    padding-top: 2px;
                    font-size: 20px;
                  "
                  >${checkInData.pin}</span
                >
                <p
                  style="
                    font-size: 16px;
                    line-height: 24px;
                    color: rgb(79, 57, 246);
                    margin-top: 16px;
                    margin-bottom: 16px;
                  "
                >
                  <strong>No login. No tracking. Fully encrypted.</strong>
                </p>
                <p style="font-size: 16px; line-height: 24px; margin-top: 16px; margin-bottom: 16px">
                  You can visit https://howswork.${isAus ? "com.au" : "app"}/${companyData.slug} anytime to raise
                  concerns anonymously.
                </p>
                <p style="font-size: 14px; line-height: 24px; margin-top: 16px; margin-bottom: 16px">
                  <a
                    href="https://articles.howswork.app/how-howswork-protects-your-privacy/"
                    style="color: #067df7; text-decoration-line: none"
                    target="_blank"
                    >Learn more about how HowsWork protects your privacy</a
                  >
                </p>
                <p
                  style="
                    font-size: 14px;
                    line-height: 24px;
                    color: rgb(74, 85, 101);
                    margin-top: 16px;
                    margin-bottom: 16px;
                  "
                >
                  Please do not share externally.
                </p>
                <hr
                  style="width: 100%; border: none; border-top: 1px solid #eaeaea; border-color: rgb(16, 24, 40, 10%)"
                />
                <p
                  style="
                    font-size: 12px;
                    line-height: 24px;
                    color: rgb(74, 85, 101);
                    margin-top: 16px;
                    margin-bottom: 16px;
                  "
                >
                  HowsWork${isAus ? " Pty Ltd, 32 York St, Sydney 2000" : ""}<br />Questions? Contact us at
                  support@howswork.${isAus ? "com.au" : "app"}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`,
        });
      } catch (error) {
        console.error(error);
        return { error: "Error sending PIN" };
      }
    } else {
      // SMS
      try {
        await twilioClient.messages.create({
          to: contact,
          from: twilioPhoneNumber,
          body: `${companyData.name} is using HowsWork, a safe, anonymous way to raise workplace concerns.

New shared access PIN: ${checkInData.pin}

https://howswork.${isAus ? "com.au" : "app"}/${companyData.slug}

${companyData.name} has requested a check-in. Use this link anytime to raise concerns. No login, no tracking, fully encrypted.

Do not share externally.`,
        });
      } catch (error) {
        console.error(error);
        return { error: "Error sending PIN" };
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
