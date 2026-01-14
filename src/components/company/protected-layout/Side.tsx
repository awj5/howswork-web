"use client";

import { usePathname } from "next/navigation";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Sidebar, SidebarBody, SidebarItem, SidebarSection } from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";
import { navItems } from "./Nav";

export default function Side() {
  const pathname = usePathname();
  const { company } = useCompanyContext();

  return (
    <Sidebar>
      <SidebarBody>
        <div className="m-2 mb-4 w-fit">
          <Logo className="h-7" iconOnly />
        </div>

        <SidebarSection>
          {navItems.map(({ href, label }) => (
            <SidebarItem href={`/${company?.slug}/${href}`} key={href} current={pathname.includes(`/${href}`)}>
              {label}
            </SidebarItem>
          ))}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  );
}
