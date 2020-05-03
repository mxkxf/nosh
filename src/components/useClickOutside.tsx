import React from "react";

const useClickOutside = (callback: CallableFunction) => {
  const ref = React.createRef<any>();

  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target)) {
        return;
      }

      callback();
    };

    window.addEventListener("mousedown", listener);

    return () => {
      window.removeEventListener("mousedown", listener);
    };
  });

  return ref;
};

export default useClickOutside;
