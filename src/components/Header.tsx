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
            </>
          )}
          <button className="w-full mb-1" onClick={() => openSubscribeModal()}>
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
        </nav>
        <button onClick={() => openAboutModal()}>
          <HeaderLink>
            <svg
              aria-label="Logo"
              className="w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
            >
              <g>
                <g>
                  <path d="M92.652,43.173l-8.115-1.152c-1.488-0.211-2.876,0.832-3.089,2.321l-3.735,26.299C76.728,77.694,74.063,81,65.78,81    H34.364c-8.164,0-10.898-3.034-11.934-10.359l-1.669-11.749c-0.211-1.488,0.846-2.705,2.348-2.705h5.282    c1.502,0,2.732-1.229,2.732-2.731v-8.194c0-1.502-1.23-2.732-2.732-2.732H7.375c-1.502,0-2.559,1.217-2.348,2.706l3.88,27.327    c1.894,13.395,9.781,22.097,25.457,22.097H65.78c15.053,0,23.387-7.615,25.458-22.097l3.735-26.299    C95.182,44.774,94.141,43.384,92.652,43.173z M58.95,73.527l8.113,1.152c1.488,0.208,2.876-0.832,3.089-2.321l8.91-62.749    c0.214-1.488-0.832-2.878-2.32-3.089l-8.11-1.152c-1.488-0.21-2.879,0.833-3.089,2.321L56.63,70.438    C56.419,71.927,57.462,73.313,58.95,73.527z M37.836,73.527l8.113,1.152c1.488,0.208,2.878-0.832,3.089-2.321L57.953,9.61    c0.21-1.488-0.833-2.878-2.321-3.089l-8.114-1.152c-1.488-0.21-2.878,0.833-3.089,2.321l-8.913,62.749    C35.305,71.927,36.348,73.313,37.836,73.527z"></path>
                </g>
              </g>
            </svg>
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
