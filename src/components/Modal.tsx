import React from "react";
import ReactDOM from "react-dom";

import useKeyPress from "./useKeyPress";

const KEY_CODE_ESCAPE = 27;

interface Props {
  closeModal: () => {};
}

const Modal: React.FC<Props> = ({ children, closeModal }) => {
  useKeyPress(KEY_CODE_ESCAPE, closeModal);

  const maybeCloseModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="bg-black opacity-50 fixed inset-0 z-30" />
      <div className="absolute inset-0 flex p-4 z-30" onClick={maybeCloseModal}>
        <div className="p-10 bg-white max-w-xl flex-1 m-auto rounded shadow relative">
          <button
            className="absolute top-0 right-0 px-2 py-1 mr-10 mt-10 text-center"
            type="button"
            onClick={() => closeModal()}
          >
            <span className="-mr-1" role="img" aria-label="Close">
              ✖️
            </span>
          </button>
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;
