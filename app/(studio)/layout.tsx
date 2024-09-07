import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "evanmarshall.dev",
  description:
    "Contact me today to discuss how I can get your business online and working for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
