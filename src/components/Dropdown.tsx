import React from "react";
import { connect } from "react-redux";

import { InitialState, Themes } from "../state/reducers";
import useClickOutside from "./useClickOutside";

type Props = ReturnType<typeof mapStateToProps> & {
  children: React.ReactNode;
  direction: "right" | "down";
  toggle: React.ReactNode;
};

const Dropdown: React.FC<Props> = ({ children, direction, theme, toggle }) => {
  const [isMenuVisible, setMenuVisible] = React.useState(false);
  const ref = useClickOutside(() => setMenuVisible(false));

  const classes = [];

  switch (direction) {
    case "down":
      classes.push("right-0");
      // classes.push("-mr-px");
      break;
    case "right":
      classes.push("left-full");
      classes.push("bottom-0");
      break;
    default:
    //
  }

  return (
    <div ref={ref} className="relative z-20">
      <button
        className="flex w-full"
        onClick={() => setMenuVisible(!isMenuVisible)}
      >
        {toggle}
      </button>
      {isMenuVisible && (
        <div
          className={`absolute shadow py-2 text-xs border w-48 ${classes.join(
            " ",
          )} ${
            theme === Themes.LIGHT
              ? "bg-white border-gray-400"
              : "bg-gray-800 border-black"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: InitialState) => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps)(Dropdown);
