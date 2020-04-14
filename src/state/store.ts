import { createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducers, { initialState } from "./reducers";
// import { persistLocalStorage } from "./middleware";

const middleware: Middleware[] = [thunk];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

const loadState = () => {
  try {
    const serialisedState = localStorage.getItem("state") as string;

    return {
      ...initialState,
      ...JSON.parse(serialisedState),
    };
  } catch (error) {
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serialisedState = JSON.stringify(state);

    localStorage.setItem("state", serialisedState);
  } catch (error) {
    // log somewhere?
  }
};

const store = createStore(
  reducers,
  loadState(),
  applyMiddleware(...middleware),
);

store.subscribe(() => {
  saveState({
    ui: {
      isHeaderCollapsed: store.getState().ui.isHeaderCollapsed,
    },
  });
});

export default store;
