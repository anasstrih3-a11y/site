import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Nexus Arsenal — Pro Gaming Gear, Hand-Picked on Amazon",
  description:
    "We hand-test and curate the best gaming keyboards, mice, headsets, GPUs and battlestations — then link you straight to Amazon for live pricing, Prime shipping, and easy returns.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
