import React from 'react';

import App from '../components/App';

const Page = () => <App />;

// Force disable SSR
Page.getInitialProps = async () => {
    return {};
  }

export default Page;
