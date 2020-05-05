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
        <svg
          aria-label="Logo"
          className="inline-block w-8 fill-current mr-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <g>
            <g>
              <path d="M92.652,43.173l-8.115-1.152c-1.488-0.211-2.876,0.832-3.089,2.321l-3.735,26.299C76.728,77.694,74.063,81,65.78,81    H34.364c-8.164,0-10.898-3.034-11.934-10.359l-1.669-11.749c-0.211-1.488,0.846-2.705,2.348-2.705h5.282    c1.502,0,2.732-1.229,2.732-2.731v-8.194c0-1.502-1.23-2.732-2.732-2.732H7.375c-1.502,0-2.559,1.217-2.348,2.706l3.88,27.327    c1.894,13.395,9.781,22.097,25.457,22.097H65.78c15.053,0,23.387-7.615,25.458-22.097l3.735-26.299    C95.182,44.774,94.141,43.384,92.652,43.173z M58.95,73.527l8.113,1.152c1.488,0.208,2.876-0.832,3.089-2.321l8.91-62.749    c0.214-1.488-0.832-2.878-2.32-3.089l-8.11-1.152c-1.488-0.21-2.879,0.833-3.089,2.321L56.63,70.438    C56.419,71.927,57.462,73.313,58.95,73.527z M37.836,73.527l8.113,1.152c1.488,0.208,2.878-0.832,3.089-2.321L57.953,9.61    c0.21-1.488-0.833-2.878-2.321-3.089l-8.114-1.152c-1.488-0.21-2.878,0.833-3.089,2.321l-8.913,62.749    C35.305,71.927,36.348,73.313,37.836,73.527z"></path>
            </g>
          </g>
        </svg>
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
