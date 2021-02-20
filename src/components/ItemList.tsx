import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { selectItem, setModal } from '../state/actions';
import UnsubscribeFeedModal from './modals/UnsubscribeFeedModal';
import { InitialState } from '../state/reducers';
import Dropdown from './Dropdown';
import Shimmer from './Shimmer';

const DropdownToggle = () => (
  <span className="inline-block px-3 py-1">
    <svg
      className="w-3"
      aria-label="Settings"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </svg>
  </span>
);

const ItemList: React.FC<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> = ({
  feeds,
  items,
  networkStatus,
  modal,
  openUnsubscribeModal,
  selectedFeed,
  selectedItem,
  viewItem,
  deSelectItem,
}) => {
  if (selectedFeed === null) {
    return null;
  }

  const feed = feeds[selectedFeed];

  return (
    <>
      <div
        className={`md:sticky md:top-0 w-full md:w-2/5 md:max-h-screen md:overflow-scroll ${
          selectedItem !== null ? 'hidden md:block' : ''
        }`}
      >
        {networkStatus === 'FETCHING' ? (
          <>
            <div className="border-b transition bg-gray-200 border-gray-300 dark:bg-gray-800 dark:border-black sticky top-0 flex items-center">
              <span className="flex-1 px-3 py-1 uppercase font-bold text-xs tracking-wide truncate">
                <Shimmer />
              </span>
            </div>
            {new Array(10).fill({}).map((_, i) => (
              <div
                className={`transition ${
                  i > 0 ? 'border-t border-gray-300 dark:border-black' : ''
                } bg-white dark:bg-gray-900 w-full text-left py-2 px-3 text-xs`}
                key={`feed-${selectedFeed}-item-${i}`}
              >
                <div className="flex leading-relaxed">
                  <p className="flex-1 max-lines">
                    <Shimmer />
                  </p>
                  <p className="pl-4 text-gray-500">
                    <Shimmer />
                  </p>
                </div>
                <h2 className="text-sm font-bold truncate leading-relaxed">
                  <Shimmer />
                </h2>
                <p className="max-lines text-gray-500">
                  <Shimmer />
                </p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="border-b transition bg-gray-200 border-gray-300 dark:bg-gray-800 dark:border-black sticky top-0 flex items-center">
              <>
                <h1 className="flex-1 px-3 py-1 uppercase font-bold text-xs tracking-wide truncate">
                  {feed.title}
                </h1>
                <Dropdown direction="down" toggle={<DropdownToggle />}>
                  <a
                    className="flex items-center text-left w-full px-3 py-2 pr-10 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                    href={feed.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      className="w-4 mr-3"
                      aria-label="Link"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Permalink
                  </a>
                  <button
                    onClick={() => openUnsubscribeModal()}
                    className="text-left flex items-center w-full px-3 py-2 pr-10 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-4 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Unsubscribe
                  </button>
                </Dropdown>
              </>
            </div>
            {items.length > 0 ? (
              <>
                {items.map((item, i) => {
                  const isSelected = selectedItem === i;

                  return (
                    <article
                      onClick={() =>
                        isSelected ? deSelectItem() : viewItem(i)
                      }
                      className={`transition ${
                        i > 0
                          ? 'border-t border-gray-300 dark:border-black'
                          : ''
                      } bg-white dark:bg-gray-900 ${
                        isSelected
                          ? 'bg-indigo-600 dark:bg-indigo-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      } cursor-pointer w-full text-left py-2 px-3 text-xs`}
                      key={`feed-${selectedFeed}-item-${i}`}
                    >
                      <div className="flex leading-relaxed">
                        <p className="flex-1 max-lines">
                          {item.author || feed.title}
                        </p>
                        <p
                          className={`pl-4 ${
                            isSelected ? 'text-white' : 'text-gray-500'
                          }`}
                        >
                          {dayjs(item.pubDate).format('DD/MM/YYYY')}
                        </p>
                      </div>
                      <h2 className="text-sm font-bold truncate leading-relaxed">
                        {item.title}
                      </h2>
                      <p
                        className={`max-lines ${
                          isSelected ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </>
            ) : (
              <div className="p-3 text-center text-sm">
                <span role="img" aria-label="Thinking face">
                  🤔
                </span>{' '}
                There doesn't seem to be any items in this feed.
              </div>
            )}
          </>
        )}
      </div>
      {modal === 'UNSUBSCRIBE' ? <UnsubscribeFeedModal /> : null}
    </>
  );
};

const mapStateToProps = (state: InitialState) => ({
  networkStatus: state.ui.networkStatus,
  modal: state.ui.modal,
  selectedItem: state.selectedItem,
  selectedFeed: state.selectedFeed,
  feeds: state.feeds,
  items:
    state.selectedFeed !== null ? state.feeds[state.selectedFeed].items : [],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  viewItem: (i: number) => dispatch(selectItem(i)),
  deSelectItem: () => dispatch(selectItem(null)),
  openUnsubscribeModal: () => dispatch(setModal('SUBSCRIBE')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
