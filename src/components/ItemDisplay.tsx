import dayjs from "dayjs";
import { useFeeds } from "./FeedProvider";
import { ExternalLink, Mail, MailOpen, Share } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const ItemDisplay = () => {
  const { feeds, selectedFeedIndex, selectedItemIndex, readItem } = useFeeds();
  const selectedItem =
    typeof selectedFeedIndex !== "undefined" &&
    typeof selectedItemIndex !== "undefined"
      ? feeds[selectedFeedIndex].items[selectedItemIndex]
      : undefined;

  const handleShare = () => {
    try {
      navigator.share({
        url: selectedItem?.link,
        title: selectedItem?.title,
      });
    } catch {
      toast.warning(
        "Sorry, the sharing feature is not supported by your browser."
      );
    }
  };

  return selectedItem ? (
    <article className="h-screen overflow-auto">
      <ul className="sticky top-0 p-2 flex bg-white dark:bg-gray-700 items-center justify-end border-b border-slate-200 dark:border-slate-800">
        <li>
          {selectedItem.read ? (
            <Button
              className="h-8 w-8"
              variant="ghost"
              size="icon"
              onClick={() => readItem(selectedItemIndex as number, false)}
            >
              <MailOpen className="w-4 h-4" aria-label="Mark as unread" />
            </Button>
          ) : (
            <Button
              className="h-8 w-8"
              variant="ghost"
              size="icon"
              onClick={() => readItem(selectedItemIndex as number, true)}
            >
              <Mail className="w-4 h-4" aria-label="Mark as read" />
            </Button>
          )}
        </li>
        <li>
          <Button asChild className="h-8 w-8" variant="ghost" size="icon">
            <a href={selectedItem.link} target="_blank" rel="noopener">
              <ExternalLink
                className="w-4 h-4"
                aria-label="Visit external link"
              />
            </a>
          </Button>
        </li>
        <li>
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={handleShare}
          >
            <Share className="w-4 h-4" aria-label="Share article" />
          </Button>
        </li>
      </ul>
      <header className="border-b border-slate-200 dark:border-slate-800 p-5 space-y-3">
        <h1 className="text-4xl leading-normal text-balance">
          {selectedItem.title}
        </h1>
        <span className="block text-slate-600 dark:text-slate-400">
          {selectedItem.author}
        </span>
        <span className="text-xs block text-slate-600 dark:text-slate-400">
          {dayjs(selectedItem.pubDate).format("D MMM, YYYY")}
        </span>
      </header>
      <main className="p-5 prose prose-slate dark:prose-invert text-black dark:text-white">
        <div
          dangerouslySetInnerHTML={{
            __html: selectedItem.content,
          }}
        ></div>
      </main>
    </article>
  ) : null;
};
