import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://madur.in"),
  title: {
    default: "MADUR.IN | Farm Fresh Grocery & Dairy Delivery",
    template: "%s | MADUR.IN",
  },
  description: "Order fresh milk, vegetables, groceries, and traditional food items online with home delivery in Hyderabad. 100% natural and farm-fresh.",
  keywords: ["fresh milk delivery", "grocery delivery Hyderabad", "farm fresh vegetables", "organic dairy products", "Madur.in"],
  authors: [{ name: "Madur.in Team" }],
  creator: "Madur.in",
  publisher: "Madur.in",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MADUR.IN | Farm Fresh Grocery & Dairy Delivery",
    description: "Order fresh milk, vegetables, groceries, and traditional food items online with home delivery in Hyderabad.",
    url: "https://madur.in",
    siteName: "MADUR.IN",
    images: [
      {
        url: "/logo-final.png",
        width: 800,
        height: 600,
        alt: "MADUR.IN Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MADUR.IN | Farm Fresh Grocery & Dairy Delivery",
    description: "Order fresh milk, vegetables, groceries, and traditional food items online with home delivery in Hyderabad.",
    images: ["/logo-final.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo-final.png",
  },
  verification: {
    google: "BCfi7DVg3MgGcY_x3QC_bbFyRk7gWn57vAtC-w4uC54",
  },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
