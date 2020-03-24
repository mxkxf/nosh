import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { InitialState } from "../state/reducers";
import { selectFeed, setSubscribeFeedModalVisibility } from "../state/actions";
import useKeyPress from "./useKeyPress";

interface Props {
  feeds: Feed[];
  openSubscribeModal: () => {};
  selectedFeed: number | null;
  selectFeed: (i: number | null) => {};
}

const KEY_CODE_N = 78;

const Header: React.FC<Props> = ({
  feeds,
  openSubscribeModal,
  selectedFeed,
  selectFeed,
}) => {
  useKeyPress(KEY_CODE_N, openSubscribeModal);

  return (
    <header className="md:w-16 bg-blue-900 text-white sticky top-0 max-h-screen">
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
                    className={`bg-green-500 text-white leading-none rounded block w-full p-4 my-2 ${
                      selectedFeed === i
                        ? "opacity-100"
                        : "opacity-50 hover:opacity-75"
                    }`}
                    onClick={() => selectFeed(i)}
                    key={`select-feed-${i}`}
                  >
                    {feed.icon ? (
                      <img src={feed.icon} alt={feed.title} />
                    ) : (
                      feed.title[0]
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
        <button className="hover:bg-blue-800 text-center leading-none p-4 text-2xl">
          <span role="img" aria-label="User">
            👤
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
  selectFeed: (i: number | null) => dispatch(selectFeed(i)),
  openSubscribeModal: () => dispatch(setSubscribeFeedModalVisibility(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
