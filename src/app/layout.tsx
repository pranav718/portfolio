import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pranav Ray | Developer & OSS Contributor",
  description: "Welcome to my portfolio. I'm a 19 y/o fullstack developer building projects and contributing to open source.",
  keywords: ["developer", "portfolio", "open source", "software engineer", "fullstack"],
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
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <div className="notebook-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
