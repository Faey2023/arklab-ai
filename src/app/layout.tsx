import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArkLab AI Agents Catalog - Discover Powerful AI Solutions",
  description:
    "Explore our comprehensive catalog of AI agents for customer service, marketing, development, and more. Find the perfect AI solution for your business needs.",
  keywords:
    "AI agents, artificial intelligence, automation, customer service, marketing, development tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
