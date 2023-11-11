import dayjs from "dayjs";
import { useFeeds } from "./FeedProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Loader, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react";

export const FeedItems = () => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {
    feeds,
    selectItem,
    selectedFeedIndex,
    deleteFeed,
    updateFeed,
    readItem,
  } = useFeeds();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  if (typeof selectedFeedIndex === "undefined") {
    return;
  }

  const handleDelete = () => {
    deleteFeed(selectedFeedIndex as number);
    setDeleteDialogOpen(false);

    toast({
      title: "Unsubscribed from feed",
    });
  };

  const handleRefresh = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/feed?url=${feeds[selectedFeedIndex].url}`);
      const data = await response.json();

      updateFeed(selectedFeedIndex, data);

      toast({
        title: "Feed refreshed",
      });
    } catch (error) {
      toast({
        title: "Error refreshing feed",
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

  return (
    <div className="w-1/4 bg-white dark:bg-zinc-800 relative overflow-auto">
      <div className="bg-white dark:bg-zinc-800 sticky top-0 z-10 pl-10 pr-4 py-2 flex items-center border-b dark:border-zinc-700">
        <div className="flex-1">
          {loading ? <Loader className="animate-spin-slow h-5 w-5" /> : null}
        </div>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleRefresh()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DialogTrigger>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Unsubscribe</span>
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <ul>
        {feeds[selectedFeedIndex].items.map((item, i) => (
          <li
            key={`feed-item-${i}`}
            role="button"
            className="relative group hover:bg-zinc-50 dark:hover:bg-zinc-900 border-b dark:border-zinc-700 p-4 pl-10"
            onClick={() => {
              selectItem(i);
              readItem(i);
            }}
          >
            {!item.read ? (
              <span className="animate-pulse absolute w-2 h-2 bg-blue-500 rounded-full left-4 top-6"></span>
            ) : null}
            <h3 className="font-bold line-clamp-1 mb-1">{item.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-1">
              {item.description}
            </p>
            <div className="flex items-center justify-between space-x-5">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                {item.author}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
                {dayjs(item.pubDate).format("D MMM, YYYY")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
