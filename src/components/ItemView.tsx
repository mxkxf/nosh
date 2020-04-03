import dayjs from "dayjs";
import React from "react";
import { connect } from "react-redux";

import { InitialState } from "../state/reducers";
import { Dispatch } from "redux";
import { selectItem } from "../state/actions";

interface Props {
  item: FeedItem | null;
  unselectItem: () => {};
}

const ItemView: React.FC<Props> = ({ item, unselectItem }) => (
  <section className="flex-1 flex bg-white border-l border-gray-400">
    {item ? (
      <article className="flex-1 px-10 py-6">
        <button
          className="absolute top-0 right-0 px-3 py-2"
          onClick={unselectItem}
        >
          <span className="-mr-1" role="img" aria-label="Close">
            ✖️
          </span>
        </button>
        <h1 className="text-4xl leading-tight font-light mb-6">{item.title}</h1>
        <div className="flex mb-6 text-sm text-gray-700">
          <div className="pr-6">
            <span className="mr-1" role="img" aria-label="Calendar">
              🗓
            </span>
            {dayjs(item.pubDate).format("DD/MM/YYYY")}
          </div>
          <div className="pr-6">
            <span className="mr-1" role="img" aria-label="User">
              👤
            </span>
            {item.author}
          </div>
          <div>
            <a href={item.link}>
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
        <p className="text-2xl opacity-25">
          <span className="mr-4" role="img" aria-label="Left arrow">
            ⬅️
          </span>
          Pick an item to read
        </p>
      </div>
    )}
  </section>
);

const mapStateToProps = (state: InitialState) => ({
  item:
    state.selectedFeed !== null && state.selectedItem !== null
      ? state.feeds[state.selectedFeed].items[state.selectedItem]
      : null,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  unselectItem: () => dispatch(selectItem(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemView);
