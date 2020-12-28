import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { retrieveFeeds } from '../state/actions';
import { InitialState, Themes } from '../state/reducers';
import Header from './Header';
import ItemList from './ItemList';
import ItemView from './ItemView';
import Onboarding from './Onboarding';
import SubscribeFeedModal from './SubscribeFeedModal';
import AboutModal from './AboutModal';

// can delete the below
interface Props {
  isAboutModalOpen: boolean;
  isSubscribeFeedModalOpen: boolean;
  retrieveFeeds: () => {};
  selectedFeed: number | null;
}

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
      <div
        className={`antialiased min-h-screen flex flex-col-reverse md:flex-row ${
          theme === Themes.LIGHT ? 'text-black' : 'text-white'
        }`}
      >
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
