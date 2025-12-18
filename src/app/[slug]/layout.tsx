import { notFound } from "next/navigation";
import supabase from "@/utils/supabase";
import CompanyProvider from "@/components/company/layout/CompanyProvider";
import AccessGuard from "@/components/company/layout/AccessGuard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Set page title
  const { slug } = await params;
  const { data: companyData } = await supabase.from("companies").select("name").eq("slug", slug).single();

  return {
    title: companyData?.name ? `HowsWork - ${companyData.name}` : "HowsWork",
  };
}

export default async function CompanyLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  // Get company
  const { data: companyData, error: companyError } = await supabase
    .from("companies")
    .select("id, name, slug, timezone")
    .eq("slug", slug)
    .single();

  if (companyError) notFound(); // Redirect

  return (
    <CompanyProvider companyData={companyData}>
      <AccessGuard slug={slug}>{children}</AccessGuard>
    </CompanyProvider>
  );
}
