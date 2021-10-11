import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { subscribeFeed, setModal } from '../../state/actions';
import Modal from './Modal';
import { InitialState } from '../../state/reducers';

const examples = [
  {
    url: 'http://smashingmagazine.com/feed',
    text: 'Smashing Magazine',
  },
  {
    url: 'http://news.ycombinator.com/rss',
    text: 'Hacker News',
  },
];

const SubscribeFeedModal = () => {
  const [url, setUrl] = React.useState('');
  const dispatch = useDispatch();
  const { error, feeds, networkStatus } = useSelector(
    (state: InitialState) => ({
      error: state.ui.error,
      feeds: state.feeds,
      networkStatus: state.ui.networkStatus,
    }),
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(subscribeFeed(url));
  };

  return (
    <Modal
      closeModalFunc={() => dispatch(setModal(null))}
      title="Subscribe to a new feed"
    >
      <div className="text-center text-2xl mb-8">
        <h1>Subscribe to a new feed</h1>
      </div>
      {feeds && Object.keys(feeds).length === 0 ? (
        <div className="mb-6">
          <p className="mb-2">
            <span className="mr-1" role="img" aria-label="Eyes">
              👀
            </span>
            Looking for some examples to get you started?
          </p>
          <ul>
            {examples.map((example, i) => (
              <li key={`example-${i}`}>
                <button
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200 underline"
                  onClick={() => {
                    setUrl(example.url);
                    subscribeFeed(example.url);
                  }}
                >
                  {example.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <form className="flex" method="POST" onSubmit={handleSubmit}>
        <label className="hidden" htmlFor="url">
          Feed URL
        </label>
        <input
          className={`border bg-white dark:border-black dark:bg-gray-900 flex-1 rounded px-2 py-1 ${
            networkStatus === 'FETCHING' ? 'cursor-not-allowed bg-gray-100' : ''
          }`}
          required={true}
          disabled={networkStatus === 'FETCHING'}
          autoComplete="off"
          type="text"
          id="url"
          name="url"
          placeholder="Feed URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button
          className={`ml-4 rounded bg-indigo-600 border-indigo-500 hover:bg-indigo-700 px-4 py-2 text-white font-semibold ${
            networkStatus === 'FETCHING' ? 'cursor-not-allowed opacity-75' : ''
          }`}
          disabled={networkStatus === 'FETCHING'}
          type="submit"
        >
          {networkStatus === 'FETCHING' ? (
            <svg
              aria-label="Loading"
              className="w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              aria-label="Subscribe"
              className="w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </form>
      {error && (
        <p className="text-center text-red-600 font-semibold text-sm mt-2">
          <span className="mr-2" role="img" aria-label="Sad face">
            😔
          </span>
          Oh no! There was a problem subscribing to your feed.
          <br />
          Please check the URL and try again.
        </p>
      )}
    </Modal>
  );
};

export default SubscribeFeedModal;
