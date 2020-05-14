import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { InitialState, Themes } from "../state/reducers";
import {
  selectFeed,
  setSubscribeFeedModalVisibility,
  setAboutModalVisibility,
  setHeaderCollapse,
  setTheme,
} from "../state/actions";
import useKeyPress from "./useKeyPress";
import HeaderLink from "./HeaderLink";
import Dropdown from "./Dropdown";

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
  toggleTheme: (theme: Themes) => {};
}

const KEY_CODE_N = 78;
const KEY_CODE_S = 83;
const KEY_CODE_T = 84;

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
  toggleTheme,
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

  useKeyPress(KEY_CODE_T, () => {
    if (!isSubscribeFeedModalOpen) {
      toggleTheme(theme);
    }
  });

  return (
    <header
      className={`border-t md:border-t-0 md:border-r ${
        isCollapsed ? "md:w-16" : "md:w-1/5"
      } ${
        theme === Themes.LIGHT
          ? "bg-purple-100 border-gray-400"
          : "bg-purple-900 border-black"
      } sticky bottom-0 md:bottom-auto md:top-0 md:max-h-screen transition z-20`}
    >
      <div className="h-full flex flex-row md:flex-col px-4 py-2 md:px-2">
        <nav className="flex-1 flex flex-row md:flex-col">
          {feeds &&
            feeds.length > 0 &&
            feeds.map((feed, i) => (
              <button
                className="md:w-full md:mb-1"
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
            ))}
          <button
            className="md:w-full md:mb-1"
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
        <Dropdown
          direction="right"
          toggle={
            <HeaderLink>
              <svg
                aria-label="Settings"
                className="w-4 text-gray-500 fill-current"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z" />
              </svg>
              {!isCollapsed && <span className="ml-3">Settings</span>}
            </HeaderLink>
          }
        >
          <button
            className={`text-left block w-full px-3 py-1 pr-10 transition ${
              theme === Themes.LIGHT ? "hover:bg-gray-200" : "hover:bg-gray-700"
            }`}
            onClick={() => toggleTheme(theme)}
          >
            <span className="pr-1" role="img" aria-label="Toggle theme">
              {theme === Themes.LIGHT ? "🌙" : "☀️"}
            </span>
            {theme === Themes.LIGHT ? "Dark" : "Light"} theme
          </button>
          <button
            className={`text-left block w-full px-3 py-1 pr-10 transition ${
              theme === Themes.LIGHT ? "hover:bg-gray-200" : "hover:bg-gray-700"
            }`}
            onClick={() => toggleHeaderCollapse(!isCollapsed)}
          >
            <span className="pr-1" role="img" aria-label="Toggle sidebar">
              {isCollapsed ? "➡️" : "⬅️"}
            </span>
            {isCollapsed ? "Expand" : "Collapse"} sidebar
          </button>
        </Dropdown>
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
  toggleTheme: (theme: Themes) =>
    dispatch(setTheme(theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
