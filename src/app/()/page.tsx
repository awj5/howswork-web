import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Feature1 from "@/components/home/Feature1";
import Feature2 from "@/components/home/Feature2";
import Cta from "@/components/home/Cta";
import Faq from "@/components/home/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature1 />
      <Feature2 />
      <Cta />
      <Faq />
      <Newsletter />
    </main>
  );
}
