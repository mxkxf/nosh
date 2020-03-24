import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { setSubscribeFeedModalVisibility } from "../state/actions";

interface Props {
  openModal: Function;
}

const Onboarding: React.FC<Props> = ({ openModal }) => (
  <div className="flex-1 flex text-xl font-light text-gray-800">
    <div className="m-auto text-center max-w-md">
      <h2 className="text-3xl mb-4">
        Welcome{" "}
        <span role="img" aria-label="Wave">
          👋
        </span>
      </h2>
      <p className="mb-4">
        To get started, please{" "}
        <button
          className="font-light text-blue-700 hover:text-blue-900 underline mr-1"
          onClick={() => openModal()}
        >
          subscribe
        </button>
        to a feed.
      </p>
      <p>Happy reading!</p>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openModal: () => dispatch(setSubscribeFeedModalVisibility(true)),
});

export default connect(null, mapDispatchToProps)(Onboarding);
