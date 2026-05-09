"use client";

import { usePathname } from "next/navigation";
import { HandRaisedIcon } from "@heroicons/react/16/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { useDialogContext } from "@/hooks/useDialogContext";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/ui/navbar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const navItems = [
  { href: "home", label: "Home" },
  { href: "check-ins", label: "Check-ins" },
  { href: "concerns", label: "Concerns" },
];

export default function Nav() {
  const pathname = usePathname();
  const { company } = useCompanyContext();
  const { setConcernDialog } = useDialogContext();

  return (
    <Navbar>
      <Logo className="h-7 max-lg:hidden" iconOnly />

      <NavbarSection className="max-lg:hidden">
        {navItems.map(({ href, label }) => (
          <NavbarItem href={`/${company?.slug}/${href}`} key={href} current={pathname.includes(`/${href}`)}>
            {label}
          </NavbarItem>
        ))}

        <NavbarItem href="https://articles.howswork.app" target="_blank">
          Resources
          <ArrowTopRightOnSquareIcon />
        </NavbarItem>
      </NavbarSection>

      <NavbarSpacer />

      <Button onClick={() => setConcernDialog(true)} color="indigo">
        <HandRaisedIcon />
        Raise a concern
      </Button>
    </Navbar>
  );
}
