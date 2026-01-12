"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AccessGuard({ slug, children }: { slug: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const pin = sessionStorage.getItem(`company_access_${slug}`);
    const isAuthPage = pathname === `/${slug}` || pathname === `/${slug}/resend` || pathname === `/${slug}/error`;

    // Redirect to check-in if on access page and pin is valid
    if (isAuthPage && pin) {
      router.push(`/${slug}/home`);
      return;
    }

    // Redirect to access page if pin is invalid
    if (!isAuthPage && !pin) {
      router.push(`/${slug}`);
      return;
    }

    setIsAuthorized(true);
  }, [pathname]);

  if (!isAuthorized) return null;
  return <>{children}</>;
}
