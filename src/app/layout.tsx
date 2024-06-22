import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { FeedProvider } from "@/components/FeedProvider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Nosh",
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
