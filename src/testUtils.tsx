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

{
  /* <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
<title>Articles on Smashing Magazine — For Web Designers And Developers</title>
<link>https://www.smashingmagazine.com/</link>
<description>Recent content in Articles on Smashing Magazine — For Web Designers And Developers</description>
<lastBuildDate>Mon, 28 Dec 2020 12:33:51 GMT</lastBuildDate>
<docs>https://validator.w3.org/feed/docs/rss2.html</docs>
<generator>manual</generator>
<language>en</language>
<image>
<title>Articles on Smashing Magazine — For Web Designers And Developers</title>
<url>https://www.smashingmagazine.com/images/favicon/app-icon-512x512.png</url>
<link>https://www.smashingmagazine.com/</link>
</image>
<copyright>All rights reserved 2020, Smashing Media AG</copyright>
<category>Development</category>
<category>Design</category>
<category>UX</category>
<category>Mobile</category>
<category>Front-end</category>
<atom:link href="https://www.smashingmagazine.com/feed/" rel="self" type="application/rss+xml"/>
<item>
<title>
Some Article Title
</title>
<link>https://smashingmagazine.com/2020/12/vuex-library/</link>
<guid>https://smashingmagazine.com/2020/12/vuex-library/</guid>
<pubDate>Thu, 24 Dec 2020 09:30:13 GMT</pubDate>
<description>
I am a description
</description>
<content:encoded>
I am the main content blah blah
</content:encoded>
<author>Someone</author>
<enclosure url="http://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/17a74d89-a47a-4437-8c9f-0e771e6cb66b/vuex-library.png" length="0" type="image/png"/>
</item>
</channel>
</rss> */
}
