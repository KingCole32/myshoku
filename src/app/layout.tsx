import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/TheNavigation";
import React from "react";
import QueryStateWrapper from "./components/QueryStateWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyShoku",
  description: "Explore local cuisine with MyShoku",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-svh w-screen`}>
        <Navigation/>
        <main className="flex h-90vh w-full">
          <QueryStateWrapper>  
            {children}
          </QueryStateWrapper>  
        </main>
      </body>
    </html>
  );
}
