import { PropsWithChildren } from "react";
import { Metadata } from "next";

import "./globals.css";

import { FeedProvider } from "@/components/FeedProvider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Nosh",
  description: "Modern RSS reader",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`text-black dark:text-white dark:bg-stone-900 antialiased`}
      >
        <SessionProvider>
          <FeedProvider>{children}</FeedProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
