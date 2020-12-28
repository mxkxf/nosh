import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import {
  loadFromLocalStorage,
  persistToLocalStorage,
} from './persistLocalStorage';

let middleware = [thunk, persistToLocalStorage];

if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger');
  middleware = [...middleware, createLogger()];
}

const store = createStore(
  reducers,
  loadFromLocalStorage(),
  applyMiddleware(...middleware),
);

export default store;
