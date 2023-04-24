import { AppPropsType } from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../state/store';
import '../styles/index.css';

const WrappedApp: React.FC<AppPropsType> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>nosh | the modern RSS reader</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="The modern RSS reader" />
        <meta name="description" content="Modern RSS reader" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_mikefrancis" />
        <meta name="twitter:creator" content="@_mikefrancis" />
        <meta property="og:url" content="https://nosh.rocks" />
        <meta property="og:title" content="nosh" />
        <meta property="og:description" content="Modern RSS reader" />
        <meta property="og:image" content="https://nosh.rocks/screenshot.png" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default WrappedApp;
