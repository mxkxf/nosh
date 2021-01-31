import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  subscribeFeed,
  setSubscribeFeedModalVisibility,
} from '../../state/actions';
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

const SubscribeFeedModal: React.FC<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> = ({ closeModal, error, feeds, isLoading, subscribeFeed }) => {
  const [url, setUrl] = React.useState('');

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    subscribeFeed(url);
  };

  return (
    <Modal closeModalFunc={closeModal} title="Subscribe to a new feed">
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
            isLoading ? 'cursor-not-allowed bg-gray-100' : ''
          }`}
          required={true}
          disabled={isLoading}
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
            isLoading ? 'cursor-not-allowed opacity-75' : ''
          }`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? '...' : 'Add'}
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

const mapStateToProps = (state: InitialState) => ({
  error: state.ui.error,
  feeds: state.feeds,
  isLoading: state.ui.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribeFeed: (url: string) => dispatch(subscribeFeed(url)),
  closeModal: () => dispatch(setSubscribeFeedModalVisibility(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeFeedModal);
