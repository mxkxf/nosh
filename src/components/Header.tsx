import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InitialState, Themes } from '../state/reducers';
import {
  selectFeed,
  setModal,
  setHeaderCollapse,
  setTheme,
} from '../state/actions';
import useKeyPress from './useKeyPress';
import HeaderLink from './HeaderLink';
import Dropdown from './Dropdown';

const KEY_CODE_N = 78;
const KEY_CODE_S = 83;
const KEY_CODE_T = 84;

const Header = () => {
  const { feeds, isCollapsed, modal, selectedFeed, theme } = useSelector(
    (state: InitialState) => ({
      feeds: state.feeds,
      selectedFeed: state.selectedFeed,
      modal: state.ui.modal,
      isCollapsed: state.ui.isHeaderCollapsed,
      theme: state.ui.theme,
    }),
  );
  const dispatch = useDispatch();

  const openAboutModal = () => dispatch(setModal('ABOUT'));
  const openSubscribeModal = () => dispatch(setModal('SUBSCRIBE'));
  const toggleHeaderCollapse = (isCollapsed: boolean) =>
    dispatch(setHeaderCollapse(isCollapsed));
  const toggleTheme = (theme: Themes) =>
    dispatch(setTheme(theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT));

  useKeyPress(KEY_CODE_N, () => {
    if (modal !== 'SUBSCRIBE') {
      openSubscribeModal();
    }
  });

  useKeyPress(KEY_CODE_S, () => {
    if (modal !== 'SUBSCRIBE') {
      toggleHeaderCollapse(!isCollapsed);
    }
  });

  useKeyPress(KEY_CODE_T, () => {
    if (modal !== 'SUBSCRIBE') {
      toggleTheme(theme);
    }
  });

  /* eslint-disable @next/next/no-img-element */
  return (
    <header
      className={`border-t md:border-t-0 md:border-r ${
        isCollapsed ? 'md:w-16' : 'md:w-1/5'
      } bg-indigo-50 border-gray-300 dark:bg-indigo-900 dark:border-black sticky bottom-0 md:bottom-auto md:top-0 md:max-h-screen transition z-10`}
    >
      <div className="h-full flex flex-row md:flex-col px-3 py-2 md:px-2">
        <nav className="flex-1 flex flex-row md:flex-col items overflow-scroll">
          {feeds &&
            Object.keys(feeds).length > 0 &&
            Object.keys(feeds).map((i) => {
              const feed = feeds[i];

              return (
                <button
                  className="md:w-full mx-1 md:mb-1 md:mx-0"
                  key={`select-feed-${i}`}
                  onClick={() => {
                    dispatch(selectFeed(i));
                  }}
                >
                  <HeaderLink isSelected={selectedFeed === i}>
                    {feed.icon ? (
                      <img
                        className="w-4 rounded max-w-none"
                        src={feed.icon}
                        alt={`${feed.title} icon`}
                      />
                    ) : (
                      <span className="flex-none min-w-4 flex items-center justify-center rounded w-4 h-4 text-center text-xs bg-black text-white dark:bg-white dark:text-black">
                        {feed.title[0]}
                      </span>
                    )}
                    <span className="ml-4 max-lines hidden md:block">
                      {feed.title}
                    </span>
                  </HeaderLink>
                </button>
              );
            })}
          <button
            className="md:w-full mx-1 md:mb-1 md:mx-0"
            onClick={() => openSubscribeModal()}
          >
            <HeaderLink>
              <span className="block w-4">
                <svg
                  aria-label="Add"
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span className="ml-4 max-lines hidden md:block">Add feed</span>
            </HeaderLink>
          </button>
        </nav>
        <button onClick={() => openAboutModal()}>
          <HeaderLink>
            <span className="block w-4">
              <svg
                aria-label="Logo"
                className="w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
              >
                <g>
                  <g>
                    <path d="M92.652,43.173l-8.115-1.152c-1.488-0.211-2.876,0.832-3.089,2.321l-3.735,26.299C76.728,77.694,74.063,81,65.78,81    H34.364c-8.164,0-10.898-3.034-11.934-10.359l-1.669-11.749c-0.211-1.488,0.846-2.705,2.348-2.705h5.282    c1.502,0,2.732-1.229,2.732-2.731v-8.194c0-1.502-1.23-2.732-2.732-2.732H7.375c-1.502,0-2.559,1.217-2.348,2.706l3.88,27.327    c1.894,13.395,9.781,22.097,25.457,22.097H65.78c15.053,0,23.387-7.615,25.458-22.097l3.735-26.299    C95.182,44.774,94.141,43.384,92.652,43.173z M58.95,73.527l8.113,1.152c1.488,0.208,2.876-0.832,3.089-2.321l8.91-62.749    c0.214-1.488-0.832-2.878-2.32-3.089l-8.11-1.152c-1.488-0.21-2.879,0.833-3.089,2.321L56.63,70.438    C56.419,71.927,57.462,73.313,58.95,73.527z M37.836,73.527l8.113,1.152c1.488,0.208,2.878-0.832,3.089-2.321L57.953,9.61    c0.21-1.488-0.833-2.878-2.321-3.089l-8.114-1.152c-1.488-0.21-2.878,0.833-3.089,2.321l-8.913,62.749    C35.305,71.927,36.348,73.313,37.836,73.527z"></path>
                  </g>
                </g>
              </svg>
            </span>
            <span className="ml-4 hidden md:block">About</span>
          </HeaderLink>
        </button>
        <Dropdown
          direction="up"
          toggle={
            <HeaderLink>
              <span className="block w-4">
                <svg
                  className="w-4"
                  aria-label="Settings"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span className="ml-4 hidden md:block">Settings</span>
            </HeaderLink>
          }
        >
          <button
            className={`flex items-center text-left block w-full px-3 py-2 pr-10 transition ${
              theme === Themes.LIGHT ? 'hover:bg-gray-200' : 'hover:bg-gray-700'
            }`}
            onClick={() => toggleTheme(theme)}
          >
            {theme === Themes.LIGHT ? (
              <>
                <svg
                  className="w-4 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                Dark theme
              </>
            ) : (
              <>
                <svg
                  className="w-4 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Light theme
              </>
            )}
          </button>
          <button
            className="text-left hidden md:flex md:items-center w-full px-3 py-2 pr-10 transition hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => toggleHeaderCollapse(!isCollapsed)}
          >
            {isCollapsed ? (
              <>
                <svg
                  className="w-4 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                  />
                </svg>
                Expand
              </>
            ) : (
              <>
                <svg
                  className="w-4 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Collapse
              </>
            )}
          </button>
        </Dropdown>
      </div>
    </header>
  );
  /* eslint-enable @next/next/no-img-element */
};

export default Header;
