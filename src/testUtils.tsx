import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { createStore, Store, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers, {
  initialState as reducerInitialState,
  InitialState,
} from './state/reducers';

type RenderProps = {
  initialState?: InitialState;
  store?: Store;
};

function render(
  ui: React.ReactElement,
  {
    initialState = reducerInitialState,
    store = createStore(reducers, initialState, applyMiddleware(thunk)),
    ...renderOptions
  }: RenderProps = {},
) {
  const Wrapper: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
