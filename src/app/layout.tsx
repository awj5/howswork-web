import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ogImage from "../../public/img/og.png";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HowsWork - The anonymous inbox for psychological safety",
  description:
    "HowsWork is the anonymous inbox for psychological safety — helping employees speak up safely and giving employers AI-powered insights into psychosocial risks and workplace safety compliance.",
  icons: {
    icon: [
      { url: "/img/icon.svg", media: "(prefers-color-scheme: light)" },
      { url: "/img/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
  metadataBase: new URL("https://www.howswork.app"),
  openGraph: {
    images: [
      {
        url: ogImage.src,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full bg-white antialiased scheme-light dark:bg-gray-900 dark:scheme-dark`}
    >
      <body className="h-full">
        {children}
        <Toaster theme="system" />
      </body>
    </html>
  );
}
