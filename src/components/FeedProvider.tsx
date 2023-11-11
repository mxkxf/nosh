"use client";

import { Feed, FeedItem } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

interface State {
  feeds: Feed[];
  selectedFeed: Feed | undefined;
  selectedFeedIndex: number | undefined;
  selectedItem: FeedItem | undefined;
  selectedItemIndex: number | undefined;
}

const initialState: State = {
  feeds: [],
  selectedFeed: undefined,
  selectedFeedIndex: undefined,
  selectedItem: undefined,
  selectedItemIndex: undefined,
};

const FeedContext = createContext<
  State & {
    selectFeed: (index: number) => void;
    deleteFeed: (index: number) => void;
    selectItem: (index: number) => void;
    fetchFeed: (url: string) => Promise<void>;
  }
>({
  feeds: [],
  selectedFeed: undefined,
  selectedFeedIndex: undefined,
  selectFeed: (_index) => {},
  deleteFeed: (_index) => {},
  selectedItem: undefined,
  selectedItemIndex: undefined,
  selectItem: (_index) => {},
  fetchFeed: async (_url) => {},
});

function reducer(state: State, action: { type: string; value: any }) {
  switch (action.type) {
    case "SELECT_FEED":
      return {
        ...state,
        selectedFeed: state.feeds[action.value],
        selectedFeedIndex: action.value,
        selectedItem: undefined,
      };
    case "SELECT_ITEM":
      if (!state.selectedFeed) {
        throw new Error("Selected feed is not set");
      }

      return {
        ...state,
        selectedItem: state.selectedFeed.items[action.value],
      };
    case "ADD_FEED":
      const merged = [...state.feeds, action.value];
      const index = merged.length - 1;

      return {
        ...state,
        feeds: merged,
        selectedFeed: merged[index],
        selectedFeedIndex: index,
        selectedItem: undefined,
      };

    case "DELETE_FEED":
      const spliced = [...state.feeds];

      spliced.splice(action.value, 1);

      return {
        ...state,
        feeds: spliced,
        selectedFeed: undefined,
        selectedFeedIndex: undefined,
      };
    default:
      return state;
  }
}

export const FeedProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectFeed = (value: number) =>
    dispatch({ type: "SELECT_FEED", value });

  const deleteFeed = (value: number) =>
    dispatch({ type: "DELETE_FEED", value });

  const selectItem = (value: number) =>
    dispatch({ type: "SELECT_ITEM", value });

  const fetchFeed = async (url: string) => {
    const response = await fetch(`http://localhost:3000/feed?url=${url}`);
    console.log("response");
    console.log(response);
    const value = await response.json();

    console.log("value");
    console.log(value);
    console.log("value");

    dispatch({ type: "ADD_FEED", value });
  };

  return (
    <FeedContext.Provider
      value={{ ...state, selectFeed, selectItem, fetchFeed, deleteFeed }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeeds = () => useContext(FeedContext);
