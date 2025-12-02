import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../fonts/InterVariable.ttf",
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
      <body className="h-full">{children}</body>
    </html>
  );
}
