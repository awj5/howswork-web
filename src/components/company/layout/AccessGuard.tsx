"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessGuard({ slug, children }: { slug: string; children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const pin = localStorage.getItem(`company_access_${slug}`);

    /*if (!pin) {
      // No pin found, redirect to access page
      router.push(`/${slug}/access`);
      return;
    }*/

    setIsAuthorized(true);
  }, []);

  if (!isAuthorized) return null;
  return <>{children}</>;
}
