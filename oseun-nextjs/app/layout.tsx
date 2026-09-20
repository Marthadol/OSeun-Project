import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "O’Seun Foods | Tasty. Healthy. Delightful.",
  description: "O’Seun Foods restaurant web application — development preview.",
  icons: {
    icon: "/oseun-logo.jpeg",
    apple: "/oseun-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


