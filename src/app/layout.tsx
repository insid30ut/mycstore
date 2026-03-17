import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mycelial FunGuy | Premium Mycology Supplies",
  description: "Highest quality sporeprints, swabs, and live cultures in the US. Expertly prepared and shipped with care for microscopy and research.",
  keywords: ["mycology", "spores", "liquid culture", "mushroom supplies", "spore prints"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-primary/30`}
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))] -z-10" />
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
