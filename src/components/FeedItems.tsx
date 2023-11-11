import dayjs from "dayjs";
import { useFeeds } from "./FeedProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

export const FeedItems = () => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { selectedFeed, selectItem, selectedFeedIndex } = useFeeds();

  return (
    <div className="w-1/4 bg-white dark:bg-gray-800 relative overflow-auto">
      {selectedFeed && typeof selectedFeedIndex !== "undefined" ? (
        <>
          <div className="bg-white dark:bg-gray-800 sticky top-0 px-5 py-2 flex items-center justify-end border-b dark:border-gray-700">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-label="Open menu"
                >
                  <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Dialog
                  open={isDeleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                >
                  <DialogTrigger asChild>
                    <DropdownMenuItem>Unsubscribe</DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ul>
            {selectedFeed.items.map((item, i) => (
              <li
                key={`feed-item-${i}`}
                className="group hover:bg-gray-50 dark:hover:bg-gray-900 border-b dark:border-gray-700 p-5 space-y-1"
                onClick={() => selectItem(i)}
              >
                <h3 className="font-bold line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between space-x-5">
                  <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {item.author}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                    {dayjs(item.pubDate).format("D MMM, YYYY")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
