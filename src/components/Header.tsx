import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { InitialState } from "../state/reducers";
import {
  selectFeed,
  setSubscribeFeedModalVisibility,
  setAboutModalVisibility,
} from "../state/actions";
import useKeyPress from "./useKeyPress";

interface Props {
  feeds: Feed[];
  openAboutModal: () => {};
  openSubscribeModal: () => {};
  selectedFeed: number | null;
  selectFeed: (i: number | null) => {};
}

const KEY_CODE_N = 78;

const Header: React.FC<Props> = ({
  feeds,
  openAboutModal,
  openSubscribeModal,
  selectedFeed,
  selectFeed,
}) => {
  useKeyPress(KEY_CODE_N, openSubscribeModal);

  return (
    <header className="w-16 bg-blue-800 text-white sticky top-0 max-h-screen">
      <div className="h-full flex flex-col">
        <button
          className="block mb-10 hover:bg-blue-800 text-center leading-none p-4 text-2xl"
          onClick={() => selectFeed(null)}
        >
          <span role="img" aria-label="nosh">
            🍜
          </span>
        </button>
        <nav className="flex-1 mx-2 ">
          {feeds && feeds.length > 0 && (
            <>
              {feeds.map((feed, i) => {
                return (
                  <button
                    className={`bg-blue-700 rounded leading-none block w-full my-2 h-12 flex ${
                      selectedFeed === i
                        ? "opacity-100"
                        : "opacity-50 hover:opacity-75"
                    }`}
                    onClick={() => selectFeed(i)}
                    key={`select-feed-${i}`}
                  >
                    {feed.icon ? (
                      <img
                        className="m-auto rounded"
                        src={feed.icon}
                        alt={feed.title}
                      />
                    ) : (
                      <span className="bg-green-500 text-white">
                        {feed.title[0]}
                      </span>
                    )}
                  </button>
                );
              })}
              <button
                className="leading-none rounded bg-blue-700 opacity-50 hover:opacity-75 block w-full p-4 my-1"
                onClick={() => openSubscribeModal()}
              >
                <span className="-mr-1" role="img" aria-label="Add feed">
                  ➕
                </span>
              </button>
            </>
          )}
        </nav>
        <button
          onClick={() => openAboutModal()}
          className="hover:bg-blue-800 text-center leading-none p-4 text-2xl"
        >
          <span role="img" aria-label="Information">
            ℹ️
          </span>
        </button>
      </div>
    </header>
  );
};

const mapStateToProps = (state: InitialState) => ({
  feeds: state.feeds,
  selectedFeed: state.selectedFeed,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openAboutModal: () => dispatch(setAboutModalVisibility(true)),
  openSubscribeModal: () => dispatch(setSubscribeFeedModalVisibility(true)),
  selectFeed: (i: number | null) => dispatch(selectFeed(i)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
