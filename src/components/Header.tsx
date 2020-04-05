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

interface HeaderLinkProps {
  isSelected?: boolean;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ children, isSelected }) => {
  const classes = [
    "flex",
    "items-center",
    // "font-bold",
    "text-left",
    // "text-sm",
    "text-gray-700",
    "block",
    "rounded",
    "leading-none",
    "py-3",
    "px-4",
  ];

  if (typeof isSelected !== "undefined") {
    classes.push(
      isSelected ? "bg-blue-200 text-gray-900" : "hover:bg-blue-200",
    );
  } else {
    classes.push("hover:bg-blue-200");
  }

  return <span className={classes.join(" ")}>{children}</span>;
};

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
    <header className="w-64 bg-purple-100 border-r border-gray-400 sticky top-0 max-h-screen">
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
                      <span className="max-lines">{feed.title}</span>
                    </HeaderLink>
                  </button>
                );
              })}
              <button
                className="w-full mb-1"
                onClick={() => openSubscribeModal()}
              >
                <HeaderLink>
                  <span className="w-4 mr-3" role="img" aria-label="Add">
                    ➕
                  </span>
                  Add feed
                </HeaderLink>
              </button>
            </>
          )}
        </nav>
        <button onClick={() => openAboutModal()}>
          <HeaderLink>
            <span className="text-2xl mr-3" role="img" aria-label="About nosh">
              🍜
            </span>
            nosh
          </HeaderLink>
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
