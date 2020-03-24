import { Middleware } from "redux";

import { ADD_FEED, UNSUBSCRIBE_FEED } from "./actions";

export const persistFeedsToLocalStorage: Middleware = (store) => (next) => (
  action,
) => {
  const result = next(action);

  if (action.type === ADD_FEED || action.type === UNSUBSCRIBE_FEED) {
    const feedUrls = store.getState().feeds.map((feed: Feed) => feed.url);

    window.localStorage.setItem("feedUrls", JSON.stringify(feedUrls));
  }

  return result;
};
