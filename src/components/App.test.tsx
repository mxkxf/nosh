import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render } from '../testUtils';
import App from './App';

describe('App', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('shows a welcome screen if not subscribed to any feeds', () => {
    const { getByText } = render(<App />);

    expect(getByText('Welcome'));
  });

  it('should display information about the app', () => {
    const { queryByText, getByLabelText } = render(<App />);

    fireEvent.click(getByLabelText('Logo'));

    expect(queryByText('Hey there'));
  });

  it('should subscribe to an RSS feed', async () => {
    server.use(
      rest.post('/api/get-feed', (_, res, ctx) => {
        return res(
          ctx.json({
            url: 'https://example.com/feed',
            icon: 'https://example.com/favicon.ico',
            title: 'Articles on Some Blog',
            description: 'Recent content in articles on Some Blog',
            link: 'https://example.com/',
            items: [
              {
                title: 'Some Article Title',
                description: 'I am a description',
                link: 'https://example.com/2020/12/some-article-title/',
                author: 'Some Person',
                pubDate: 'Thu, 24 Dec 2020 09:00:00 GMT',
                content: 'I am the main content blah blah blah',
              },
            ],
          }),
        );
      }),
    );

    const { getByText, getByLabelText } = render(<App />);

    fireEvent.click(getByText('subscribe'));
    fireEvent.change(getByLabelText('Feed URL'), {
      target: { value: 'http://some-feed-url' },
    });
    fireEvent.click(getByText('Add'));

    await waitFor(() => getByText('Some Article Title'));
  });

  it('should handle errors when fetching a feed', async () => {
    server.use(
      rest.post('/api/get-feed', (_, res, ctx) =>
        res(
          ctx.json({
            message: 'omg',
          }),
          ctx.status(500),
        ),
      ),
    );

    const { getByText, getByLabelText } = render(<App />);

    fireEvent.click(getByText('subscribe'));
    fireEvent.change(getByLabelText('Feed URL'), {
      target: { value: 'http://some-feed-url' },
    });
    fireEvent.click(getByText('Add'));
  });
});
