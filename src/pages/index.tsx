import React from 'react';
import dynamic from 'next/dynamic';

const NoSSRComponent = dynamic(() => import('../components/App'), {
  ssr: false,
});

const Page = () => <NoSSRComponent />;

export default Page;
