import { Middleware } from 'redux';

import {
  ADD_FEED,
  UNSUBSCRIBE_FEED,
  SET_HEADER_COLLAPSE,
  SET_THEME,
  UPDATE_FEED,
} from './actions';
import { InitialState, initialState } from './reducers';

export const persistToLocalStorage: Middleware<{}, InitialState> =
  (store) => (next) => (action) => {
    const result = next(action);

    try {
      if (action.type === SET_HEADER_COLLAPSE || action.type === SET_THEME) {
        const uiState = {
          isHeaderCollapsed: store.getState().ui.isHeaderCollapsed,
          theme: store.getState().ui.theme,
        };

        window.localStorage.setItem('ui', JSON.stringify(uiState));
      }

      if (
        action.type === ADD_FEED ||
        action.type === UNSUBSCRIBE_FEED ||
        action.type === UPDATE_FEED
      ) {
        const feeds = store.getState().feeds;

        window.localStorage.setItem('feeds', JSON.stringify(feeds));
      }

      return result;
    } catch (e) {
      return result;
    }
  };

export const loadFromLocalStorage = () => {
  try {
    const serialisedUiState = localStorage.getItem('ui') || '{}';
    const serialisedFeeds = localStorage.getItem('feeds') || '{}';

    return {
      ...initialState,
      feeds: JSON.parse(serialisedFeeds),
      ui: {
        ...initialState.ui,
        ...JSON.parse(serialisedUiState),
      },
    };
  } catch (error) {
    return undefined;
  }
};
