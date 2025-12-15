"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AccessGuard({ slug, children }: { slug: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Don't redirect if we're already on the access page
    if (pathname === `/${slug}/access`) {
      setIsAuthorized(true);
      return;
    }

    // Check for valid access token in localStorage
    const token = localStorage.getItem(`company_access_${slug}`);

    if (!token) {
      // No token found, redirect to access page
      router.push(`/${slug}/access`);
      return;
    }

    // TODO: Validate token with server (for now, just check if it exists)
    // In production, you'd validate the JWT signature and expiry date
    setIsAuthorized(true);
  }, [slug, pathname, router]);

  // Don't render children until authorization is checked
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
