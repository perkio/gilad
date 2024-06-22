import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import initAuth from "./initAuth";
// initAuth();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "מתחם הרי הגלעד",
  manifest: "/manifest.json",
  description: "שלט לחניון",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
