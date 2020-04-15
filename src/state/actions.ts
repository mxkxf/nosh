import { Dispatch } from "redux";
import { batchActions } from "redux-batched-actions";

import getFeed from "../utils/getFeed";
import { InitialState } from "./reducers";

export const RETRIEVE_FEEDS = "RETRIEVE_FEEDS";
export const retrieveFeeds = (): any => async (dispatch: Dispatch) => {
  try {
    const feedUrls: string[] = JSON.parse(
      window.localStorage.getItem("feedUrls") as string,
    );

    if (!feedUrls.length) {
      return;
    }

    dispatch(setLoading(true));

    const feeds = await Promise.all(feedUrls.map(getFeed));

    batchActions([
      dispatch(setLoading(false)),
      dispatch(setFeeds(feeds)),
      dispatch(selectFeed(0)),
    ]);
  } catch (error) {
    //
  }
};

export const SET_FEEDS = "SET_FEEDS";
export const setFeeds = (feeds: Feed[]) => ({
  type: SET_FEEDS,
  feeds,
});

export const SELECT_FEED = "SELECT_FEED";
export const selectFeed = (index: number | null) => ({
  type: SELECT_FEED,
  index,
});

export const SUBSCRIBE_FEED = "SUBSCRIBE_FEED";
export const subscribeFeed = (url: string): any => async (
  dispatch: Dispatch,
  getState: () => InitialState,
) => {
  dispatch(setLoading(true));

  try {
    const feed = await getFeed(url);

    batchActions([
      dispatch(addFeed(feed)),
      dispatch(selectFeed(getState().feeds.length - 1)),
      dispatch(setSubscribeFeedModalVisibility(false)),
    ]);
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const SET_SUBSCRIBE_FEED_MODAL_VISIBILITY =
  "SET_SUBSCRIBE_FEED_MODAL_VISIBILITY";
export const setSubscribeFeedModalVisibility = (isOpen: boolean) => ({
  type: SET_SUBSCRIBE_FEED_MODAL_VISIBILITY,
  isOpen,
});

export const SET_UNSUBSCRIBE_FEED_MODAL_VISIBILITY =
  "SET_UNSUBSCRIBE_FEED_MODAL_VISIBILITY";
export const setUnsubscribeFeedModalVisibility = (isOpen: boolean) => ({
  type: SET_UNSUBSCRIBE_FEED_MODAL_VISIBILITY,
  isOpen,
});

export const SET_ABOUT_MODAL_VISIBILITY = "SET_ABOUT_MODAL_VISIBILITY";
export const setAboutModalVisibility = (isOpen: boolean) => ({
  type: SET_ABOUT_MODAL_VISIBILITY,
  isOpen,
});

export const SET_HEADER_COLLAPSE = "SET_HEADER_COLLAPSE";
export const setHeaderCollapse = (isCollapsed: boolean) => ({
  type: SET_HEADER_COLLAPSE,
  isCollapsed,
});

export const ADD_FEED = "ADD_FEED";
export const addFeed = (feed: Feed) => ({
  type: ADD_FEED,
  feed,
});

export const UNSUBSCRIBE_FEED = "UNSUBSCRIBE_FEED";
export const unSubscribeFeed = (index: number) => ({
  type: UNSUBSCRIBE_FEED,
  index,
});

export const SELECT_ITEM = "SELECT_ITEM";
export const selectItem = (index: number | null) => ({
  type: SELECT_ITEM,
  index,
});

export const SET_ERROR = "SET_ERROR";
export const setError = (error: Error) => ({
  type: SET_ERROR,
  error,
});

export const SET_LOADING = "SET_LOADING";
export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  isLoading,
});

export type ActionTypes =
  | ReturnType<typeof retrieveFeeds>
  | ReturnType<typeof setFeeds>
  | ReturnType<typeof selectFeed>
  | ReturnType<typeof subscribeFeed>
  | ReturnType<typeof setSubscribeFeedModalVisibility>
  | ReturnType<typeof setUnsubscribeFeedModalVisibility>
  | ReturnType<typeof addFeed>
  | ReturnType<typeof unSubscribeFeed>
  | ReturnType<typeof selectItem>
  | ReturnType<typeof setError>
  | ReturnType<typeof setLoading>;
