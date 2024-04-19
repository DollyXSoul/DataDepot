import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DataDepot",
  description:
    "NextDrop is a powerful file storage and sharing platform built with Next.js. Seamlessly upload, store, and share your files securely.",
  keywords:
    "Next.js, Dropbox clone, file storage, file sharing, Next.js application",
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
