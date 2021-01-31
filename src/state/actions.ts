import { Dispatch } from 'redux';
import { batchActions } from 'redux-batched-actions';

import { Feed } from '../types';
import getFeed from '../utils/getFeed';
import { InitialState } from './reducers';

export const SET_FEEDS = 'SET_FEEDS';
export const setFeeds = (feeds: { [key: string]: Feed }) => ({
  type: SET_FEEDS,
  feeds,
});

export const SELECT_FEED = 'SELECT_FEED';
export const selectFeed = (key: string): any => async (
  dispatch: Dispatch,
  getState: () => InitialState,
) => {
  if (!window.navigator?.onLine) {
    dispatch(setFeed(key));
    return;
  }

  try {
    dispatch(setLoading(true));

    const feedUrl = getState().feeds[key].url;
    const feed = await getFeed(feedUrl);

    batchActions([
      dispatch(setLoading(false)),
      dispatch(updateFeed(key, feed)),
      dispatch(setFeed(key)),
    ]);
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error));
  }
};

export const UPDATE_FEED = 'UPDATE_FEED';
export const updateFeed = (key: string, feed: Feed) => ({
  type: UPDATE_FEED,
  key,
  feed,
});

export const SET_FEED = 'SET_FEED';
export const setFeed = (key: string | null) => ({
  type: SET_FEED,
  key,
});

export const SUBSCRIBE_FEED = 'SUBSCRIBE_FEED';
export const subscribeFeed = (url: string): any => async (
  dispatch: Dispatch,
  getState: () => InitialState,
) => {
  dispatch(setLoading(true));

  const currentFeeds = getState().feeds;
  const alreadySubscribed = Object.keys(currentFeeds).some(
    (f) => currentFeeds[f].url === url,
  );

  try {
    if (alreadySubscribed) {
      throw new Error(`Already subscribed to ${url}`);
    }

    const feed = await getFeed(url);

    batchActions([
      dispatch(setLoading(false)),
      dispatch(addFeed(feed)),
      dispatch(
        setFeed(
          Object.keys(getState().feeds)[
            Object.keys(getState().feeds).length - 1
          ],
        ),
      ),
      dispatch(setSubscribeFeedModalVisibility(false)),
    ]);
  } catch (error) {
    batchActions([dispatch(setLoading(false)), dispatch(setError(error))]);
  }
};

export const SET_SUBSCRIBE_FEED_MODAL_VISIBILITY =
  'SET_SUBSCRIBE_FEED_MODAL_VISIBILITY';
export const setSubscribeFeedModalVisibility = (isOpen: boolean) => ({
  type: SET_SUBSCRIBE_FEED_MODAL_VISIBILITY,
  isOpen,
});

export const SET_UNSUBSCRIBE_FEED_MODAL_VISIBILITY =
  'SET_UNSUBSCRIBE_FEED_MODAL_VISIBILITY';
export const setUnsubscribeFeedModalVisibility = (isOpen: boolean) => ({
  type: SET_UNSUBSCRIBE_FEED_MODAL_VISIBILITY,
  isOpen,
});

export const SET_ABOUT_MODAL_VISIBILITY = 'SET_ABOUT_MODAL_VISIBILITY';
export const setAboutModalVisibility = (isOpen: boolean) => ({
  type: SET_ABOUT_MODAL_VISIBILITY,
  isOpen,
});

export const SET_HEADER_COLLAPSE = 'SET_HEADER_COLLAPSE';
export const setHeaderCollapse = (isCollapsed: boolean) => ({
  type: SET_HEADER_COLLAPSE,
  isCollapsed,
});

export const SET_THEME = 'SET_THEME';
export const setTheme = (theme: string) => ({
  type: SET_THEME,
  theme,
});

export const ADD_FEED = 'ADD_FEED';
export const addFeed = (feed: Feed) => ({
  type: ADD_FEED,
  feed,
});

export const UNSUBSCRIBE_FEED = 'UNSUBSCRIBE_FEED';
export const unSubscribeFeed = (key: string) => ({
  type: UNSUBSCRIBE_FEED,
  key,
});

export const SELECT_ITEM = 'SELECT_ITEM';
export const selectItem = (index: number | null) => ({
  type: SELECT_ITEM,
  index,
});

export const SET_ERROR = 'SET_ERROR';
export const setError = (error: Error) => ({
  type: SET_ERROR,
  error,
});

export const SET_LOADING = 'SET_LOADING';
export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  isLoading,
});

export type ActionTypes =
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
