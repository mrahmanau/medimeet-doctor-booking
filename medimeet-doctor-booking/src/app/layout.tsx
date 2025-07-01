import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Acts like a master wrapper for all pages
// Defines global styles, fonts, metadata, and layout structure
// Renders shared elements like headers, footers, and navigation

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediMeet – Book Doctor Appointments Online",
  description:
    "MediMeet is a full-stack web app to schedule doctor appointments easily.",
};

// The RootLayout function receives children, which is the content of the current page.
// It will wrap every page I visit in the app.
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
        {/* Main page content will be injected here */}
        {children}
      </body>
    </html>
  );
}
