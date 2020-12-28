import { AppPropsType } from 'next/dist/next-server/lib/utils';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../state/store';
import '../styles/index.css';

const WrappedApp: React.FC<AppPropsType> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default WrappedApp;
