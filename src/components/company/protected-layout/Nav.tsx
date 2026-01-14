"use client";

import { usePathname, useRouter } from "next/navigation";
import { HandRaisedIcon } from "@heroicons/react/16/solid";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/ui/navbar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const navItems = [
  { href: "home", label: "Home" },
  { href: "check-ins", label: "Check-ins" },
  { href: "concerns", label: "Concerns" },
  { href: "resources", label: "Resources" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { company } = useCompanyContext();

  return (
    <Navbar>
      <Logo className="h-7 max-lg:hidden" iconOnly />

      <NavbarSection className="max-lg:hidden">
        {navItems.map(({ href, label }) => (
          <NavbarItem href={`/${company?.slug}/${href}`} key={href} current={pathname.includes(`/${href}`)}>
            {label}
          </NavbarItem>
        ))}
      </NavbarSection>

      <NavbarSpacer />

      <Button onClick={() => router.push(`/${company?.slug}/concerns/new`)} color="indigo">
        <HandRaisedIcon />
        Raise a concern
      </Button>
    </Navbar>
  );
}
