import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers";
import {
  loadFromLocalStorage,
  persistToLocalStorage,
} from "./persistLocalStorage";

const middleware = [thunk, persistToLocalStorage];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

const store = createStore(
  reducers,
  loadFromLocalStorage(),
  applyMiddleware(...middleware),
);

export default store;
