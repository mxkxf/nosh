import React from 'react';

import { InitialState, Themes } from '../state/reducers';
import Header from './Header';
import ItemList from './ItemList';
import ItemView from './ItemView';
import Onboarding from './Onboarding';
import SubscribeFeedModal from './modals/SubscribeFeedModal';
import AboutModal from './modals/AboutModal';
import { setTheme } from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const { selectedFeed, modal, theme } = useSelector((state: InitialState) => ({
    selectedFeed: state.selectedFeed,
    modal: state.ui.modal,
    theme: state.ui.theme,
  }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (theme === Themes.DARK) {
      document.documentElement.classList.add('dark');
      dispatch(setTheme(Themes.DARK));
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dispatch, theme]);

  return (
    <>
      <div className="antialiased min-h-screen flex flex-col-reverse md:flex-row text-black dark:text-white">
        <Header />
        <div role="main" className="flex-1 flex min-w-0">
          {selectedFeed !== null ? (
            <>
              <ItemList />
              <ItemView />
            </>
          ) : (
            <Onboarding />
          )}
        </div>
      </div>
      {modal === 'ABOUT' ? <AboutModal /> : null}
      {modal === 'SUBSCRIBE' ? <SubscribeFeedModal /> : null}
    </>
  );
};

export default App;
