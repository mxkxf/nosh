"use client";

import { Feed } from "@/types";
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

interface State {
  feeds: Feed[];
  selectedFeedIndex: number | undefined;
  selectedItemIndex: number | undefined;
}

const initialState: State = {
  feeds: [],
  selectedFeedIndex: undefined,
  selectedItemIndex: undefined,
};

const FeedContext = createContext(
  {} as State & {
    selectFeed: (index: number) => void;
    deleteFeed: (index: number) => void;
    selectItem: (index: number) => void;
    readItem: (index: number, read: boolean) => void;
    readAllItems: (index: number, read: boolean) => void;
    addFeed: (feed: Feed) => void;
    updateFeed: (index: number, feed: Feed) => void;
  }
);

type Action =
  | {
      type: "SELECT_FEED";
      index: number;
    }
  | {
      type: "SELECT_ITEM";
      index: number;
    }
  | {
      type: "ADD_FEED";
      feed: Feed;
    }
  | {
      type: "UPDATE_FEED";
      index: number;
      feed: Feed;
    }
  | {
      type: "DELETE_FEED";
      index: number;
    }
  | {
      type: "TOGGLE_READ_ITEM";
      index: number;
      read: boolean;
    }
  | {
      type: "TOGGLE_READ_ALL_ITEMS";
      index: number;
      read: boolean;
    }
  | { type: "NOOP" };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SELECT_FEED": {
      return {
        ...state,
        selectedFeedIndex: action.index,
      };
    }
    case "SELECT_ITEM": {
      if (typeof state.selectedFeedIndex === "undefined") {
        throw new Error("Selected feed is not set");
      }

      return {
        ...state,
        selectedItemIndex: action.index,
      };
    }
    case "ADD_FEED": {
      const newFeeds = [...state.feeds, action.feed];
      const index = newFeeds.length - 1;

      return {
        ...state,
        feeds: newFeeds,
        selectedFeedIndex: index,
      };
    }
    case "UPDATE_FEED": {
      const newFeeds = [...state.feeds];

      newFeeds[action.index] = {
        ...newFeeds[action.index],
        items: action.feed.items.map((newItem) => {
          const existingRead = newFeeds[action.index].items.find(
            (item) => item.link === newItem.link
          )?.read;

          return {
            ...newItem,
            read: existingRead || false,
          };
        }),
      };

      return {
        ...state,
        feeds: newFeeds,
      };
    }
    case "DELETE_FEED": {
      const newFeeds = [...state.feeds];

      newFeeds.splice(action.index, 1);

      return {
        ...state,
        feeds: newFeeds,
        selectedFeedIndex: undefined,
      };
    }
    case "TOGGLE_READ_ITEM": {
      if (
        typeof state.selectedFeedIndex === "undefined" ||
        typeof state.selectedItemIndex === "undefined"
      ) {
        throw new Error("Selected feed is not set");
      }

      const newFeeds = [...state.feeds];
      const newItems = newFeeds[state.selectedFeedIndex].items;
      newItems[action.index] = {
        ...newItems[action.index],
        read: action.read,
      };
      newFeeds[state.selectedFeedIndex] = {
        ...newFeeds[state.selectedFeedIndex],
        items: newItems,
      };

      return {
        ...state,
        feeds: newFeeds,
      };
    }
    case "TOGGLE_READ_ALL_ITEMS": {
      const newFeeds = [...state.feeds];

      newFeeds[action.index] = {
        ...newFeeds[action.index],
        items: newFeeds[action.index].items.map((item) => ({
          ...item,
          read: action.read,
        })),
      };

      return {
        ...state,
        feeds: newFeeds,
      };
    }
    default:
      return state;
  }
}

function initialiser(initialState: State) {
  let feeds = initialState.feeds;

  try {
    if (typeof window !== "undefined") {
      feeds = JSON.parse(window.localStorage.getItem("feeds") || "[]");
    }
  } catch {
    // Something went wrong with the JSON parsing
  }

  return {
    ...initialState,
    feeds,
  };
}

function useReducerWithMiddleware(
  reducer: (state: State, action: Action) => State,
  initialState: State,
  initialiser: (initialState: State) => State,
  middlewareFns: Array<{ (action: Action, state: State): void }> = [],
  afterwareFns: Array<{ (action: Action, state: State): void }> = []
): [State, Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState, initialiser);

  const aRef = useRef<Action>({ type: "NOOP" });

  const dispatchWithMiddleware = (action: Action) => {
    middlewareFns.forEach((middlewareFn) => middlewareFn(action, state));

    aRef.current = action;

    dispatch(action);
  };

  useEffect(() => {
    afterwareFns.forEach((afterwareFn) =>
      afterwareFn(aRef.current as Action, state)
    );

    aRef.current = { type: "NOOP" };
  }, [afterwareFns, state]);

  return [state, dispatchWithMiddleware];
}

function persistLocalStorage(_action: Action, state: State) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("feeds", JSON.stringify(state.feeds));
}

export const FeedProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducerWithMiddleware(
    reducer,
    initialState,
    initialiser,
    [],
    [persistLocalStorage]
  );

  const selectFeed = (index: number) =>
    dispatch({ type: "SELECT_FEED", index });

  const deleteFeed = (index: number) =>
    dispatch({ type: "DELETE_FEED", index });

  const selectItem = (index: number) =>
    dispatch({ type: "SELECT_ITEM", index });

  const addFeed = (feed: Feed) => dispatch({ type: "ADD_FEED", feed });

  const updateFeed = (index: number, feed: Feed) =>
    dispatch({ type: "UPDATE_FEED", index, feed });

  const readItem = (index: number, read: boolean) =>
    dispatch({ type: "TOGGLE_READ_ITEM", index, read });

  const readAllItems = (index: number, read: boolean) =>
    dispatch({ type: "TOGGLE_READ_ALL_ITEMS", index, read });

  return (
    <FeedContext.Provider
      value={{
        ...state,
        selectFeed,
        selectItem,
        addFeed,
        updateFeed,
        deleteFeed,
        readItem,
        readAllItems,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeeds = () => useContext(FeedContext);
