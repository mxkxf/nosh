import { combineReducers } from "redux";

import * as actions from "./actions";

export interface InitialState {
  selectedFeed: number | null;
  selectedItem: number | null;
  feeds: Feed[];
  ui: {
    error: Error | null;
    isLoading: boolean;
    isSubscribeFeedModalOpen: boolean;
    isUnsubscribeFeedModalOpen: boolean;
  };
}

const initialState: InitialState = {
  selectedFeed: null,
  selectedItem: null,
  feeds: [],
  ui: {
    error: null,
    isLoading: false,
    isSubscribeFeedModalOpen: false,
    isUnsubscribeFeedModalOpen: false,
  },
};

const selectedFeed = (
  state = initialState.selectedFeed,
  action: actions.ActionTypes,
) => {
  switch (action.type) {
    case actions.SELECT_FEED:
      return action.index;

    default:
      return state;
  }
};

const feeds = (state = initialState.feeds, action: actions.ActionTypes) => {
  switch (action.type) {
    case actions.SET_FEEDS:
      return action.feeds;

    case actions.ADD_FEED:
      return [
        ...state,
        {
          ...action.feed,
        },
      ];
    case actions.UNSUBSCRIBE_FEED:
      const stateCopy = [...state];
      stateCopy.splice(action.index, 1);

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

const error = (state = initialState.ui, action: actions.ActionTypes) => {
  switch (action.type) {
    case actions.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

const ui = (state = initialState.ui, action: actions.ActionTypes) => {
  switch (action.type) {
    case actions.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case actions.SET_SUBSCRIBE_FEED_MODAL_VISIBILITY:
      return {
        ...state,
        isSubscribeFeedModalOpen: action.isOpen,
      };

    case actions.SET_UNSUBSCRIBE_FEED_MODAL_VISIBILITY:
      return {
        ...state,
        isUnsubscribeFeedModalOpen: action.isOpen,
      };

    default:
      return state;
  }
};

export default combineReducers({
  feeds,
  selectedFeed,
  selectedItem,
  error,
  ui,
});
