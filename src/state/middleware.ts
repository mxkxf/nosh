import { Middleware } from "redux";

import { ADD_FEED, UNSUBSCRIBE_FEED, SET_HEADER_COLLAPSE } from "./actions";
import { InitialState } from "./reducers";

export const persistLocalStorage: Middleware<{}, InitialState> = (store) => (
  next,
) => (action) => {
  const result = next(action);

  if (action.type === SET_HEADER_COLLAPSE) {
    const isHeaderCollapsed = store.getState().ui.isHeaderCollapsed;

    window.localStorage.setItem("isHeaderCollapsed", String(isHeaderCollapsed));
  }

  if (action.type === ADD_FEED || action.type === UNSUBSCRIBE_FEED) {
    const feedUrls = store.getState().feeds.map((feed: Feed) => feed.url);

    window.localStorage.setItem("feedUrls", JSON.stringify(feedUrls));
  }

  return result;
};
