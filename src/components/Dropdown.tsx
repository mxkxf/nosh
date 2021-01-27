import React from 'react';

import useClickOutside from './useClickOutside';

type Props = {
  children: React.ReactNode;
  direction: 'up' | 'down';
  toggle: React.ReactNode;
};

const Dropdown: React.FC<Props> = ({ children, direction, toggle }) => {
  const [isMenuVisible, setMenuVisible] = React.useState(false);
  const ref = useClickOutside(() => setMenuVisible(false));

  const classes = [];

  switch (direction) {
    case 'down':
      classes.push('right-0');
      break;
    case 'up':
      classes.push('bottom-full', 'right-0');
      break;
    default:
    //
  }

  return (
    <div ref={ref} className="relative">
      <button
        className="flex w-full"
        onClick={() => setMenuVisible(!isMenuVisible)}
      >
        {toggle}
      </button>
      {isMenuVisible && (
        <div
          className={`absolute rounded shadow w-64 py-2 text-sm w-48 ${classes.join(
            ' ',
          )} bg-white border-gray-300 dark:bg-gray-800 dark:border-black`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
