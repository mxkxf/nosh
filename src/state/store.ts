import { createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers";
import { persistLocalStorage } from "./middleware";

const middleware: Middleware[] = [thunk, persistLocalStorage];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;
