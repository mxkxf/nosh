import React from 'react';
import { useDispatch } from 'react-redux';

import { setModal } from '../state/actions';

const Onboarding = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex-1 flex text-xl text-gray-700 dark:text-gray-400 font-light bg-white dark:bg-gray-900">
      <div className="m-auto p-10 text-center max-w-md">
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
            onClick={() => dispatch(setModal('SUBSCRIBE'))}
          >
            subscribe
          </button>
          to a feed.
        </p>
        <p>Happy reading!</p>
      </div>
    </div>
  );
};

export default Onboarding;
