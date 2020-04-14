import React from "react";

const useClickOutside = (
  ref: React.RefObject<any>,
  callback: CallableFunction,
) =>
  React.useEffect(() => {
    const listener = (event: any) => {
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

export default useClickOutside;
