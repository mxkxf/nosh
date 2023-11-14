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

const FeedContext = createContext<
  State & {
    selectFeed: (index: number) => void;
    deleteFeed: (index: number) => void;
    selectItem: (index: number) => void;
    readItem: (index: number) => void;
    unreadItem: (index: number) => void;
    addFeed: (feed: Feed) => void;
    updateFeed: (index: number, feed: Feed) => void;
  }
>({
  feeds: [],
  selectedFeedIndex: undefined,
  selectFeed: (_index) => {},
  deleteFeed: (_index) => {},
  selectedItemIndex: undefined,
  selectItem: (_index) => {},
  readItem: (_index) => {},
  unreadItem: (_index) => {},
  addFeed: (_feed) => {},
  updateFeed: (_index, _feed) => {},
});

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
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SELECT_FEED":
      return {
        ...state,
        selectedFeedIndex: action.index,
      };
    case "SELECT_ITEM":
      if (typeof state.selectedFeedIndex === "undefined") {
        throw new Error("Selected feed is not set");
      }

      return {
        ...state,
        selectedItemIndex: action.index,
      };

    case "ADD_FEED":
      const merged = [...state.feeds, action.feed];
      const index = merged.length - 1;

      return {
        ...state,
        feeds: merged,
        selectedFeedIndex: index,
      };

    case "UPDATE_FEED":
      return {
        ...state,
        feeds: state.feeds.map((feed, i) => {
          if (i !== action.index) {
            return feed;
          }

          return action.feed;
        }),
        selectedFeedIndex: action.index,
      };

    case "DELETE_FEED":
      const spliced = [...state.feeds];

      spliced.splice(action.index, 1);

      return {
        ...state,
        feeds: spliced,
        selectedFeedIndex: undefined,
      };

    case "TOGGLE_READ_ITEM":
      if (
        typeof state.selectedFeedIndex === "undefined" ||
        typeof state.selectedItemIndex === "undefined"
      ) {
        throw new Error("Selected feed is not set");
      }

      return {
        ...state,
        feeds: state.feeds.map((feed, f) => {
          if (state.selectedFeedIndex !== f) {
            return feed;
          }

          return {
            ...feed,
            items: feed.items.map((item, i) => {
              if (action.index !== i) {
                return item;
              }

              return {
                ...item,
                read: action.read,
              };
            }),
          };
        }),
      };
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
  } catch (error) {
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
  middlewareFns: Array<{ (action: Action, state: State): void }> = [],
  afterwareFns: Array<{ (action: Action, state: State): void }> = []
): [State, Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState, initialiser);

  const aRef = useRef<Action>();

  const dispatchWithMiddleware = (action: Action) => {
    middlewareFns.forEach((middlewareFn) => middlewareFn(action, state));

    aRef.current = action;

    dispatch(action);
  };

  useEffect(() => {
    if (typeof aRef.current === "undefined") {
      return;
    }

    afterwareFns.forEach((afterwareFn) =>
      afterwareFn(aRef.current as Action, state)
    );

    aRef.current = undefined;
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

  const readItem = (index: number) =>
    dispatch({ type: "TOGGLE_READ_ITEM", index, read: true });
  const unreadItem = (index: number) =>
    dispatch({ type: "TOGGLE_READ_ITEM", index, read: false });

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
        unreadItem,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeeds = () => useContext(FeedContext);
