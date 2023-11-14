import { Inter } from "next/font/google";
import "./globals.css";
import { FeedProvider } from "@/components/FeedProvider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nosh",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-black dark:text-white`}>
        <FeedProvider>{children}</FeedProvider>
        <Toaster />
      </body>
    </html>
  );
}
