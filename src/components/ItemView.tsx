import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { InitialState, Themes } from '../state/reducers';
import { selectItem } from '../state/actions';
import { FeedItem } from '../types';

interface Props {
  item: FeedItem | null;
  theme: Themes;
  unselectItem: () => {};
}

const ItemView: React.FC<Props> = ({ item, theme, unselectItem }) => (
  <section
    className={`flex-1 border-l transition ${
      theme === Themes.LIGHT
        ? 'bg-white border-gray-400'
        : 'bg-gray-900 border-black'
    } ${item ? 'flex' : 'hidden md:flex'}`}
  >
    {item ? (
      <article className="flex-1 px-10 py-6">
        <button className="absolute right-0 top-0 p-3" onClick={unselectItem}>
          <svg
            aria-label="Close"
            className="w-4 fill-current"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
          </svg>
        </button>
        <h1 className="text-4xl leading-tight font-light mb-6">{item.title}</h1>
        <div className="md:flex mb-6 text-sm text-gray-600">
          <div className="md:pr-6">
            <span className="mr-1" role="img" aria-label="Calendar">
              🗓
            </span>
            {dayjs(item.pubDate).format('DD/MM/YYYY')}
          </div>
          {item.author && (
            <div className="md:pr-6">
              <span className="mr-1" role="img" aria-label="User">
                👤
              </span>
              {item.author}
            </div>
          )}
          <div>
            <a href={item.link} rel="noopener noreferrer" target="_blank">
              <span className="mr-1" role="img" aria-label="Link">
                🔗
              </span>
              Permalink
            </a>
          </div>
        </div>
        <div
          className={`wysiwyg mb-10 wysiwyg-${item.title}`}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </article>
    ) : (
      <div className="m-auto">
        <p className="text-2xl opacity-25">Pick an item to read</p>
      </div>
    )}
  </section>
);

const mapStateToProps = (state: InitialState) => ({
  item:
    state.selectedFeed !== null && state.selectedItem !== null
      ? state.feeds[state.selectedFeed].items[state.selectedItem]
      : null,
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  unselectItem: () => dispatch(selectItem(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemView);
