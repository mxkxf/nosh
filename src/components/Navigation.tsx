import Image from "next/image";
import { useFeeds } from "@/components/FeedProvider";
import { useToast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import { Loader, PlusCircle } from "lucide-react";

const randomFeeds = [
  "https://smashingmagazine.com/feed",
  "https://news.ycombinator.com/rss",
  "https://www.reddit.com/r/reactjs.rss",
  "http://feeds.bbci.co.uk/news/world/rss.xml",
  "http://feeds.bbci.co.uk/sport/rss.xml?edition=int#",
  "http://feeds.feedburner.com/Techcrunch",
  "http://feeds.wired.com/wired/index",
  "https://www.polygon.com/rss/index.xml",
  "http://feeds.reuters.com/Reuters/PoliticsNews",
];

export const Navigation = () => {
  const { toast } = useToast();
  const { feeds, selectFeed, selectedFeedIndex, addFeed } = useFeeds();
  const [isAddFeedDialogOpen, setAddFeedDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const subscribe = async (url: string) => {
    if (feeds.find((feed) => feed.url === url)) {
      toast({
        title: "Already subscribed to this feed",
        description: url,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/feed?url=${url}`);
      if (!response.ok) {
        throw new Error("Error parsing the feed URL.");
      }
      const data = await response.json();

      addFeed(data);

      toast({
        title: "Feed added",
      });

      setAddFeedDialogOpen(false);
    } catch (error) {
      toast({
        title: "Sorry, we couldn't add that feed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong, please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    const url = randomFeeds[Math.floor(Math.random() * randomFeeds.length)];

    await subscribe(url);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await subscribe(url);
  };

  return (
    <nav className="w-1/4 bg-zinc-100 dark:bg-zinc-700 p-2 overflow-auto">
      <ul className="space-y-1">
        {feeds.map((feed, i) => {
          const unreadCount = feed.items.reduce(
            (prev, current) => prev + (current.read ? 0 : 1),
            0
          );

          return (
            <li key={`feed-${i}`} className="flex justify-between items-center">
              <button
                className={`py-3 px-4 rounded w-full flex items-center ${
                  typeof selectedFeedIndex !== "undefined" &&
                  feeds[selectedFeedIndex]?.url === feed.url
                    ? "bg-zinc-200 dark:bg-zinc-800"
                    : "hover:bg-zinc-200/25 dark:hover:bg-zinc-900/25"
                }`}
                type="button"
                onClick={() => selectFeed(i)}
              >
                <Image
                  className="shrink-0 rounded w-5 h-5"
                  src={feed.icon}
                  alt={feed.title}
                  width={24}
                  height={24}
                />
                <span className="flex-1 text-left mx-3 line-clamp-1">
                  {feed.title}
                </span>
                {unreadCount > 0 ? (
                  <span className="ml-auto bg-zinc-200 dark:bg-zinc-900 rounded-full p-2 py-1 text-xs">
                    {unreadCount}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
        <li>
          <Dialog
            open={isAddFeedDialogOpen}
            onOpenChange={setAddFeedDialogOpen}
          >
            <DialogTrigger asChild>
              <button
                className="py-3 px-4 rounded w-full flex items-center hover:bg-zinc-200/25 dark:hover:bg-zinc-900/25"
                type="button"
              >
                <PlusCircle className="shrink-0 w-5 h-5" />

                <span className="mx-3 line-clamp-1">New feed</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Subscribe to new feed</DialogTitle>
              </DialogHeader>
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <fieldset>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    required
                    disabled={loading}
                    id="url"
                    name="url"
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </fieldset>
                <Button disabled={loading || url.trim() === ""} type="submit">
                  {loading ? (
                    <Loader className="animate-spin-slow mr-2 h-5 w-5" />
                  ) : null}
                  Subscribe
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleRandom}
                  type="button"
                >
                  I&apos;m feeling lucky!
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </nav>
  );
};
