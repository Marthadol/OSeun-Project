import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "O’Seun Foods | Tasty. Healthy. Delightful.",
  description:
    "Explore the O’Seun Foods menu: rice dishes, proteins, sides and drinks. Tasty. Healthy. Delightful.",
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
