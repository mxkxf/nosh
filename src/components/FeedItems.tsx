import dayjs from "dayjs";
import { useFeeds } from "./FeedProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Loader, Mail, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react";

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
    <div className="h-screen overflow-auto">
      <div className="sticky top-0 z-10 pl-10 pr-2 py-2 space-x-5 flex items-center bg-white dark:bg-gray-700 border-b dark:border-slate-800">
        <div className="flex-1">
          {loading ? (
            <Loader className="absolute left-4 top-5 animate-spin h-4 w-4" />
          ) : null}
          <h2 className="line-clamp-1 font-bold">
            {feeds[selectedFeedIndex].title}
          </h2>
        </div>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
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
                <DialogTrigger className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Unsubscribe</span>
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unsubscribe from feed</DialogTitle>
            </DialogHeader>
            <p>This action cannot be undone.</p>
            <DialogFooter>
              <Button variant="destructive" onClick={handleDelete}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ul>
        {feeds[selectedFeedIndex].items.map((item, i) => (
          <li
            key={`feed-item-${i}`}
            role="button"
            className={`relative group border-b dark:border-slate-800 p-4 pl-10 ${
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
