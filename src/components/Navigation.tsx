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

export const Navigation = () => {
  const { toast } = useToast();
  const { feeds, selectFeed, selectedFeed, fetchFeed } = useFeeds();
  const [isAddFeedDialogOpen, setAddFeedDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (feeds.find((feed) => feed.url === url)) {
      toast({
        title: "Already subscribed to this feed",
      });
      return;
    }

    setLoading(true);

    try {
      await fetchFeed(url);

      toast({
        title: "Feed added",
      });
    } catch (error) {
      toast({
        title: "Error adding feed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong, please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setAddFeedDialogOpen(false);
    }
  };

  return (
    <nav className="w-1/4 bg-gray-100 dark:bg-gray-700 p-5 overflow-auto">
      <ul className="space-y-1">
        {feeds.map((feed, i) => (
          <li key={`feed-${i}`} className="flex justify-between items-center">
            <button
              className={`py-3 px-4 rounded w-full flex items-center ${
                selectedFeed?.url === feed.url
                  ? "bg-gray-200 dark:bg-gray-800"
                  : "hover:bg-gray-200/25 dark:hover:bg-gray-900/25"
              }`}
              type="button"
              onClick={() => selectFeed(i)}
            >
              <Image
                className="rounded"
                src={feed.icon}
                alt={feed.title}
                width={24}
                height={24}
              />
              <span className="mx-2 line-clamp-1">{feed.title}</span>
              <span className="ml-auto bg-gray-200 dark:bg-gray-900 rounded-full p-2 py-1 text-xs">
                {feed.items.length}
              </span>
            </button>
          </li>
        ))}
        <li>
          <Dialog
            open={isAddFeedDialogOpen}
            onOpenChange={setAddFeedDialogOpen}
          >
            <DialogTrigger asChild>
              <button
                className="py-3 px-4 rounded w-full flex items-center hover:bg-gray-200/25 dark:hover:bg-gray-900/25"
                type="button"
                // onClick={() => addFeed("https://news.ycombinator.com/rss")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span className="mx-2 line-clamp-1">New feed</span>
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
                <Button disabled={loading} type="submit">
                  {loading ? (
                    <svg
                      className="animate-spin mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  Subscribe
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </nav>
  );
};
