import React from 'react';

import useClickOutside from './useClickOutside';

type Props = {
  children: React.ReactNode;
  direction: 'right' | 'down';
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
    case 'right':
      classes.push('left-full', 'bottom-0');
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
          className={`absolute shadow py-2 text-xs border w-48 ${classes.join(
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
