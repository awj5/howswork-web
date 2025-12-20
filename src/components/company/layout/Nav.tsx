import { Navbar, NavbarItem, NavbarSection } from "@/components/ui/navbar";

export default function Nav() {
  return (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="check-in">Home</NavbarItem>
        <NavbarItem href="resources">Resources</NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
