import React from "react";
import ReactDOM from "react-dom";

import useKeyPress from "./useKeyPress";
import useClickOutside from "./useClickOutside";
import { connect } from "react-redux";
import { InitialState, Themes } from "../state/reducers";

const KEY_CODE_ESCAPE = 27;

interface Props {
  children: React.ReactNode;
  closeModalFunc: () => {};
  theme: Themes;
}

const Modal: React.FC<Props> = ({ children, closeModalFunc, theme }) => {
  const [isClosing, setClosing] = React.useState(false);

  const closeModal = () => {
    setClosing(true);
  };

  const modalWindowRef = useClickOutside(closeModal);

  useKeyPress(KEY_CODE_ESCAPE, closeModal);

  return ReactDOM.createPortal(
    <div
      className={isClosing ? "fade-out" : "fade-in"}
      onAnimationEnd={() => {
        if (isClosing) {
          closeModalFunc();
        }
      }}
    >
      <div className="bg-black opacity-50 fixed inset-0 z-30" />
      <div className="absolute inset-0 flex p-4 z-30">
        <div
          ref={modalWindowRef}
          className={`p-10 ${
            theme === Themes.LIGHT
              ? "bg-white text-black"
              : "bg-gray-800 text-white"
          } max-w-xl flex-1 m-auto rounded shadow relative`}
        >
          <button
            className="absolute top-0 right-0 px-2 py-1 mr-10 mt-10 text-center"
            type="button"
            onClick={closeModal}
          >
            <svg
              aria-label="Close"
              className="w-4 fill-current"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

const mapStateToProps = (state: InitialState) => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps)(Modal);
