export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function isValidPhone(number: string) {
  // Allow numbers, spaces, (), -, or a single leading +
  if (!/^\+?[\d\s\(\)\-]+$/.test(number)) return false;
  const digits = number.replace(/\D/g, ""); // Remove non-digits
  return digits.length >= 8 && digits.length <= 16; // Check length
}

export function getIP(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";
}

export function statusColor(status: number) {
  const colors: Record<number, "zinc" | "green" | "yellow" | "orange" | "blue"> = {
    1: "blue",
    2: "orange",
    3: "yellow",
    4: "green",
  };

  return colors[status] ?? "zinc";
}
