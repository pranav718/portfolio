import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranav Ray | Interactive 3D Portfolio",
  description: "Explore my portfolio through an immersive 3D desk experience. Pull the lamp string to begin your journey.",
  keywords: ["developer", "portfolio", "3D", "interactive", "three.js", "react", "open source"],
  authors: [{ name: "Pranav Ray" }],
  openGraph: {
    title: "Pranav Ray | Interactive 3D Portfolio",
    description: "An immersive 3D desk portfolio experience built with Three.js and React Three Fiber.",
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
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
