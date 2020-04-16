import React from "react";
import { connect } from "react-redux";
import { InitialState, Themes } from "../state/reducers";

type Props = ReturnType<typeof mapStateToProps> & {
  // isVisible: boolean;
  children: React.ReactNode;
  ref: React.RefObject<any>;
};

const Dropdown: React.FC<Props> = ({ children, ref, theme }) => {
  return (
    <div
      ref={ref}
      className={`absolute shadow py-2 text-xs right-0 border ${
        theme === Themes.LIGHT
          ? "bg-white border-gray-400"
          : "bg-gray-800 border-black"
      } -mr-px`}
    >
      {children}
    </div>
  );
};

const mapStateToProps = (state: InitialState) => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps)(Dropdown);
