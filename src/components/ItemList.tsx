import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  selectItem,
  unSubscribeFeed,
  setUnsubscribeFeedModalVisibility,
} from '../state/actions';
import UnsubscribeFeedModal from './modals/UnsubscribeFeedModal';
import { InitialState } from '../state/reducers';
import Dropdown from './Dropdown';
import { Feed, FeedItem } from '../types';

interface Props {
  feeds: Feed[];
  items: FeedItem[];
  isUnsubscribeFeedModalOpen: boolean;
  openUnsubscribeModal: () => {};
  selectedFeed: number | null;
  selectedItem: number | null;
  unSubscribeFeed: (index: number) => {};
  viewItem: (index: number) => {};
}

const DropdownToggle = () => (
  <span className="inline-block px-3 py-1">
    <svg
      aria-label="Settings"
      className="w-3 fill-current"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z" />
    </svg>
  </span>
);

const ItemList: React.FC<Props> = ({
  feeds,
  items,
  isUnsubscribeFeedModalOpen,
  openUnsubscribeModal,
  selectedFeed,
  selectedItem,
  viewItem,
}) => {
  if (selectedFeed === null) {
    return null;
  }

  const feed = feeds[selectedFeed];

  return (
    <>
      <section
        className={`md:sticky md:top-0 w-full md:w-2/5 md:max-h-screen md:overflow-scroll ${
          selectedItem !== null ? 'hidden md:block' : ''
        }`}
      >
        <div className="border-b transition bg-gray-200 border-gray-300 dark:bg-gray-800 dark:border-black sticky top-0 flex items-center">
          <h2 className="flex-1 px-3 py-1 uppercase font-bold text-xs tracking-wide truncate">
            {feed.title}
          </h2>
          <Dropdown direction="down" toggle={<DropdownToggle />}>
            <a
              className="text-left block w-full px-3 py-1 pr-10 transition hover:bg-gray-200 dark:hover:bg-gray-700"
              href={feed.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="pr-1" role="img" aria-label="Link">
                🔗
              </span>
              Permalink
            </a>
            <button
              onClick={() => openUnsubscribeModal()}
              className="text-left block w-full px-3 py-1 pr-10 transition hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span className="pr-1" role="img" aria-label="Filter">
                🗑
              </span>
              Unsubscribe
            </button>
          </Dropdown>
        </div>
        {items.length > 0 ? (
          <>
            {items.map((item, i) => (
              <article
                onClick={() => viewItem(i)}
                className={`transition ${
                  i > 0 ? 'border-t border-gray-300 dark:border-black' : ''
                } bg-white dark:bg-gray-900 ${
                  selectedItem === i
                    ? 'bg-indigo-600 dark:bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                } cursor-pointer w-full text-left py-2 px-3 text-xs`}
                key={`feed-${selectedFeed}-item-${i}`}
              >
                <div className="flex leading-relaxed">
                  <h4 className="flex-1 truncate">
                    {item.author || feed.title}
                  </h4>
                  <p
                    className={`pl-4 text-gray-400 ${
                      selectedItem === i ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {dayjs(item.pubDate).format('DD/MM/YYYY')}
                  </p>
                </div>
                <h3 className="text-sm font-bold truncate leading-relaxed">
                  {item.title}
                </h3>
                <p
                  className={`max-lines ${
                    selectedItem === i ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </>
        ) : (
          <div className="p-3 text-center text-sm">
            <span role="img" aria-label="Thinking face">
              🤔
            </span>{' '}
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
  selectedItem: state.selectedItem,
  selectedFeed: state.selectedFeed,
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
