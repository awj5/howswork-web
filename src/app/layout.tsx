import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HowsWork",
  description:
    "HowsWork is the anonymous inbox for psychological safety, helping employees speak up safely and giving employers real-time insights into psychosocial risks and workplace safety compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full bg-white antialiased dark:bg-gray-900`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
