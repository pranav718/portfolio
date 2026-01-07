import type { Metadata } from "next";
import { Caveat, Crimson_Text, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pranav Ray | Developer & OSS Contributor",
  description: "Welcome to my portfolio. I build projects and work on open source software.",
  keywords: ["developer", "portfolio", "open source", "software engineer"],
  authors: [{ name: "Pranav Ray" }],
  openGraph: {
    title: "Pranav Ray | Developer & OSS Contributor",
    description: "Welcome to my portfolio. I build projects and work on open source software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${crimsonText.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
