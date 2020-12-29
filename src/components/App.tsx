import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Head from 'next/head';

import { retrieveFeeds } from '../state/actions';
import { InitialState, Themes } from '../state/reducers';
import Header from './Header';
import ItemList from './ItemList';
import ItemView from './ItemView';
import Onboarding from './Onboarding';
import SubscribeFeedModal from './modals/SubscribeFeedModal';
import AboutModal from './modals/AboutModal';

const App: React.FC<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> = ({
  isAboutModalOpen,
  isSubscribeFeedModalOpen,
  retrieveFeeds,
  selectedFeed,
  theme,
}) => {
  React.useEffect(() => {
    retrieveFeeds();
  }, [retrieveFeeds]);

  return (
    <>
      <Head>
        <title>nosh | the RSS reader</title>
      </Head>
      <div className={theme === Themes.DARK ? 'dark' : ''}>
        <div className="antialiased min-h-screen flex flex-col-reverse md:flex-row text-black dark:text-white">
          <Header />
          <main className="flex-1 flex">
            {selectedFeed !== null ? (
              <>
                <ItemList />
                <ItemView />
              </>
            ) : (
              <Onboarding />
            )}
          </main>
        </div>
        {isAboutModalOpen && <AboutModal />}
        {isSubscribeFeedModalOpen && <SubscribeFeedModal />}
      </div>
    </>
  );
};

const mapStateToProps = (state: InitialState) => ({
  selectedFeed: state.selectedFeed,
  isAboutModalOpen: state.ui.isAboutModalOpen,
  isSubscribeFeedModalOpen: state.ui.isSubscribeFeedModalOpen,
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retrieveFeeds: () => dispatch(retrieveFeeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
