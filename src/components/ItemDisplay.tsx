import dayjs from "dayjs";
import { useFeeds } from "./FeedProvider";

export const ItemDisplay = () => {
  const { selectedItem } = useFeeds();

  return (
    <div className="border-l dark:border-gray-700 bg-white dark:bg-gray-800 w-2/4 overflow-auto relative">
      {selectedItem ? (
        <>
          <ul className="sticky top-0 px-5 py-2 flex items-center justify-end space-x-5 border-b dark:border-gray-700">
            <li>
              <button className="block hover:opacity-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                  aria-label="Mark as unread"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button className="block hover:opacity-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                  aria-label="Delete"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </li>
            <li>
              <a
                className="block hover:opacity-75"
                href={selectedItem.link}
                target="_blank"
                rel="noopener"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                  aria-label="Permalink"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </li>
            <li>
              <button
                className="block hover:opacity-75"
                onClick={() => {
                  try {
                    navigator.share({
                      url: selectedItem.link,
                      title: selectedItem.title,
                    });
                  } catch (error) {
                    alert("Feature not supported by browsers");
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                  aria-label="Share"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
              </button>
            </li>
          </ul>
          <header className="border-b dark:border-gray-700 p-5 space-y-3">
            <h1 className="text-4xl leading-normal">{selectedItem.title}</h1>
            <span className="text-gray-500 dark:text-gray-400 block">
              {selectedItem.author}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 block">
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
          <span className="text-2xl opacity-50">Pick an item</span>
        </div>
      )}
    </div>
  );
};
