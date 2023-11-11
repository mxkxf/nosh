import { Inter } from "next/font/google";
import "./globals.css";
import { FeedProvider } from "@/components/FeedProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FeedProvider>{children}</FeedProvider>
        <Toaster />
      </body>
    </html>
  );
}
