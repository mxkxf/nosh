import React from 'react';

const useKeyPress = (keyCode: number, callback: CallableFunction) =>
  React.useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.keyCode !== keyCode) {
        return;
      }

      callback();
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  });

export default useKeyPress;
