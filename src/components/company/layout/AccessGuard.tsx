"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AccessGuard({ slug, children }: { slug: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const pin = localStorage.getItem(`company_access_${slug}`);
    const isAccessPage = pathname === `/${slug}`;

    // Redirect to check-in if on access page and pin valid
    if (isAccessPage && pin) {
      router.push(`/${slug}/check-in`);
      return;
    }

    // Redirect to access page if pin is invalid
    if (!isAccessPage && !pin) {
      router.push(`/${slug}`);
      return;
    }

    setIsAuthorized(true);
  }, []);

  if (!isAuthorized) return null;
  return <>{children}</>;
}
