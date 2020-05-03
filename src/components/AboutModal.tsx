import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { version } from "../../package.json";

import Modal from "./Modal";
import { setAboutModalVisibility, setTheme } from "../state/actions";
import { InitialState, Themes } from "../state/reducers";

const AboutModal: React.FC<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> = ({ closeModal, theme, toggleTheme }) => (
  <Modal closeModalFunc={() => closeModal()}>
    <div className="text-center mb-10">
      <h2 className="text-4xl font-light mb-2">
        <span className="mr-3" role="img" aria-label="Nosh">
          🍜
        </span>
        nosh
      </h2>
      <p className="text-sm text-gray-600">Version {version}</p>
    </div>
    <div className="mb-10">
      <p className="mb-3">Hey there!</p>
      <p className="mb-3">
        I miss the old RSS days - using things like iGoogle and feedburner to
        keep up to date with various news.
      </p>
      <p className="mb-3">
        That's why I made <strong>nosh</strong>, here's hoping you find this
        useful.
      </p>
      <p className="mb-10">
        <em>
          Why{" "}
          <a
            className="text-blue-700 hover:text-blue-900 underline"
            href="https://www.dictionary.com/browse/nosh"
          >
            nosh
          </a>
          ?
        </em>{" "}
        It's a slang word for eating/food.
      </p>
      <p>
        <button
          onClick={() =>
            toggleTheme(theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT)
          }
        >
          <span>
            {theme === Themes.LIGHT ? (
              <span className="w-4" role="img" aria-label="Dark theme">
                🌙
              </span>
            ) : (
              <span className="w-4" role="img" aria-label="Light theme">
                ☀️
              </span>
            )}
            <span className="ml-3">Toggle theme</span>
          </span>
        </button>
      </p>
    </div>
    <div className="flex text-sm">
      <span className="flex-1 text-gray-600">
        © Mike Francis {new Date().getFullYear()}
      </span>
      <a
        className="text-blue-700 hover:text-blue-900 underline"
        href="https://twitter.com/_mikefrancis"
        target="_blank"
        rel="noopener noreferrer"
      >
        Follow me on Twitter
      </a>
    </div>
  </Modal>
);

const mapStateToProps = (state: InitialState) => ({
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(setAboutModalVisibility(false)),
  toggleTheme: (theme: string) => dispatch(setTheme(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);
