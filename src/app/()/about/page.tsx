import type { Metadata } from "next";
import Mission from "@/components/about/Mission";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "About | HowsWork",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main className="pt-14">
      <Mission />
      <Cta />
    </main>
  );
}
