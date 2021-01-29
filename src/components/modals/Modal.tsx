import React from 'react';
import ReactDOM from 'react-dom';

import useKeyPress from '../useKeyPress';
import useClickOutside from '../useClickOutside';

const KEY_CODE_ESCAPE = 27;

interface Props {
  children: React.ReactNode;
  closeModalFunc: () => {};
  title: string;
}

const Modal: React.FC<Props> = ({ children, closeModalFunc, title }) => {
  const [isClosing, setClosing] = React.useState(false);

  const closeModal = () => {
    setClosing(true);
  };

  const modalWindowRef = useClickOutside(closeModal);

  useKeyPress(KEY_CODE_ESCAPE, closeModal);

  if (typeof window === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-label={title}
      className={`absolute inset-0 z-30 ${isClosing ? 'fade-out' : 'fade-in'}`}
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
          className="p-6 md:p-10 transition bg-white text-black dark:bg-gray-800 dark:text-white max-w-xl flex-1 m-auto rounded shadow relative"
        >
          <button
            className="absolute top-0 right-0 p-3 text-center"
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

export default Modal;
