import dayjs from "dayjs";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  selectItem,
  unSubscribeFeed,
  setUnsubscribeFeedModalVisibility,
} from "../state/actions";
import UnsubscribeFeedModal from "./UnsubscribeFeedModal";
import { InitialState } from "../state/reducers";

interface Props {
  feeds: Feed[];
  items: FeedItem[];
  isUnsubscribeFeedModalOpen: boolean;
  openUnsubscribeModal: () => {};
  selectedFeed: number;
  selectedItem: number | null;
  unSubscribeFeed: (index: number) => {};
  viewItem: (index: number) => {};
}

const ItemList: React.FC<Props> = ({
  feeds,
  items,
  isUnsubscribeFeedModalOpen,
  openUnsubscribeModal,
  selectedFeed,
  selectedItem,
  viewItem,
}) => {
  const feed = feeds[selectedFeed];

  // TODO: Display something useful
  if (!feed) {
    return null;
  }

  return (
    <>
      <section className="sticky top-0 w-1/3 max-h-screen overflow-scroll">
        <div className="bg-gray-600 text-white sticky top-0 px-3 py-1 flex">
          <h2 className="flex-1 uppercase font-bold text-xs tracking-wide truncate">
            {feed.title}
          </h2>
          <a
            className="uppercase font-bold text-xs tracking-wide ml-4"
            href={feed.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span role="img" aria-label="Link">
              🔗
            </span>
          </a>
          <button
            onClick={() => openUnsubscribeModal()}
            className="uppercase font-bold text-xs tracking-wide ml-4"
          >
            <span role="img" aria-label="Filter">
              🗑
            </span>
          </button>
        </div>
        {items.length > 0 ? (
          <>
            {items.map((item, i) => (
              <article
                onClick={() => viewItem(i)}
                className={`${
                  selectedItem === i ? "bg-gray-300" : "hover:bg-gray-200"
                } cursor-pointer w-full text-left py-2 px-3 ${
                  i > 0 ? "border-t border-gray-400" : ""
                } text-xs`}
                key={`feed-${selectedFeed}-item-${i}`}
              >
                <div className="flex">
                  <h4 className="flex-1 truncate">{item.author}</h4>
                  <p className="pl-4 text-gray-700">
                    {dayjs(item.pubDate).format("DD/MM/YYYY")}
                  </p>
                </div>
                <h3 className="text-sm font-bold truncate">{item.title}</h3>
                <p className="max-lines text-gray-700">{item.description}</p>
              </article>
            ))}
            <div className="bg-gray-600 text-white sticky bottom-0 px-3 py-1 flex">
              <p className="flex-1 uppercase font-bold text-xs tracking-wide">
                {items.length} items
              </p>
            </div>
          </>
        ) : (
          <div className="p-3 text-center text-sm">
            <span role="img" aria-label="Thinking face">
              🤔
            </span>{" "}
            There doesn't seem to be any items in this feed.
          </div>
        )}
      </section>
      {isUnsubscribeFeedModalOpen && <UnsubscribeFeedModal />}
    </>
  );
};

const mapStateToProps = (state: InitialState) => ({
  isUnsubscribeFeedModalOpen: state.ui.isUnsubscribeFeedModalOpen,
  selectedFeed: state.selectedFeed as number,
  selectedItem: state.selectedItem as number,
  feeds: state.feeds,
  items:
    state.selectedFeed !== null ? state.feeds[state.selectedFeed].items : [],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  unSubscribeFeed: (i: number) => dispatch(unSubscribeFeed(i)),
  viewItem: (i: number) => dispatch(selectItem(i)),
  openUnsubscribeModal: () => dispatch(setUnsubscribeFeedModalVisibility(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
