import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setSubscribeFeedModalVisibility } from '../state/actions';
import { InitialState } from '../state/reducers';

interface Props {
  isLoading: boolean;
  openModal: () => {};
}

const Onboarding: React.FC<Props> = ({ isLoading, openModal }) => {
  return (
    <div className="flex-1 flex text-xl text-gray-700 dark:text-gray-400 font-light bg-white dark:bg-gray-900">
      <div className="m-auto p-10 text-center max-w-md">
        {isLoading ? (
          <div>
            <span className="mx-2" role="img" aria-label="Hourglass">
              ⏳
            </span>
            Loading your feeds...
          </div>
        ) : (
          <>
            <h1 className="text-2xl mb-4">
              Welcome{' '}
              <span role="img" aria-label="Wave">
                👋
              </span>
            </h1>
            <p className="mb-4">
              To get started, please{' '}
              <button
                className="font-light text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 underline mr-1"
                onClick={() => openModal()}
              >
                subscribe
              </button>
              to a feed.
            </p>
            <p>Happy reading!</p>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: InitialState) => ({
  isLoading: state.ui.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openModal: () => dispatch(setSubscribeFeedModalVisibility(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
