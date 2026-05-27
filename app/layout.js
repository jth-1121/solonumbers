import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.solonumbers.com"),
  title: {
    default: "SoloNumbers — Free Financial Calculators for Freelancers",
    template: "%s | SoloNumbers",
  },
  description:
    "Free calculators for freelancers, consultants, and solo business owners. Price your work, estimate taxes, and understand what you actually keep.",
  applicationName: "SoloNumbers",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SoloNumbers — Free Financial Calculators for Freelancers",
    description:
      "Simple, free calculators that help freelancers price their work, manage taxes, and understand what they actually earn.",
    url: "https://www.solonumbers.com",
    siteName: "SoloNumbers",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
