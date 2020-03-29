import React, { FormEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Modal from "./Modal";
import {
  setUnsubscribeFeedModalVisibility,
  unSubscribeFeed,
  selectFeed,
} from "../state/actions";
import { InitialState } from "../state/reducers";

interface Props {
  closeModal: () => {};
  selectedFeed: number;
  unselectFeed: () => {};
  unsubscribeFeed: (i: number) => {};
}

const UnsubscribeFeedModal: React.FC<Props> = ({
  closeModal,
  selectedFeed,
  unselectFeed,
  unsubscribeFeed,
}) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    unselectFeed();
    unsubscribeFeed(selectedFeed);
  };

  return (
    <Modal closeModalFunc={() => closeModal()}>
      <div className="text-center">
        <h2 className="font-light text-2xl mb-8">Unsubscribe from feed</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <p className="mb-8">
            Are you sure you wish to unsubscribe from this feed?
          </p>
          <div className="flex">
            <div className="flex-1 mr-4">
              <button
                className="rounded block bg-red-500 hover:bg-red-600 border border-red-500 px-3 py-2 text-white w-full"
                type="submit"
              >
                Yup, unsubscribe
              </button>
            </div>
            <div className="flex-1 mr-4">
              <button
                className="rounded block bg-white-500 hover:bg-gray-100 border px-3 py-2 w-full"
                onClick={() => closeModal()}
              >
                No, take me back
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state: InitialState) => ({
  selectedFeed: state.selectedFeed as number,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(setUnsubscribeFeedModalVisibility(false)),
  unselectFeed: () => dispatch(selectFeed(null)),
  unsubscribeFeed: (i: number) => {
    dispatch(setUnsubscribeFeedModalVisibility(false));
    return dispatch(unSubscribeFeed(i));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnsubscribeFeedModal);
