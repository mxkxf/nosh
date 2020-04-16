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
  toggleTheme: (theme: string) => {};
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

  return (
    <header
      className={`border-r ${isCollapsed ? "w-16" : "w-1/5"} ${
        theme === Themes.LIGHT
          ? "bg-purple-100 border-gray-400"
          : "bg-purple-900 border-black"
      } sticky top-0 max-h-screen`}
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
                      <img
                        className="w-4 rounded mr-3"
                        src={feed.icon}
                        alt={feed.title}
                      />
                      {!isCollapsed && (
                        <span className="max-lines">{feed.title}</span>
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
                  <span
                    className="opacity-50 w-4 mr-3"
                    role="img"
                    aria-label="Add"
                  >
                    ➕
                  </span>
                  {!isCollapsed && "Add feed"}
                </HeaderLink>
              </button>
            </>
          )}
        </nav>
        <button onClick={() => openAboutModal()}>
          <HeaderLink>
            <span className="w-4 mr-3" role="img" aria-label="About nosh">
              🍜
            </span>
            {!isCollapsed && "nosh"}
          </HeaderLink>
        </button>
        <button
          onClick={() =>
            toggleTheme(theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT)
          }
        >
          <HeaderLink>
            <span className="w-4 mr-3" role="img" aria-label="About nosh">
              {theme === Themes.LIGHT ? (
                <span role="img" aria-label="Dark theme">
                  🌙
                </span>
              ) : (
                <span role="img" aria-label="Light theme">
                  ☀️
                </span>
              )}
            </span>
            {!isCollapsed && "Toggle theme"}
          </HeaderLink>
        </button>
        <button onClick={() => toggleHeaderCollapse(!isCollapsed)}>
          <HeaderLink>
            <span
              className="w-4 mr-3"
              role="img"
              aria-label={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? "➡️" : "⬅️"}
            </span>
            {!isCollapsed && "Collapse sidebar"}
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
  toggleTheme: (theme: string) => dispatch(setTheme(theme)),
  selectFeed: (i: number | null) => dispatch(selectFeed(i)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
