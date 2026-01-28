import type { Metadata } from "next";
import { Dancing_Script, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "pranav.",
  description: "explore my space or visit my portfolio",
  keywords: ["developer", "portfolio", "3D", "interactive", "three.js", "react", "open source"],
  authors: [{ name: "Pranav Ray" }],
  openGraph: {
    title: "pranav.",
    description: "explore my space or visit my portfolio",
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
      <body className={`${geistMono.variable} ${dancingScript.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
