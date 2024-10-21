"use client";

import { FeedItems } from "@/components/FeedItems";
import { ItemDisplay } from "@/components/ItemDisplay";
import { Navigation } from "@/components/Navigation";

const Page = () => {
  return (
    <div className="min-h-screen flex">
      <Navigation />
      <main className="flex-1 flex">
        <FeedItems />
        <ItemDisplay />
      </main>
    </div>
  );
};

export default Page;
