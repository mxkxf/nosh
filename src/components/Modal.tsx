import React from "react";
import ReactDOM from "react-dom";

import useKeyPress from "./useKeyPress";
import useClickOutside from "./useClickOutside";

const KEY_CODE_ESCAPE = 27;

interface Props {
  closeModalFunc: () => {};
}

const Modal: React.FC<Props> = ({ children, closeModalFunc }) => {
  const [isClosing, setClosing] = React.useState(false);
  const modalWindowRef = React.createRef<HTMLDivElement>();

  const closeModal = () => {
    setClosing(true);
  };

  useClickOutside(modalWindowRef, closeModal);
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
          className="p-10 bg-white max-w-xl flex-1 m-auto rounded shadow relative"
        >
          <button
            className="absolute top-0 right-0 px-2 py-1 mr-10 mt-10 text-center"
            type="button"
            onClick={closeModal}
          >
            <span className="-mr-1" role="img" aria-label="Close">
              ✖️
            </span>
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
