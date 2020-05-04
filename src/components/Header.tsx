import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { InitialState, Themes } from "../state/reducers";
import {
  selectFeed,
  setSubscribeFeedModalVisibility,
  setAboutModalVisibility,
  setHeaderCollapse,
} from "../state/actions";
import useKeyPress from "./useKeyPress";
import HeaderLink from "./HeaderLink";

interface Props {
  feeds: Feed[];
  isCollapsed: boolean;
  isSubscribeFeedModalOpen: boolean;
  openAboutModal: () => {};
  openSubscribeModal: () => {};
  selectedFeed: number | null;
  selectFeed: (i: number | null) => {};
  theme: Themes;
  toggleHeaderCollapse: (isCollapsed: boolean) => {};
}

const KEY_CODE_N = 78;
const KEY_CODE_S = 83;

const Header: React.FC<Props> = ({
  feeds,
  isCollapsed,
  isSubscribeFeedModalOpen,
  openAboutModal,
  openSubscribeModal,
  selectedFeed,
  selectFeed,
  theme,
  toggleHeaderCollapse,
}) => {
  useKeyPress(KEY_CODE_N, () => {
    if (!isSubscribeFeedModalOpen) {
      openSubscribeModal();
    }
  });

  useKeyPress(KEY_CODE_S, () => {
    if (!isSubscribeFeedModalOpen) {
      toggleHeaderCollapse(!isCollapsed);
    }
  });

  return (
    <header
      className={`border-r ${isCollapsed ? "w-16" : "w-1/5"} ${
        theme === Themes.LIGHT
          ? "bg-purple-100 border-gray-400"
          : "bg-purple-900 border-black"
      } sticky top-0 max-h-screen transition`}
    >
      <div className="h-full flex flex-col p-2">
        <nav className="flex-1">
          {feeds && feeds.length > 0 && (
            <>
              {feeds.map((feed, i) => {
                return (
                  <button
                    className="w-full mb-1"
                    onClick={() => selectFeed(i)}
                    key={`select-feed-${i}`}
                  >
                    <HeaderLink isSelected={selectedFeed === i}>
                      {feed.icon ? (
                        <img
                          className="w-4 rounded"
                          src={feed.icon}
                          alt={feed.title}
                        />
                      ) : (
                        <span
                          className={`flex items-center justify-center rounded w-4 h-4 text-center text-xs ${
                            theme === Themes.LIGHT
                              ? "bg-black text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          {feed.title[0]}
                        </span>
                      )}
                      {!isCollapsed && (
                        <span className="ml-3 max-lines">{feed.title}</span>
                      )}
                    </HeaderLink>
                  </button>
                );
              })}
              <button
                className="w-full mb-1"
                onClick={() => openSubscribeModal()}
              >
                <HeaderLink>
                  <svg
                    aria-label="Add"
                    className="w-4 text-gray-500 fill-current"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z" />
                  </svg>
                  {!isCollapsed && <span className="ml-3">Add feed</span>}
                </HeaderLink>
              </button>
            </>
          )}
        </nav>
        <button onClick={() => openAboutModal()}>
          <HeaderLink>
            <span className="w-4" role="img" aria-label="About nosh">
              🍜
            </span>
            {!isCollapsed && <span className="ml-3">About</span>}
          </HeaderLink>
        </button>
        <button onClick={() => toggleHeaderCollapse(!isCollapsed)}>
          <HeaderLink>
            {isCollapsed ? (
              <svg
                aria-label="Expand menu"
                className="w-4 text-gray-500 fill-current"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
              </svg>
            ) : (
              <svg
                aria-label="Collapse menu"
                className="w-4 text-gray-500 fill-current"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
              </svg>
            )}
            {!isCollapsed && <span className="ml-3">Collapse sidebar</span>}
          </HeaderLink>
        </button>
      </div>
    </header>
  );
};

const mapStateToProps = (state: InitialState) => ({
  feeds: state.feeds,
  selectedFeed: state.selectedFeed,
  isSubscribeFeedModalOpen: state.ui.isSubscribeFeedModalOpen,
  isCollapsed: state.ui.isHeaderCollapsed,
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openAboutModal: () => dispatch(setAboutModalVisibility(true)),
  openSubscribeModal: () => dispatch(setSubscribeFeedModalVisibility(true)),
  toggleHeaderCollapse: (isCollapsed: boolean) =>
    dispatch(setHeaderCollapse(isCollapsed)),
  selectFeed: (i: number | null) => dispatch(selectFeed(i)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
