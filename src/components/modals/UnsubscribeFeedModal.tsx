import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Modal from './Modal';
import {
  setUnsubscribeFeedModalVisibility,
  unSubscribeFeed,
  selectFeed,
} from '../../state/actions';
import { InitialState } from '../../state/reducers';

const UnsubscribeFeedModal: React.FC<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> = ({ closeModal, selectedFeed, unselectFeed, unsubscribeFeed }) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    unselectFeed();
    unsubscribeFeed(selectedFeed as string);
  };

  return (
    <Modal closeModalFunc={() => closeModal()} title="Unsubscribe from a feed">
      <div className="text-center">
        <h2 className="font-light text-2xl mb-8">Are you sure?</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <p className="text-center">
            <button
              className="rounded inline-block bg-red-500 hover:bg-red-600 border border-red-500 px-3 py-2 text-white"
              type="submit"
            >
              Yup, unsubscribe
            </button>
          </p>
        </form>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state: InitialState) => ({
  selectedFeed: state.selectedFeed,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(setUnsubscribeFeedModalVisibility(false)),
  unselectFeed: () => dispatch(selectFeed(null)),
  unsubscribeFeed: (key: string) => {
    dispatch(setUnsubscribeFeedModalVisibility(false));
    return dispatch(unSubscribeFeed(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnsubscribeFeedModal);
