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
              className="w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
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
