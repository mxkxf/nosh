import { Middleware } from "redux";

import { ADD_FEED, UNSUBSCRIBE_FEED } from "./actions";
import { InitialState } from "./reducers";

export const persistFeedsToLocalStorage: Middleware<{}, InitialState> = (
  store,
) => (next) => (action) => {
  const result = next(action);

  if (action.type === ADD_FEED || action.type === UNSUBSCRIBE_FEED) {
    console.log(store.getState().feeds);

    const feedUrls = store.getState().feeds.map((feed: Feed) => feed.url);
    console.log(feedUrls);

    window.localStorage.setItem("feedUrls", JSON.stringify(feedUrls));
  }

  return result;
};
