"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { verifyPin } from "@/app/[slug]/actions";

export default function AccessGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { company } = useCompanyContext();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!company) return;

    const checkAccess = async () => {
      const pin = localStorage.getItem(`company_access_${company.slug}`);
      const isAccessPage = pathname === `/${company.slug}`;

      // Redirect to access page if no pin stored and not already on access page
      if (!pin && !isAccessPage) {
        router.push(`/${company.slug}`);
        return;
      }

      if (pin) {
        const result = await verifyPin(company.id, Number(pin));

        if (result.error) {
          // Pin is invalid
          localStorage.removeItem(`company_access_${company.slug}`); // Remove pin from local storage

          // Redirect to access page if not already on access page
          if (!isAccessPage) {
            router.push(`/${company.slug}`);
            return;
          }
        }

        // Success! Redirect to check-in page if currently on access page
        if (isAccessPage) {
          router.push(`/${company.slug}/check-in`);
          return;
        }
      }

      setIsAuthorized(true);
    };

    checkAccess();
  }, [company, pathname]);

  if (!isAuthorized) return null;
  return <>{children}</>;
}
