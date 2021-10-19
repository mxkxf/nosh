import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InitialState } from '../state/reducers';
import { selectItem } from '../state/actions';

const ItemView = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state: InitialState) => ({
    item:
      state.selectedFeed !== null && state.selectedItem !== null
        ? state.feeds[state.selectedFeed].items[state.selectedItem]
        : null,
  }));

  return (
    <div
      className={`flex-1 border-l transition bg-white border-gray-300 dark:bg-gray-900 dark:border-black ${
        item ? 'flex' : 'hidden md:flex'
      }`}
    >
      {item ? (
        <div className="flex-1 px-10 py-6">
          <button
            className="md:hidden absolute right-0 top-0 p-3"
            onClick={() => dispatch(selectItem(null))}
          >
            <svg
              aria-label="Close"
              className="w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-4xl leading-tight font-light mb-6">
            {item.title}
          </h1>
          <ul className="unstyled mb-6 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center mb-2">
              <svg
                className="w-4 mr-2"
                aria-label="Calendar"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dayjs(item.pubDate).format('DD/MM/YYYY')}
            </li>
            {item.author && (
              <li className="mb-2 flex items-center">
                <svg
                  className="w-4 mr-2"
                  aria-label="Author"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                {item.author}
              </li>
            )}
            {item.link && (
              <li className="mb-2">
                <a
                  className="flex items-center"
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    className="w-4 mr-2"
                    aria-label="Permalink"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  Permalink
                </a>
              </li>
            )}
          </ul>
          <div
            className="wysiwyg mb-10"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      ) : (
        <div className="m-auto">
          <p className="text-2xl text-gray-500">Pick an item to read</p>
        </div>
      )}
    </div>
  );
};

export default ItemView;
