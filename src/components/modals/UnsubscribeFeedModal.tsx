import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from './Modal';
import { setModal, unSubscribeFeed, setFeed } from '../../state/actions';
import { InitialState } from '../../state/reducers';

const UnsubscribeFeedModal = () => {
  const { selectedFeed } = useSelector((state: InitialState) => ({
    selectedFeed: state.selectedFeed,
  }));
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(setFeed(null));
    dispatch(setModal(null));
    dispatch(unSubscribeFeed(selectedFeed as string));
  };

  return (
    <Modal
      closeModalFunc={() => dispatch(setModal(null))}
      title="Unsubscribe from a feed"
    >
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

export default UnsubscribeFeedModal;
