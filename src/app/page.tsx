"use client";

import { FeedItems } from "@/components/FeedItems";
import { ItemDisplay } from "@/components/ItemDisplay";
import { Navigation } from "@/components/Navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Page = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="dark:bg-slate-700">
      <ResizablePanel defaultSize={20}>
        <Navigation />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={35}>
        <FeedItems />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ItemDisplay />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Page;
