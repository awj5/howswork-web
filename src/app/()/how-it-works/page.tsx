import Header from "@/components/how-it-works/Header";
import CheckIn from "@/components/how-it-works/CheckIn";
import Concern from "@/components/how-it-works/Concern";
import Dashboard from "@/components/how-it-works/Dashboard";
import Cta from "@/components/Cta";

export default function HowItWorks() {
  return (
    <main className="pt-14">
      <Header />
      <CheckIn />
      <Concern />
      <Dashboard />
      <Cta />
    </main>
  );
}
