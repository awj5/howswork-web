import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";
import { headers } from "next/headers";
import ogImage from "../../public/img/og.png";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = (headersList.get("host") ?? "howswork.app").replace(/^www\./, "");
  const canonical = `https://${host}`;

  return {
    title: "HowsWork - A safe, anonymous way for employees to speak up",
    description:
      "A trusted channel for raising workplace concerns, surfacing risks early and helping reduce exposure to psychological injury claims and compliance failures.",
    icons: {
      icon: [
        { url: "/img/icon.svg", media: "(prefers-color-scheme: light)" },
        { url: "/img/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
      ],
    },
    metadataBase: new URL(canonical),
    openGraph: {
      images: [
        {
          url: ogImage.src,
        },
      ],
    },
    alternates: {
      canonical,
      languages: {
        en: "https://howswork.app",
        "en-AU": "https://howswork.com.au",
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full bg-white antialiased scheme-light lg:bg-zinc-100 dark:bg-zinc-900 dark:scheme-dark dark:lg:bg-zinc-950`}
    >
      <body className="h-full">
        {children}
        <Toaster theme="system" duration={5000} richColors />
      </body>

      <GoogleAnalytics gaId="G-LPJ370JJP6" />
    </html>
  );
}
