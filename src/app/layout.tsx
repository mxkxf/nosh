import { GeistSans } from "geist/font/sans";
import { PropsWithChildren } from "react";
import { Metadata } from "next";

import "./globals.css";

import { FeedProvider } from "@/components/FeedProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Nosh",
  description: "Modern RSS reader",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} text-black dark:text-white antialiased`}
      >
        <FeedProvider>{children}</FeedProvider>
        <Toaster />
      </body>
    </html>
  );
}
