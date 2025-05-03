import dayjs from "dayjs";
import {
  Loader2,
  Mail,
  MoreHorizontal,
  RefreshCw,
  Rss,
  Trash2,
} from "lucide-react";

import { useFeeds } from "./FeedProvider";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";

export const FeedItems = () => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {
    feeds,
    selectItem,
    selectedFeedIndex,
    selectedItemIndex,
    deleteFeed,
    updateFeed,
    readItem,
    readAllItems,
  } = useFeeds();
  const [loading, setLoading] = useState(false);

  if (typeof selectedFeedIndex === "undefined") {
    return;
  }

  const handleDelete = () => {
    deleteFeed(selectedFeedIndex as number);
    setDeleteDialogOpen(false);

    toast("Unsubscribed from feed");
  };

  const handleRefresh = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/feed?url=${feeds[selectedFeedIndex].url}`);
      const data = await response.json();

      updateFeed(selectedFeedIndex, data);

      toast("Feed refreshed");
    } catch (error) {
      toast.warning("Error refreshing feed", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong, please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-auto">
      <div className="sticky top-0 z-10 pl-3 pr-2 py-2 space-x-3 flex items-center justify-between bg-white dark:bg-gray-700 border-b border-slate-200 dark:border-slate-800">
        {loading ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : (
          <Rss className="h-4 w-4" />
        )}
        <h2 className="flex-1 line-clamp-1 font-bold">
          {feeds[selectedFeedIndex].title}
        </h2>
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleRefresh()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => readAllItems(selectedFeedIndex, true)}
              >
                <Mail className="mr-2 h-4 w-4" />
                Mark all as read
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <AlertDialogTrigger className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Unsubscribe</span>
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsubscribe from feed</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <ul id="feed-items">
        {feeds[selectedFeedIndex].items.map((item, i) => (
          <li
            key={`feed-item-${i}`}
            role="button"
            className={`relative group border-b border-slate-200 dark:border-slate-800 p-4 pl-10 ${
              selectedItemIndex === i ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
            onClick={() => {
              selectItem(i);
              readItem(i, true);
            }}
          >
            {!item.read ? (
              <span className="animate-pulse absolute w-2 h-2 bg-blue-500 rounded-full left-4 top-6"></span>
            ) : null}
            <h3 className="text-sm font-bold line-clamp-1 mb-1">
              {item.title}
            </h3>
            <p className="text-sm line-clamp-1 mb-1">{item.description}</p>
            <div className="flex items-center justify-between space-x-5 text-slate-600 dark:text-slate-400">
              <span className="text-xs line-clamp-1">{item.author}</span>
              <span className="text-xs shrink-0">
                {dayjs(item.pubDate).format("D MMM, YYYY")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
