"use client";

import { FeedItems } from "@/components/FeedItems";
import { ItemDisplay } from "@/components/ItemDisplay";
import { Navigation } from "@/components/Navigation";

const Page = () => {
  return (
    <div className="flex h-screen">
      <Navigation />
      <FeedItems />
      <ItemDisplay />
    </div>
  );
};

export default Page;
