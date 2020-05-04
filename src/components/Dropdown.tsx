import React from "react";
import { connect } from "react-redux";

import { InitialState, Themes } from "../state/reducers";
import useClickOutside from "./useClickOutside";

type Props = ReturnType<typeof mapStateToProps> & {
  children: React.ReactNode;
  toggle: React.ReactNode;
};

const Dropdown: React.FC<Props> = ({ children, theme, toggle }) => {
  const [isMenuVisible, setMenuVisible] = React.useState(false);
  const ref = useClickOutside(() => setMenuVisible(false));

  return (
    <div ref={ref} className="relative">
      <button className="flex" onClick={() => setMenuVisible(!isMenuVisible)}>
        {toggle}
      </button>
      {isMenuVisible && (
        <div
          className={`absolute shadow py-2 text-xs right-0 border ${
            theme === Themes.LIGHT
              ? "bg-white border-gray-400"
              : "bg-gray-800 border-black"
          } -mr-px`}
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
