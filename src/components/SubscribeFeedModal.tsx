import React, { FormEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  subscribeFeed,
  setSubscribeFeedModalVisibility,
} from "../state/actions";
import Modal from "./Modal";
import { InitialState, Themes } from "../state/reducers";

interface Props {
  closeModal: () => {};
  error: Error | null;
  feeds: Feed[];
  isLoading: boolean;
  subscribeFeed: (url: string) => {};
  theme: Themes;
}

const examples = [
  {
    url: "http://smashingmagazine.com/feed",
    text: "Smashing Magazine",
  },
  {
    url: "http://news.ycombinator.com/rss",
    text: "Hacker News",
  },
];

const SubscribeFeedModal: React.FC<Props> = ({
  closeModal,
  error,
  feeds,
  isLoading,
  subscribeFeed,
  theme,
}) => {
  const [url, setUrl] = React.useState("");

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    subscribeFeed(url);
  };

  return (
    <Modal closeModalFunc={closeModal}>
      <div className="text-center text-2xl mb-8">
        <h2>Subscribe to a new feed</h2>
      </div>
      {feeds.length === 0 && (
        <div className="text-sm mb-6">
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
                  className="text-blue-500 hover:text-blue-700 underline"
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
      )}
      <form className="flex" method="POST" onSubmit={handleSubmit}>
        <label className="hidden" htmlFor="url">
          Feed URL
        </label>
        <input
          className={`border ${
            theme === Themes.LIGHT ? "bg-white" : "border-black bg-gray-900"
          } flex-1 rounded px-2 py-1 ${
            isLoading ? "cursor-not-allowed bg-gray-100" : ""
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
          className={`ml-4 rounded bg-blue-500 border-blue-500 hover:bg-blue-600 px-3 py-2 text-white ${
            isLoading ? "cursor-not-allowed opacity-75" : ""
          }`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Loading..." : "Subscribe"}
        </button>
      </form>
      {error && (
        <p className="text-center text-red-500 font-bold text-sm mt-2">
          <span role="img" aria-label="Sad face">
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
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribeFeed: (url: string) => dispatch(subscribeFeed(url)),
  closeModal: () => dispatch(setSubscribeFeedModalVisibility(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeFeedModal);
