import { CompanyType } from "@/types";

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function isValidPhone(number: string) {
  // Allow numbers, spaces, (), -, or a single leading +
  if (!/^\+?[\d\s\(\)\-]+$/.test(number)) return false;
  const digits = number.replace(/\D/g, ""); // Remove non-digits
  return digits.length >= 8 && digits.length <= 16; // Check length
}

export async function getCurrentCheckIn(company: CompanyType) {
  try {
    const pin = sessionStorage.getItem(`company_access_${company.slug}`);

    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ companyID: company.id, pin }),
    });

    const json = await response.json();
    if (!response.ok) throw new Error(json.error);
    return json.data;
  } catch (error) {
    console.error(error);
    sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
    window.location.href = `/${company.slug}/error`;
    return null;
  }
}
