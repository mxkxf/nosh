import { Middleware } from "redux";

import {
  ADD_FEED,
  UNSUBSCRIBE_FEED,
  SET_HEADER_COLLAPSE,
  SET_THEME,
} from "./actions";
import { InitialState, initialState } from "./reducers";

export const persistToLocalStorage: Middleware<{}, InitialState> = (store) => (
  next,
) => (action) => {
  const result = next(action);

  try {
    if (action.type === SET_HEADER_COLLAPSE || action.type === SET_THEME) {
      const uiState = {
        isHeaderCollapsed: store.getState().ui.isHeaderCollapsed,
        theme: store.getState().ui.theme,
      };

      window.localStorage.setItem("ui", JSON.stringify(uiState));
    }

    if (action.type === ADD_FEED || action.type === UNSUBSCRIBE_FEED) {
      const feedUrls = store.getState().feeds.map((feed: Feed) => feed.url);

      window.localStorage.setItem("feedUrls", JSON.stringify(feedUrls));
    }

    return result;
  } catch (e) {
    return result;
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serialisedUiState = localStorage.getItem("ui") as string;

    return {
      ...initialState,
      ui: {
        ...initialState.ui,
        ...JSON.parse(serialisedUiState),
      },
    };
  } catch (error) {
    return undefined;
  }
};
