import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}