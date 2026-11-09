import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iPhone 17 Pro Max - Titanium. Reimagined.",
  description: "A high-end scrollytelling experience for the fictional iPhone 17 Pro Max.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
