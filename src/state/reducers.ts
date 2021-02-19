import { combineReducers } from 'redux';

import { Feed } from '../types';
import * as actions from './actions';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export type NetworkStatus = 'IDLE' | 'FETCHING' | 'ERROR' | 'OFFLINE';

export type Modal = 'ABOUT' | 'SUBSCRIBE' | 'UNSUBSCRIBE';

export interface InitialState {
  selectedFeed: string | null;
  selectedItem: number | null;
  feeds: {
    [key: string]: Feed;
  };
  ui: {
    error: Error | null;
    networkStatus: NetworkStatus;
    modal: Modal | null;
    isHeaderCollapsed: boolean;
    theme: Themes;
  };
}

export const initialState: InitialState = {
  selectedFeed: null,
  selectedItem: null,
  feeds: {},
  ui: {
    error: null,
    networkStatus: 'IDLE',
    modal: null,
    isHeaderCollapsed: false,
    theme: Themes.LIGHT,
  },
};

const selectedFeed = (
  state = initialState.selectedFeed,
  action: actions.ActionTypes,
) => {
  switch (action.type) {
    case actions.SET_FEED:
      return action.key;

    default:
      return state;
  }
};

const feeds = (state = initialState.feeds, action: actions.ActionTypes) => {
  switch (action.type) {
    case actions.SET_FEEDS:
      return action.feeds;

    case actions.ADD_FEED:
      const feedLength = Object.keys(state).length;
      return {
        ...state,
        [feedLength + 1]: {
          ...action.feed,
        },
      };

    case actions.UPDATE_FEED:
      return {
        ...state,
        [action.key]: {
          ...action.feed,
        },
      };

    case actions.UNSUBSCRIBE_FEED:
      const stateCopy = { ...state };
      delete stateCopy[action.key];

      return stateCopy;

    default:
      return state;
  }
};

const selectedItem = (
  state = initialState.selectedItem,
  action: actions.ActionTypes,
) => {
  switch (action.type) {
    case actions.SELECT_ITEM:
      return action.index;

    default:
      return state;
  }
};

const ui = (state = initialState.ui, action: actions.ActionTypes) => {
  switch (action.type) {
    case actions.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case actions.SET_NETWORK_STATUS:
      return {
        ...state,
        networkStatus: action.networkStatus,
      };

    case actions.SET_MODAL:
      return {
        ...state,
        modal: action.modal,
      };

    case actions.SET_HEADER_COLLAPSE:
      return {
        ...state,
        isHeaderCollapsed: action.isCollapsed,
      };

    case actions.SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };

    default:
      return state;
  }
};

export default combineReducers({
  feeds,
  selectedFeed,
  selectedItem,
  ui,
});
