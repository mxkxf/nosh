import dayjs from "dayjs";
import { useFeeds } from "./FeedProvider";
import { useToast } from "./ui/use-toast";
import { ExternalLink, Mail, MailOpen, Share } from "lucide-react";

export const ItemDisplay = () => {
  const { feeds, selectedFeedIndex, selectedItemIndex, readItem, unreadItem } =
    useFeeds();
  const { toast } = useToast();
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
    } catch (error) {
      toast({
        title: "Sorry, this feature is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border-l dark:border-zinc-700 bg-white dark:bg-zinc-800 w-2/4 overflow-auto relative">
      {selectedItem ? (
        <>
          <ul className="sticky top-0 bg-white dark:bg-zinc-800 px-5 py-2 flex items-center justify-end space-x-5 border-b dark:border-zinc-700">
            <li>
              {selectedItem.read ? (
                <button
                  className="block hover:opacity-75"
                  onClick={() => unreadItem(selectedItemIndex as number)}
                >
                  <MailOpen className="w-5 h-5" />
                </button>
              ) : (
                <button
                  className="block hover:opacity-75"
                  onClick={() => readItem(selectedItemIndex as number)}
                >
                  <Mail className="w-5 h-5" />
                </button>
              )}
            </li>
            <li>
              <a
                className="block hover:opacity-75"
                href={selectedItem.link}
                target="_blank"
                rel="noopener"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </li>
            <li>
              <button className="block hover:opacity-75" onClick={handleShare}>
                <Share className="w-5 h-5" />
              </button>
            </li>
          </ul>
          <header className="border-b dark:border-zinc-700 p-5 space-y-3">
            <h1 className="text-4xl leading-normal">{selectedItem.title}</h1>
            <span className="text-zinc-500 dark:text-zinc-400 block">
              {selectedItem.author}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block">
              {dayjs(selectedItem.pubDate).format("D MMM, YYYY")}
            </span>
          </header>
          <main className="p-5 prose lg:prose-xl text-black dark:text-white">
            <div
              dangerouslySetInnerHTML={{
                __html: selectedItem.content,
              }}
            ></div>
          </main>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {selectedFeedIndex ? (
            <span className="text-2xl opacity-25">Pick an item</span>
          ) : null}
        </div>
      )}
    </div>
  );
};
