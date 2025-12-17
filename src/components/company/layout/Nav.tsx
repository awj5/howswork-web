import { Navbar, NavbarItem, NavbarSection } from "@/components/ui/navbar";

export default function Nav() {
  return (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="/">Home</NavbarItem>
        <NavbarItem href="/events">Events</NavbarItem>
        <NavbarItem href="/orders">Orders</NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
